import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts', 'src/migrate.ts', 'src/seed.ts'],
  format: ['esm'],
  platform: 'node',
  target: 'node22',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  // The shared workspace package is TypeScript source, so bundle it in.
  noExternal: ['@itstarter/shared'],
});
