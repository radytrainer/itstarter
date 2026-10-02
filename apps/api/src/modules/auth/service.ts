import type { Redis } from 'ioredis';
import {
  checkNewPassword,
  ErrorCode,
  normalizeUsername,
  type AuthUser,
  type ChangePasswordRequest,
  type LoginRequest,
  type UpdateMeRequest,
} from '@itstarter/shared';
import type { Database } from '../../db/client';
import { AppError } from '../../lib/errors';
import { hashPassword, verifyPassword } from '../../lib/password';
import { FixedWindowLimiter, type LimitStatus } from '../../lib/rate-limiter';
import {
  findPasswordHash,
  findUserByUsername,
  recordLogin,
  setLocale,
  setPassword,
} from './repository';
import type { SessionService, SessionUser } from './sessions';

/** Friendly and deliberately vague: never reveal whether the username exists. */
const INVALID_CREDENTIALS_MESSAGE = 'That username or password is not right. Please try again.';

/** Per-username: 5 wrong passwords per 15 minutes (reset after a successful login). */
const USER_FAILURE_LIMIT = { limit: 5, windowSeconds: 15 * 60 };
/**
 * Per-IP: 60 wrong passwords per 10 minutes. Only failures count: a whole school lab shares one
 * IP, and 40 students logging in at the start of class must never be blocked.
 */
const IP_FAILURE_LIMIT = { limit: 60, windowSeconds: 10 * 60 };

interface Logger {
  info(obj: object, msg: string): void;
  warn(obj: object, msg: string): void;
}

export interface LoginResult {
  user: AuthUser;
  token: string;
  expiresAt: Date;
}

export class AuthService {
  private readonly userFailures: FixedWindowLimiter;
  private readonly ipFailures: FixedWindowLimiter;
  private dummyHash: Promise<string> | undefined;

  constructor(
    private readonly db: Database,
    redis: Redis,
    private readonly sessions: SessionService,
  ) {
    this.userFailures = new FixedWindowLimiter(
      redis,
      'login:user',
      USER_FAILURE_LIMIT.limit,
      USER_FAILURE_LIMIT.windowSeconds,
    );
    this.ipFailures = new FixedWindowLimiter(
      redis,
      'login:ip',
      IP_FAILURE_LIMIT.limit,
      IP_FAILURE_LIMIT.windowSeconds,
    );
  }

