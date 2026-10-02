import { and, asc, count, eq, inArray, isNull, sql } from 'drizzle-orm';
import { ErrorCode, parseCsv, USERNAME_PATTERN, type ImportRowResult } from '@itstarter/shared';
import type { z } from 'zod';
import type {
  createCohortSchema,
  createStaffSchema,
  createStudentSchema,
  updateStudentSchema,
} from '@itstarter/shared';
import type { Database } from '../../db/client';
import { cohorts, courses, staff, students, teacherCohorts, users } from '../../db/schema';
import { ROLE_SEEDS } from '../../db/seed/data/foundation';
import { AppError } from '../../lib/errors';
import { hashPassword } from '../../lib/password';
import { generateTemporaryPassword } from '../../lib/temp-password';
import type { SessionService, SessionUser } from '../auth/sessions';
import { audit, isUniqueViolation } from './audit';

const MAX_IMPORT_ROWS = 300;
const roleId = (code: 'STUDENT' | 'TEACHER' | 'ADMIN') =>
  ROLE_SEEDS.find((r) => r.code === code)!.id;

interface Logger {
  info(obj: object, msg: string): void;
}

export interface CreatedAccount {
  id: string;
  username: string;
  /** Shown ONCE to the admin; the user must change it at first login. */
  temporaryPassword: string;
}

/** Admin management of students, classes (cohorts) and staff accounts. */
export class PeopleService {
  constructor(
    private readonly db: Database,
    private readonly sessions: SessionService,
  ) {}

  // ---------- Students ----------

  async createStudent(
    actor: SessionUser,
    input: z.infer<typeof createStudentSchema>,
  ): Promise<CreatedAccount> {
    if (input.cohortId) await this.requireCohort(input.cohortId);
    const temporaryPassword = generateTemporaryPassword();
    const passwordHash = await hashPassword(temporaryPassword);
    try {
      const id = await this.db.transaction(async (tx) => {
        const [user] = await tx
          .insert(users)
          .values({
            username: input.username,
            displayName: input.displayName,
            passwordHash,
            roleId: roleId('STUDENT'),
            mustChangePassword: true,
          })
          .returning({ id: users.id });
        await tx.insert(students).values({ userId: user!.id, cohortId: input.cohortId ?? null });
        await audit(tx, actor, 'student.created', 'user', user!.id, { username: input.username });
        return user!.id;
      });
      return { id, username: input.username, temporaryPassword };
    } catch (err) {
      if (isUniqueViolation(err)) throw usernameTaken(input.username);
      throw err;
    }
  }

  async updateStudent(
    actor: SessionUser,
    studentId: string,
    patch: z.infer<typeof updateStudentSchema>,
  ): Promise<void> {
    await this.requireStudent(studentId);
    if (patch.cohortId) await this.requireCohort(patch.cohortId);
    await this.db.transaction(async (tx) => {
      if (patch.displayName !== undefined || patch.status !== undefined) {
        await tx
          .update(users)
          .set({
            ...(patch.displayName !== undefined ? { displayName: patch.displayName } : {}),
            ...(patch.status !== undefined ? { status: patch.status } : {}),
          })
          .where(eq(users.id, studentId));
      }
      if (patch.cohortId !== undefined) {
        await tx
          .update(students)
          .set({ cohortId: patch.cohortId })
          .where(eq(students.userId, studentId));
      }
      await audit(tx, actor, 'student.updated', 'user', studentId, { fields: Object.keys(patch) });
    });
    // A paused account is signed out everywhere, immediately.
    if (patch.status === 'disabled') await this.sessions.revokeAllForUser(studentId);
    // Name/locale live in cached sessions too.
    if (patch.displayName !== undefined) await this.sessions.revokeCacheForUser(studentId);
  }

  /** Soft delete: progress stays for history and analytics; the username can be reused. */
  async deleteStudent(actor: SessionUser, studentId: string): Promise<void> {
    await this.requireStudent(studentId);
    await this.db.transaction(async (tx) => {
      await tx
        .update(users)
        .set({ deletedAt: new Date(), status: 'disabled' })
        .where(eq(users.id, studentId));
      await audit(tx, actor, 'student.deleted', 'user', studentId);
    });
    await this.sessions.revokeAllForUser(studentId);
  }

