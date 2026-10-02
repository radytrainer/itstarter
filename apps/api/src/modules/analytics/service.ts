import { sql, type SQL } from 'drizzle-orm';
import type {
  ActivityStats,
  AnalyticsActivities,
  AnalyticsEngagement,
  AnalyticsOverview,
  AnalyticsQuery,
  AnalyticsWorlds,
  LocalizedText,
  WorldStats,
} from '@itstarter/shared';
import type { Database } from '../../db/client';
import { countBuckets, lessonHighlights, MIN_SAMPLE, percent } from '../../engine/analytics';
import { localDate } from '../../engine/streak';
import type { Cache } from '../../lib/cache';
import { AppError } from '../../lib/errors';
import type { SessionUser } from '../auth/sessions';

/** Reports count days in the school's time zone, like streaks do. */
const REPORT_TIME_ZONE = 'Asia/Phnom_Penh';
/** Aggregates are expensive and don't need to be live: 5 minutes old is fine for a report. */
const CACHE_SECONDS = 5 * 60;
const HARDEST_ACTIVITIES = 10;

type Actor = Pick<SessionUser, 'id' | 'role'>;

/**
 * Students the report covers: ADMIN → everyone (or one class); TEACHER → only their classes.
 * Every query below filters through this, so a teacher can never see another class's numbers.
 */
function scopedStudents(actor: Actor, cohortId: string | undefined): SQL {
  return sql`select s.user_id from students s join users u on u.id = s.user_id
    where u.deleted_at is null
    ${cohortId ? sql`and s.cohort_id = ${cohortId}` : sql``}
    ${
      actor.role === 'ADMIN'
        ? sql``
        : sql`and s.cohort_id in (select cohort_id from teacher_cohorts where staff_user_id = ${actor.id})`
    }`;
}

/** Lessons students can actually see: published, in a published world of a published course. */
const PUBLISHED_LESSONS = sql`select l.id, l.world_id from lessons l
  join worlds w on w.id = l.world_id and w.status = 'published' and w.deleted_at is null
  join courses c on c.id = w.course_id and c.status = 'published' and c.deleted_at is null
  where l.status = 'published' and l.deleted_at is null`;

export class AnalyticsService {
  constructor(
    private readonly db: Database,
    private readonly cache: Cache,
  ) {}

