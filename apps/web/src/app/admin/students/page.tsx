import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { ButtonLink, buttonClasses } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { apiGet, apiGetPage } from '@/lib/server-api';
import { requireStaff } from '@/lib/session';

interface StudentRow {
  id: string;
  username: string;
  displayName: string;
  cohortName: string | null;
  xpTotal: number;
  level: number;
  lastActiveDate: string | null;
  status: 'active' | 'disabled';
}
interface Cohort {
  id: string;
  name: string;
}

type Search = Promise<{ q?: string; cohortId?: string; status?: string; page?: string }>;

const inputClass = 'min-h-11 rounded-control border border-line bg-surface px-3';

export default async function StudentsPage({ searchParams }: { searchParams: Search }) {
  const user = await requireStaff();
  const t = await getTranslations('admin');
  const locale = await getLocale();
  const params = await searchParams;
  const query = new URLSearchParams({ pageSize: '25', page: params.page ?? '1' });
  if (params.q) query.set('q', params.q);
  if (params.cohortId) query.set('cohortId', params.cohortId);
  if (params.status === 'active' || params.status === 'disabled')
    query.set('status', params.status);

  const [{ data: students, meta }, cohorts] = await Promise.all([
    apiGetPage<StudentRow[]>(`/api/teacher/students?${query}`),
    apiGet<Cohort[]>('/api/teacher/cohorts'),
  ]);
  const pages = Math.max(1, Math.ceil(meta.total / meta.pageSize));
  const pageLink = (page: number) => {
    const next = new URLSearchParams(query);
    next.set('page', String(page));
    next.delete('pageSize');
    return `/admin/students?${next}`;
  };
  const day = new Intl.DateTimeFormat(locale === 'km' ? 'km-KH' : 'en-GB', { dateStyle: 'medium' });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold">{t('students.title')}</h1>
        {user.role === 'ADMIN' && (
          <div className="flex flex-wrap gap-2">
            <ButtonLink href="/admin/students/new">➕ {t('students.add')}</ButtonLink>
            <ButtonLink href="/admin/students/import" variant="secondary">
              📥 {t('students.import')}
            </ButtonLink>
          </div>
        )}
      </div>

      {/* A plain GET form: works without JavaScript and keeps the filter in the URL. */}
      <form className="grid gap-2 sm:grid-cols-[1fr_auto_auto_auto]" role="search">
        <label className="sr-only" htmlFor="q">
          {t('common.search')}
        </label>
        <input
          id="q"
          name="q"
          defaultValue={params.q}
          placeholder={t('students.searchPlaceholder')}
          className={inputClass}
        />
        <label className="sr-only" htmlFor="cohortId">
          {t('students.class')}
        </label>
        <select
          id="cohortId"
          name="cohortId"
          defaultValue={params.cohortId ?? ''}
          className={inputClass}
        >
          <option value="">
            {t('students.class')}: {t('common.all')}
          </option>
          {cohorts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="status">
          {t('common.status')}
        </label>
        <select id="status" name="status" defaultValue={params.status ?? ''} className={inputClass}>
          <option value="">
            {t('common.status')}: {t('common.all')}
          </option>
          <option value="active">{t('students.active')}</option>
          <option value="disabled">{t('students.disabled')}</option>
        </select>
        <button type="submit" className={buttonClasses({ variant: 'secondary' })}>
          🔍 {t('common.filter')}
        </button>
      </form>

      <p className="text-sm text-muted">{t('common.results', { count: meta.total })}</p>
      <Card padded={false}>
        <ul className="divide-y divide-line">
          {students.length === 0 && <li className="p-4 text-muted">{t('common.empty')}</li>}
          {students.map((s) => (
            <li key={s.id}>
              <Link
                href={`/admin/students/${s.id}`}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 hover:bg-slate-50"
              >
                <span className="flex min-w-0 flex-col">
                  <span className="font-bold">
                    {s.displayName}
                    {s.status === 'disabled' && (
                      <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-900">
                        {t('students.disabled')}
                      </span>
                    )}
                  </span>
                  <span className="text-sm text-muted">
                    @{s.username} · {s.cohortName ?? t('students.noClass')}
                  </span>
                </span>
                <span className="flex gap-3 text-sm font-semibold text-muted">
                  <span>⭐ {s.xpTotal}</span>
                  <span>
                    {t('students.level')} {s.level}
                  </span>
                  <span>
                    {t('students.lastActive')}:{' '}
                    {s.lastActiveDate
                      ? day.format(new Date(s.lastActiveDate))
                      : t('students.never')}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      {pages > 1 && (
        <nav
          className="flex items-center justify-between gap-2"
          aria-label={t('common.pageOf', { page: meta.page, pages })}
        >
          {meta.page > 1 ? (
            <ButtonLink href={pageLink(meta.page - 1)} variant="secondary">
              ← {t('common.previous')}
            </ButtonLink>
          ) : (
            <span />
          )}
          <span className="text-sm text-muted">
            {t('common.pageOf', { page: meta.page, pages })}
          </span>
          {meta.page < pages ? (
            <ButtonLink href={pageLink(meta.page + 1)} variant="secondary">
              {t('common.next')} →
            </ButtonLink>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
