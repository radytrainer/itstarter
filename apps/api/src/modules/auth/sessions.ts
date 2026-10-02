import { createHash, randomBytes } from 'node:crypto';
import { and, eq, gt, isNull, lt, ne, or } from 'drizzle-orm';
import type { Redis } from 'ioredis';
import type { AuthUser, Locale, Role } from '@itstarter/shared';
import type { Database } from '../../db/client';
import { roles, sessions, users } from '../../db/schema';

/** The signed-in user attached to a request (`request.auth`). */
export interface SessionUser extends AuthUser {
  sessionId: string;
  expiresAt: string;
}

interface SessionPolicy {
  /** Session ends after this much inactivity (sliding). */
  idleMs: number;
  /** Session ends this long after login, however active. */
  absoluteMs: number;
}

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

/** Students stay signed in on their own phone; staff sessions are short because they can do more. */
export const SESSION_POLICY: Record<Role, SessionPolicy> = {
  STUDENT: { idleMs: 14 * DAY, absoluteMs: 60 * DAY },
  TEACHER: { idleMs: 12 * HOUR, absoluteMs: 7 * DAY },
  ADMIN: { idleMs: 12 * HOUR, absoluteMs: 7 * DAY },
};

/** Don't write last_seen_at more often than this (keeps reads cheap). */
const TOUCH_INTERVAL_MS = 5 * 60 * 1000;
const CACHE_TTL_SECONDS = 10 * 60;

export const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');
const cacheKey = (tokenHash: string) => `session:${tokenHash}`;

interface Logger {
  warn(obj: object, msg: string): void;
}

export class SessionService {
  constructor(
    private readonly db: Database,
    private readonly redis: Redis,
    private readonly log: Logger,
  ) {}

  /** Creates a session and returns the raw token. Only its hash is stored. */
  async create(
    userId: string,
    role: Role,
    userAgent: string | undefined,
  ): Promise<{ token: string; expiresAt: Date }> {
    const token = randomBytes(32).toString('base64url');
    const expiresAt = new Date(Date.now() + SESSION_POLICY[role].idleMs);
    await this.db.insert(sessions).values({
      userId,
      tokenHash: hashToken(token),
      expiresAt,
      userAgent: userAgent?.slice(0, 255) ?? null,
    });
    return { token, expiresAt };
  }

  /**
   * Returns the signed-in user for a token, or null if the session is unknown, expired,
   * revoked, or the user is disabled/deleted. Redis is a cache only: if it fails we use Postgres.
   */
  async resolve(token: string): Promise<SessionUser | null> {
    const tokenHash = hashToken(token);

    const cached = await this.cacheGet(tokenHash);
    if (cached && new Date(cached.expiresAt).getTime() > Date.now()) return cached;

    const now = new Date();
    const [row] = await this.db
      .select({
        sessionId: sessions.id,
        expiresAt: sessions.expiresAt,
        lastSeenAt: sessions.lastSeenAt,
        createdAt: sessions.createdAt,
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        locale: users.locale,
        mustChangePassword: users.mustChangePassword,
        role: roles.code,
      })
      .from(sessions)
      .innerJoin(users, eq(users.id, sessions.userId))
      .innerJoin(roles, eq(roles.id, users.roleId))
      .where(
        and(
          eq(sessions.tokenHash, tokenHash),
          isNull(sessions.revokedAt),
          gt(sessions.expiresAt, now),
          eq(users.status, 'active'),
          isNull(users.deletedAt),
        ),
      );
    if (!row) return null;

    let expiresAt = row.expiresAt;
    if (now.getTime() - row.lastSeenAt.getTime() > TOUCH_INTERVAL_MS) {
      // Sliding expiry, capped by the absolute lifetime.
      const policy = SESSION_POLICY[row.role];
      expiresAt = new Date(
        Math.min(now.getTime() + policy.idleMs, row.createdAt.getTime() + policy.absoluteMs),
      );
      await this.db
        .update(sessions)
        .set({ lastSeenAt: now, expiresAt })
        .where(eq(sessions.id, row.sessionId));
    }

    const user: SessionUser = {
      sessionId: row.sessionId,
      expiresAt: expiresAt.toISOString(),
      id: row.id,
      username: row.username,
      displayName: row.displayName,
      role: row.role,
      locale: row.locale as Locale,
      mustChangePassword: row.mustChangePassword,
    };
    await this.cacheSet(tokenHash, user);
    return user;
  }

