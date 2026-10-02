import { eq } from 'drizzle-orm';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import * as s from '../../src/db/schema';
import {
  createCohort,
  createTestContext,
  createUser,
  CSRF,
  flushTestRedis,
  login,
  loginAs,
  seededCohortId,
  type TestContext,
} from './helpers';

let ctx: TestContext;
const ids: Record<string, string> = {};
const cookies: Record<string, string> = {};

const get = (url: string, who?: string) =>
  ctx.app.inject({ method: 'GET', url, headers: who ? { cookie: cookies[who]! } : {} });

const resetPassword = (studentKey: string, who: string, headers: Record<string, string> = CSRF) =>
  ctx.app.inject({
    method: 'POST',
    url: `/api/teacher/students/${ids[studentKey]}/reset-password`,
    headers: { ...headers, cookie: cookies[who]! },
  });

const usernames = (res: { json: () => { data: { username: string }[] } }) =>
  res
    .json()
    .data.map((x) => x.username)
    .sort();

beforeAll(async () => {
  ctx = await createTestContext();
  const classA = await seededCohortId(ctx.deps);
  const classB = await createCohort(ctx.deps, 'Generation 2028 – Class B');

  ids.admin = await createUser(ctx.deps, { username: 'admin.one', role: 'ADMIN' });
  ids.teacherA = await createUser(ctx.deps, {
    username: 'teacher.a',
    role: 'TEACHER',
    cohortId: classA,
  });
  ids.teacherB = await createUser(ctx.deps, {
    username: 'teacher.b',
    role: 'TEACHER',
    cohortId: classB,
  });
  ids.lonely = await createUser(ctx.deps, { username: 'teacher.none', role: 'TEACHER' });
  ids.a1 = await createUser(ctx.deps, {
    username: 'student.a1',
    role: 'STUDENT',
    cohortId: classA,
  });
  ids.a2 = await createUser(ctx.deps, {
    username: 'student.a2',
    role: 'STUDENT',
    cohortId: classA,
  });
  ids.b1 = await createUser(ctx.deps, {
    username: 'student.b1',
    role: 'STUDENT',
    cohortId: classB,
  });
  ids.pct = await createUser(ctx.deps, {
    username: 'student.100pct',
    role: 'STUDENT',
    cohortId: classB,
  });
});

beforeEach(async () => {
  await flushTestRedis(ctx.deps);
  for (const [key, username] of Object.entries({
    admin: 'admin.one',
    teacherA: 'teacher.a',
    teacherB: 'teacher.b',
    lonely: 'teacher.none',
    a1: 'student.a1',
  })) {
    cookies[key] = await loginAs(ctx.app, username);
  }
});

afterAll(async () => {
  await ctx?.close();
});

describe('role checks', () => {
  it.each([['/api/teacher/students'], ['/api/admin/audit-logs']])(
    'a student gets 403 on %s',
    async (url) => {
      const res = await get(url, 'a1');
      expect(res.statusCode).toBe(403);
      expect(res.json().error.code).toBe('FORBIDDEN');
    },
  );

  it('a teacher gets 403 on admin routes', async () => {
    expect((await get('/api/admin/audit-logs', 'teacherA')).statusCode).toBe(403);
  });

  it('an admin can use admin routes', async () => {
    expect((await get('/api/admin/audit-logs', 'admin')).statusCode).toBe(200);
  });
});