  overview(actor: Actor, query: AnalyticsQuery): Promise<AnalyticsOverview> {
    return this.cached('overview', actor, query, async (scope) => {
      const start = windowStart(query.days);
      const [totals] = await this.rows<{
        total: number;
        active: number;
        published: number;
        avg_score: number | null;
        xp_total: number;
        xp_avg: number;
      }>(sql`with scope as (${scope}), pub as (${PUBLISHED_LESSONS})
        select
          (select count(*)::int from scope) as total,
          (select count(distinct d.student_id)::int from student_daily_activity d
            where d.student_id in (select user_id from scope) and d.day >= ${start}::date) as active,
          (select count(*)::int from pub) as published,
          (select round(avg(p.best_score))::int from student_lesson_progress p
            where p.status = 'completed' and p.best_score is not null
              and p.student_id in (select user_id from scope)
              and p.lesson_id in (select id from pub)) as avg_score,
          (select coalesce(sum(s.xp_total), 0)::int from students s
            where s.user_id in (select user_id from scope)) as xp_total,
          (select coalesce(round(avg(s.xp_total)), 0)::int from students s
            where s.user_id in (select user_id from scope)) as xp_avg`);

      const [perStudent, quiz, badges] = await Promise.all([
        this.rows<{
          started: number;
          done: number;
        }>(sql`with scope as (${scope}), pub as (${PUBLISHED_LESSONS})
          select count(p.lesson_id)::int as started,
                 (count(p.lesson_id) filter (where p.status = 'completed'))::int as done
          from scope sc
          left join student_lesson_progress p
            on p.student_id = sc.user_id and p.lesson_id in (select id from pub)
          group by sc.user_id`),
        this.rows<{
          answers: number;
          firsts: number;
          first_ok: number;
        }>(sql`with scope as (${scope}),
          answered as (
            select a.student_id, a.question_id, a.is_correct, a.created_at
            from student_activity_attempts a
            where a.is_correct is not null and a.student_id in (select user_id from scope)
          ),
          firsts as (
            select distinct on (student_id, question_id) is_correct from answered
            where question_id is not null
            order by student_id, question_id, created_at
          )
          select (select count(*)::int from answered) as answers,
                 (select count(*)::int from firsts) as firsts,
                 (select count(*)::int from firsts where is_correct) as first_ok`),
        this.rows<{
          id: string;
          code: string;
          name: LocalizedText;
          icon: string;
          students: number;
        }>(
          sql`with scope as (${scope})
          select b.id, b.code, b.name, b.icon, count(sb.student_id)::int as students
          from badges b
          left join student_badges sb
            on sb.badge_id = b.id and sb.student_id in (select user_id from scope)
          where b.status = 'published'
          group by b.id
          order by b.position, b.code`,
        ),
      ]);

      const t = totals!;
      const completed = perStudent.reduce((n, s) => n + s.done, 0);
      const q = quiz[0]!;
      return {
        generatedAt: new Date().toISOString(),
        days: query.days,
        students: {
          total: t.total,
          active: t.active,
          notStarted: perStudent.filter((s) => s.started === 0).length,
        },
        lessons: {
          published: t.published,
          completed,
          completionPercent: percent(completed, t.total * t.published),
        },
        quiz: {
          averageScore: t.avg_score,
          firstTryCorrectPercent: q.firsts > 0 ? percent(q.first_ok, q.firsts) : null,
          answers: q.answers,
        },
        xp: { total: t.xp_total, average: t.xp_avg },
        progress: countBuckets(perStudent.map((s) => percent(s.done, t.published))),
        badges: badges.map((b) => ({
          badgeId: b.id,
          code: b.code,
          name: b.name,
          icon: b.icon,
          students: b.students,
        })),
      };
    });
  }

  engagement(actor: Actor, query: AnalyticsQuery): Promise<AnalyticsEngagement> {
    return this.cached('engagement', actor, query, async (scope) => {
      const today = localDate(new Date(), REPORT_TIME_ZONE);
      const start = windowStart(query.days);
      const [days, streak] = await Promise.all([
        this.rows<{
          day: string;
          active: number;
          lessons: number;
          activities: number;
          seconds: number;
          xp: number;
        }>(sql`with scope as (${scope})
          select to_char(g.day, 'YYYY-MM-DD') as day,
                 count(d.student_id)::int as active,
                 coalesce(sum(d.lessons_completed), 0)::int as lessons,
                 coalesce(sum(d.activities_completed), 0)::int as activities,
                 coalesce(sum(d.seconds_active), 0)::int as seconds,
                 coalesce(sum(d.xp_earned), 0)::int as xp
          from generate_series(${start}::date, ${today}::date, interval '1 day') as g(day)
          left join student_daily_activity d
            on d.day = g.day::date and d.student_id in (select user_id from scope)
          group by g.day
          order by g.day`),
        // A streak is only alive if the student learned today or yesterday.
        this.rows<{ on_streak: number }>(sql`with scope as (${scope})
          select count(*)::int as on_streak from students s
          where s.user_id in (select user_id from scope)
            and s.current_streak >= 3
            and s.last_active_date >= ${today}::date - 1`),
      ]);

      const activeDays = days.reduce((n, d) => n + d.active, 0);
      const seconds = days.reduce((n, d) => n + d.seconds, 0);
      return {
        generatedAt: new Date().toISOString(),
        days: days.map((d) => ({
          day: d.day,
          activeStudents: d.active,
          lessonsCompleted: d.lessons,
          activitiesCompleted: d.activities,
          minutes: Math.round(d.seconds / 60),
          xp: d.xp,
        })),
        averageMinutesPerActiveDay: activeDays > 0 ? Math.round(seconds / 60 / activeDays) : null,
        studentsOnStreak: streak[0]!.on_streak,
      };
    });
  }

