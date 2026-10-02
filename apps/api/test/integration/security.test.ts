import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import {
  createCohort,
  createTestContext,
  createUser,
  CSRF,
  flushTestRedis,
  login,
  loginAs,
  type TestContext,
} from './helpers';

// Phase 16 security review: checks that run against the real app and every one of its routes.

let ctx: TestContext;
const cookies: Record<string, string> = {};
const ANY_ID = '0190a0a0-0000-7000-8000-000000000000';

/** Routes anyone may call without logging in. Everything else must answer 401. */
const PUBLIC = new Set([
  'GET /api/health',
  'GET /api/health/live',
  'GET /api/health/ready',
  'POST /api/auth/login',
  'POST /api/auth/logout',
]);

const isWrite = (method: string) => !['GET', 'HEAD', 'OPTIONS'].includes(method);
const fill = (url: string) => url.replace(/:[A-Za-z]+/g, ANY_ID);

function call(method: string, url: string, cookie?: string) {
  return ctx.app.inject({
    method: method as 'GET',
    url: fill(url),
    headers: { ...(isWrite(method) ? CSRF : {}), ...(cookie ? { cookie } : {}) },
    ...(isWrite(method) ? { payload: {} } : {}),
  });
}

const apiRoutes = () => ctx.app.routeList.filter((r) => r.url.startsWith('/api/'));

beforeAll(async () => {
  ctx = await createTestContext();
  const classA = await createCohort(ctx.deps, 'Security A');
  await createUser(ctx.deps, { username: 'boss', role: 'ADMIN' });
  await createUser(ctx.deps, { username: 'teach', role: 'TEACHER', cohortId: classA });
  await createUser(ctx.deps, { username: 'kid', role: 'STUDENT', cohortId: classA });
});

beforeEach(async () => {
  await flushTestRedis(ctx.deps);
  for (const who of ['boss', 'teach', 'kid']) cookies[who] = await loginAs(ctx.app, who);
});

afterAll(async () => {
  await ctx?.close();
});

