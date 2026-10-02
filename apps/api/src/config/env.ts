import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_HOST: z.string().default('0.0.0.0'),
  API_PORT: z.coerce.number().int().positive().default(4000),
  APP_VERSION: z.string().default('0.1.0'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),
  REDIS_URL: z.url({ protocol: /^rediss?$/ }),
  /** Public origin of the web app, e.g. https://itstarter.example.com — the only allowed CORS origin. */
  APP_ORIGIN: z.url(),
  /** Proxies whose X-Forwarded-* headers we trust (Nginx runs on the private Docker network). */
  TRUST_PROXY: z.string().default('loopback,uniquelocal'),
  /** Send the session cookie only over HTTPS. Defaults to true in production. */
  COOKIE_SECURE: z.enum(['true', 'false']).optional(),
  /** Students may create their own accounts ("open") or only staff create them ("closed"). */
  SELF_REGISTRATION: z.enum(['open', 'closed']).default('open'),
});

/** Values published in .env.example: fine on a developer's machine, never on a real server. */
export const PUBLIC_DEV_SECRETS = ['itstarter_local_dev_only'] as const;

/** The app runs on this computer only (local Docker / dev), not on a real server. */
export function isLocalOrigin(origin: string | undefined): boolean {
  if (!origin) return false;
  try {
    return ['localhost', '127.0.0.1', '[::1]'].includes(new URL(origin).hostname);
  } catch {
    return false;
  }
}

/**
 * Extra rules for a real server (production, not localhost): HTTPS only, secure cookies, and no
 * password that is published in the repository. Returns problems (names only, never values).
 */
export function productionProblems(env: z.infer<typeof envSchema>): string[] {
  if (env.NODE_ENV !== 'production' || isLocalOrigin(env.APP_ORIGIN)) return [];
  const problems: string[] = [];
  if (new URL(env.APP_ORIGIN).protocol !== 'https:') {
    problems.push('APP_ORIGIN: must use https:// on a real server');
  }
  if (env.COOKIE_SECURE === 'false') {
    problems.push('COOKIE_SECURE: must not be false on a real server');
  }
  const dbPassword = decodeURIComponent(new URL(env.DATABASE_URL).password);
  if (dbPassword.length < 16 || (PUBLIC_DEV_SECRETS as readonly string[]).includes(dbPassword)) {
    problems.push('DATABASE_URL: use a private database password of 16+ characters');
  }
  const redisPassword = decodeURIComponent(new URL(env.REDIS_URL).password);
  if (redisPassword.length < 16) {
    problems.push('REDIS_URL: set a Redis password of 16+ characters (redis://:password@host)');
  }
  return problems;
}

export type AppConfig = Omit<z.infer<typeof envSchema>, 'COOKIE_SECURE'> & {
  COOKIE_SECURE: boolean;
};

export function loadConfig(source: NodeJS.ProcessEnv = process.env): AppConfig {
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    // List variable names and problems only; never print values (they may be secrets).
    const problems = parsed.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`);
    throw new Error(`Invalid environment configuration:\n${problems.join('\n')}`);
  }
  const unsafe = productionProblems(parsed.data);
  if (unsafe.length > 0) {
    const list = unsafe.map((p) => `  - ${p}`).join('\n');
    throw new Error(`Unsafe production configuration:\n${list}`);
  }
  const { COOKIE_SECURE, ...rest } = parsed.data;
  return {
    ...rest,
    COOKIE_SECURE:
      COOKIE_SECURE === undefined ? rest.NODE_ENV === 'production' : COOKIE_SECURE === 'true',
  };
}
