import { isLocalOrigin } from '../../config/env';
import type { UserSeed } from './types';

/** Local-development passwords only. Production must supply its own via environment variables. */
export const DEV_PASSWORDS = {
  admin: 'Admin#2028dev',
  teacher: 'Teacher#2028dev',
  student: 'Student#2028dev',
} as const;

const MIN_PRODUCTION_PASSWORD_LENGTH = 12;

type Env = Record<string, string | undefined>;

/**
 * Decides which accounts the seed creates.
 * - Always: one ADMIN.
 * - Demo TEACHER + STUDENT: by default only outside production (SEED_DEMO_USERS overrides).
 * - In production every password must come from the environment and be long enough.
 */
export function resolveSeedUsers(env: Env): UserSeed[] {
  const isProduction = env.NODE_ENV === 'production';
  // A real server (not localhost) must never use a password published in this repository.
  const realServer = isProduction && !isLocalOrigin(env.APP_ORIGIN);
  const published: string[] = Object.values(DEV_PASSWORDS);
  const withDemoUsers =
    env.SEED_DEMO_USERS !== undefined ? env.SEED_DEMO_USERS === 'true' : !isProduction;

  const password = (envName: string, devDefault: string): string => {
    const value = env[envName];
    if (value) {
      if (realServer && published.includes(value)) {
        throw new Error(`${envName} is a published development password; choose a private one`);
      }
      if (isProduction && value.length < MIN_PRODUCTION_PASSWORD_LENGTH) {
        throw new Error(
          `${envName} must be at least ${MIN_PRODUCTION_PASSWORD_LENGTH} characters in production`,
        );
      }
      return value;
    }
    if (isProduction) throw new Error(`${envName} is required to seed in production`);
    return devDefault;
  };

  const users: UserSeed[] = [
    {
      username: env.SEED_ADMIN_USERNAME ?? 'admin',
      displayName: 'Administrator',
      role: 'ADMIN',
      password: password('SEED_ADMIN_PASSWORD', DEV_PASSWORDS.admin),
    },
  ];

  if (withDemoUsers) {
    users.push(
      {
        username: 'teacher.demo',
        displayName: 'Demo Teacher',
        role: 'TEACHER',
        password: password('SEED_TEACHER_PASSWORD', DEV_PASSWORDS.teacher),
      },
      {
        username: 'student.demo',
        displayName: 'Demo Student',
        role: 'STUDENT',
        password: password('SEED_STUDENT_PASSWORD', DEV_PASSWORDS.student),
      },
    );
  }

  return users;
}
