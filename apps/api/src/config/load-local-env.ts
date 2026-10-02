import { resolve } from 'node:path';

/**
 * Local development reads the repo-root .env. In Docker and CI, variables come from the
 * environment, so a missing file is fine. Never loads in production.
 *
 * @param entryDir `import.meta.dirname` of the entry script. Entry scripts live in
 *   apps/api/src (tsx) or apps/api/dist (built), so the repo root is three levels up.
 */
export function loadLocalEnv(entryDir: string): void {
  if (process.env.NODE_ENV === 'production') return;
  try {
    process.loadEnvFile(resolve(entryDir, '../../../.env'));
  } catch {
    // No .env file: rely on the real environment.
  }
}