describe('teachers only see their own students', () => {
  it('teacher A sees class A only', async () => {
    const res = await get('/api/teacher/students', 'teacherA');
    expect(res.statusCode).toBe(200);
    expect(usernames(res)).toEqual(['student.a1', 'student.a2']);
    expect(res.json().meta).toEqual({ page: 1, pageSize: 20, total: 2 });
  });

  it('teacher B sees class B only', async () => {
    expect(usernames(await get('/api/teacher/students', 'teacherB'))).toEqual([
      'student.100pct',
      'student.b1',
    ]);
  });

  it('a teacher without a class sees nobody', async () => {
    const res = await get('/api/teacher/students', 'lonely');
    expect(res.json().data).toEqual([]);
  });

  it('an admin sees every student', async () => {
    expect(usernames(await get('/api/teacher/students', 'admin'))).toEqual([
      'student.100pct',
      'student.a1',
      'student.a2',
      'student.b1',
    ]);
  });

  it('search stays inside the teacher scope and treats % literally', async () => {
    expect(usernames(await get('/api/teacher/students?q=b1', 'teacherA'))).toEqual([]);
    expect(usernames(await get('/api/teacher/students?q=a2', 'teacherA'))).toEqual(['student.a2']);
    // Unescaped, "%" would match everyone and "100%" would match "student.100pct".
    expect(usernames(await get('/api/teacher/students?q=%25', 'admin'))).toEqual([]);
    expect(usernames(await get('/api/teacher/students?q=100%25', 'admin'))).toEqual([]);
    expect(usernames(await get('/api/teacher/students?q=100', 'admin'))).toEqual([
      'student.100pct',
    ]);
  });

  it('paginates', async () => {
    const res = await get('/api/teacher/students?page=2&pageSize=3', 'admin');
    expect(res.json().data).toHaveLength(1);
    expect(res.json().meta).toEqual({ page: 2, pageSize: 3, total: 4 });
  });

  it('validates query parameters', async () => {
    expect((await get('/api/teacher/students?pageSize=500', 'admin')).statusCode).toBe(400);
  });

  it('does not expose password hashes', async () => {
    const res = await get('/api/teacher/students', 'admin');
    expect(res.body).not.toMatch(/argon2|password/i);
  });
});

describe('resetting a student password', () => {
  it('works for the student’s own teacher and forces a new password', async () => {
    const studentCookie = await loginAs(ctx.app, 'student.a2');
    const res = await resetPassword('a2', 'teacherA');
    expect(res.statusCode).toBe(200);
    const { username, temporaryPassword } = res.json().data;
    expect(username).toBe('student.a2');
    expect(temporaryPassword).toMatch(/^[a-z]+-[a-z]+-\d{4}$/);

    // The student's existing sessions are signed out...
    const meRes = await ctx.app.inject({
      method: 'GET',
      url: '/api/auth/me',
      headers: { cookie: studentCookie },
    });
    expect(meRes.statusCode).toBe(401);

    // ...the temporary password works and must be changed.
    const relogin = await login(ctx.app, 'student.a2', temporaryPassword);
    expect(relogin.statusCode).toBe(200);
    expect(relogin.json().data.user.mustChangePassword).toBe(true);

    // ...and it is recorded in the audit log.
    const logs = await get('/api/admin/audit-logs', 'admin');
    expect(logs.json().data[0]).toMatchObject({
      action: 'student.password_reset',
      entityId: ids.a2,
      actorUsername: 'teacher.a',
    });
    expect(logs.body).not.toContain(temporaryPassword);
  });

  it('returns 404 for a student in another class (and changes nothing)', async () => {
    const [before] = await ctx.deps.db.select().from(s.users).where(eq(s.users.id, ids.b1!));
    const res = await resetPassword('b1', 'teacherA');
    expect(res.statusCode).toBe(404);
    expect(res.json().error.code).toBe('STUDENT_NOT_FOUND');
    const [after] = await ctx.deps.db.select().from(s.users).where(eq(s.users.id, ids.b1!));
    expect(after!.passwordHash).toBe(before!.passwordHash);
  });

  it('returns 404 for staff accounts', async () => {
    expect((await resetPassword('teacherB', 'teacherA')).statusCode).toBe(404);
    expect((await resetPassword('admin', 'teacherA')).statusCode).toBe(404);
    expect((await resetPassword('teacherB', 'admin')).statusCode).toBe(404);
  });

  it('lets an admin reset any student', async () => {
    expect((await resetPassword('b1', 'admin')).statusCode).toBe(200);
  });

  it('is forbidden for students', async () => {
    expect((await resetPassword('a1', 'a1')).statusCode).toBe(403);
  });

  it('requires the CSRF header', async () => {
    const res = await resetPassword('a1', 'teacherA', {});
    expect(res.statusCode).toBe(403);
    expect(res.json().error.code).toBe('CSRF_REJECTED');
  });

  it('rejects an invalid id', async () => {
    const res = await ctx.app.inject({
      method: 'POST',
      url: '/api/teacher/students/not-a-uuid/reset-password',
      headers: { ...CSRF, cookie: cookies.admin! },
    });
    expect(res.statusCode).toBe(400);
  });
});
