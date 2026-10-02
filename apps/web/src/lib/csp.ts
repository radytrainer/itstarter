/**
 * Content-Security-Policy for every HTML page. The browser runs only scripts that carry this
 * request's random nonce (Next.js adds it to its own scripts), so even if a bug ever let someone
 * inject a <script>, it would not run. Everything else may come only from our own site.
 *
 * - style-src 'unsafe-inline': React sets style="" attributes (progress bars); styles can't run code.
 * - 'unsafe-eval' only in `next dev` (hot reload needs it), never in production builds.
 * - No upgrade-insecure-requests here: local Docker runs on plain http. HTTPS (and HSTS) are set
 *   by Nginx on the real server.
 */
export function contentSecurityPolicy(nonce: string, dev: boolean): string {
  return [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${dev ? ` 'unsafe-eval'` : ''}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob:`,
    `font-src 'self'`,
    `connect-src 'self'${dev ? ' ws:' : ''}`,
    `worker-src 'self'`,
    `manifest-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
  ].join('; ');
}

/** 128 random bits, base64 — a fresh nonce for every page load. */
export function newNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return btoa(String.fromCharCode(...bytes));
}