  async revokeToken(token: string): Promise<void> {
    const tokenHash = hashToken(token);
    await this.db
      .update(sessions)
      .set({ revokedAt: new Date() })
      .where(and(eq(sessions.tokenHash, tokenHash), isNull(sessions.revokedAt)));
    await this.cacheDelete([tokenHash]);
  }

  /** Signs a user out everywhere (optionally keeping one session, e.g. the current one). */
  async revokeAllForUser(userId: string, exceptSessionId?: string): Promise<number> {
    const revoked = await this.db
      .update(sessions)
      .set({ revokedAt: new Date() })
      .where(
        and(
          eq(sessions.userId, userId),
          isNull(sessions.revokedAt),
          exceptSessionId ? ne(sessions.id, exceptSessionId) : undefined,
        ),
      )
      .returning({ tokenHash: sessions.tokenHash });
    await this.cacheDelete(revoked.map((r) => r.tokenHash));
    return revoked.length;
  }

  /** Drops every cached session of a user (e.g. their name changed); sessions stay valid. */
  async revokeCacheForUser(userId: string): Promise<void> {
    const rows = await this.db
      .select({ tokenHash: sessions.tokenHash })
      .from(sessions)
      .where(and(eq(sessions.userId, userId), isNull(sessions.revokedAt)));
    await this.cacheDelete(rows.map((r) => r.tokenHash));
  }

  /** Drops the cached copy so the next request re-reads the user (e.g. after a password change). */
  async refresh(sessionId: string): Promise<void> {
    const [row] = await this.db
      .select({ tokenHash: sessions.tokenHash })
      .from(sessions)
      .where(eq(sessions.id, sessionId));
    if (row) await this.cacheDelete([row.tokenHash]);
  }

  /** Deletes sessions that ended more than a day ago. */
  async cleanup(): Promise<number> {
    const cutoff = new Date(Date.now() - DAY);
    const deleted = await this.db
      .delete(sessions)
      .where(or(lt(sessions.expiresAt, cutoff), lt(sessions.revokedAt, cutoff)))
      .returning({ id: sessions.id });
    return deleted.length;
  }

  private async cacheGet(tokenHash: string): Promise<SessionUser | null> {
    try {
      const raw = await this.redis.get(cacheKey(tokenHash));
      return raw ? (JSON.parse(raw) as SessionUser) : null;
    } catch (err) {
      this.log.warn({ err: { message: (err as Error).message } }, 'Session cache read failed');
      return null;
    }
  }

  private async cacheSet(tokenHash: string, user: SessionUser): Promise<void> {
    const secondsLeft = Math.floor((new Date(user.expiresAt).getTime() - Date.now()) / 1000);
    const ttl = Math.min(CACHE_TTL_SECONDS, secondsLeft);
    if (ttl <= 0) return;
    try {
      await this.redis.set(cacheKey(tokenHash), JSON.stringify(user), 'EX', ttl);
    } catch (err) {
      this.log.warn({ err: { message: (err as Error).message } }, 'Session cache write failed');
    }
  }

  private async cacheDelete(tokenHashes: string[]): Promise<void> {
    if (tokenHashes.length === 0) return;
    // A stale cache entry would keep a revoked session alive for up to CACHE_TTL_SECONDS,
    // so this failure is logged loudly.
    try {
      await this.redis.del(...tokenHashes.map(cacheKey));
    } catch (err) {
      this.log.warn(
        { err: { message: (err as Error).message } },
        'Session cache delete failed; revoked sessions may stay valid until the cache expires',
      );
    }
  }
}
