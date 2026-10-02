import { EventEmitter } from 'node:events';
import { describe, expect, it, vi } from 'vitest';
import { attachConnectionErrorHandlers, type AppDeps } from '../../src/deps';

function setup() {
  const pool = new EventEmitter();
  const redis = new EventEmitter();
  const log = { warn: vi.fn(), info: vi.fn() };
  attachConnectionErrorHandlers({ pool, redis } as unknown as AppDeps, log);
  return { pool, redis, log };
}

describe('attachConnectionErrorHandlers', () => {
  it('turns a dropped PostgreSQL connection into a warning instead of a crash', () => {
    const { pool, log } = setup();
    // Without a listener, EventEmitter throws on 'error' — that is what crashed the API.
    expect(() => pool.emit('error', new Error('terminating connection'))).not.toThrow();
    expect(log.warn).toHaveBeenCalledOnce();
  });

  it('logs a Redis outage once, then its recovery', () => {
    const { redis, log } = setup();
    redis.emit('error', new Error('ECONNREFUSED'));
    redis.emit('error', new Error('ECONNREFUSED'));
    redis.emit('error', new Error('ECONNREFUSED'));
    expect(log.warn).toHaveBeenCalledOnce();

    redis.emit('ready');
    expect(log.info).toHaveBeenCalledWith({}, 'Redis connection restored');

    redis.emit('error', new Error('ECONNREFUSED'));
    expect(log.warn).toHaveBeenCalledTimes(2);
  });
});
