import { eq } from 'drizzle-orm';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import * as s from '../../src/db/schema';
import { buildApp } from '../../src/app';
import { loadConfig } from '../../src/config/env';
import { REGISTER_IP_LIMIT } from '../../src/modules/auth/registration';
import {
  createTestContext,
  createUser,
  CSRF,
  flushTestRedis,
  loginAs,
  sessionCookieOf,
  type TestContext,
} from './helpers';

// Students create their own account: open sign-up with name, username and password.

let ctx: TestContext;
let admin = '';
let counter = 0;

const register = (payload: object, ip = '203.0.113.10') =>
  ctx.app.inject({
    method: 'POST',
    url: '/api/auth/register',
    headers: { ...CSRF, 'content-type': 'application/json' },
    remoteAddress: ip,
    payload,
  });
const fresh = () => `new.student${(counter += 1)}`;

beforeAll(async () => {
  ctx = await createTestContext();
  await createUser(ctx.deps, { username: 'reg.admin', role: 'ADMIN' });
});
beforeEach(async () => {
  await flushTestRedis(ctx.deps);
  admin = await loginAs(ctx.app, 'reg.admin');
});
afterAll(async () => {
  await ctx?.close();
});

describe('a student signs up', () => {
  it('creates a student without a class, signed in at once, ready to learn', async () => {
    const username = fresh();
    const res = await register({
      displayName: '  Sokha Chan ',
      username: `  ${username.toUpperCase()} `,
      password: 'blue-mango-river',
      locale: 'km',
    });
    expect(res.statusCode).toBe(200);
    expect(res.json().data.user).toMatchObject({
      username,
      displayName: 'Sokha Chan',
      role: 'STUDENT',
      locale: 'km',
      mustChangePassword: false,
    });
    const cookie = sessionCookieOf(res);
    expect(
      (await ctx.app.inject({ method: 'GET', url: '/api/progress', headers: { cookie } }))
        .statusCode,
    ).toBe(200);

    const [row] = await ctx.deps.db
      .select({ cohortId: s.students.cohortId })
      .from(s.students)
      .innerJoin(s.users, eq(s.users.id, s.students.userId))
      .where(eq(s.users.username, username));
    expect(row).toEqual({ cohortId: null });

    // They can log in again later with what they chose.
    const login = await ctx.app.inject({
      method: 'POST',
      url: '/api/auth/login',
      headers: CSRF,
      payload: { username, password: 'blue-mango-river' },
    });
    expect(login.statusCode).toBe(200);

    // The admin sees them under "No class", and the sign-up is in the audit log.
    const list = await ctx.app.inject({
      method: 'GET',
      url: '/api/teacher/students?cohortId=none',
      headers: { cookie: admin },
    });
    expect(list.json().data.map((u: { username: string }) => u.username)).toContain(username);
    const audit = await ctx.deps.db
      .select({ action: s.auditLogs.action })
      .from(s.auditLogs)
      .where(eq(s.auditLogs.action, 'student.self_registered'));
    expect(audit.length).toBeGreaterThan(0);
  });

  it('refuses weak passwords, bad or reserved usernames, taken names and bots — and creates nothing', async () => {
    const taken = fresh();
    expect(
      (await register({ displayName: 'A', username: taken, password: 'long-enough-1' })).statusCode,
    ).toBe(200);
    const before = (await ctx.deps.db.select().from(s.users)).length;

    const cases: [object, number, string][] = [
      [{ displayName: 'B', username: fresh(), password: 'short' }, 400, 'WEAK_PASSWORD'],
      [{ displayName: 'B', username: 'same.name', password: 'same.name' }, 400, 'WEAK_PASSWORD'],
      [
        { displayName: 'B', username: 'has space', password: 'long-enough-1' },
        400,
        'VALIDATION_ERROR',
      ],
      [{ displayName: 'B', username: 'x', password: 'long-enough-1' }, 400, 'VALIDATION_ERROR'],
      [{ displayName: '', username: fresh(), password: 'long-enough-1' }, 400, 'VALIDATION_ERROR'],
      [{ displayName: 'B', username: 'admin', password: 'long-enough-1' }, 409, 'USERNAME_TAKEN'],
      [
        { displayName: 'B', username: 'teacher.dara', password: 'long-enough-1' },
        409,
        'USERNAME_TAKEN',
      ],
      [{ displayName: 'B', username: taken, password: 'long-enough-1' }, 409, 'USERNAME_TAKEN'],
      [
        {
          displayName: 'Bot',
          username: fresh(),
          password: 'long-enough-1',
          website: 'http://spam',
        },
        400,
        'VALIDATION_ERROR',
      ],
    ];
    for (const [payload, status, code] of cases) {
      const res = await register(payload);
      expect([res.statusCode, res.json().error.code], JSON.stringify(payload)).toEqual([
        status,
        code,
      ]);
    }
    expect((await ctx.deps.db.select().from(s.users)).length).toBe(before);
  });

  it('cannot create anything but a student (extra fields are ignored)', async () => {
    const username = fresh();
    const res = await register({
      displayName: 'Sneaky',
      username,
      password: 'long-enough-1',
      role: 'ADMIN',
      cohortId: '0190a0a0-0000-7000-8000-000000000000',
    });
    expect(res.json().data.user.role).toBe('STUDENT');
  });
});

describe('abuse protection', () => {
  it(`a whole class can sign up from one school network, but not more than ${REGISTER_IP_LIMIT.limit} an hour`, async () => {
    const ip = '198.51.100.7';
    for (let i = 0; i < REGISTER_IP_LIMIT.limit; i += 1) {
      // Too-short passwords: counted, but cheap (no account, no hashing).
      expect(
        (await register({ displayName: 'S', username: fresh(), password: 'x' }, ip)).statusCode,
      ).toBe(400);
    }
    const blocked = await register(
      { displayName: 'S', username: fresh(), password: 'long-enough-1' },
      ip,
    );
    expect(blocked.statusCode).toBe(429);
    expect(blocked.json().error.code).toBe('RATE_LIMITED');
    // Another network is not affected.
    expect(
      (
        await register(
          { displayName: 'S', username: fresh(), password: 'long-enough-1' },
          '198.51.100.8',
        )
      ).statusCode,
    ).toBe(200);
  });

  it('can be closed by the school (SELF_REGISTRATION=closed)', async () => {
    const closed = await buildApp({ ...loadConfig(), SELF_REGISTRATION: 'closed' }, ctx.deps);
    try {
      const status = await closed.inject({ method: 'GET', url: '/api/auth/registration' });
      expect(status.json().data).toEqual({ open: false });
      const res = await closed.inject({
        method: 'POST',
        url: '/api/auth/register',
        headers: CSRF,
        payload: { displayName: 'S', username: fresh(), password: 'long-enough-1' },
      });
      expect(res.statusCode).toBe(403);
      expect(res.json().error.code).toBe('REGISTRATION_CLOSED');
    } finally {
      await closed.close();
    }
    expect(
      (await ctx.app.inject({ method: 'GET', url: '/api/auth/registration' })).json().data,
    ).toEqual({ open: true });
  });
});
