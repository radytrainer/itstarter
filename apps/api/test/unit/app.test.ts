import { describe, expect, it } from 'vitest';
import { buildApp } from '../../src/app';
import { AppError } from '../../src/lib/errors';
import { fakeDeps, testConfig } from './helpers';

describe('error envelope', () => {
  it('returns NOT_FOUND for unknown routes', async () => {
    const app = await buildApp(testConfig(), fakeDeps());
    const res = await app.inject({ method: 'GET', url: '/api/does-not-exist' });

    expect(res.statusCode).toBe(404);
    expect(res.json()).toEqual({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Route GET /api/does-not-exist not found' },
    });
  });

  it('passes AppError code and status through', async () => {
    const app = await buildApp(testConfig(), fakeDeps());
    app.get('/api/test/lesson', async () => {
      throw AppError.notFound('LESSON_NOT_FOUND', 'Lesson not found');
    });
    const res = await app.inject({ method: 'GET', url: '/api/test/lesson' });

    expect(res.statusCode).toBe(404);
    expect(res.json()).toEqual({
      success: false,
      error: { code: 'LESSON_NOT_FOUND', message: 'Lesson not found' },
    });
  });

  it('hides internal error details', async () => {
    const app = await buildApp(testConfig(), fakeDeps());
    app.get('/api/test/boom', async () => {
      throw new Error('password=hunter2 at db.internal:5432');
    });
    const res = await app.inject({ method: 'GET', url: '/api/test/boom' });

    expect(res.statusCode).toBe(500);
    expect(res.body).not.toContain('hunter2');
    expect(res.body).not.toContain('db.internal');
    expect(res.json().error.code).toBe('INTERNAL_ERROR');
  });

  it('rejects malformed JSON with a 400 envelope', async () => {
    const app = await buildApp(testConfig(), fakeDeps());
    app.post('/api/test/echo', async (req) => req.body);
    const res = await app.inject({
      method: 'POST',
      url: '/api/test/echo',
      headers: { 'content-type': 'application/json', 'x-requested-with': 'itstarter' },
      payload: '{not json',
    });

    expect(res.statusCode).toBe(400);
    expect(res.json()).toMatchObject({ success: false, error: { code: 'VALIDATION_ERROR' } });
  });

  it('treats an empty JSON body as no body', async () => {
    const app = await buildApp(testConfig(), fakeDeps());
    const res = await app.inject({
      method: 'POST',
      url: '/api/auth/logout',
      headers: { 'content-type': 'application/json', 'x-requested-with': 'itstarter' },
      payload: '',
    });
    expect(res.statusCode).toBe(200);
  });

  it('blocks prototype poisoning in JSON bodies', async () => {
    const app = await buildApp(testConfig(), fakeDeps());
    app.post('/api/test/echo', async (req) => req.body);
    const res = await app.inject({
      method: 'POST',
      url: '/api/test/echo',
      headers: { 'content-type': 'application/json', 'x-requested-with': 'itstarter' },
      payload: '{"__proto__":{"isAdmin":true}}',
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('security headers and CORS', () => {
  it('sets helmet headers', async () => {
    const app = await buildApp(testConfig(), fakeDeps());
    const res = await app.inject({ method: 'GET', url: '/api/health' });

    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['content-security-policy']).toContain("default-src 'none'");
  });

  it('allows the configured app origin only', async () => {
    const app = await buildApp(testConfig(), fakeDeps());

    const allowed = await app.inject({
      method: 'GET',
      url: '/api/health',
      headers: { origin: 'http://localhost:3000' },
    });
    expect(allowed.headers['access-control-allow-origin']).toBe('http://localhost:3000');

    const blocked = await app.inject({
      method: 'GET',
      url: '/api/health',
      headers: { origin: 'https://evil.example' },
    });
    expect(blocked.headers['access-control-allow-origin']).toBeUndefined();
  });
});
