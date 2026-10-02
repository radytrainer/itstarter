import { eq } from 'drizzle-orm';
import type { FastifyInstance, LightMyRequestResponse } from 'fastify';
import type { Role } from '@itstarter/shared';
import { buildApp } from '../../src/app';
import { loadConfig } from '../../src/config/env';
import { closeDeps, createDeps, type AppDeps } from '../../src/deps';
import * as s from '../../src/db/schema';
import { runSeed } from '../../src/db/seed/run-seed';
import { ROLE_SEEDS } from '../../src/db/seed/data/foundation';
import { hashPassword } from '../../src/lib/password';
import { resetData, TEST_REDIS_DB } from './test-db';

export const CSRF = { 'x-requested-with': 'itstarter' } as const;
export const COOKIE_NAME = 'its_session'; // COOKIE_SECURE is false outside production

export interface TestContext {
  app: FastifyInstance;
  deps: AppDeps;
  close: () => Promise<void>;
}

/** A real app wired to the test database and Redis db 1, with roles and content seeded. */
export async function createTestContext(): Promise<TestContext> {
  const config = loadConfig();
  const deps = createDeps(config);
  const app = await buildApp(config, deps);
  await resetData(deps.pool);
  await runSeed(deps.db, { users: [] });
  return {
    app,
    deps,
    close: async () => {
      await app.close();
      await closeDeps(deps);
    },
  };
}

/** Clears rate-limit counters and cached sessions. Refuses to run outside the test Redis db. */
export async function flushTestRedis(deps: AppDeps): Promise<void> {
  if (deps.redis.options.db !== TEST_REDIS_DB)
    throw new Error('Refusing to flush a non-test Redis db');
  await deps.redis.flushdb();
}

interface NewUser {
  username: string;
  role: Role;
  password?: string;
  cohortId?: string | null;
  mustChangePassword?: boolean;
  status?: 'active' | 'disabled';
}

export const DEFAULT_PASSWORD = 'test-password-123';

export async function createUser(deps: AppDeps, user: NewUser): Promise<string> {
  const roleId = ROLE_SEEDS.find((r) => r.code === user.role)!.id;
  const [row] = await deps.db
    .insert(s.users)
    .values({
      username: user.username,
      displayName: user.username.replace(/[._-]/g, ' '),
      passwordHash: await hashPassword(user.password ?? DEFAULT_PASSWORD),
      roleId,
      mustChangePassword: user.mustChangePassword ?? false,
      status: user.status ?? 'active',
    })
    .returning({ id: s.users.id });
  const id = row!.id;

  if (user.role === 'STUDENT') {
    await deps.db.insert(s.students).values({ userId: id, cohortId: user.cohortId ?? null });
  } else {
    await deps.db.insert(s.staff).values({ userId: id });
    if (user.role === 'TEACHER' && user.cohortId) {
      await deps.db.insert(s.teacherCohorts).values({ staffUserId: id, cohortId: user.cohortId });
    }
  }
  return id;
}

export async function createCohort(deps: AppDeps, name: string): Promise<string> {
  const [course] = await deps.db.select().from(s.courses).limit(1);
  const [row] = await deps.db
    .insert(s.cohorts)
    .values({ name, year: 2028, courseId: course!.id })
    .returning({ id: s.cohorts.id });
  return row!.id;
}

export async function seededCohortId(deps: AppDeps): Promise<string> {
  const [row] = await deps.db.select().from(s.cohorts).where(eq(s.cohorts.year, 2028)).limit(1);
  return row!.id;
}

export function login(app: FastifyInstance, username: string, password = DEFAULT_PASSWORD) {
  return app.inject({
    method: 'POST',
    url: '/api/auth/login',
    headers: CSRF,
    payload: { username, password },
  });
}

export function sessionCookieOf(res: LightMyRequestResponse): string {
  const cookie = res.cookies.find((c) => c.name === COOKIE_NAME);
  if (!cookie?.value)
    throw new Error(`No session cookie in response (${res.statusCode}): ${res.body}`);
  return `${COOKIE_NAME}=${cookie.value}`;
}

/** Logs in and returns the Cookie header value to use on later requests. */
export async function loginAs(app: FastifyInstance, username: string, password = DEFAULT_PASSWORD) {
  return sessionCookieOf(await login(app, username, password));
}
