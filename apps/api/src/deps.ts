import pg from 'pg';
import { Redis } from 'ioredis';
import type { AppConfig } from './config/env';
import { createDatabase, type Database } from './db/client';

/** External resources the app needs. Passed into buildApp so tests can supply their own. */
export interface AppDeps {
  /** Raw connection pool (health checks, migrations). */
  pool: pg.Pool;
  /** Typed query builder used by repositories. */
  db: Database;
  redis: Redis;
}

export function createDeps(config: AppConfig): AppDeps {
  const pool = new pg.Pool({
    connectionString: config.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });

  const redis = new Redis(config.REDIS_URL, {
    // Fail fast instead of queueing forever when Redis is unavailable.
    maxRetriesPerRequest: 2,
    enableAutoPipelining: true,
  });

  return { pool, db: createDatabase(pool), redis };
}

interface WarnLogger {
  warn(obj: object, msg: string): void;
  info(obj: object, msg: string): void;
}

/**
 * pg and ioredis emit 'error' events when a connection drops. Unhandled, a pg pool
 * error crashes the process, so a short database restart would take the API down.
 * Log once per outage instead; /api/health/ready reports the state.
 */
export function attachConnectionErrorHandlers(deps: AppDeps, log: WarnLogger): void {
  deps.pool.on('error', (err) => {
    log.warn({ err: { message: err.message } }, 'PostgreSQL idle connection lost');
  });

  let redisDown = false;
  deps.redis.on('error', (err: Error) => {
    if (redisDown) return;
    redisDown = true;
    log.warn({ err: { message: err.message } }, 'Redis connection lost; retrying');
  });
  deps.redis.on('ready', () => {
    if (!redisDown) return;
    redisDown = false;
    log.info({}, 'Redis connection restored');
  });
}

export async function closeDeps(deps: AppDeps): Promise<void> {
  await Promise.allSettled([deps.pool.end(), deps.redis.quit()]);
}
