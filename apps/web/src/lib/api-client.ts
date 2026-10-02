import { CSRF_HEADER, CSRF_HEADER_VALUE, type ApiResponse } from '@itstarter/shared';

/**
 * Browser-side calls to our own API (same origin: /api/...).
 * Always sends the CSRF header and never throws: network problems become an ApiFailure.
 */
export async function apiRequest<T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  body?: unknown,
  /** Let the request finish even if the page is closing (time reports on leaving). */
  options: { keepalive?: boolean } = {},
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(path, {
      method,
      credentials: 'same-origin',
      keepalive: options.keepalive,
      headers: {
        [CSRF_HEADER]: CSRF_HEADER_VALUE,
        ...(body === undefined ? {} : { 'content-type': 'application/json' }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return (await res.json()) as ApiResponse<T>;
  } catch {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'We could not reach the server. Check your Internet and try again.',
      },
    };
  }
}
