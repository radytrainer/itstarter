import { NextResponse, type NextRequest } from 'next/server';
import { contentSecurityPolicy, newNonce } from './lib/csp';

/**
 * Runs before every page: gives the page a fresh CSP nonce. Next.js reads the policy from the
 * request headers and puts the nonce on its own scripts.
 */
export function proxy(request: NextRequest) {
  const nonce = newNonce();
  const policy = contentSecurityPolicy(nonce, process.env.NODE_ENV === 'development');

  const headers = new Headers(request.headers);
  headers.set('x-nonce', nonce);
  headers.set('Content-Security-Policy', policy);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set('Content-Security-Policy', policy);
  return response;
}

export const config = {
  matcher: [
    {
      // Pages only: not the API, static files, icons, the service worker or the manifest.
      source:
        '/((?!api/|_next/static|_next/image|icons/|sw\\.js|manifest\\.webmanifest|robots\\.txt|healthz).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
