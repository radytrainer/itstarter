import { eq } from 'drizzle-orm';
import { Redis } from 'ioredis';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { buildApp } from '../../src/app';
import { loadConfig } from '../../src/config/env';
import * as s from '../../src/db/schema';
import { hashToken } from '../../src/modules/auth/sessions';
import {
  COOKIE_NAME,
  createTestContext,
  createUser,
  CSRF,
  DEFAULT_PASSWORD,
  flushTestRedis,
  login,
  loginAs,
  sessionCookieOf,
  type TestContext,
} from './helpers';

let ctx: TestContext;
const me = (cookie?: string) =>
  ctx.app.inject({ method: 'GET', url: '/api/auth/me', headers: cookie ? { cookie } : {} });

const DAY = 24 * 60 * 60 * 1000;

beforeAll(async () => {
  ctx = await createTestContext();
  await createUser(ctx.deps, { username: 'alice', role: 'STUDENT' });
  await createUser(ctx.deps, { username: 'bob.paused', role: 'STUDENT', status: 'disabled' });
  await createUser(ctx.deps, { username: 'dara', role: 'STUDENT' });
  await createUser(ctx.deps, {
    username: 'new.teacher',
    role: 'TEACHER',
    mustChangePassword: true,
  });
  const goneId = await createUser(ctx.deps, { username: 'gone', role: 'STUDENT' });
  await ctx.deps.db.update(s.users).set({ deletedAt: new Date() }).where(eq(s.users.id, goneId));
});

beforeEach(async () => {
  await flushTestRedis(ctx.deps);
});

afterAll(async () => {
  await ctx?.close();
});

describe('POST /api/auth/login', () => {
  it('signs in and sets a secure-by-design session cookie', async () => {
    const res = await login(ctx.app, 'alice');
    expect(res.statusCode).toBe(200);
    expect(res.json().data.user).toEqual({
      id: expect.any(String),
      username: 'alice',
      displayName: 'alice',
      role: 'STUDENT',
      locale: 'en',
      mustChangePassword: false,
    });
    expect(res.body).not.toContain('argon2');

    const cookie = res.cookies.find((c) => c.name === COOKIE_NAME)!;
    expect(cookie.httpOnly).toBe(true);
    expect(cookie.sameSite).toBe('Lax');
    expect(cookie.path).toBe('/');
    expect(cookie.expires!.getTime()).toBeGreaterThan(Date.now() + 13 * DAY);
  });

  it('stores only a hash of the session token', async () => {
    const cookie = await loginAs(ctx.app, 'alice');
    const token = cookie.split('=')[1]!;
    const rows = await ctx.deps.db.select().from(s.sessions);
    expect(rows.some((r) => r.tokenHash === token)).toBe(false);
    expect(rows.some((r) => r.tokenHash === hashToken(token))).toBe(true);
  });

  it('accepts usernames in any case and with spaces around them', async () => {
    expect((await login(ctx.app, '  ALICE ')).statusCode).toBe(200);
  });

  it('records the login time', async () => {
    await login(ctx.app, 'dara');
    const [user] = await ctx.deps.db.select().from(s.users).where(eq(s.users.username, 'dara'));
    expect(Date.now() - user!.lastLoginAt!.getTime()).toBeLessThan(10_000);
  });

  it('gives the same friendly answer for a wrong password and an unknown user', async () => {
    const wrong = await login(ctx.app, 'alice', 'not-the-password');
    const unknown = await login(ctx.app, 'nobody-here', 'whatever');
    expect(wrong.statusCode).toBe(401);
    expect(unknown.statusCode).toBe(401);
    expect(wrong.json().error).toEqual(unknown.json().error);
    expect(wrong.json().error.code).toBe('INVALID_CREDENTIALS');
    expect(wrong.cookies).toHaveLength(0);
  });

  it('tells a disabled user to ask their teacher — but only after a correct password', async () => {
    const right = await login(ctx.app, 'bob.paused');
    expect(right.statusCode).toBe(403);
    expect(right.json().error.code).toBe('ACCOUNT_DISABLED');

    const wrong = await login(ctx.app, 'bob.paused', 'wrong-password');
    expect(wrong.statusCode).toBe(401);
  });

  it('refuses deleted accounts', async () => {
    expect((await login(ctx.app, 'gone')).statusCode).toBe(401);
  });

  it('validates the body', async () => {
    const res = await ctx.app.inject({
      method: 'POST',
      url: '/api/auth/login',
      headers: CSRF,
      payload: { username: 'alice' },
    });
    expect(res.statusCode).toBe(400);
    expect(res.json().error.code).toBe('VALIDATION_ERROR');
  });

  it('is protected against cross-site requests', async () => {
    const res = await ctx.app.inject({
      method: 'POST',
      url: '/api/auth/login',
      headers: { ...CSRF, origin: 'https://evil.example' },
      payload: { username: 'alice', password: DEFAULT_PASSWORD },
    });
    expect(res.statusCode).toBe(403);
    expect(res.json().error.code).toBe('CSRF_REJECTED');
  });
});