  async login(
    input: LoginRequest,
    context: { ip: string; userAgent?: string },
    log: Logger,
  ): Promise<LoginResult> {
    const username = normalizeUsername(input.username);

    await this.checkLimits(username, context.ip, log);

    const user = await findUserByUsername(this.db, username);
    // Always run one hash check so response time doesn't reveal whether the user exists.
    const passwordOk = await verifyPassword(
      user?.passwordHash ?? (await this.getDummyHash()),
      input.password,
    );

    if (!user || !passwordOk) {
      await this.guard(() =>
        Promise.all([this.userFailures.hit(username), this.ipFailures.hit(context.ip)]),
      );
      log.warn(
        { event: 'auth.login_failed', username, reason: user ? 'bad_password' : 'unknown_user' },
        'Login failed',
      );
      throw new AppError(401, ErrorCode.INVALID_CREDENTIALS, INVALID_CREDENTIALS_MESSAGE);
    }

    // Only revealed after a correct password, so it can't be used to probe usernames.
    if (user.status !== 'active') {
      log.warn(
        { event: 'auth.login_disabled', userId: user.id },
        'Disabled account tried to log in',
      );
      throw new AppError(
        403,
        ErrorCode.ACCOUNT_DISABLED,
        'Your account is paused. Please ask your teacher for help.',
      );
    }

    await this.guard(() => this.userFailures.reset(username));
    const { token, expiresAt } = await this.sessions.create(user.id, user.role, context.userAgent);
    await recordLogin(this.db, user.id);
    log.info({ event: 'auth.login', userId: user.id, role: user.role }, 'User logged in');

    return {
      token,
      expiresAt,
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        locale: user.locale,
        mustChangePassword: user.mustChangePassword,
      },
    };
  }

  async logout(token: string | undefined, auth: SessionUser | null, log: Logger): Promise<void> {
    if (!token) return;
    await this.sessions.revokeToken(token);
    if (auth) log.info({ event: 'auth.logout', userId: auth.id }, 'User logged out');
  }

  async changePassword(
    auth: SessionUser,
    input: ChangePasswordRequest,
    log: Logger,
  ): Promise<AuthUser> {
    // A stolen session must not be able to brute-force the current password.
    const limitKey = auth.username;
    const status = await this.guard(() => this.userFailures.peek(limitKey));
    if (!status.allowed) throw this.rateLimited(status);

    const currentHash = await findPasswordHash(this.db, auth.id);
    if (!currentHash || !(await verifyPassword(currentHash, input.currentPassword))) {
      await this.guard(() => this.userFailures.hit(limitKey));
      throw new AppError(
        400,
        ErrorCode.INVALID_CURRENT_PASSWORD,
        'Your current password is not right.',
      );
    }

    const problems = checkNewPassword(input.newPassword, {
      username: auth.username,
      currentPassword: input.currentPassword,
    });
    if (problems.length > 0) {
      throw new AppError(400, ErrorCode.WEAK_PASSWORD, 'Please choose a different password.', {
        problems,
      });
    }

    await setPassword(this.db, auth.id, await hashPassword(input.newPassword), false);
    // Sign out every other device; keep this one but drop its cached copy (mustChangePassword changed).
    const revoked = await this.sessions.revokeAllForUser(auth.id, auth.sessionId);
    await this.sessions.refresh(auth.sessionId);
    log.info(
      { event: 'auth.password_changed', userId: auth.id, otherSessionsRevoked: revoked },
      'Password changed',
    );

    const { sessionId: _sessionId, expiresAt: _expiresAt, ...user } = auth;
    return { ...user, mustChangePassword: false };
  }

  async updateMe(auth: SessionUser, input: UpdateMeRequest): Promise<AuthUser> {
    await setLocale(this.db, auth.id, input.locale);
    await this.sessions.refresh(auth.sessionId);
    const { sessionId: _sessionId, expiresAt: _expiresAt, ...user } = auth;
    return { ...user, locale: input.locale };
  }

  private async checkLimits(username: string, ip: string, log: Logger) {
    const ipStatus = await this.guard(() => this.ipFailures.peek(ip));
    if (!ipStatus.allowed) {
      log.warn({ event: 'auth.rate_limited', scope: 'ip', ip }, 'Login rate limit reached');
      throw this.rateLimited(ipStatus);
    }
    const userStatus = await this.guard(() => this.userFailures.peek(username));
    if (!userStatus.allowed) {
      log.warn({ event: 'auth.rate_limited', scope: 'user', username }, 'Login rate limit reached');
      throw this.rateLimited(userStatus);
    }
  }

  private rateLimited(status: LimitStatus) {
    const minutes = Math.ceil(status.retryAfterSeconds / 60);
    return new AppError(
      429,
      ErrorCode.RATE_LIMITED,
      `Too many tries. Please wait ${minutes} minute${minutes === 1 ? '' : 's'} and try again.`,
      { retryAfterSeconds: status.retryAfterSeconds },
    );
  }

  /**
   * Login rate limits live in Redis. If Redis is down we fail CLOSED: refusing logins for a
   * short outage is safer than allowing unlimited password guessing.
   */
  private async guard<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch {
      throw new AppError(
        503,
        ErrorCode.SERVICE_UNAVAILABLE,
        'Login is temporarily unavailable. Please try again in a minute.',
      );
    }
  }

  private getDummyHash(): Promise<string> {
    this.dummyHash ??= hashPassword('timing-equaliser-not-a-real-password');
    return this.dummyHash;
  }
}
