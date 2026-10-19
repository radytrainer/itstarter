import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { RANKING_PERIODS, type RankingEntry, type RankingView } from '@itstarter/shared';
import { AppShell } from '@/components/app-shell';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { apiGet } from '@/lib/server-api';
import { requireUser } from '@/lib/session';

export const dynamic = 'force-dynamic';

const MEDALS: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

function Place({ rank }: { rank: number | null }) {
  if (rank !== null && MEDALS[rank]) {
    return (
      <span className="w-10 shrink-0 text-center text-3xl leading-none" aria-hidden="true">
        {MEDALS[rank]}
      </span>
    );
  }
  return (
    <span
      className="w-10 shrink-0 text-center text-lg font-extrabold text-muted tabular-nums"
      aria-hidden="true"
    >
      {rank === null ? '🌱' : `#${rank}`}
    </span>
  );
}

/** One student. `anchor` gives your own row id="me", so "Find me" can jump to it. */
async function Row({ entry, anchor = false }: { entry: RankingEntry; anchor?: boolean }) {
  const t = await getTranslations('ranking');
  return (
    <li
      id={anchor && entry.isYou ? 'me' : undefined}
      aria-current={entry.isYou ? 'true' : undefined}
      className={`flex min-h-14 scroll-mt-24 items-center gap-3 rounded-2xl px-3 py-2 ${
        entry.isYou ? 'bg-brand-50 ring-2 ring-brand-500' : 'odd:bg-slate-50'
      }`}
    >
      <Place rank={entry.rank} />
      {entry.rank !== null && <span className="sr-only">{t('place', { rank: entry.rank })}</span>}
      <span aria-hidden="true" className="text-xl">
        {entry.levelIcon}
      </span>
      <span className="min-w-0 flex-1 truncate font-bold">
        {entry.displayName}
        {entry.isYou && <span className="ml-2 text-sm text-brand-700">({t('you')})</span>}
      </span>
      {entry.rank === null ? (
        <span className="shrink-0 text-sm font-bold text-muted">{t('notStarted')}</span>
      ) : (
        <span className="shrink-0 font-extrabold text-amber-700 tabular-nums">
          {t('xp', { xp: entry.xp })}
        </span>
      )}
    </li>
  );
}

/**
 * 🏆 Ranking: every student by XP, 50 per page. Students see their own place, the students near
 * them, and can jump to their row. Staff also get a link to the PDF / CSV export.
 */
export default async function RankingPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; page?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const period = RANKING_PERIODS.find((p) => p === params.period) ?? 'all';
  const page = Math.max(1, Math.floor(Number(params.page)) || 1);
  const [view, t] = await Promise.all([
    apiGet<RankingView>(`/api/ranking?period=${period}&page=${page}`),
    getTranslations('ranking'),
  ]);
  const { you } = view;
  const href = (p: number, hash = '') => {
    const q = new URLSearchParams();
    if (period !== 'all') q.set('period', period);
    if (p > 1) q.set('page', String(p));
    const query = q.toString();
    return `/ranking${query ? `?${query}` : ''}${hash}`;
  };
  // The nearest student ahead of you: how much XP you need to reach their place.
  const ahead =
    you && you.rank !== null
      ? [...view.entries, ...view.around]
          .filter((e) => e.xp > you.xp)
          .sort((a, b) => a.xp - b.xp)[0]
      : undefined;
  const first = (view.page - 1) * view.pageSize + 1;
  const last = first + view.entries.length - 1;

  return (
    <AppShell signedIn>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">🏆 {t('title')}</h1>
          <p className="text-lg text-muted">{t('intro')}</p>
        </div>
        {user.role !== 'STUDENT' && (
          <ButtonLink href="/admin/ranking" variant="secondary">
            📄 {t('export')}
          </ButtonLink>
        )}
      </div>

      <nav aria-label={t('periodLabel')} className="flex gap-2">
        {RANKING_PERIODS.map((p) => (
          <Link
            key={p}
            href={p === 'all' ? '/ranking' : `/ranking?period=${p}`}
            aria-current={p === period ? 'page' : undefined}
            className="flex min-h-11 items-center rounded-full border border-line bg-surface px-4 font-bold text-muted hover:bg-slate-100 aria-[current=page]:border-brand-600 aria-[current=page]:bg-brand-600 aria-[current=page]:text-white"
          >
            {t(`periods.${p}`)}
          </Link>
        ))}
      </nav>

      {user.role !== 'STUDENT' && <p className="text-muted">{t('staffNote')}</p>}

      {you && (
        <Card className="flex flex-wrap items-center gap-4 border-brand-200 bg-brand-50">
          <span className="text-4xl" aria-hidden="true">
            {you.rank !== null ? (MEDALS[you.rank] ?? '⭐') : '🌱'}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-extrabold">{t('yourPlace')}</h2>
            {you.rank !== null ? (
              <p className="text-2xl font-extrabold">
                {t('youAre', { rank: you.rank, total: view.total })} ·{' '}
                <span className="text-amber-700">{t('xp', { xp: you.xp })}</span>
              </p>
            ) : (
              <p className="text-lg">{t(`notYet.${period}`)}</p>
            )}
            <p className="text-sm text-muted">
              {you.rank === 1
                ? t('first')
                : ahead && ahead.rank !== null
                  ? t('toMoveUp', { xp: ahead.xp - you.xp, rank: ahead.rank })
                  : t('keepGoing')}
            </p>
          </div>
          {view.yourPage !== null && (
            <ButtonLink href={href(view.yourPage, '#me')} variant="primary">
              📍 {t('findMe')}
            </ButtonLink>
          )}
        </Card>
      )}

      {view.around.length > 0 && (
        <Card as="section" aria-labelledby="near-title" className="flex flex-col gap-3">
          <h2 id="near-title" className="text-xl font-extrabold">
            {t('nearYou')}
          </h2>
          <ol className="flex flex-col gap-1">
            {view.around.map((entry, i) => (
              <Row key={`${entry.rank}-${i}`} entry={entry} />
            ))}
          </ol>
        </Card>
      )}

      <Card as="section" aria-labelledby="all-title" className="flex flex-col gap-3">
        <h2 id="all-title" className="text-xl font-extrabold">
          {view.entries.length > 0
            ? t('showing', { first, last, total: view.total })
            : t('allStudents')}
        </h2>
        {view.entries.length === 0 ? (
          <p className="text-muted">{t(`empty.${period}`)}</p>
        ) : (
          <ol className="flex flex-col gap-1">
            {view.entries.map((entry, i) => (
              <Row key={`${entry.rank}-${i}`} entry={entry} anchor />
            ))}
          </ol>
        )}
        {view.pages > 1 && (
          <nav
            aria-label={t('pagesLabel')}
            className="flex flex-wrap items-center justify-between gap-2 pt-2"
          >
            {view.page > 1 ? (
              <ButtonLink href={href(view.page - 1)} variant="secondary">
                ← {t('previous')}
              </ButtonLink>
            ) : (
              <span />
            )}
            <span className="font-bold text-muted">
              {t('pageOf', { page: view.page, pages: view.pages })}
            </span>
            {view.page < view.pages ? (
              <ButtonLink href={href(view.page + 1)} variant="secondary">
                {t('next')} →
              </ButtonLink>
            ) : (
              <span />
            )}
          </nav>
        )}
      </Card>
    </AppShell>
  );
}
