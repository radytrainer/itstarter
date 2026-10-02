import { defineConfig, mergeConfig } from 'vitest/config';
import integration from './vitest.integration.config';

/**
 * Coverage of the whole API: unit + integration tests together (routes and services are covered by
 * integration tests, pure logic by unit tests). Needs Postgres + Redis like integration tests.
 *   npm run test:coverage -w @itstarter/api
 */
export default mergeConfig(
  integration,
  defineConfig({
    test: {
      include: ['test/unit/**/*.test.ts', 'test/integration/**/*.test.ts'],
      coverage: {
        provider: 'v8',
        include: ['src/**/*.ts', '../../packages/shared/src/**/*.ts'],
        exclude: ['src/server.ts', 'src/seed.ts', 'src/migrate.ts', 'src/db/seed/data/**'],
        reporter: ['text-summary', 'html', 'json-summary'],
        reportsDirectory: 'coverage',
        // Measured in Phase 17 (≈93/85/94/95 %). CI fails if coverage drops below these.
        thresholds: { statements: 91, branches: 82, functions: 92, lines: 93 },
      },
    },
  }),
);
