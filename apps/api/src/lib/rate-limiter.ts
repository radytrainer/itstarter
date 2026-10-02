import type { Redis } from 'ioredis';

export interface LimitStatus {
  allowed: boolean;
  count: number;
  retryAfterSeconds: number;
}

/**
 * Fixed-window counter in Redis: at most `limit` hits per `windowSeconds` for each key.
 * Redis errors are thrown, so callers decide whether to fail open or closed.
 */
export class FixedWindowLimiter {
  constructor(
    private readonly redis: Redis,
    private readonly prefix: string,
    private readonly limit: number,
    private readonly windowSeconds: number,
  ) {}

  private key(id: string) {
    return `rl:${this.prefix}:${id}`;
  }

  /** Current state without counting a new hit. */
  async peek(id: string): Promise<LimitStatus> {
    const key = this.key(id);
    const [count, ttl] = await Promise.all([this.redis.get(key), this.redis.ttl(key)]);
    return this.status(Number(count ?? 0), ttl);
  }

  /** Counts one hit and returns the state after it. */
  async hit(id: string): Promise<LimitStatus> {
    const key = this.key(id);
    const results = await this.redis
      .multi()
      .incr(key)
      .expire(key, this.windowSeconds, 'NX')
      .ttl(key)
      .exec();
    if (!results) throw new Error('Rate limiter transaction was aborted');
    const count = Number(results[0]?.[1] ?? 0);
    const ttl = Number(results[2]?.[1] ?? this.windowSeconds);
    return this.status(count, ttl, true);
  }

  async reset(id: string): Promise<void> {
    await this.redis.del(this.key(id));
  }

  private status(count: number, ttl: number, includesThisHit = false): LimitStatus {
    const allowed = includesThisHit ? count <= this.limit : count < this.limit;
    return { allowed, count, retryAfterSeconds: allowed ? 0 : Math.max(ttl, 1) };
  }
}
