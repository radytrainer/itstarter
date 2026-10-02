import { getLocale, getTranslations } from 'next-intl/server';
import { PROGRESS_SORTS, type ProgressReport, type ProgressSort } from '@itstarter/shared';
import { ProgressTable } from '@/components/admin/progress-table';
import { ButtonLink, buttonClasses } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { apiGet, apiGetPage } from '@/lib/server-api';
import { requireStaff } from '@/lib/session';

type Search = Promise<{
  q?: string;
  cohortId?: string;
  status?: string;
  sort?: string;
  dir?: string;
  page?: string;
}>;

const inputClass = 'min-h-11 w-full min-w-0 rounded-control border border-line bg-surface px-3';
const PAGE_SIZE = 25;

/** "Today" for activity, in the school's time zone (like streaks and analytics). */
function todayInCambodia(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Phnom_Penh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

export default async function ProgressPage({ searchParams }: { searchParams: Search }) {
  await requireStaff();
  const t = await getTranslations('admin.progress');
  const tc = await getTranslations('admin.common');
  const ts = await getTranslations('admin.students');
  const locale = await getLocale();
  const params = await searchParams;

  const cohorts = await apiGet<{ id: string; name: string }[]>('/api/teacher/cohorts');
  // Only pass on values the form could have produced.
  const sort = (PROGRESS_SORTS as readonly string[]).includes(params.sort ?? '')
    ? (params.sort as ProgressSort)
    : 'name';
  const dir: 'asc' | 'desc' =
    params.dir === 'asc' || params.dir === 'desc' ? params.dir : sort === 'name' ? 'asc' : 'desc';
  const filters = new URLSearchParams({ sort, dir });
  if (params.q?.trim()) filters.set('q', params.q.trim().slice(0, 50));
  if (params.cohortId === 'none' || cohorts.some((c) => c.id === params.cohortId)) {
    filters.set('cohortId', params.cohortId!);
  }
  if (params.status === 'active' || params.status === 'disabled')
    filters.set('status', params.status);
  const page = Math.max(1, Number(params.page) || 1);

  const { data: report, meta } = await apiGetPage<ProgressReport>(
    `/api/teacher/progress?${filters}&page=${page}&pageSize=${PAGE_SIZE}`,
  );
  const pages = Math.max(1, Math.ceil(meta.total / meta.pageSize));
  const link = (changes: Record<string, string>) => {
    const next = new URLSearchParams(filters);
    for (const [k, v] of Object.entries(changes)) next.set(k, v);
    return `/admin/progress?${next}`;
  };
  const sortHref = (key: ProgressSort) =>
    link({
      sort: key,
      dir: key === sort ? (dir === 'asc' ? 'desc' : 'asc') : key === 'name' ? 'asc' : 'desc',
      page: '1',
    });
  const sortLabels: Record<ProgressSort, string> = {
    name: t('sortName'),
    progress: t('sortProgress'),
    score: t('sortScore'),
    commitment: t('sortCommitment'),
    xp: t('sortXp'),
    lastActive: t('sortLastActive'),
  };
  const { summary } = report;
  const today = todayInCambodia(); // one "today" for every row

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold">{t('title')}</h1>
          <p className="text-muted">{t('intro')}</p>
        </div>
        {/* A plain download link: the browser saves the CSV made by the API. */}
        <a
          href={`/api/teacher/progress/export?${filters}&lang=${locale}`}
          download
          className={buttonClasses({ variant: 'secondary' })}
        >
          ⬇️ {t('export')}
        </a>
      </div>

      {/* A plain GET form: works without JavaScript and keeps the filters in the URL. */}
      <form
        className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))_auto]"
        role="search"
      >
        <label className="sr-only" htmlFor="q">
          {t('search')}
        </label>
        <input
          id="q"
          name="q"
          defaultValue={params.q}
          placeholder={t('search')}
          className={inputClass}
        />
        <label className="sr-only" htmlFor="cohortId">
          {t('allClasses')}
        </label>
        <select
          id="cohortId"
          name="cohortId"
          defaultValue={filters.get('cohortId') ?? ''}
          className={inputClass}
        >
          <option value="">{t('allClasses')}</option>
          <option value="none">{t('noClass')}</option>
          {cohorts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="status">
          {tc('status')}
        </label>
        <select
          id="status"
          name="status"
          defaultValue={filters.get('status') ?? ''}
          className={inputClass}
        >
          <option value="">{t('allStatuses')}</option>
          <option value="active">{ts('active')}</option>
          <option value="disabled">{ts('disabled')}</option>
        </select>
        <label className="sr-only" htmlFor="sort">
          {t('sort')}
        </label>
        <select id="sort" name="sort" defaultValue={sort} className={inputClass}>
          {PROGRESS_SORTS.map((key) => (
            <option key={key} value={key}>
              {t('sort')}: {sortLabels[key]}
            </option>
          ))}
        </select>
        <button type="submit" className={buttonClasses({ variant: 'primary' })}>
          🔍 {t('filter')}
        </button>
      </form>

      <dl className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {[
          { label: t('students'), value: String(summary.students), icon: '🎓' },
          { label: t('averageProgress'), value: `${summary.averagePercent}%`, icon: '📈' },
          { label: t('activeThisWeek'), value: String(summary.activeThisWeek), icon: '⚡' },
          { label: t('notStarted'), value: String(summary.notStarted), icon: '💤' },
          { label: t('inactive'), value: String(summary.inactive), icon: '⏳' },
        ].map((tile) => (
          <Card key={tile.label} className="flex flex-col gap-1">
            <dt className="flex items-center gap-1.5 text-xs font-bold text-muted">
              <span aria-hidden="true">{tile.icon}</span>
              {tile.label}
            </dt>
            <dd className="text-2xl font-extrabold tabular-nums">{tile.value}</dd>
          </Card>
        ))}
      </dl>

      <p className="text-sm text-muted">
        {tc('results', { count: meta.total })} · {t('sortedBy', { column: sortLabels[sort] })}
      </p>

      <ProgressTable
        report={report}
        today={today}
        locale={locale}
        sort={sort}
        dir={dir}
        sortHref={sortHref}
      />

      {pages > 1 && (
        <nav
          className="flex items-center justify-between gap-2"
          aria-label={tc('pageOf', { page: meta.page, pages })}
        >
          {meta.page > 1 ? (
            <ButtonLink href={link({ page: String(meta.page - 1) })} variant="secondary">
              ← {tc('previous')}
            </ButtonLink>
          ) : (
            <span />
          )}
          <span className="text-sm text-muted">{tc('pageOf', { page: meta.page, pages })}</span>
          {meta.page < pages ? (
            <ButtonLink href={link({ page: String(meta.page + 1) })} variant="secondary">
              {tc('next')} →
            </ButtonLink>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
