import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests run against a running stack:
 *   docker compose up -d --build && npm run docker:migrate && npm run docker:seed
 *   npm run test:e2e                       (default: http://localhost:8088)
 *   E2E_BASE_URL=http://localhost:3000 npm run test:e2e   (against `npm run dev`)
 */
export default defineConfig({
  testDir: '.',
  globalSetup: './global-setup.ts',
  outputDir: './test-results',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { outputFolder: './playwright-report', open: 'never' }]],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:8088',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'android', use: { ...devices['Pixel 7'] } },
    { name: 'iphone', use: { ...devices['iPhone 14'], browserName: 'chromium' } },
  ],
});