describe('login rate limiting', () => {
  it('blocks a username after 5 wrong passwords — even with the right one', async () => {
    for (let i = 0; i < 5; i += 1) {
      expect((await login(ctx.app, 'alice', `wrong-${i}`)).statusCode).toBe(401);
    }
    const blocked = await login(ctx.app, 'alice');
    expect(blocked.statusCode).toBe(429);
    expect(blocked.json().error.code).toBe('RATE_LIMITED');
    expect(blocked.json().error.details.retryAfterSeconds).toBeGreaterThan(0);

    // Other students are not affected.
    expect((await login(ctx.app, 'dara')).statusCode).toBe(200);
  });

  it('forgives earlier mistakes after a successful login', async () => {
    for (let i = 0; i < 4; i += 1) await login(ctx.app, 'alice', `wrong-${i}`);
    expect((await login(ctx.app, 'alice')).statusCode).toBe(200);
    for (let i = 0; i < 4; i += 1) await login(ctx.app, 'alice', `wrong-${i}`);
    expect((await login(ctx.app, 'alice')).statusCode).toBe(200);
  });

  it('limits wrong passwords per IP address', async () => {
    const codes: number[] = [];
    for (let i = 0; i < 61; i += 1) {
      codes.push((await login(ctx.app, `nobody-${i}`, 'x')).statusCode);
    }
    expect(codes.slice(0, 60).every((c) => c === 401)).toBe(true);
    expect(codes[60]).toBe(429);
  });

  it('never blocks a classroom that shares one IP and logs in correctly', async () => {
    for (let i = 0; i < 45; i += 1) {
      expect((await login(ctx.app, i % 2 ? 'alice' : 'dara')).statusCode).toBe(200);
    }
  });
});