  worlds(actor: Actor, query: AnalyticsQuery): Promise<AnalyticsWorlds> {
    return this.cached('worlds', actor, query, async (scope) => {
      const [lessonRows, worldRows, totalRows] = await Promise.all([
        this.rows<{
          world_id: string;
          world_slug: string;
          world_title: LocalizedText;
          icon: string;
          color: string;
          lesson_id: string;
          slug: string;
          title: LocalizedText;
          started: number;
          completed: number;
          avg_score: number | null;
          avg_minutes: number | null;
        }>(sql`with scope as (${scope})
          select w.id as world_id, w.slug as world_slug, w.title as world_title, w.icon, w.color,
                 l.id as lesson_id, l.slug, l.title,
                 count(p.student_id)::int as started,
                 (count(p.student_id) filter (where p.status = 'completed'))::int as completed,
                 round(avg(p.best_score) filter (where p.status = 'completed'))::int as avg_score,
                 round(avg(p.time_spent_seconds)
                   filter (where p.status = 'completed' and p.time_spent_seconds > 0) / 60.0, 1
                 )::float8 as avg_minutes
          from lessons l
          join worlds w on w.id = l.world_id and w.status = 'published' and w.deleted_at is null
          join courses c on c.id = w.course_id and c.status = 'published' and c.deleted_at is null
          left join student_lesson_progress p
            on p.lesson_id = l.id and p.student_id in (select user_id from scope)
          where l.status = 'published' and l.deleted_at is null
          group by c.id, w.id, l.id
          order by c.created_at, w.position, l.position`),
        this.rows<{
          world_id: string;
          started: number;
          finished: number;
          avg_score: number | null;
        }>(sql`with scope as (${scope}), pub as (${PUBLISHED_LESSONS}),
          per_student as (
            select pub.world_id, p.student_id,
                   count(*) filter (where p.status = 'completed') as done,
                   avg(p.best_score) filter (where p.status = 'completed') as score
            from student_lesson_progress p
            join pub on pub.id = p.lesson_id
            where p.student_id in (select user_id from scope)
            group by pub.world_id, p.student_id
          ),
          sizes as (select world_id, count(*) as n from pub group by world_id)
          select ps.world_id,
                 count(*)::int as started,
                 (count(*) filter (where ps.done = sizes.n))::int as finished,
                 round(avg(ps.score))::int as avg_score
          from per_student ps join sizes using (world_id)
          group by ps.world_id`),
        this.rows<{ total: number }>(
          sql`with scope as (${scope}) select count(*)::int as total from scope`,
        ),
      ]);

      const total = totalRows[0]!.total;
      const perWorld = new Map(worldRows.map((w) => [w.world_id, w]));
      const worlds: WorldStats[] = [];
      for (const row of lessonRows) {
        let world = worlds.at(-1);
        if (world?.worldId !== row.world_id) {
          const stats = perWorld.get(row.world_id);
          world = {
            worldId: row.world_id,
            slug: row.world_slug,
            title: row.world_title,
            icon: row.icon,
            color: row.color,
            lessonCount: 0,
            studentsStarted: stats?.started ?? 0,
            studentsFinished: stats?.finished ?? 0,
            completionPercent: 0,
            averageScore: stats?.avg_score ?? null,
            lessons: [],
          };
          worlds.push(world);
        }
        world.lessonCount += 1;
        world.lessons.push({
          lessonId: row.lesson_id,
          slug: row.slug,
          title: row.title,
          worldTitle: row.world_title,
          started: row.started,
          completed: row.completed,
          finishRate: row.started > 0 ? percent(row.completed, row.started) : null,
          averageScore: row.avg_score,
          averageMinutes: row.avg_minutes,
        });
      }
      for (const world of worlds) {
        const done = world.lessons.reduce((n, l) => n + l.completed, 0);
        world.completionPercent = percent(done, total * world.lessonCount);
      }

      return {
        generatedAt: new Date().toISOString(),
        worlds,
        ...lessonHighlights(worlds.flatMap((w) => w.lessons)),
      };
    });
  }

