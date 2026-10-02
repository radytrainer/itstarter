import { loadConfig, type AppConfig } from '../../src/config/env';
import type { AppDeps } from '../../src/deps';

export function testConfig(overrides: Partial<Record<string, string>> = {}): AppConfig {
  return loadConfig({
    NODE_ENV: 'test',
    LOG_LEVEL: 'silent',
    DATABASE_URL: 'postgres://user:pass@localhost:5432/test',
    REDIS_URL: 'redis://localhost:6379',
    APP_ORIGIN: 'http://localhost:3000',
    ...overrides,
  });
}

interface FakeDepsOptions {
  dbUp?: boolean;
  redisUp?: boolean;
}

/** Minimal stand-ins for pg/ioredis so unit tests never need real services. */
export function fakeDeps({ dbUp = true, redisUp = true }: FakeDepsOptions = {}): AppDeps {
  const pool = {
    query: async () => {
      if (!dbUp) throw new Error('connection refused');
      return { rows: [{ '?column?': 1 }] };
    },
  };
  const redis = {
    ping: async () => {
      if (!redisUp) throw new Error('connection refused');
      return 'PONG';
    },
  };
  return { pool, db: {}, redis } as unknown as AppDeps;
}
