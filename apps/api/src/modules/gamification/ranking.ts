import { sql, type SQL } from 'drizzle-orm';
import type { RankingEntry, RankingPeriod, RankingView } from '@itstarter/shared';
import type { Database } from '../../db/client';
import type { SessionUser } from '../auth/sessions';
import { studentScope } from '../teacher/service';

/** Everyone is listed, this many per page. */
export const RANKING_PAGE_SIZE = 50;
/** How many students to show above and below you in "Students near you". */
export const RANKING_NEIGHBOURS = 2;

interface Row {
  user_id: string;
  display_name: string;
  level_icon: string;
  xp: number;
  rank: number | null;
  /** 1, 2, 3… in display order (equal XP sorted by name). */
  pos: number | null;
  ranked: number;
}

/** One line of the staff export (every student in scope, also those without XP). */
export interface RankingExportRow {
  rank: number;
  displayName: string;
  username: string;
  cohort: string | null;
  xp: number;
  xpTotal: number;
  level: number;
  lessonsCompleted: number;
  lastActive: string | null;
}

/** The XP that counts for the period: total XP, or XP earned in the last 7 days. */
function periodXp(period: RankingPeriod): SQL {
  return period === 'all'
    ? sql`students.xp_total`
    : sql`coalesce((select sum(x.amount) from xp_transactions x
        where x.student_id = students.user_id and x.created_at >= now() - interval '7 days'), 0)`;
}

/** Active students (not disabled or deleted). */
const ACTIVE = sql`users.deleted_at is null and users.status = 'active'`;

/**
 * Every active student's score for the period, ranked: equal XP shares a rank (1, 2, 2, 4…);
 * `pos` is the order on screen (ties by name). Students without XP in the period are not ranked
 * (so new students see "earn XP to join" instead of a last place).
 */
function ranking(period: RankingPeriod): SQL {
  return sql`scores as (
      select students.user_id, users.display_name, coalesce(levels.icon, '⭐') as level_icon,
        (${periodXp(period)})::int as xp
      from students
      join users on users.id = students.user_id and ${ACTIVE}
      left join levels on levels.number = students.level
    ),
    ranked as (
      select user_id,
        rank() over (order by xp desc)::int as rank,
        row_number() over (order by xp desc, display_name, user_id)::int as pos,
        count(*) over ()::int as ranked
      from scores where xp > 0
    )`;
}

export class RankingService {
  constructor(private readonly db: Database) {}

  async ranking(user: SessionUser, period: RankingPeriod, page = 1): Promise<RankingView> {
    let you: RankingEntry | null = null;
    let yourPos: number | null = null;
    let ranked: number | null = null;
    if (user.role === 'STUDENT') {
      const [mine] = await this.rows(sql`with ${ranking(period)}
        select sc.*, r.rank, r.pos, (select count(*) from ranked)::int as ranked
        from scores sc left join ranked r using (user_id)
        where sc.user_id = ${user.id}`);
      if (mine) {
        you = entry(mine, user.id);
        yourPos = mine.pos;
        ranked = mine.ranked;
      }
    }
    ranked ??= Number(
      (await this.rows(sql`with ${ranking(period)} select count(*)::int as ranked from ranked`))[0]
        ?.ranked ?? 0,
    );

    const pages = Math.max(1, Math.ceil(ranked / RANKING_PAGE_SIZE));
    const current = Math.min(Math.max(1, page), pages);
    const entries = await this.rows(sql`with ${ranking(period)}
      select sc.*, r.rank, r.pos, r.ranked from scores sc join ranked r using (user_id)
      where r.pos > ${(current - 1) * RANKING_PAGE_SIZE} and r.pos <= ${current * RANKING_PAGE_SIZE}
      order by r.pos`);

    // Not in the top 3: the students just above and below you, to compare.
    let around: RankingEntry[] = [];
    if (yourPos !== null && yourPos > 3) {
      const near = await this.rows(sql`with ${ranking(period)}
        select sc.*, r.rank, r.pos, r.ranked from scores sc join ranked r using (user_id)
        where r.pos between ${yourPos - RANKING_NEIGHBOURS} and ${yourPos + RANKING_NEIGHBOURS}
        order by r.pos`);
      around = near.map((r) => entry(r, user.id));
    }

    return {
      period,
      page: current,
      pages,
      pageSize: RANKING_PAGE_SIZE,
      entries: entries.map((r) => entry(r, user.id)),
      you,
      yourPage: yourPos === null ? null : Math.ceil(yourPos / RANKING_PAGE_SIZE),
      around,
      ranked,
    };
  }

  /**
   * Staff export: every active student in the actor's scope (admins: everyone; teachers: their
   * classes), optionally one class, ranked by the period's XP. Students without XP come last
   * and share the last rank.
   */
  async exportRows(
    actor: SessionUser,
    period: RankingPeriod,
    cohortId?: string,
  ): Promise<RankingExportRow[]> {
    const scope = studentScope(actor);
    const result = await this.db.execute(sql`
      with scores as (
        select users.display_name, users.username, cohorts.name as cohort,
          (${periodXp(period)})::int as xp, students.xp_total, students.level,
          to_char(students.last_active_date, 'YYYY-MM-DD') as last_active,
          (select count(*) from student_lesson_progress p
            where p.student_id = students.user_id and p.status = 'completed')::int as lessons
        from students
        join users on users.id = students.user_id and ${ACTIVE}
        left join cohorts on cohorts.id = students.cohort_id
        where true
          ${scope ? sql`and ${scope}` : sql``}
          ${cohortId ? sql`and students.cohort_id = ${cohortId}` : sql``}
      )
      select *, rank() over (order by xp desc)::int as rank
      from scores order by xp desc, display_name, username`);
    return (result.rows as Record<string, unknown>[]).map((r) => ({
      rank: Number(r.rank),
      displayName: String(r.display_name),
      username: String(r.username),
      cohort: (r.cohort as string | null) ?? null,
      xp: Number(r.xp),
      xpTotal: Number(r.xp_total),
      level: Number(r.level),
      lessonsCompleted: Number(r.lessons),
      lastActive: (r.last_active as string | null) ?? null,
    }));
  }

  private async rows(query: SQL): Promise<Row[]> {
    return (await this.db.execute(query)).rows as unknown as Row[];
  }
}

function entry(row: Row, me: string): RankingEntry {
  return {
    rank: row.rank,
    displayName: row.display_name,
    xp: row.xp,
    levelIcon: row.level_icon,
    isYou: row.user_id === me,
  };
}
