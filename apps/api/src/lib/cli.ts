import { z } from 'zod';

/** Plain output for command-line scripts (the API server itself uses the pino logger). */
export function cliLog(message: string): void {
  process.stdout.write(`${message}\n`);
}

/** CLI scripts only need the database, so they don't require the full API config. */
export function requireDatabaseUrl(): string {
  const parsed = z.url({ protocol: /^postgres(ql)?$/ }).safeParse(process.env.DATABASE_URL);
  if (!parsed.success) {
    throw new Error('DATABASE_URL is missing or is not a postgres:// URL');
  }
  return parsed.data;
}
