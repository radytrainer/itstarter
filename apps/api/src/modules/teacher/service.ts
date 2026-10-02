import { and, asc, count, eq, ilike, inArray, isNull, or, sql, type SQL } from 'drizzle-orm';
import type { AwardView, Dashboard, LocalizedText, PageMeta } from '@itstarter/shared';
import type { ProgressService } from '../progress/service';
import type { Database } from '../../db/client';
import {
  auditLogs,
  cohorts,
  lessons,
  studentLessonProgress,
  students,
  teacherCohorts,
  users,
  worlds,
} from '../../db/schema';
import { AppError } from '../../lib/errors';
import { hashPassword } from '../../lib/password';
import { generateTemporaryPassword } from '../../lib/temp-password';
import { setPassword } from '../auth/repository';
import type { SessionService, SessionUser } from '../auth/sessions';

export interface StudentDetail {
  id: string;
  username: string;
  displayName: string;
  status: 'active' | 'disabled';
  mustChangePassword: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  cohortId: string | null;
  cohortName: string | null;
  dashboard: Dashboard;
  achievements: AwardView[];
  lessons: {
    lessonId: string;
    title: LocalizedText;
    worldTitle: LocalizedText;
    status: 'in_progress' | 'completed';
    bestScore: number | null;
    attempts: number;
    timeSpentSeconds: number;
    completedAt: Date | null;
    updatedAt: Date;
  }[];
}

export interface StudentSummary {
  id: string;
  username: string;
  displayName: string;
  cohortName: string | null;
  xpTotal: number;
  level: number;
  lastActiveDate: string | null;
  status: 'active' | 'disabled';
}

interface Logger {
  info(obj: object, msg: string): void;
}

const escapeLike = (value: string) => value.replace(/[\\%_]/g, (c) => `\\${c}`);

/**
 * Which students the actor may see: ADMIN → all; TEACHER → only students in their cohorts.
 * Every teacher query goes through this one function so the rule can't be forgotten.
 */
export function studentScope(actor: Pick<SessionUser, 'id' | 'role'>): SQL | undefined {
  if (actor.role === 'ADMIN') return undefined;
  return inArray(
    students.cohortId,
    sql`(select ${teacherCohorts.cohortId} from ${teacherCohorts} where ${teacherCohorts.staffUserId} = ${actor.id})`,
  );
}

export class TeacherService {
  constructor(
    private readonly db: Database,
    private readonly sessions: SessionService,
    private readonly progress: ProgressService,
  ) {}

  /** Everything a teacher needs about one student. Same scope rule: other classes → 404. */
  async studentDetail(actor: SessionUser, studentId: string): Promise<StudentDetail> {
    const [row] = await this.db
      .select({
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        status: users.status,
        mustChangePassword: users.mustChangePassword,
        lastLoginAt: users.lastLoginAt,
        createdAt: users.createdAt,
        cohortId: students.cohortId,
        cohortName: cohorts.name,
      })
      .from(students)
      .innerJoin(users, eq(users.id, students.userId))
      .leftJoin(cohorts, eq(cohorts.id, students.cohortId))
      .where(and(eq(students.userId, studentId), isNull(users.deletedAt), studentScope(actor)));
    if (!row) throw AppError.notFound('STUDENT_NOT_FOUND', 'Student not found');

    const ref = { id: row.id, displayName: row.displayName };
    const [dashboard, achievements, lessonRows] = await Promise.all([
      this.progress.dashboard(ref),
      this.progress.achievements(ref),
      this.db
        .select({
          lessonId: lessons.id,
          title: lessons.title,
          worldTitle: worlds.title,
          status: studentLessonProgress.status,
          bestScore: studentLessonProgress.bestScore,
          attempts: studentLessonProgress.attempts,
          timeSpentSeconds: studentLessonProgress.timeSpentSeconds,
          completedAt: studentLessonProgress.completedAt,
          updatedAt: studentLessonProgress.updatedAt,
        })
        .from(studentLessonProgress)
        .innerJoin(lessons, eq(lessons.id, studentLessonProgress.lessonId))
        .innerJoin(worlds, eq(worlds.id, lessons.worldId))
        .where(eq(studentLessonProgress.studentId, studentId))
        .orderBy(asc(worlds.position), asc(lessons.position)),
    ]);
    return { ...row, dashboard, achievements, lessons: lessonRows };
  }

  async listStudents(
    actor: SessionUser,
    query: {
      page: number;
      pageSize: number;
      q?: string;
      cohortId?: string;
      status?: 'active' | 'disabled';
    },
  ): Promise<{ items: StudentSummary[]; meta: PageMeta }> {
    const search = query.q
      ? or(
          ilike(users.username, `%${escapeLike(query.q)}%`),
          ilike(users.displayName, `%${escapeLike(query.q)}%`),
        )
      : undefined;
    const where = and(
      isNull(users.deletedAt),
      studentScope(actor),
      search,
      query.cohortId ? eq(students.cohortId, query.cohortId) : undefined,
      query.status ? eq(users.status, query.status) : undefined,
    );

    const [items, [total]] = await Promise.all([
      this.db
        .select({
          id: users.id,
          username: users.username,
          displayName: users.displayName,
          cohortName: cohorts.name,
          xpTotal: students.xpTotal,
          level: students.level,
          lastActiveDate: students.lastActiveDate,
          status: users.status,
        })
        .from(students)
        .innerJoin(users, eq(users.id, students.userId))
        .leftJoin(cohorts, eq(cohorts.id, students.cohortId))
        .where(where)
        .orderBy(asc(users.displayName), asc(users.username))
        .limit(query.pageSize)
        .offset((query.page - 1) * query.pageSize),
      this.db
        .select({ value: count() })
        .from(students)
        .innerJoin(users, eq(users.id, students.userId))
        .where(where),
    ]);

    return {
      items,
      meta: { page: query.page, pageSize: query.pageSize, total: total?.value ?? 0 },
    };
  }

  /**
   * Gives the student a one-time password they must change at next login and signs them out
   * everywhere. Out-of-scope or unknown students get the same 404 (no existence leak).
   */
  async resetStudentPassword(
    actor: SessionUser,
    studentId: string,
    log: Logger,
  ): Promise<{ username: string; temporaryPassword: string }> {
    const [student] = await this.db
      .select({ id: users.id, username: users.username })
      .from(students)
      .innerJoin(users, eq(users.id, students.userId))
      .where(and(eq(students.userId, studentId), isNull(users.deletedAt), studentScope(actor)));
    if (!student) throw AppError.notFound('STUDENT_NOT_FOUND', 'Student not found');

    const temporaryPassword = generateTemporaryPassword();
    const passwordHash = await hashPassword(temporaryPassword);

    await this.db.transaction(async (tx) => {
      await setPassword(tx, student.id, passwordHash, true);
      await tx.insert(auditLogs).values({
        actorUserId: actor.id,
        action: 'student.password_reset',
        entityType: 'user',
        entityId: student.id,
        metadata: { actorRole: actor.role },
      });
    });
    await this.sessions.revokeAllForUser(student.id);

    log.info(
      { event: 'admin.student_password_reset', actorId: actor.id, studentId: student.id },
      'Student password reset',
    );
    return { username: student.username, temporaryPassword };
  }
}
