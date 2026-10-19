import { getLocale, getTranslations } from 'next-intl/server';
import { RANKING_PERIODS } from '@itstarter/shared';
import { ButtonLink, buttonClasses } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { apiGet } from '@/lib/server-api';
import { requireStaff } from '@/lib/session';

const inputClass = 'min-h-11 w-full min-w-0 rounded-control border border-line bg-surface px-3';

/**
 * 🏆 Ranking for staff: download every student's place (one class or all) as a PDF report or a
 * CSV file for Excel / Google Sheets. Teachers get their own classes only (the API checks).
 */
export default async function AdminRankingPage() {
  await requireStaff();
  const [t, locale, cohorts] = await Promise.all([
    getTranslations('admin.ranking'),
    getLocale(),
    apiGet<{ id: string; name: string }[]>('/api/teacher/cohorts'),
  ]);
  const tr = await getTranslations('ranking');

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold">🏆 {t('title')}</h1>
          <p className="text-muted">{t('intro')}</p>
        </div>
        <ButtonLink href="/ranking" variant="secondary">
          {t('view')}
        </ButtonLink>
      </div>

      <Card as="section" aria-labelledby="export-title" className="flex flex-col gap-4">
        <h2 id="export-title" className="text-xl font-extrabold">
          {t('exportTitle')}
        </h2>
        {/* A plain GET form to the API: the browser saves the file it sends back. */}
        <form
          action="/api/teacher/ranking/export"
          method="get"
          className="grid gap-3 sm:grid-cols-3"
        >
          <label className="flex flex-col gap-1 font-bold">
            {t('class')}
            <select name="cohortId" defaultValue="" className={`${inputClass} font-normal`}>
              <option value="">{t('allClasses')}</option>
              {cohorts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 font-bold">
            {t('period')}
            <select name="period" defaultValue="all" className={`${inputClass} font-normal`}>
              {RANKING_PERIODS.map((p) => (
                <option key={p} value={p}>
                  {tr(`periods.${p}`)}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 font-bold">
            {t('language')}
            <select name="lang" defaultValue={locale} className={`${inputClass} font-normal`}>
              <option value="en">English</option>
              <option value="km">ភាសាខ្មែរ</option>
            </select>
          </label>
          <div className="flex flex-wrap gap-2 sm:col-span-3">
            <button
              type="submit"
              name="format"
              value="pdf"
              className={buttonClasses({ variant: 'primary' })}
            >
              📄 {t('pdf')}
            </button>
            <button
              type="submit"
              name="format"
              value="csv"
              className={buttonClasses({ variant: 'secondary' })}
            >
              📊 {t('csv')}
            </button>
          </div>
        </form>
        <p className="text-sm text-muted">{t('help')}</p>
      </Card>
    </>
  );
}
