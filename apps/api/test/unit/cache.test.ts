import { describe, expect, it, vi } from 'vitest';
import type { Redis } from 'ioredis';
import { Cache } from '../../src/lib/cache';

/** A Redis that is down: every command fails. */
const brokenRedis = () => {
  const fail = vi.fn().mockRejectedValue(new Error('connect ECONNREFUSED'));
  return { get: fail, set: fail, del: fail, incr: fail } as unknown as Redis;
};

describe('cache when Redis is down', () => {
  it('still answers from the database, and only logs a warning', async () => {
    const log = { warn: vi.fn() };
    const cache = new Cache(brokenRedis(), log);
    const load = vi.fn().mockResolvedValue({ lessons: 15 });

    await expect(cache.getOrLoad('k', 60, load)).resolves.toEqual({ lessons: 15 });
    expect(load).toHaveBeenCalledOnce();
    await expect(cache.contentKey('lesson:1')).resolves.toBe('content:v0:lesson:1');
    await expect(cache.delete('a', 'b')).resolves.toBeUndefined();
    await expect(cache.bumpContentVersion()).resolves.toBeUndefined();

    const messages = log.warn.mock.calls.map(([, msg]) => msg);
    expect(messages).toEqual([
      'Cache read failed',
      'Cache write failed',
      'Cache version read failed',
      'Cache delete failed',
      'Cache version bump failed; content may be stale for up to an hour',
    ]);
    // Only the error message is logged (never keys' contents or connection details objects).
    expect(log.warn.mock.calls[0]![0]).toEqual({ err: { message: 'connect ECONNREFUSED' } });
  });

  it('uses the cached value when there is one', async () => {
    const redis = {
      get: vi.fn().mockResolvedValue(JSON.stringify({ hit: true })),
      set: vi.fn(),
    } as unknown as Redis;
    const load = vi.fn();
    await expect(new Cache(redis, { warn: vi.fn() }).getOrLoad('k', 60, load)).resolves.toEqual({
      hit: true,
    });
    expect(load).not.toHaveBeenCalled();
  });

  it('does nothing for an empty delete', async () => {
    const redis = { del: vi.fn() } as unknown as Redis;
    await new Cache(redis, { warn: vi.fn() }).delete();
    expect(redis.del).not.toHaveBeenCalled();
  });
});
