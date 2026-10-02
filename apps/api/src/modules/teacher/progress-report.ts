import { and, eq, ilike, isNull, or, sql, type SQL } from 'drizzle-orm';
import {
  commitmentScore,
  COMMITMENT_TARGETS,
  COMMITMENT_WEIGHTS,
  COMMITMENT_WINDOW_DAYS,
  INACTIVE_AFTER_DAYS,
  type LocalizedText,
  type PageMeta,
  type ProgressListQuery,
  type ProgressReport,
  type ProgressWorld,
  type StudentProgressRow,
} from '@itstarter/shared';
import type { Database } from '../../db/client';
import { students, users } from '../../db/schema';
import { localDate } from '../../engine/streak';
import type { SessionUser } from '../auth/sessions';
import { studentScope } from './service';

type Actor = Pick<SessionUser, 'id' | 'role'>;

/** Reports count days in the school's time zone, like streaks and analytics. */
const TIME_ZONE = 'Asia/Phnom_Penh';
/** CSV export limit (a whole school fits easily). */
const EXPORT_LIMIT = 5000;

/** Lessons students can see: published, in a published world of a published course. */
const PUBLISHED_LESSONS = sql`select l.id, l.world_id, l.title from lessons l
  join worlds w on w.id = l.world_id and w.status = 'published' and w.deleted_at is null
  join courses c on c.id = w.course_id and c.status = 'published' and c.deleted_at is null
  where l.status = 'published' and l.deleted_at is null`;

/** sort → SQL expression. Values are fixed here, never taken from the request. */
const SORT_COLUMNS: Record<ProgressListQuery['sort'], SQL> = {
  name: sql`u.display_name`,
  progress: sql`t.completed`,
  score: sql`t.score`,
  // Same formula as commitmentScore() (shared/performance.ts), for sorting. The numbers are
  // constants from our code (never from the request), written straight into the SQL.
  commitment: sql.raw(
    `(${COMMITMENT_WEIGHTS.consistency} * least(1, coalesce(h.days, 0) / ${COMMITMENT_TARGETS.activeDays}.0)` +
      ` + ${COMMITMENT_WEIGHTS.effort} * least(1, round(coalesce(h.seconds, 0) / 60.0) / ${COMMITMENT_TARGETS.minutes}.0)` +
      ` + ${COMMITMENT_WEIGHTS.progress} * least(1, coalesce(h.lessons, 0) / ${COMMITMENT_TARGETS.lessons}.0))`,
  ),
  xp: sql`s.xp_total`,
  lastActive: sql`s.last_active_date`,
};

const escapeLike = (value: string) => value.replace(/[\\%_]/g, (c) => `\\${c}`);

interface RawRow {
  id: string;
  username: string;
  display_name: string;
  cohort_name: string | null;
  status: 'active' | 'disabled';
  xp_total: number;
  level: number;
  current_streak: number;
  last_active: string | null;
  completed: number;
  score: number | null;
  worlds: Record<string, number>;
  current: { id: string; title: LocalizedText } | null;
  habit_days: number | null;
  habit_seconds: number | null;
  habit_lessons: number | null;
}

/**
 * Every student's learning progress in one table: overall and per-world completion, average
 * score, XP, streak, last activity and the lesson they are on. Teachers only ever see their own
 * classes (same `studentScope` as the student list).
 */
export class ProgressReportService {
  constructor(private readonly db: Database) {}

  async report(
    actor: Actor,
    query: ProgressListQuery,
  ): Promise<{ report: ProgressReport; meta: PageMeta }> {
    const scope = this.scope(actor, query);
    const [worlds, summaryRows, totalRows, rows] = await Promise.all([
      this.worlds(),
      this.summary(scope),
      this.rows<{ total: number }>(
        sql`with scope as (${scope}) select count(*)::int as total from scope`,
      ),
      this.page(scope, query, query.pageSize, (query.page - 1) * query.pageSize),
    ]);
    const lessonsTotal = worlds.reduce((n, w) => n + w.lessonsTotal, 0);
    return {
      report: {
        worlds,
        summary: summaryRows,
        rows: rows.map((r) => toRow(r, lessonsTotal)),
      },
      meta: { page: query.page, pageSize: query.pageSize, total: totalRows[0]?.total ?? 0 },
    };
  }

