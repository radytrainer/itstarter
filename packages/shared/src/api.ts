import { z } from 'zod';

/**
 * Every API response uses one of these two shapes so clients can handle
 * results and errors the same way everywhere.
 */
export const ErrorCode = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  RATE_LIMITED: 'RATE_LIMITED',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  // auth
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  INVALID_CURRENT_PASSWORD: 'INVALID_CURRENT_PASSWORD',
  ACCOUNT_DISABLED: 'ACCOUNT_DISABLED',
  PASSWORD_CHANGE_REQUIRED: 'PASSWORD_CHANGE_REQUIRED',
  WEAK_PASSWORD: 'WEAK_PASSWORD',
  CSRF_REJECTED: 'CSRF_REJECTED',
  // learning
  LESSON_INCOMPLETE: 'LESSON_INCOMPLETE',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export const pageQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});
export type PageQuery = z.infer<typeof pageQuerySchema>;

export interface PageMeta {
  page: number;
  pageSize: number;
  total: number;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: PageMeta;
}

export interface ApiErrorBody {
  /** Stable machine-readable code. Feature modules may add their own (e.g. LESSON_NOT_FOUND). */
  code: ErrorCode | (string & {});
  message: string;
  details?: unknown;
}

export interface ApiFailure {
  success: false;
  error: ApiErrorBody;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
