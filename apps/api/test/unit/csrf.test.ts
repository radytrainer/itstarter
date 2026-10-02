import { describe, expect, it } from 'vitest';
import { buildApp } from '../../src/app';
import { fakeDeps, testConfig } from './helpers';

async function appWithEcho() {
  const app = await buildApp(testConfig(), fakeDeps());
  app.post('/api/test/echo', async () => ({ success: true, data: 'ok' }));
  app.get('/api/test/echo', async () => ({ success: true, data: 'ok' }));
  return app;
}

const CSRF = { 'x-requested-with': 'itstarter' };

describe('CSRF protection', () => {
  it('allows a same-origin POST with the custom header', async () => {
    const app = await appWithEcho();
    const res = await app.inject({
      method: 'POST',
      url: '/api/test/echo',
      headers: { ...CSRF, origin: 'http://localhost:3000' },
    });
    expect(res.statusCode).toBe(200);
  });

  it('allows a server-side POST (no Origin) with the custom header', async () => {
    const app = await appWithEcho();
    const res = await app.inject({ method: 'POST', url: '/api/test/echo', headers: CSRF });
    expect(res.statusCode).toBe(200);
  });

  it('blocks a POST from another origin, even with the header', async () => {
    const app = await appWithEcho();
    const res = await app.inject({
      method: 'POST',
      url: '/api/test/echo',
      headers: { ...CSRF, origin: 'https://evil.example' },
    });
    expect(res.statusCode).toBe(403);
    expect(res.json().error.code).toBe('CSRF_REJECTED');
  });

  it('blocks a POST without the custom header (e.g. a plain HTML form)', async () => {
    const app = await appWithEcho();
    const res = await app.inject({
      method: 'POST',
      url: '/api/test/echo',
      headers: {
        origin: 'http://localhost:3000',
        'content-type': 'application/x-www-form-urlencoded',
      },
      payload: 'a=1',
    });
    expect(res.statusCode).toBe(403);
    expect(res.json().error.code).toBe('CSRF_REJECTED');
  });

  it('does not affect GET requests', async () => {
    const app = await appWithEcho();
    const res = await app.inject({
      method: 'GET',
      url: '/api/test/echo',
      headers: { origin: 'https://evil.example' },
    });
    expect(res.statusCode).toBe(200);
  });

  it('lets the browser send the custom header cross-origin only for our app (CORS preflight)', async () => {
    const app = await appWithEcho();
    const ours = await app.inject({
      method: 'OPTIONS',
      url: '/api/test/echo',
      headers: {
        origin: 'http://localhost:3000',
        'access-control-request-method': 'POST',
        'access-control-request-headers': 'x-requested-with,content-type',
      },
    });
    expect(ours.headers['access-control-allow-headers']).toContain('x-requested-with');

    const theirs = await app.inject({
      method: 'OPTIONS',
      url: '/api/test/echo',
      headers: {
        origin: 'https://evil.example',
        'access-control-request-method': 'POST',
        'access-control-request-headers': 'x-requested-with',
      },
    });
    expect(theirs.headers['access-control-allow-origin']).toBeUndefined();
  });
});

describe('route guards without a session', () => {
  it.each([
    ['GET', '/api/auth/me'],
    ['GET', '/api/teacher/students'],
    ['GET', '/api/admin/audit-logs'],
  ])('%s %s → 401', async (method, url) => {
    const app = await buildApp(testConfig(), fakeDeps());
    const res = await app.inject({ method: method as 'GET', url });
    expect(res.statusCode).toBe(401);
    expect(res.json().error.code).toBe('UNAUTHENTICATED');
  });
});
