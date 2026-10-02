import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  INACTIVE_AFTER_DAYS,
  type ProgressReport,
  type ProgressSort,
  type ProgressWorld,
  type StudentProgressRow,
} from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { worldStyle } from '@/lib/worlds';
import { CommitmentChip } from '../performance/performance-report';
import { Card } from '../ui/card';
import { ProgressBar } from '../ui/progress-bar';

/** Whole days between two YYYY-MM-DD dates. */
export function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
}

interface Props {
  report: ProgressReport;
  /** Today in the school's time zone (YYYY-MM-DD). */
  today: string;
  locale: string;
  sort: ProgressSort;
  dir: 'asc' | 'desc';
  /** Link for a column header (toggles direction when already sorted by it). */
  sortHref: (sort: ProgressSort) => string;
}

/**
 * Every student's progress. Wide screens: a sortable table with one column per world.
 * Phones and tablets: one card per student (no sideways scrolling).
 */
export function ProgressTable({ report, today, locale, sort, dir, sortHref }: Props) {
  const t = useTranslations('admin.progress');
  if (report.rows.length === 0) {
    return <Card className="text-center text-muted">{t('empty')}</Card>;
  }

  const header = (key: ProgressSort, label: string, className = '') => (
    <th
      scope="col"
      aria-sort={sort === key ? (dir === 'asc' ? 'ascending' : 'descending') : undefined}
      className={`px-3 py-3 font-bold ${className}`}
    >
      <Link href={sortHref(key)} className="inline-flex items-center gap-1 hover:text-brand-700">
        {label}
        <span aria-hidden="true" className={sort === key ? 'text-brand-600' : 'text-slate-300'}>
          {sort === key && dir === 'asc' ? '▲' : '▼'}
        </span>
      </Link>
    </th>
  );

  return (
    <>
      {/* ≥ 1280px: table */}
      <Card padded={false} className="hidden overflow-hidden xl:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-slate-50 text-muted">
            <tr>
              {header('name', t('student'), 'pl-5')}
              {header('progress', t('progress'))}
              {report.worlds.map((w) => (
                <th
                  key={w.id}
                  scope="col"
                  className="px-1 py-3 text-center"
                  title={contentText(w.title, locale)}
                >
                  <span aria-hidden="true" className="text-lg">
                    {w.icon}
                  </span>
                  <span className="sr-only">{contentText(w.title, locale)}</span>
                </th>
              ))}
              {header('score', t('score'), 'text-right')}
              {header('commitment', t('commitment'))}
              {header('xp', t('xp'), 'text-right')}
              {header('lastActive', t('lastActive'), 'pr-5')}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {report.rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/70">
                <td className="py-3 pr-3 pl-5">
                  <StudentName row={row} locale={locale} />
                </td>
                <td className="w-48 px-3 py-3">
                  <Overall row={row} />
                </td>
                {report.worlds.map((w) => (
                  <td key={w.id} className="w-16 px-1 py-3">
                    <WorldCell world={w} done={row.worlds[w.id] ?? 0} locale={locale} />
                  </td>
                ))}
                <td className="px-3 py-3 text-right font-bold tabular-nums">
                  {row.averageScore === null ? '—' : `${row.averageScore}%`}
                </td>
                <td className="px-3 py-3">
                  <CommitmentChip commitment={row.commitment} />
                </td>
                <td className="px-3 py-3 text-right tabular-nums">
                  <span className="font-bold">{row.xpTotal}</span>
                  {row.currentStreak > 0 && (
                    <span className="ml-1 text-xs text-orange-700">🔥{row.currentStreak}</span>
                  )}
                </td>
                <td className="py-3 pr-5 pl-3">
                  <LastActive date={row.lastActiveDate} today={today} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* < 1280px: cards */}
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:hidden">
        {report.rows.map((row) => (
          <li key={row.id} className="min-w-0">
            <Card className="flex h-full min-w-0 flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <StudentName row={row} locale={locale} />
                <LastActive date={row.lastActiveDate} today={today} />
              </div>
              <Overall row={row} />
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {report.worlds.map((w) => (
                  <WorldCell key={w.id} world={w} done={row.worlds[w.id] ?? 0} locale={locale} />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-3 text-sm text-muted">
                <span>
                  {t('score')}:{' '}
                  <strong className="text-ink">
                    {row.averageScore === null ? '—' : `${row.averageScore}%`}
                  </strong>
                </span>
                <span>
                  ⭐ <strong className="text-ink">{row.xpTotal}</strong> {t('xp')}
                </span>
                {row.currentStreak > 0 && <span>🔥 {row.currentStreak}</span>}
                <CommitmentChip commitment={row.commitment} />
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}

function StudentName({ row, locale }: { row: StudentProgressRow; locale: string }) {
  const t = useTranslations('admin.progress');
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <Link
        href={`/admin/students/${row.id}`}
        className="font-bold text-ink hover:text-brand-700 hover:underline"
      >
        {row.displayName}
      </Link>
      <span className="truncate text-xs text-muted">
        @{row.username} · {row.cohortName ?? t('noClass')}
        {row.status === 'disabled' && (
          <span className="ml-1 rounded-full bg-slate-200 px-1.5 py-0.5 font-bold text-slate-700">
            {t('disabled')}
          </span>
        )}
      </span>
      {row.currentLesson && (
        <span className="truncate text-xs font-semibold text-brand-700">
          ▶ {t('workingOn', { lesson: contentText(row.currentLesson.title, locale) })}
        </span>
      )}
    </div>
  );
}

function Overall({ row }: { row: StudentProgressRow }) {
  const t = useTranslations('admin.progress');
  const label = t('lessons', { done: row.lessonsCompleted, total: row.lessonsTotal });
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <span className="font-semibold whitespace-nowrap text-muted">{label}</span>
        <span className="font-extrabold tabular-nums">{row.percent}%</span>
      </div>
      <ProgressBar value={row.percent} label={label} size="sm" />
    </div>
  );
}

function WorldCell({
  world,
  done,
  locale,
}: {
  world: ProgressWorld;
  done: number;
  locale: string;
}) {
  const t = useTranslations('admin.progress');
  const title = contentText(world.title, locale);
  const percent = world.lessonsTotal > 0 ? (done / world.lessonsTotal) * 100 : 0;
  const label = t('worldProgress', { world: title, done, total: world.lessonsTotal });
  return (
    <div
      className={`flex flex-col items-center gap-1 rounded-lg px-1 py-1.5 ${done > 0 ? '' : 'opacity-60'}`}
      title={label}
    >
      <span aria-hidden="true" className="text-sm leading-none xl:hidden">
        {world.icon}
      </span>
      <span className="text-xs font-bold tabular-nums">
        <span className="sr-only">{label}</span>
        <span aria-hidden="true">
          {done}/{world.lessonsTotal}
        </span>
      </span>
      <span aria-hidden="true" className="h-1 w-full overflow-hidden rounded-full bg-slate-200">
        <span
          className={`block h-full rounded-full ${worldStyle(world.color).bar}`}
          style={{ width: `${percent}%` }}
        />
      </span>
    </div>
  );
}

function LastActive({ date, today }: { date: string | null; today: string }) {
  const t = useTranslations('admin.progress');
  const days = date ? daysBetween(date, today) : null;
  const inactive = days === null || days >= INACTIVE_AFTER_DAYS;
  return (
    <span className="flex shrink-0 flex-col items-end gap-0.5 text-right text-xs xl:items-start xl:text-left">
      <span className="font-semibold text-ink">
        {days === null ? t('never') : days <= 0 ? t('today') : t('daysAgo', { days })}
      </span>
      {inactive && (
        <span className="rounded-full bg-amber-100 px-2 py-0.5 font-bold text-amber-900">
          {t('inactiveTag')}
        </span>
      )}
    </span>
  );
}