  /**
   * CSV import: "username, display name, class". All-or-nothing: if any row has a problem,
   * nobody is created and every problem is reported with its line number.
   */
  async importStudents(
    actor: SessionUser,
    csv: string,
    dryRun: boolean,
    log: Logger,
  ): Promise<{ created: number; rows: ImportRowResult[] }> {
    const table = parseCsv(csv);
    if (table.length === 0)
      throw new AppError(400, ErrorCode.VALIDATION_ERROR, 'The file is empty.');

    const header = table[0]!.map((h) =>
      h
        .trim()
        .toLowerCase()
        .replace(/[\s_]+/g, ''),
    );
    const hasHeader = header.includes('username');
    const col = (names: string[], fallback: number) => {
      const index = header.findIndex((h) => names.includes(h));
      return hasHeader ? index : fallback;
    };
    const usernameCol = col(['username', 'user'], 0);
    const nameCol = col(['displayname', 'name', 'fullname'], 1);
    const cohortCol = col(['cohort', 'class', 'group'], 2);
    const dataRows = (hasHeader ? table.slice(1) : table).map((cells, i) => ({
      line: i + (hasHeader ? 2 : 1),
      cells,
    }));
    if (dataRows.length > MAX_IMPORT_ROWS) {
      throw new AppError(
        400,
        ErrorCode.VALIDATION_ERROR,
        `Import at most ${MAX_IMPORT_ROWS} students at a time.`,
      );
    }

    const cohortRows = await this.db
      .select({ id: cohorts.id, name: cohorts.name })
      .from(cohorts)
      .where(isNull(cohorts.deletedAt));
    const cohortByName = new Map(cohortRows.map((c) => [c.name.trim().toLowerCase(), c.id]));

    const rows: (ImportRowResult & { cohortId: string | null })[] = dataRows.map(
      ({ line, cells }) => {
        const username = (cells[usernameCol] ?? '').trim().toLowerCase();
        const displayName = (cells[nameCol] ?? '').trim();
        const cohort = cohortCol >= 0 ? (cells[cohortCol] ?? '').trim() : '';
        const problems: string[] = [];
        if (!USERNAME_PATTERN.test(username))
          problems.push('Username: 3–50 lowercase letters, numbers, . _ -');
        if (displayName.length === 0 || displayName.length > 80)
          problems.push('Display name: 1–80 characters');
        const cohortId = cohort ? (cohortByName.get(cohort.toLowerCase()) ?? null) : null;
        if (cohort && !cohortId) problems.push(`Unknown class "${cohort}"`);
        return { line, username, displayName, cohort: cohort || null, cohortId, problems };
      },
    );

    // Duplicates inside the file, and usernames already taken.
    const seen = new Map<string, number>();
    for (const row of rows) {
      const first = seen.get(row.username);
      if (first !== undefined) row.problems.push(`Same username as line ${first}`);
      else seen.set(row.username, row.line);
    }
    const usernames = rows.map((r) => r.username).filter((u) => USERNAME_PATTERN.test(u));
    if (usernames.length > 0) {
      const taken = await this.db
        .select({ username: users.username })
        .from(users)
        .where(and(inArray(users.username, usernames), isNull(users.deletedAt)));
      const takenSet = new Set(taken.map((t) => t.username));
      for (const row of rows)
        if (takenSet.has(row.username)) row.problems.push('Username already exists');
    }

    const clean = (r: (typeof rows)[number]): ImportRowResult => ({
      line: r.line,
      username: r.username,
      displayName: r.displayName,
      cohort: r.cohort,
      problems: r.problems,
      ...(r.temporaryPassword ? { temporaryPassword: r.temporaryPassword } : {}),
    });
    if (dryRun || rows.some((r) => r.problems.length > 0))
      return { created: 0, rows: rows.map(clean) };

    // Hash in parallel (Argon2 runs on worker threads), then insert everything in one transaction.
    for (const row of rows) row.temporaryPassword = generateTemporaryPassword();
    const hashes = await Promise.all(rows.map((r) => hashPassword(r.temporaryPassword!)));
    try {
      await this.db.transaction(async (tx) => {
        const created = await tx
          .insert(users)
          .values(
            rows.map((r, i) => ({
              username: r.username,
              displayName: r.displayName,
              passwordHash: hashes[i]!,
              roleId: roleId('STUDENT'),
              mustChangePassword: true,
            })),
          )
          .returning({ id: users.id, username: users.username });
        const idByName = new Map(created.map((c) => [c.username, c.id]));
        await tx
          .insert(students)
          .values(rows.map((r) => ({ userId: idByName.get(r.username)!, cohortId: r.cohortId })));
        await audit(tx, actor, 'students.imported', 'user', null, { count: rows.length });
      });
    } catch (err) {
      if (isUniqueViolation(err)) {
        throw new AppError(
          409,
          ErrorCode.CONFLICT,
          'Some usernames were taken while importing. Please try again.',
        );
      }
      throw err;
    }
    log.info(
      { event: 'admin.students_imported', actorId: actor.id, count: rows.length },
      'Students imported',
    );
    return { created: rows.length, rows: rows.map(clean) };
  }

