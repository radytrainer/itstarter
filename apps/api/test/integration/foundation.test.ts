import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../../src/app';
import { loadConfig } from '../../src/config/env';
import { closeDeps, createDeps, type AppDeps } from '../../src/deps';

let deps: AppDeps;
let app: FastifyInstance;

beforeAll(async () => {
  const config = loadConfig();
  deps = createDeps(config);
  app = await buildApp(config, deps);
});

afterAll(async () => {
  await app?.close();
  if (deps) await closeDeps(deps);
});

describe('API → PostgreSQL', () => {
  it('runs a query against a real PostgreSQL server', async () => {
    const { rows } = await deps.pool.query<{ version: string }>('SELECT version()');
    expect(rows[0]?.version).toMatch(/^PostgreSQL 17/);
  });
});

describe('API → Redis', () => {
  it('writes, reads and expires a key', async () => {
    const key = `test:foundation:${Date.now()}`;
    await deps.redis.set(key, 'hello', 'EX', 5);
    expect(await deps.redis.get(key)).toBe('hello');
    expect(await deps.redis.ttl(key)).toBeGreaterThan(0);
    await deps.redis.del(key);
  });
});

describe('GET /api/health/ready (real services)', () => {
  it('reports both dependencies up', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/health/ready' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({
      success: true,
      data: { status: 'ok', checks: { database: { status: 'up' }, redis: { status: 'up' } } },
    });
  });
});
