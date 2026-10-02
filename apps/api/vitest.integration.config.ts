import { defineConfig } from 'vitest/config';

// Integration tests need real Postgres + Redis: run `npm run docker:deps` first.
// They use a separate "<db>_test" database that is recreated on every run.
export default defineConfig({
  test: {
    include: ['test/integration/**/*.test.ts'],
    environment: 'node',
    globalSetup: ['test/integration/global-setup.ts'],
    setupFiles: ['test/integration/setup.ts'],
    // Test files share one database, so run them one at a time.
    fileParallelism: false,
    testTimeout: 30_000,
    hookTimeout: 60_000,
  },
});
