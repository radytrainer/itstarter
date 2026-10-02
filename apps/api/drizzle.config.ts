import { defineConfig } from 'drizzle-kit';

// `npm run db:generate` compares src/db/schema with the last migration and writes a new SQL file.
// Generated migrations are committed and reviewed like code.
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  strict: true,
  verbose: true,
  dbCredentials: { url: process.env.DATABASE_URL ?? '' },
});