  /** The same report as CSV (all matching students), ready for Excel. */
  async exportCsv(actor: Actor, query: ProgressListQuery, lang: 'en' | 'km'): Promise<string> {
    const scope = this.scope(actor, query);
    const [worlds, rows] = await Promise.all([
      this.worlds(),
      this.page(scope, query, EXPORT_LIMIT, 0),
    ]);
    const lessonsTotal = worlds.reduce((n, w) => n + w.lessonsTotal, 0);
    const title = (text: LocalizedText) => (lang === 'km' && text.km ? text.km : text.en);
    const header = [
      'Name',
      'Username',
      'Class',
      'Status',
      'Lessons completed',
      'Lessons total',
      'Progress %',
      'Average score %',
      'XP',
      'Level',
      'Commitment %',
      'Active days (4 weeks)',
      'Minutes (4 weeks)',
      'Streak (days)',
      'Last active',
      'Working on',
      ...worlds.map((w) => `${title(w.title)} (/${w.lessonsTotal})`),
    ];
    const lines = rows.map((raw) => {
      const r = toRow(raw, lessonsTotal);
      return [
        r.displayName,
        r.username,
        r.cohortName ?? '',
        r.status,
        r.lessonsCompleted,
        r.lessonsTotal,
        r.percent,
        r.averageScore ?? '',
        r.xpTotal,
        r.level,
        r.commitment.score,
        r.commitment.activeDays,
        r.commitment.minutes,
        r.currentStreak,
        r.lastActiveDate ?? '',
        r.currentLesson ? title(r.currentLesson.title) : '',
        ...worlds.map((w) => r.worlds[w.id] ?? 0),
      ];
    });
    // BOM so Excel opens Khmer text correctly; CRLF line ends for Windows.
    return `\uFEFF${[header, ...lines].map((cells) => cells.map(csvCell).join(',')).join('\r\n')}\r\n`;
  }

  async worlds(): Promise<ProgressWorld[]> {
    const rows = await this.rows<{
      id: string;
      slug: string;
      title: LocalizedText;
      icon: string;
      color: string;
      lessons: number;
    }>(sql`with pub as (${PUBLISHED_LESSONS})
      select w.id, w.slug, w.title, w.icon, w.color, count(pub.id)::int as lessons
      from worlds w
      join courses c on c.id = w.course_id
      join pub on pub.world_id = w.id
      group by w.id, c.id
      order by c.created_at, w.position`);
    return rows.map(({ lessons, ...w }) => ({ ...w, lessonsTotal: lessons }));
  }

