import type { Redis } from 'ioredis';

interface Logger {
  warn(obj: object, msg: string): void;
}

/**
 * Redis read-through cache. Redis is never the source of truth: on any Redis error we just
 * load from PostgreSQL, so a Redis outage makes the app slower, not broken.
 */
export class Cache {
  constructor(
    private readonly redis: Redis,
    private readonly log: Logger,
  ) {}

  async getOrLoad<T>(key: string, ttlSeconds: number, load: () => Promise<T>): Promise<T> {
    try {
      const hit = await this.redis.get(key);
      if (hit !== null) return JSON.parse(hit) as T;
    } catch (err) {
      this.warn(err, 'Cache read failed');
    }
    const value = await load();
    try {
      await this.redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch (err) {
      this.warn(err, 'Cache write failed');
    }
    return value;
  }

  async delete(...keys: string[]): Promise<void> {
    if (keys.length === 0) return;
    try {
      await this.redis.del(...keys);
    } catch (err) {
      this.warn(err, 'Cache delete failed');
    }
  }

  /**
   * Content is cached under a version number. Changing any content bumps the version, so every
   * old entry is ignored at once (and expires by itself) — no need to find and delete keys.
   */
  async contentKey(name: string): Promise<string> {
    let version = '0';
    try {
      version = (await this.redis.get('content:version')) ?? '0';
    } catch (err) {
      this.warn(err, 'Cache version read failed');
    }
    return `content:v${version}:${name}`;
  }

  async bumpContentVersion(): Promise<void> {
    try {
      await this.redis.incr('content:version');
    } catch (err) {
      this.warn(err, 'Cache version bump failed; content may be stale for up to an hour');
    }
  }

  private warn(err: unknown, msg: string) {
    this.log.warn({ err: { message: (err as Error).message } }, msg);
  }
}

export const studentDashboardKey = (studentId: string) => `student:${studentId}:dashboard`;
