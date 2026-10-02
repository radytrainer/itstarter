import 'server-only';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import type { ApiResponse, PageMeta } from '@itstarter/shared';
import { apiInternalUrl } from './server-config';

/**
 * GET from the API during server rendering, as the signed-in user (forwards their cookie).
 * Turns auth problems into redirects and 404 into the not-found page; anything else throws
 * and is shown by the friendly error page.
 */
export async function apiGet<T>(path: string): Promise<T> {
  const cookie = (await headers()).get('cookie') ?? '';
  const res = await fetch(`${apiInternalUrl}${path}`, {
    headers: { cookie },
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });
  const body = (await res.json()) as ApiResponse<T>;
  if (body.success) return body.data;

  if (res.status === 401) redirect('/login');
  if (body.error.code === 'PASSWORD_CHANGE_REQUIRED') redirect('/change-password');
  if (res.status === 404) notFound();
  throw new Error(`API ${path} failed: ${res.status} ${body.error.code}`);
}

/** Like apiGet, but also returns pagination info for list endpoints. */
export async function apiGetPage<T>(path: string): Promise<{ data: T; meta: PageMeta }> {
  const cookie = (await headers()).get('cookie') ?? '';
  const res = await fetch(`${apiInternalUrl}${path}`, {
    headers: { cookie },
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });
  const body = (await res.json()) as ApiResponse<T>;
  if (body.success)
    return { data: body.data, meta: body.meta ?? { page: 1, pageSize: 0, total: 0 } };
  if (res.status === 401) redirect('/login');
  if (res.status === 404) notFound();
  throw new Error(`API ${path} failed: ${res.status} ${body.error.code}`);
}
