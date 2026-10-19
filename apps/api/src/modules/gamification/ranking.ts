import { sql, type SQL } from 'drizzle-orm';
import type { RankingEntry, RankingPeriod, RankingView } from '@itstarter/shared';
import type { Database } from '../../db/client';
import type { SessionUser } from '../auth/sessions';

/** How many students the ranking lists (everyone also sees their own place). */
export const RANKING_SIZE = 20;
/** Outside the top: how many students to show above and below you. */
export const RANKING_NEIGHBOURS = 2;

interface Row {
  user_id: string;
  display_name: string;
  level_icon: string;
  xp: number;
  rank: number | null;
  /** 1, 2, 3… in display order (equal XP sorted by name). */
  pos?: number | null;
  ranked: number;
}

/**
 * Every active student's score for the period: total XP, or XP earned in the last 7 days
 * (so new students can reach the top too).
 */
function scores(period: RankingPeriod): SQL {
  const xp =
    period === 'all'
      ? sql`s.xp_total`
      : sql`coalesce((select sum(x.amount) from xp_transactions x
          where x.student_id = s.user_id and x.created_at >= now() - interval '7 days'), 0)`;
  return sql`scores as (
      select s.user_id, u.display_name, coalesce(l.icon, '⭐') as level_icon, (${xp})::int as xp
      from students s
      join users u on u.id = s.user_id and u.deleted_at is null and u.status = 'active'
      left join levels l on l.number = s.level
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

  async ranking(user: SessionUser, period: RankingPeriod): Promise<RankingView> {
    const top = await this.rows(sql`with ${scores(period)}
      select sc.*, r.rank, r.ranked from scores sc join ranked r using (user_id)
      order by r.pos
      limit ${RANKING_SIZE}`);

    let you: RankingEntry | null = null;
    let around: RankingEntry[] = [];
    let ranked = top[0]?.ranked ?? 0;
    if (user.role === 'STUDENT') {
      const [mine] = await this.rows(sql`with ${scores(period)}
        select sc.*, r.rank, r.pos, (select count(*) from ranked)::int as ranked
        from scores sc left join ranked r using (user_id)
        where sc.user_id = ${user.id}`);
      if (mine) {
        you = entry(mine, user.id);
        ranked = mine.ranked;
      }
      if (mine?.pos && mine.pos > RANKING_SIZE) {
        const near = await this.rows(sql`with ${scores(period)}
          select sc.*, r.rank, r.ranked from scores sc join ranked r using (user_id)
          where r.pos between ${mine.pos - RANKING_NEIGHBOURS} and ${mine.pos + RANKING_NEIGHBOURS}
            and r.pos > ${RANKING_SIZE}
          order by r.pos`);
        around = near.map((r) => entry(r, user.id));
      }
    }
    return { period, top: top.map((r) => entry(r, user.id)), you, around, ranked };
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
