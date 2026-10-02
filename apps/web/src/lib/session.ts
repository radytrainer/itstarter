import 'server-only';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { authUserSchema, type AuthUser } from '@itstarter/shared';
import { apiInternalUrl } from './server-config';

/**
 * The signed-in user for this request, asked from the API with the browser's cookie.
 * The API is the only authority; this is just for rendering and redirects.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookie = (await headers()).get('cookie');
  if (!cookie) return null;
  try {
    const res = await fetch(`${apiInternalUrl}/api/auth/me`, {
      headers: { cookie },
      cache: 'no-store',
      signal: AbortSignal.timeout(5_000),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { data?: { user?: unknown } };
    const parsed = authUserSchema.safeParse(body.data?.user);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

/** For pages that need a signed-in user with a usable password. */
export async function requireUser(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (user.mustChangePassword) redirect('/change-password');
  return user;
}

/** For /admin pages: teachers and admins only (the API enforces the same rules). */
export async function requireStaff(): Promise<AuthUser> {
  const user = await requireUser();
  if (user.role === 'STUDENT') redirect('/');
  return user;
}

/** For admin-only pages (content, badges, staff, audit). Teachers go back to the admin home. */
export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireStaff();
  if (user.role !== 'ADMIN') redirect('/admin');
  return user;
}