describe('sessions', () => {
  it('GET /api/auth/me returns the signed-in user', async () => {
    const cookie = await loginAs(ctx.app, 'alice');
    const res = await me(cookie);
    expect(res.statusCode).toBe(200);
    expect(res.json().data.user.username).toBe('alice');
    expect(res.json().data.user).not.toHaveProperty('sessionId');
  });

  it('rejects a missing or made-up cookie', async () => {
    expect((await me()).statusCode).toBe(401);
    expect((await me(`${COOKIE_NAME}=made-up-token`)).statusCode).toBe(401);
  });

  it('logout ends the session, even if it was cached', async () => {
    const cookie = await loginAs(ctx.app, 'alice');
    expect((await me(cookie)).statusCode).toBe(200); // now cached in Redis

    const out = await ctx.app.inject({
      method: 'POST',
      url: '/api/auth/logout',
      headers: { ...CSRF, cookie },
    });
    expect(out.statusCode).toBe(200);
    expect(out.cookies.find((c) => c.name === COOKIE_NAME)?.value).toBe('');

    expect((await me(cookie)).statusCode).toBe(401);
  });

  it('logout without a session still succeeds', async () => {
    const res = await ctx.app.inject({ method: 'POST', url: '/api/auth/logout', headers: CSRF });
    expect(res.statusCode).toBe(200);
  });

  it('rejects an expired session', async () => {
    const cookie = await loginAs(ctx.app, 'alice');
    const hash = hashToken(cookie.split('=')[1]!);
    await ctx.deps.db
      .update(s.sessions)
      .set({ expiresAt: new Date(Date.now() - 1000) })
      .where(eq(s.sessions.tokenHash, hash));
    await flushTestRedis(ctx.deps);
    expect((await me(cookie)).statusCode).toBe(401);
  });

  it('extends an active session (sliding expiry)', async () => {
    const cookie = await loginAs(ctx.app, 'alice');
    const hash = hashToken(cookie.split('=')[1]!);
    await ctx.deps.db
      .update(s.sessions)
      .set({
        lastSeenAt: new Date(Date.now() - 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 60_000),
      })
      .where(eq(s.sessions.tokenHash, hash));
    await flushTestRedis(ctx.deps);

    expect((await me(cookie)).statusCode).toBe(200);
    const [row] = await ctx.deps.db.select().from(s.sessions).where(eq(s.sessions.tokenHash, hash));
    expect(row!.expiresAt.getTime()).toBeGreaterThan(Date.now() + 13 * DAY);
  });

  it('never extends past the absolute lifetime (60 days for students)', async () => {
    const cookie = await loginAs(ctx.app, 'alice');
    const hash = hashToken(cookie.split('=')[1]!);
    const createdAt = new Date(Date.now() - 59 * DAY);
    await ctx.deps.db
      .update(s.sessions)
      .set({
        createdAt,
        lastSeenAt: new Date(Date.now() - DAY),
        expiresAt: new Date(Date.now() + DAY),
      })
      .where(eq(s.sessions.tokenHash, hash));
    await flushTestRedis(ctx.deps);

    await me(cookie);
    const [row] = await ctx.deps.db.select().from(s.sessions).where(eq(s.sessions.tokenHash, hash));
    expect(row!.expiresAt.getTime()).toBeLessThanOrEqual(createdAt.getTime() + 60 * DAY);
  });

  it('signs out a user who is disabled while logged in (once the cache is cleared)', async () => {
    const id = await createUser(ctx.deps, { username: 'to.disable', role: 'STUDENT' });
    const cookie = await loginAs(ctx.app, 'to.disable');
    await ctx.deps.db.update(s.users).set({ status: 'disabled' }).where(eq(s.users.id, id));
    await flushTestRedis(ctx.deps);
    expect((await me(cookie)).statusCode).toBe(401);
  });

  it('keeps working from Postgres when Redis is down (but login fails closed)', async () => {
    const cookie = await loginAs(ctx.app, 'alice');

    const config = loadConfig();
    const brokenRedis = new Redis('redis://127.0.0.1:1', {
      lazyConnect: true,
      maxRetriesPerRequest: 0,
      enableOfflineQueue: false,
      retryStrategy: () => null,
    });
    brokenRedis.on('error', () => {});
    const app = await buildApp(config, { ...ctx.deps, redis: brokenRedis });
    try {
      const res = await app.inject({ method: 'GET', url: '/api/auth/me', headers: { cookie } });
      expect(res.statusCode).toBe(200);

      const attempt = await app.inject({
        method: 'POST',
        url: '/api/auth/login',
        headers: CSRF,
        payload: { username: 'alice', password: DEFAULT_PASSWORD },
      });
      expect(attempt.statusCode).toBe(503);
      expect(attempt.json().error.code).toBe('SERVICE_UNAVAILABLE');
    } finally {
      await app.close();
      brokenRedis.disconnect();
    }
  });
});

