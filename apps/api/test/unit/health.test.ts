import { describe, expect, it } from 'vitest';
import { buildApp } from '../../src/app';
import { fakeDeps, testConfig } from './helpers';

describe('GET /api/health', () => {
  it('reports the API is alive without touching dependencies', async () => {
    const app = await buildApp(testConfig(), fakeDeps({ dbUp: false, redisUp: false }));
    const res = await app.inject({ method: 'GET', url: '/api/health' });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({
      success: true,
      data: { status: 'ok', service: 'api', version: '0.1.0' },
    });
  });
});

describe('GET /api/health/ready', () => {
  it('returns 200 when Postgres and Redis are up', async () => {
    const app = await buildApp(testConfig(), fakeDeps());
    const res = await app.inject({ method: 'GET', url: '/api/health/ready' });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({
      success: true,
      data: { status: 'ok', checks: { database: { status: 'up' }, redis: { status: 'up' } } },
    });
  });

  it('returns 503 with details when Postgres is down', async () => {
    const app = await buildApp(testConfig(), fakeDeps({ dbUp: false }));
    const res = await app.inject({ method: 'GET', url: '/api/health/ready' });

    expect(res.statusCode).toBe(503);
    expect(res.json()).toMatchObject({
      success: false,
      error: {
        code: 'SERVICE_UNAVAILABLE',
        details: {
          status: 'degraded',
          checks: { database: { status: 'down' }, redis: { status: 'up' } },
        },
      },
    });
  });

  it('returns 503 when Redis is down', async () => {
    const app = await buildApp(testConfig(), fakeDeps({ redisUp: false }));
    const res = await app.inject({ method: 'GET', url: '/api/health/ready' });

    expect(res.statusCode).toBe(503);
    expect(res.json().error.details.checks.redis.status).toBe('down');
  });
});
