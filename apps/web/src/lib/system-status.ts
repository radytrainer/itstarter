import { readinessSchema, type Readiness } from '@itstarter/shared';

export type ServiceState = 'up' | 'down' | 'unknown';

export interface SystemStatus {
  web: ServiceState;
  api: ServiceState;
  database: ServiceState;
  redis: ServiceState;
}

const REQUEST_TIMEOUT_MS = 3_000;

function fromReadiness(readiness: Readiness): SystemStatus {
  return {
    web: 'up',
    api: 'up',
    database: readiness.checks.database.status,
    redis: readiness.checks.redis.status,
  };
}

/**
 * Asks the API whether it and its dependencies are ready.
 * A 503 still carries the per-dependency details, so we read those too.
 */
export async function getSystemStatus(
  apiBaseUrl: string,
  fetchImpl: typeof fetch = fetch,
): Promise<SystemStatus> {
  try {
    const res = await fetchImpl(`${apiBaseUrl}/api/health/ready`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const body: unknown = await res.json();
    const candidate =
      typeof body === 'object' && body !== null && 'success' in body
        ? body.success
          ? (body as { data?: unknown }).data
          : (body as { error?: { details?: unknown } }).error?.details
        : undefined;

    const parsed = readinessSchema.safeParse(candidate);
    if (parsed.success) return fromReadiness(parsed.data);
    return { web: 'up', api: 'up', database: 'unknown', redis: 'unknown' };
  } catch {
    return { web: 'up', api: 'down', database: 'unknown', redis: 'unknown' };
  }
}