describe('first login: must change password', () => {
  it('only allows /me and change-password until the password is changed', async () => {
    const res = await login(ctx.app, 'new.teacher');
    expect(res.json().data.user.mustChangePassword).toBe(true);
    const cookie = sessionCookieOf(res);

    expect((await me(cookie)).statusCode).toBe(200);
    const blocked = await ctx.app.inject({
      method: 'GET',
      url: '/api/teacher/students',
      headers: { cookie },
    });
    expect(blocked.statusCode).toBe(403);
    expect(blocked.json().error.code).toBe('PASSWORD_CHANGE_REQUIRED');

    const changed = await ctx.app.inject({
      method: 'POST',
      url: '/api/auth/change-password',
      headers: { ...CSRF, cookie },
      payload: { currentPassword: DEFAULT_PASSWORD, newPassword: 'my-own-new-password' },
    });
    expect(changed.statusCode).toBe(200);
    expect(changed.json().data.user.mustChangePassword).toBe(false);

    // Same session, no re-login needed.
    const allowed = await ctx.app.inject({
      method: 'GET',
      url: '/api/teacher/students',
      headers: { cookie },
    });
    expect(allowed.statusCode).toBe(200);
  });
});

describe('POST /api/auth/change-password', () => {
  const change = (cookie: string, currentPassword: string, newPassword: string) =>
    ctx.app.inject({
      method: 'POST',
      url: '/api/auth/change-password',
      headers: { ...CSRF, cookie },
      payload: { currentPassword, newPassword },
    });

  it('requires the current password', async () => {
    await createUser(ctx.deps, { username: 'pw.wrong', role: 'STUDENT' });
    const cookie = await loginAs(ctx.app, 'pw.wrong');
    const res = await change(cookie, 'not-my-password', 'brand-new-password');
    expect(res.statusCode).toBe(400);
    expect(res.json().error.code).toBe('INVALID_CURRENT_PASSWORD');
  });

  it('explains why a new password is not allowed', async () => {
    await createUser(ctx.deps, { username: 'pw.weak', role: 'STUDENT' });
    const cookie = await loginAs(ctx.app, 'pw.weak');
    const res = await change(cookie, DEFAULT_PASSWORD, 'short');
    expect(res.statusCode).toBe(400);
    expect(res.json().error).toMatchObject({
      code: 'WEAK_PASSWORD',
      details: { problems: ['TOO_SHORT'] },
    });
  });

  it('changes the password and signs out other devices only', async () => {
    await createUser(ctx.deps, { username: 'pw.ok', role: 'STUDENT' });
    const phone = await loginAs(ctx.app, 'pw.ok');
    const laptop = await loginAs(ctx.app, 'pw.ok');
    expect((await me(laptop)).statusCode).toBe(200); // cached

    expect((await change(phone, DEFAULT_PASSWORD, 'a-much-better-password')).statusCode).toBe(200);

    expect((await me(phone)).statusCode).toBe(200);
    expect((await me(laptop)).statusCode).toBe(401);
    expect((await login(ctx.app, 'pw.ok')).statusCode).toBe(401);
    expect((await login(ctx.app, 'pw.ok', 'a-much-better-password')).statusCode).toBe(200);
  });
});

describe('PATCH /api/me', () => {
  const patch = (cookie: string, payload: unknown, headers: Record<string, string> = CSRF) =>
    ctx.app.inject({
      method: 'PATCH',
      url: '/api/me',
      headers: { ...headers, cookie },
      payload: payload as object,
    });

  it('saves the language and the session sees it straight away', async () => {
    await createUser(ctx.deps, { username: 'lang.user', role: 'STUDENT' });
    const cookie = await loginAs(ctx.app, 'lang.user');
    expect((await me(cookie)).json().data.user.locale).toBe('en'); // cached now

    const res = await patch(cookie, { locale: 'km' });
    expect(res.statusCode).toBe(200);
    expect(res.json().data.user.locale).toBe('km');
    expect((await me(cookie)).json().data.user.locale).toBe('km');
  });

  it('rejects unsupported languages and unknown fields are ignored', async () => {
    const cookie = await loginAs(ctx.app, 'alice');
    expect((await patch(cookie, { locale: 'fr' })).statusCode).toBe(400);
    const res = await patch(cookie, { locale: 'en', role: 'ADMIN' });
    expect(res.statusCode).toBe(200);
    expect(res.json().data.user.role).toBe('STUDENT');
  });

  it('needs the CSRF header', async () => {
    const cookie = await loginAs(ctx.app, 'alice');
    expect((await patch(cookie, { locale: 'km' }, {})).statusCode).toBe(403);
  });
});
