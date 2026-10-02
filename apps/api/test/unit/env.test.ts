import { describe, expect, it } from 'vitest';
import { loadConfig } from '../../src/config/env';

const valid = {
  DATABASE_URL: 'postgres://u:supersecret@localhost:5432/db',
  REDIS_URL: 'redis://localhost:6379',
  APP_ORIGIN: 'http://localhost:3000',
};

describe('loadConfig', () => {
  it('applies defaults', () => {
    const config = loadConfig(valid);
    expect(config.API_PORT).toBe(4000);
    expect(config.NODE_ENV).toBe('development');
  });

  it('coerces the port from a string', () => {
    expect(loadConfig({ ...valid, API_PORT: '5050' }).API_PORT).toBe(5050);
  });

  it('names missing variables', () => {
    expect(() => loadConfig({ REDIS_URL: valid.REDIS_URL, APP_ORIGIN: valid.APP_ORIGIN })).toThrow(
      /DATABASE_URL/,
    );
  });

  it('rejects a non-postgres database URL', () => {
    expect(() => loadConfig({ ...valid, DATABASE_URL: 'mysql://u:p@h/db' })).toThrow(
      /DATABASE_URL/,
    );
  });

  it('never includes secret values in the error message', () => {
    try {
      loadConfig({ ...valid, REDIS_URL: 'not-a-url', APP_ORIGIN: 'also bad' });
      expect.unreachable();
    } catch (err) {
      expect(String(err)).not.toContain('supersecret');
    }
  });
});

describe('production on a real server (Phase 16)', () => {
  const real = {
    NODE_ENV: 'production',
    DATABASE_URL: 'postgres://itstarter:a-long-private-db-password-123@postgres:5432/itstarter',
    REDIS_URL: 'redis://:a-long-private-redis-password@redis:6379',
    APP_ORIGIN: 'https://itstarter.store',
  };

  it('starts with HTTPS, secure cookies and a private database password', () => {
    expect(loadConfig(real).COOKIE_SECURE).toBe(true);
  });

  it('refuses plain http, insecure cookies and the published database password', () => {
    expect(() => loadConfig({ ...real, APP_ORIGIN: 'http://itstarter.store' })).toThrow(
      /APP_ORIGIN: must use https/,
    );
    expect(() => loadConfig({ ...real, COOKIE_SECURE: 'false' })).toThrow(/COOKIE_SECURE/);
    expect(() =>
      loadConfig({
        ...real,
        DATABASE_URL: 'postgres://itstarter:itstarter_local_dev_only@postgres:5432/itstarter',
      }),
    ).toThrow(/DATABASE_URL: use a private database password/);
    expect(() =>
      loadConfig({ ...real, DATABASE_URL: 'postgres://itstarter:short@postgres:5432/itstarter' }),
    ).toThrow(/16\+ characters/);
  });

  it('refuses Redis without a password (Phase 18)', () => {
    expect(() => loadConfig({ ...real, REDIS_URL: 'redis://redis:6379' })).toThrow(
      /REDIS_URL: set a Redis password/,
    );
    expect(() => loadConfig({ ...real, REDIS_URL: 'redis://:short@redis:6379' })).toThrow(
      /REDIS_URL/,
    );
  });

  it('never prints the secret values in the error', () => {
    try {
      loadConfig({
        ...real,
        DATABASE_URL: 'postgres://itstarter:itstarter_local_dev_only@postgres:5432/itstarter',
      });
    } catch (err) {
      expect((err as Error).message).not.toContain('itstarter_local_dev_only');
    }
  });

  it('the local Docker stack (production build on localhost) still works', () => {
    expect(() =>
      loadConfig({
        ...real,
        APP_ORIGIN: 'http://localhost:8088',
        DATABASE_URL: 'postgres://itstarter:itstarter_local_dev_only@postgres:5432/itstarter',
      }),
    ).not.toThrow();
  });
});