  /** Students the report covers, as a subquery (filters + teacher scope). */
  private scope(actor: Actor, query: ProgressListQuery): SQL {
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
      query.cohortId === 'none'
        ? isNull(students.cohortId)
        : query.cohortId
          ? eq(students.cohortId, query.cohortId)
          : undefined,
      query.status ? eq(users.status, query.status) : undefined,
    );
    return sql`select ${students.userId} as user_id from ${students}
      inner join ${users} on ${users.id} = ${students.userId} where ${where}`;
  }

  private async summary(scope: SQL) {
    const today = localDate(new Date(), TIME_ZONE);
    const [row] = await this.rows<{
      students: number;
      average_percent: number | null;
      active: number;
      not_started: number;
    }>(sql`with pub as (${PUBLISHED_LESSONS}), scope as (${scope}),
      per as (
        select sc.user_id, s.last_active_date,
          (select count(*) from student_lesson_progress p join pub on pub.id = p.lesson_id
            where p.student_id = sc.user_id and p.status = 'completed') as completed,
          exists (select 1 from student_lesson_progress p where p.student_id = sc.user_id) as started
        from scope sc join students s on s.user_id = sc.user_id
      )
      select count(*)::int as students,
        round(avg(completed) * 100.0 / nullif((select count(*) from pub), 0))::int as average_percent,
        (count(*) filter (where last_active_date >= ${today}::date - ${INACTIVE_AFTER_DAYS - 1}::int))::int as active,
        (count(*) filter (where not started))::int as not_started
      from per`);
    const studentsCount = row?.students ?? 0;
    const active = row?.active ?? 0;
    return {
      students: studentsCount,
      averagePercent: row?.average_percent ?? 0,
      activeThisWeek: active,
      notStarted: row?.not_started ?? 0,
      inactive: studentsCount - active,
    };
  }

  private page(scope: SQL, query: ProgressListQuery, limit: number, offset: number) {
    const dir = query.dir ?? (query.sort === 'name' ? 'asc' : 'desc');
    const order = sql`${SORT_COLUMNS[query.sort]} ${sql.raw(dir === 'asc' ? 'asc' : 'desc')} nulls last`;
    const today = localDate(new Date(), TIME_ZONE);
    return this.rows<RawRow>(sql`with pub as (${PUBLISHED_LESSONS}), scope as (${scope}),
      habit as (
        select d.student_id, count(*)::int as days,
          coalesce(sum(d.seconds_active), 0)::int as seconds,
          coalesce(sum(d.lessons_completed), 0)::int as lessons
        from student_daily_activity d
        where d.student_id in (select user_id from scope)
          and d.day > ${today}::date - ${COMMITMENT_WINDOW_DAYS}::int and d.day <= ${today}::date
        group by d.student_id
      ),
      done as (
        select p.student_id, pub.world_id,
          (count(*) filter (where p.status = 'completed'))::int as completed
        from student_lesson_progress p
        join pub on pub.id = p.lesson_id
        where p.student_id in (select user_id from scope)
        group by p.student_id, pub.world_id
      ),
      t as (
        select sc.user_id,
          coalesce((select sum(d.completed) from done d where d.student_id = sc.user_id), 0)::int
            as completed,
          (select round(avg(p.best_score))::int from student_lesson_progress p
            join pub on pub.id = p.lesson_id
            where p.student_id = sc.user_id and p.status = 'completed' and p.best_score is not null)
            as score,
          coalesce((select json_object_agg(d.world_id, d.completed) from done d
            where d.student_id = sc.user_id), '{}'::json) as worlds,
          (select json_build_object('id', pub.id, 'title', pub.title)
            from student_lesson_progress p join pub on pub.id = p.lesson_id
            where p.student_id = sc.user_id and p.status = 'in_progress'
            order by p.updated_at desc limit 1) as current
        from scope sc
      )
      select u.id, u.username, u.display_name, c.name as cohort_name, u.status,
        s.xp_total, s.level, s.current_streak,
        to_char(s.last_active_date, 'YYYY-MM-DD') as last_active,
        t.completed, t.score, t.worlds, t.current,
        h.days as habit_days, h.seconds as habit_seconds, h.lessons as habit_lessons
      from t
      left join habit h on h.student_id = t.user_id
      join users u on u.id = t.user_id
      join students s on s.user_id = t.user_id
      left join cohorts c on c.id = s.cohort_id
      order by ${order}, u.display_name asc, u.id asc
      limit ${limit} offset ${offset}`);
  }

  private async rows<T>(query: SQL): Promise<T[]> {
    return (await this.db.execute(query)).rows as T[];
  }
}

function toRow(r: RawRow, lessonsTotal: number): StudentProgressRow {
  return {
    id: r.id,
    username: r.username,
    displayName: r.display_name,
    cohortName: r.cohort_name,
    status: r.status,
    xpTotal: r.xp_total,
    level: r.level,
    currentStreak: r.current_streak,
    lastActiveDate: r.last_active,
    lessonsCompleted: r.completed,
    lessonsTotal,
    percent: lessonsTotal > 0 ? Math.round((r.completed / lessonsTotal) * 100) : 0,
    averageScore: r.score,
    worlds: r.worlds,
    currentLesson: r.current,
    commitment: commitmentScore({
      activeDays: r.habit_days ?? 0,
      minutes: Math.round((r.habit_seconds ?? 0) / 60),
      lessons: r.habit_lessons ?? 0,
    }),
  };
}

/**
 * One CSV cell. Quotes when needed, and defuses spreadsheet formulas: a name like "=HYPERLINK(...)"
 * must never run in Excel (CSV/formula injection), so such cells start with an apostrophe.
 */
export function csvCell(value: string | number): string {
  let text = String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}
