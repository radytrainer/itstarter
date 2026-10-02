import type { z } from 'zod';
import { ErrorCode } from '@itstarter/shared';
import { AppError } from './errors';

/** Validates untrusted input (body, query, params) or throws a 400 VALIDATION_ERROR. */
export function parseWith<S extends z.ZodType>(schema: S, input: unknown): z.infer<S> {
  const result = schema.safeParse(input);
  if (!result.success) {
    throw new AppError(
      400,
      ErrorCode.VALIDATION_ERROR,
      'Please check your input.',
      result.error.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
    );
  }
  return result.data;
}
