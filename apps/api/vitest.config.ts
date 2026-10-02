import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/unit/**/*.test.ts'],
    environment: 'node',
    // Password hashing and the 1,500-question generator checks are CPU-heavy; leave room on busy machines.
    testTimeout: 15_000,
  },
});