  activities(actor: Actor, query: AnalyticsQuery): Promise<AnalyticsActivities> {
    return this.cached('activities', actor, query, async (scope) => {
      const rows = await this.rows<{
        activity_id: string;
        lesson_id: string;
        type: string;
        title: LocalizedText | null;
        lesson_title: LocalizedText;
        world_title: LocalizedText;
        students: number;
        answers: number;
        first_pct: number;
        avg_tries: number;
      }>(sql`with scope as (${scope}), pub as (${PUBLISHED_LESSONS}),
        answered as (
          select a.activity_id, a.student_id, a.question_id, a.is_correct, a.created_at
          from student_activity_attempts a
          where a.is_correct is not null and a.question_id is not null
            and a.student_id in (select user_id from scope)
        ),
        firsts as (
          select distinct on (student_id, question_id) activity_id, is_correct from answered
          order by student_id, question_id, created_at
        ),
        first_stats as (
          select activity_id, count(*) as asked, count(*) filter (where is_correct) as first_ok
          from firsts group by activity_id
        ),
        totals as (
          select activity_id, count(*) as answers, count(distinct student_id) as students
          from answered group by activity_id
        )
        select ac.id as activity_id, ac.lesson_id, ac.type, ac.title,
               l.title as lesson_title, w.title as world_title,
               t.students::int, t.answers::int,
               round(100.0 * f.first_ok / f.asked)::int as first_pct,
               round(t.answers::numeric / f.asked, 1)::float8 as avg_tries
        from totals t
        join first_stats f using (activity_id)
        join activities ac on ac.id = t.activity_id and ac.deleted_at is null
        join pub on pub.id = ac.lesson_id
        join lessons l on l.id = ac.lesson_id
        join worlds w on w.id = l.world_id
        where t.students >= ${MIN_SAMPLE}
        order by first_pct, avg_tries desc, ac.id
        limit ${HARDEST_ACTIVITIES}`);

      const activities: ActivityStats[] = rows.map((r) => ({
        activityId: r.activity_id,
        lessonId: r.lesson_id,
        type: r.type,
        title: r.title,
        lessonTitle: r.lesson_title,
        worldTitle: r.world_title,
        students: r.students,
        answers: r.answers,
        firstTryCorrectPercent: r.first_pct,
        averageTries: r.avg_tries,
      }));
      return { generatedAt: new Date().toISOString(), activities, minStudents: MIN_SAMPLE };
    });
  }

  /** Checks the class filter (other teachers' classes → 404), then serves from cache or loads. */
  private async cached<T>(
    name: string,
    actor: Actor,
    query: AnalyticsQuery,
    load: (scope: SQL) => Promise<T>,
  ): Promise<T> {
    if (query.cohortId) await this.assertCohortVisible(actor, query.cohortId);
    const who = actor.role === 'ADMIN' ? 'all' : `teacher:${actor.id}`;
    const key = `analytics:${name}:${who}:${query.cohortId ?? 'any'}:${query.days}`;
    return this.cache.getOrLoad(key, CACHE_SECONDS, () =>
      load(scopedStudents(actor, query.cohortId)),
    );
  }

  private async assertCohortVisible(actor: Actor, cohortId: string) {
    const found = await this.rows<{ id: string }>(sql`select c.id from cohorts c
      where c.id = ${cohortId} and c.deleted_at is null
      ${
        actor.role === 'ADMIN'
          ? sql``
          : sql`and exists (select 1 from teacher_cohorts tc
              where tc.cohort_id = c.id and tc.staff_user_id = ${actor.id})`
      }`);
    if (found.length === 0) throw AppError.notFound('COHORT_NOT_FOUND', 'Class not found');
  }

  private async rows<T>(query: SQL): Promise<T[]> {
    const result = await this.db.execute(query);
    return result.rows as T[];
  }
}

/** First day of a window of `days` days ending today, as "YYYY-MM-DD". */
function windowStart(days: number): string {
  const today = localDate(new Date(), REPORT_TIME_ZONE);
  const start = new Date(`${today}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  return start.toISOString().slice(0, 10);
}
