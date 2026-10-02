import { defineConfig, devices } from '@playwright/test';

/**
 * Smoke test against a deployed site (no database access, no test students):
 *   E2E_BASE_URL=https://staging.itstarter.store SMOKE_ADMIN_PASSWORD=… npm run test:smoke
 * E2E_IGNORE_HTTPS_ERRORS=1 accepts a temporary self-signed certificate (local staging test).
 */
export default defineConfig({
  testDir: '.',
  testMatch: 'smoke.spec.ts',
  outputDir: './test-results',
  timeout: 60_000,
  retries: 1,
  reporter: [['list']],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:8088',
    ignoreHTTPSErrors: process.env.E2E_IGNORE_HTTPS_ERRORS === '1',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'android', use: { ...devices['Pixel 7'] } }],
});
