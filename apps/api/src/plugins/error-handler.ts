import type { FastifyError, FastifyInstance } from 'fastify';
import { ErrorCode, type ApiFailure } from '@itstarter/shared';
import { AppError } from '../lib/errors';

function failure(code: string, message: string, details?: unknown): ApiFailure {
  return {
    success: false,
    error: details === undefined ? { code, message } : { code, message, details },
  };
}

/** Converts every error into the standard envelope. Never leaks stack traces or internals. */
export function registerErrorHandlers(app: FastifyInstance): void {
  app.setNotFoundHandler((request, reply) => {
    reply
      .status(404)
      .send(failure(ErrorCode.NOT_FOUND, `Route ${request.method} ${request.url} not found`));
  });

  app.setErrorHandler((error: FastifyError, request, reply) => {
    if (error instanceof AppError) {
      reply.status(error.statusCode).send(failure(error.code, error.message, error.details));
      return;
    }

    if (error.validation) {
      reply
        .status(400)
        .send(failure(ErrorCode.VALIDATION_ERROR, 'Invalid request', error.validation));
      return;
    }

    if (error.statusCode === 429) {
      reply
        .status(429)
        .send(failure(ErrorCode.RATE_LIMITED, 'Too many requests. Please wait a moment.'));
      return;
    }

    // Fastify's own client errors (bad JSON, body too large, ...) are safe to describe.
    if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
      reply.status(error.statusCode).send(failure(ErrorCode.VALIDATION_ERROR, error.message));
      return;
    }

    request.log.error({ err: error }, 'Unhandled error');
    reply
      .status(500)
      .send(failure(ErrorCode.INTERNAL_ERROR, 'Something went wrong. Please try again.'));
  });
}