  // ---------- Classes ----------

  async listCohorts(actor: SessionUser) {
    const scope =
      actor.role === 'ADMIN'
        ? undefined
        : inArray(
            cohorts.id,
            sql`(select ${teacherCohorts.cohortId} from ${teacherCohorts} where ${teacherCohorts.staffUserId} = ${actor.id})`,
          );
    return this.db
      .select({
        id: cohorts.id,
        name: cohorts.name,
        year: cohorts.year,
        students:
          sql<number>`(select count(*) from ${students} join ${users} on ${users.id} = ${students.userId}
          where ${students.cohortId} = ${cohorts.id} and ${users.deletedAt} is null)`.mapWith(
            Number,
          ),
      })
      .from(cohorts)
      .where(and(isNull(cohorts.deletedAt), scope))
      .orderBy(asc(cohorts.year), asc(cohorts.name));
  }

  async createCohort(actor: SessionUser, input: z.infer<typeof createCohortSchema>) {
    const courseId = input.courseId ?? (await this.defaultCourseId());
    try {
      return await this.db.transaction(async (tx) => {
        const [row] = await tx
          .insert(cohorts)
          .values({ name: input.name, year: input.year, courseId })
          .returning();
        await audit(tx, actor, 'cohort.created', 'cohort', row!.id, { name: input.name });
        return row!;
      });
    } catch (err) {
      if (isUniqueViolation(err))
        throw new AppError(409, ErrorCode.CONFLICT, 'A class with this name already exists.');
      throw err;
    }
  }

  // ---------- Staff ----------

  async listStaff() {
    const rows = await this.db
      .select({
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        roleId: users.roleId,
        status: users.status,
        lastLoginAt: users.lastLoginAt,
        cohortCount:
          sql<number>`(select count(*) from ${teacherCohorts} where ${teacherCohorts.staffUserId} = ${users.id})`.mapWith(
            Number,
          ),
      })
      .from(staff)
      .innerJoin(users, eq(users.id, staff.userId))
      .where(isNull(users.deletedAt))
      .orderBy(asc(users.displayName));
    return rows.map(({ roleId: id, ...r }) => ({
      ...r,
      role: ROLE_SEEDS.find((x) => x.id === id)!.code,
    }));
  }

  async createStaff(
    actor: SessionUser,
    input: z.infer<typeof createStaffSchema>,
  ): Promise<CreatedAccount> {
    for (const id of input.cohortIds) await this.requireCohort(id);
    const temporaryPassword = generateTemporaryPassword();
    const passwordHash = await hashPassword(temporaryPassword);
    try {
      const id = await this.db.transaction(async (tx) => {
        const [user] = await tx
          .insert(users)
          .values({
            username: input.username,
            displayName: input.displayName,
            passwordHash,
            roleId: roleId(input.role),
            mustChangePassword: true,
          })
          .returning({ id: users.id });
        await tx.insert(staff).values({ userId: user!.id });
        if (input.cohortIds.length > 0) {
          await tx
            .insert(teacherCohorts)
            .values(input.cohortIds.map((cohortId) => ({ staffUserId: user!.id, cohortId })));
        }
        await audit(tx, actor, 'staff.created', 'user', user!.id, {
          username: input.username,
          role: input.role,
        });
        return user!.id;
      });
      return { id, username: input.username, temporaryPassword };
    } catch (err) {
      if (isUniqueViolation(err)) throw usernameTaken(input.username);
      throw err;
    }
  }

  // ---------- helpers ----------

  private async requireStudent(id: string) {
    const [row] = await this.db
      .select({ id: students.userId })
      .from(students)
      .innerJoin(users, eq(users.id, students.userId))
      .where(and(eq(students.userId, id), isNull(users.deletedAt)));
    if (!row) throw AppError.notFound('STUDENT_NOT_FOUND', 'Student not found');
  }

  private async requireCohort(id: string) {
    const [row] = await this.db
      .select({ n: count() })
      .from(cohorts)
      .where(and(eq(cohorts.id, id), isNull(cohorts.deletedAt)));
    if (!row?.n) throw AppError.notFound('COHORT_NOT_FOUND', 'Class not found');
  }

  private async defaultCourseId() {
    const [course] = await this.db
      .select({ id: courses.id })
      .from(courses)
      .where(isNull(courses.deletedAt))
      .orderBy(asc(courses.createdAt))
      .limit(1);
    if (!course) throw AppError.notFound('COURSE_NOT_FOUND', 'Create a course first');
    return course.id;
  }
}

const usernameTaken = (username: string) =>
  new AppError(409, ErrorCode.CONFLICT, `The username "${username}" is already taken.`);
