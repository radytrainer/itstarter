import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': resolve(import.meta.dirname, 'src') },
  },
  test: {
    include: ['test/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      // Components and logic; pages are server components covered by the E2E tests.
      include: ['src/components/**', 'src/lib/**', 'src/i18n/**'],
      exclude: ['src/lib/server-*.ts', 'src/lib/session.ts'],
      reporter: ['text-summary', 'html', 'json-summary', 'json'],
      reportsDirectory: 'coverage',
      // Measured in Phase 17 (≈64/58/58/66 %); pages and admin screens are covered by E2E tests.
      thresholds: { statements: 62, branches: 56, functions: 55, lines: 63 },
    },
  },
});
