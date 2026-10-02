import { resolve } from 'node:path';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Scripts run from apps/web, so the monorepo root is two levels up.
const monorepoRoot = resolve(process.cwd(), '../..');
const apiInternalUrl = process.env.API_INTERNAL_URL ?? 'http://localhost:4000';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: monorepoRoot,
  turbopack: { root: monorepoRoot },
  transpilePackages: ['@itstarter/shared'],
  poweredByHeader: false,
  reactStrictMode: true,

  async rewrites() {
    // In Docker/production, Nginx sends /api to the API. In `npm run dev`, Next proxies it.
    if (process.env.NODE_ENV !== 'development') return [];
    return [{ source: '/api/:path*', destination: `${apiInternalUrl}/api/:path*` }];
  },

  async headers() {
    return [
      {
        // The service worker must always be fresh, or students would keep an old version.
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
