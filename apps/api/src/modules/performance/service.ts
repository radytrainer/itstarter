import { and, eq, isNull, sql, type SQL } from 'drizzle-orm';
import { commitmentScore, type LocalizedText, type StudentPerformance } from '@itstarter/shared';
import type { Database } from '../../db/client';
import { students, users } from '../../db/schema';
import {
  accuracy,
  addDays,
  lastDays,
  lastWeeks,
  skillBreakdown,
  weekStart,
  windowTotals,
  WEEKS_SHOWN,
  type DailyRow,
  type FirstAnswer,
} from '../../engine/performance';
import { localDate } from '../../engine/streak';
import { AppError } from '../../lib/errors';
import type { SessionUser } from '../auth/sessions';
import { studentScope } from '../teacher/service';

const GAME_KINDS = sql`('catch', 'memory', 'robot', 'word_builder')`;

/** Lessons students can see: published, in a published world of a published course. */
const PUBLISHED_LESSONS = sql`select l.id, l.world_id from lessons l
  join worlds w on w.id = l.world_id and w.status = 'published' and w.deleted_at is null
  join courses c on c.id = w.course_id and c.status = 'published' and c.deleted_at is null
  where l.status = 'published' and l.deleted_at is null`;

/**
 * One student's performance and commitment: how regularly they learn (days, minutes, lessons
 * over 4 weeks), how well (first-try accuracy per world, skill and week) and their trend.
 * Students see their own; teachers only their classes; admins everyone.
 */
export class PerformanceService {
  constructor(private readonly db: Database) {}

  /** For staff: other classes (or staff accounts) → 404, like the student detail page. */
  async forStaff(actor: Pick<SessionUser, 'id' | 'role'>, studentId: string) {
    const [row] = await this.db
      .select({ id: students.userId })
      .from(students)
      .innerJoin(users, eq(users.id, students.userId))
      .where(and(eq(students.userId, studentId), isNull(users.deletedAt), studentScope(actor)));
    if (!row) throw AppError.notFound('STUDENT_NOT_FOUND', 'Student not found');
    return this.forStudent(studentId);
  }

  async forStudent(studentId: string): Promise<StudentPerformance> {
    const [student] = await this.db.select().from(students).where(eq(students.userId, studentId));
    if (!student) throw AppError.notFound('STUDENT_NOT_FOUND', 'Student not found');
    const tz = student.timezone;
    const today = localDate(new Date(), tz);
    const since = addDays(weekStart(today), -(WEEKS_SHOWN - 1) * 7);

    const [daily, firstAnswers, worldRows, [totals]] = await Promise.all([
      this.rows<DailyRow>(sql`select to_char(day, 'YYYY-MM-DD') as day,
          seconds_active as seconds, xp_earned as xp, lessons_completed as lessons
        from student_daily_activity where student_id = ${studentId} and day >= ${since}::date`),
      this.rows<FirstAnswer & { world_id: string }>(sql`select day, kind, world_id, correct from (
          select distinct on (a.question_id)
            to_char((a.created_at at time zone ${tz})::date, 'YYYY-MM-DD') as day,
            q.kind, l.world_id, a.is_correct as correct
          from student_activity_attempts a
          join questions q on q.id = a.question_id
          join activities ac on ac.id = a.activity_id
          join lessons l on l.id = ac.lesson_id
          where a.student_id = ${studentId} and a.is_correct is not null
          order by a.question_id, a.created_at
        ) first`),
      this.rows<{
        id: string;
        title: LocalizedText;
        icon: string;
        color: string;
        total: number;
        completed: number;
        seconds: number;
      }>(sql`with pub as (${PUBLISHED_LESSONS})
        select w.id, w.title, w.icon, w.color, count(pub.id)::int as total,
          (count(p.lesson_id) filter (where p.status = 'completed'))::int as completed,
          coalesce(sum(p.time_spent_seconds), 0)::int as seconds
        from worlds w
        join courses c on c.id = w.course_id
        join pub on pub.world_id = w.id
        left join student_lesson_progress p on p.lesson_id = pub.id and p.student_id = ${studentId}
        group by w.id, c.id
        order by c.created_at, w.position`),
      this.rows<{ seconds: number; lessons: number; games_won: number }>(sql`select
          coalesce((select sum(seconds_active) from student_daily_activity
            where student_id = ${studentId}), 0)::int as seconds,
          (select count(*) from student_lesson_progress
            where student_id = ${studentId} and status = 'completed')::int as lessons,
          (select count(distinct a.question_id) from student_activity_attempts a
            join questions q on q.id = a.question_id
            where a.student_id = ${studentId} and a.is_correct and q.kind in ${GAME_KINDS})::int
            as games_won`),
    ]);

    const answers: FirstAnswer[] = firstAnswers.map((a) => ({
      day: a.day,
      kind: a.kind,
      worldId: a.world_id,
      correct: a.correct,
    }));

    return {
      commitment: commitmentScore(windowTotals(daily, today)),
      currentStreak: student.currentStreak,
      longestStreak: student.longestStreak,
      lastActiveDate: student.lastActiveDate,
      totals: {
        lessonsCompleted: totals?.lessons ?? 0,
        answered: answers.length,
        accuracy: accuracy(answers),
        minutes: Math.round((totals?.seconds ?? 0) / 60),
        gamesWon: totals?.games_won ?? 0,
      },
      days: lastDays(daily, today),
      weeks: lastWeeks(daily, answers, today),
      worlds: worldRows.map((w) => {
        const mine = answers.filter((a) => a.worldId === w.id);
        return {
          id: w.id,
          title: w.title,
          icon: w.icon,
          color: w.color,
          lessonsCompleted: w.completed,
          lessonsTotal: w.total,
          answered: mine.length,
          accuracy: accuracy(mine),
          minutes: Math.round(w.seconds / 60),
        };
      }),
      skills: skillBreakdown(answers),
    };
  }

  private async rows<T>(query: SQL): Promise<T[]> {
    return (await this.db.execute(query)).rows as T[];
  }
}
