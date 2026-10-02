import type { FastifyInstance } from 'fastify';
import { CSRF_HEADER, CSRF_HEADER_VALUE, ErrorCode } from '@itstarter/shared';
import { AppError } from '../lib/errors';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/**
 * CSRF defence for cookie-authenticated, state-changing requests (three layers):
 * 1. The session cookie is SameSite=Lax, so other sites' POSTs don't carry it.
 * 2. If the browser sends an Origin header, it must be our app's origin.
 * 3. A custom header is required. Other sites cannot add it without a CORS preflight,
 *    and CORS only allows APP_ORIGIN.
 */
export function registerCsrfProtection(app: FastifyInstance, appOrigin: string): void {
  app.addHook('onRequest', async (request) => {
    if (SAFE_METHODS.has(request.method)) return;

    const origin = request.headers.origin;
    if (origin !== undefined && origin !== appOrigin) {
      request.log.warn({ event: 'security.csrf_rejected', origin }, 'Cross-origin request blocked');
      throw new AppError(403, ErrorCode.CSRF_REJECTED, 'This request was blocked for your safety.');
    }

    if (request.headers[CSRF_HEADER] !== CSRF_HEADER_VALUE) {
      request.log.warn(
        { event: 'security.csrf_rejected', reason: 'missing header' },
        'CSRF header missing',
      );
      throw new AppError(403, ErrorCode.CSRF_REJECTED, 'This request was blocked for your safety.');
    }
  });
}
