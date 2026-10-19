import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { RANKING_PERIODS, type RankingEntry, type RankingView } from '@itstarter/shared';
import { AppShell } from '@/components/app-shell';
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
      {rank === null ? '–' : `#${rank}`}
    </span>
  );
}

async function Row({ entry }: { entry: RankingEntry }) {
  const t = await getTranslations('ranking');
  return (
    <li
      aria-current={entry.isYou ? 'true' : undefined}
      className={`flex min-h-14 items-center gap-3 rounded-2xl px-3 py-2 ${
        entry.isYou ? 'bg-brand-50 ring-2 ring-brand-500' : 'odd:bg-slate-50'
      }`}
    >
      <Place rank={entry.rank} />
      <span className="sr-only">{t('place', { rank: entry.rank ?? 0 })}</span>
      <span aria-hidden="true" className="text-xl">
        {entry.levelIcon}
      </span>
      <span className="min-w-0 flex-1 truncate font-bold">
        {entry.displayName}
        {entry.isYou && <span className="ml-2 text-sm text-brand-700">({t('you')})</span>}
      </span>
      <span className="shrink-0 font-extrabold text-amber-700 tabular-nums">
        {t('xp', { xp: entry.xp })}
      </span>
    </li>
  );
}

/** 🏆 Ranking: the top students by XP. Everyone signed in can see it; students see their place. */
export default async function RankingPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  await requireUser();
  const params = await searchParams;
  const period = RANKING_PERIODS.find((p) => p === params.period) ?? 'all';
  const [view, t] = await Promise.all([
    apiGet<RankingView>(`/api/ranking?period=${period}`),
    getTranslations('ranking'),
  ]);
  const you = view.you;
  // The nearest student ahead of you: how much XP you need to reach their place.
  const ahead =
    you && you.rank !== null
      ? [...view.top, ...view.around].filter((e) => e.xp > you.xp).sort((a, b) => a.xp - b.xp)[0]
      : undefined;

  return (
    <AppShell signedIn>
      <div>
        <h1 className="text-3xl font-extrabold">🏆 {t('title')}</h1>
        <p className="text-lg text-muted">{t('intro')}</p>
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

      {you && (
        <Card className="flex items-center gap-4 border-brand-200 bg-brand-50">
          <span className="text-4xl" aria-hidden="true">
            {you.rank !== null ? (MEDALS[you.rank] ?? '⭐') : '🌱'}
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-extrabold">{t('yourPlace')}</h2>
            {you.rank !== null ? (
              <p className="text-lg">
                {t('youAre', { rank: you.rank, total: view.ranked })} ·{' '}
                <span className="font-extrabold text-amber-700">{t('xp', { xp: you.xp })}</span>
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

      <Card as="section" aria-labelledby="top-title" className="flex flex-col gap-3">
        <h2 id="top-title" className="text-xl font-extrabold">
          {t('top', { count: view.top.length })}
        </h2>
        {view.top.length === 0 ? (
          <p className="text-muted">{t(`empty.${period}`)}</p>
        ) : (
          <ol className="flex flex-col gap-1">
            {view.top.map((entry, i) => (
              <Row key={`${entry.rank}-${i}`} entry={entry} />
            ))}
          </ol>
        )}
      </Card>
    </AppShell>
  );
}
