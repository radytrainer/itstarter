import type { FastifyPluginAsync } from 'fastify';
import {
  ErrorCode,
  type ApiFailure,
  type ApiSuccess,
  type Liveness,
  type Readiness,
} from '@itstarter/shared';
import type { AppDeps } from '../../deps';
import { checkReadiness } from './service';

interface HealthRouteOptions {
  deps: AppDeps;
  version: string;
}

export const healthRoutes: FastifyPluginAsync<HealthRouteOptions> = async (
  app,
  { deps, version },
) => {
  /** Liveness: the process is running. Does not touch dependencies. */
  app.get('/health', async (): Promise<ApiSuccess<Liveness>> => ({
    success: true,
    data: { status: 'ok', service: 'api', version, uptimeSeconds: Math.round(process.uptime()) },
  }));

  /** Readiness: Postgres and Redis are reachable. 503 when either is down. */
  app.get('/health/ready', async (_request, reply): Promise<ApiSuccess<Readiness> | ApiFailure> => {
    const readiness = await checkReadiness(deps);
    if (readiness.status === 'ok') {
      return { success: true, data: readiness };
    }
    reply.status(503);
    return {
      success: false,
      error: {
        code: ErrorCode.SERVICE_UNAVAILABLE,
        message: 'A dependency is unavailable',
        details: readiness,
      },
    };
  });
};
