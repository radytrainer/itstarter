import { ErrorCode } from '@itstarter/shared';

/** Throw this from services/routes to send a controlled error response. */
export class AppError extends Error {
  constructor(
    readonly statusCode: number,
    readonly code: string,
    message: string,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }

  static notFound(code: string = ErrorCode.NOT_FOUND, message = 'Not found') {
    return new AppError(404, code, message);
  }
}
