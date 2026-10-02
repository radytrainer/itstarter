import type { DependencyStatus, Readiness } from '@itstarter/shared';
import type { AppDeps } from '../../deps';
import { withTimeout } from '../../lib/with-timeout';

const CHECK_TIMEOUT_MS = 2_000;

async function probe(check: () => Promise<unknown>, label: string): Promise<DependencyStatus> {
  const started = performance.now();
  try {
    await withTimeout(check(), CHECK_TIMEOUT_MS, label);
    return { status: 'up', latencyMs: Math.round(performance.now() - started) };
  } catch {
    return { status: 'down', latencyMs: Math.round(performance.now() - started) };
  }
}

export async function checkReadiness(deps: AppDeps): Promise<Readiness> {
  const [database, redis] = await Promise.all([
    probe(() => deps.pool.query('SELECT 1'), 'postgres'),
    probe(() => deps.redis.ping(), 'redis'),
  ]);
  const allUp = database.status === 'up' && redis.status === 'up';
  return { status: allUp ? 'ok' : 'degraded', checks: { database, redis } };
}