describe('every route is guarded', () => {
  it('found the routes (sanity check)', () => {
    expect(apiRoutes().length).toBeGreaterThan(50);
  });

  it('anonymous visitors get 401 everywhere except the public routes', async () => {
    const open: string[] = [];
    for (const route of apiRoutes()) {
      const key = `${route.method} ${route.url}`;
      if (PUBLIC.has(key)) continue;
      const res = await call(route.method, route.url);
      if (res.statusCode !== 401) open.push(`${key} → ${res.statusCode}`);
    }
    expect(open).toEqual([]);
  });

  it('students get 403 on every teacher and admin route', async () => {
    const open: string[] = [];
    for (const route of apiRoutes()) {
      if (!/^\/api\/(admin|teacher)\//.test(route.url)) continue;
      const res = await call(route.method, route.url, cookies.kid);
      if (res.statusCode !== 403) open.push(`${route.method} ${route.url} → ${res.statusCode}`);
    }
    expect(open).toEqual([]);
  });

  it('teachers get 403 on every admin route except analytics', async () => {
    const open: string[] = [];
    for (const route of apiRoutes()) {
      if (!route.url.startsWith('/api/admin/') || route.url.startsWith('/api/admin/analytics'))
        continue;
      const res = await call(route.method, route.url, cookies.teach);
      if (res.statusCode !== 403) open.push(`${route.method} ${route.url} → ${res.statusCode}`);
    }
    expect(open).toEqual([]);
  });

  it('every write needs the CSRF header, even with a valid session', async () => {
    const open: string[] = [];
    for (const route of apiRoutes()) {
      if (!isWrite(route.method) || PUBLIC.has(`${route.method} ${route.url}`)) continue;
      const res = await ctx.app.inject({
        method: route.method as 'POST',
        url: fill(route.url),
        headers: { cookie: cookies.boss! },
        payload: {},
      });
      if (res.statusCode !== 403) open.push(`${route.method} ${route.url} → ${res.statusCode}`);
    }
    expect(open).toEqual([]);
  });
});

describe('attacks that must fail', () => {
  it('mass assignment: a student cannot make themselves admin via /api/me', async () => {
    const res = await ctx.app.inject({
      method: 'PATCH',
      url: '/api/me',
      headers: { ...CSRF, cookie: cookies.kid! },
      payload: { locale: 'km', role: 'ADMIN', status: 'active', mustChangePassword: false },
    });
    expect([200, 400]).toContain(res.statusCode);
    const me = await ctx.app.inject({
      method: 'GET',
      url: '/api/auth/me',
      headers: { cookie: cookies.kid! },
    });
    expect(me.json().data.user.role).toBe('STUDENT');
  });

  it('admin "student" actions cannot touch staff accounts (no locking out another admin)', async () => {
    const staff = (
      await ctx.app.inject({
        method: 'GET',
        url: '/api/admin/staff',
        headers: { cookie: cookies.boss! },
      })
    ).json().data as { id: string; username: string }[];
    const teacher = staff.find((u) => u.username === 'teach')!;
    for (const [method, url, payload] of [
      ['PATCH', `/api/admin/students/${teacher.id}`, { status: 'disabled' }],
      ['DELETE', `/api/admin/students/${teacher.id}`, undefined],
      ['POST', `/api/teacher/students/${teacher.id}/reset-password`, undefined],
    ] as const) {
      const res = await ctx.app.inject({
        method,
        url,
        headers: { ...CSRF, cookie: cookies.boss! },
        ...(payload ? { payload } : {}),
      });
      expect(res.statusCode, `${method} ${url}`).toBe(404);
    }
    expect((await login(ctx.app, 'teach')).statusCode).toBe(200);
  });

  it('SQL injection in search boxes is just text', async () => {
    for (const q of ["' OR 1=1 --", "kid'; DROP TABLE users; --", '%_\\']) {
      for (const url of ['/api/teacher/students', '/api/teacher/progress']) {
        const res = await ctx.app.inject({
          method: 'GET',
          url: `${url}?q=${encodeURIComponent(q)}`,
          headers: { cookie: cookies.boss! },
        });
        expect(res.statusCode, `${url} ${q}`).toBe(200);
        const data = res.json().data;
        expect(Array.isArray(data) ? data : data.rows).toEqual([]);
      }
    }
    // The users table is still there.
    expect((await login(ctx.app, 'kid')).statusCode).toBe(200);
  });

  it('password hashes never leave the API', async () => {
    const [kid] = (
      await ctx.app.inject({
        method: 'GET',
        url: '/api/teacher/students?q=kid',
        headers: { cookie: cookies.boss! },
      })
    ).json().data;
    const bodies = await Promise.all(
      [
        ['/api/auth/me', cookies.kid],
        [`/api/teacher/students/${kid.id}`, cookies.boss],
        ['/api/teacher/progress', cookies.boss],
        ['/api/teacher/progress/export', cookies.boss],
        ['/api/admin/staff', cookies.boss],
        ['/api/admin/audit-logs', cookies.boss],
      ].map(async ([url, cookie]) => {
        const res = await ctx.app.inject({
          method: 'GET',
          url: url!,
          headers: { cookie: cookie! },
        });
        return `${url}: ${res.body}`;
      }),
    );
    for (const body of bodies) expect(body).not.toMatch(/\$argon2|password_?hash/i);
  });

  it('errors never show stack traces or database details', async () => {
    const broken = await ctx.app.inject({
      method: 'POST',
      url: '/api/auth/login',
      headers: { ...CSRF, 'content-type': 'application/json' },
      payload: '{"username": ',
    });
    expect(broken.statusCode).toBe(400);
    expect(broken.body).not.toMatch(/at \w+ \(|node_modules|SyntaxError|postgres|select /i);

    const missing = await ctx.app.inject({ method: 'GET', url: '/api/nope' });
    expect(missing.statusCode).toBe(404);
    expect(missing.json()).toMatchObject({ success: false });
  });

  it('huge requests are refused before any work is done (1 MB limit)', async () => {
    const res = await ctx.app.inject({
      method: 'POST',
      url: '/api/auth/login',
      headers: { ...CSRF, 'content-type': 'application/json' },
      payload: JSON.stringify({ username: 'x', password: 'y'.repeat(1_100_000) }),
    });
    expect(res.statusCode).toBe(413);
    expect(res.json()).toMatchObject({ success: false, error: { code: 'VALIDATION_ERROR' } });
  });

  it('CORS: only our own site may call the API from a browser', async () => {
    const evil = await ctx.app.inject({
      method: 'OPTIONS',
      url: '/api/auth/me',
      headers: { origin: 'https://evil.example', 'access-control-request-method': 'GET' },
    });
    expect(evil.headers['access-control-allow-origin']).toBeUndefined();
    const ours = await ctx.app.inject({
      method: 'OPTIONS',
      url: '/api/auth/me',
      headers: { origin: process.env.APP_ORIGIN!, 'access-control-request-method': 'GET' },
    });
    expect(ours.headers['access-control-allow-origin']).toBe(process.env.APP_ORIGIN);
    expect(ours.headers['access-control-allow-credentials']).toBe('true');
  });

  it('a cross-site form post is refused even with the CSRF header', async () => {
    const res = await ctx.app.inject({
      method: 'POST',
      url: '/api/auth/logout',
      headers: { ...CSRF, origin: 'https://evil.example', cookie: cookies.kid! },
    });
    expect(res.statusCode).toBe(403);
  });

  it('API responses carry security headers', async () => {
    const res = await ctx.app.inject({ method: 'GET', url: '/api/health' });
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['content-security-policy']).toContain("default-src 'none'");
    expect(res.headers['x-powered-by']).toBeUndefined();
  });

  it('the session cookie is HttpOnly and SameSite', async () => {
    const res = await login(ctx.app, 'kid');
    const cookie = res.cookies.find((c) => c.name.endsWith('its_session'))!;
    expect(cookie).toMatchObject({ httpOnly: true, sameSite: 'Lax', path: '/' });
  });
});
