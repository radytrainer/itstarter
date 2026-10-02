import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import {
  ANALYTICS_RANGES,
  type AnalyticsActivities,
  type AnalyticsEngagement,
  type AnalyticsOverview,
  type AnalyticsWorlds,
} from '@itstarter/shared';
import { BarList, DailyChart, LessonRanking, Metric } from '@/components/admin/analytics';
import { buttonClasses } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { contentText } from '@/i18n/content';
import { apiGet } from '@/lib/server-api';
import { requireStaff } from '@/lib/session';
import { worldStyle } from '@/lib/worlds';

type Search = Promise<{ cohortId?: string; days?: string }>;

const inputClass = 'min-h-11 rounded-control border border-line bg-surface px-3';

export default async function AnalyticsPage({ searchParams }: { searchParams: Search }) {
  const user = await requireStaff();
  const t = await getTranslations('admin.analytics');
  const tc = await getTranslations('admin.common');
  const locale = await getLocale();
  const params = await searchParams;

  const cohorts = await apiGet<{ id: string; name: string }[]>('/api/teacher/cohorts');
  // Only pass on values the form could have produced.
  const days = ANALYTICS_RANGES.find((d) => String(d) === params.days) ?? 7;
  const cohortId = cohorts.some((c) => c.id === params.cohortId) ? params.cohortId : undefined;
  const query = new URLSearchParams({ days: String(days) });
  if (cohortId) query.set('cohortId', cohortId);

  const [overview, engagement, worlds, activities] = await Promise.all([
    apiGet<AnalyticsOverview>(`/api/admin/analytics/overview?${query}`),
    apiGet<AnalyticsEngagement>(`/api/admin/analytics/engagement?${query}`),
    apiGet<AnalyticsWorlds>(`/api/admin/analytics/worlds?${query}`),
    apiGet<AnalyticsActivities>(`/api/admin/analytics/activities?${query}`),
  ]);

  const number = new Intl.NumberFormat(locale === 'km' ? 'km-KH' : 'en-GB');
  const time = new Intl.DateTimeFormat(locale === 'km' ? 'km-KH' : 'en-GB', {
    timeStyle: 'short',
    timeZone: 'Asia/Phnom_Penh',
  });
  const pct = (value: number | null) => (value === null ? t('none') : t('percent', { value }));
  const { students, lessons, quiz, xp } = overview;

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold">{t('title')}</h1>
        <p className="text-muted">{t('intro')}</p>
      </div>

      {/* A plain GET form: works without JavaScript and keeps the filter in the URL. */}
      <form className="grid gap-2 sm:grid-cols-[1fr_auto_auto]" role="search">
        <label className="sr-only" htmlFor="cohortId">
          {t('class')}
        </label>
        <select id="cohortId" name="cohortId" defaultValue={cohortId ?? ''} className={inputClass}>
          <option value="">{t('allClasses')}</option>
          {cohorts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="days">
          {t('period')}
        </label>
        <select id="days" name="days" defaultValue={String(days)} className={inputClass}>
          {ANALYTICS_RANGES.map((d) => (
            <option key={d} value={d}>
              {t('lastDays', { days: d })}
            </option>
          ))}
        </select>
        <button type="submit" className={buttonClasses({ variant: 'secondary' })}>
          🔍 {tc('filter')}
        </button>
      </form>

      <section aria-labelledby="glance" className="flex flex-col gap-3">
        <h2 id="glance" className="text-xl font-extrabold">
          {t('glance')}
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric icon="🎓" label={t('students')} value={number.format(students.total)} />
          <Metric
            icon="⚡"
            label={t('active')}
            value={number.format(students.active)}
            hint={t('activeHint', { days })}
          />
          <Metric icon="💤" label={t('notStarted')} value={number.format(students.notStarted)} />
          <Metric
            icon="📚"
            label={t('lessonsCompleted')}
            value={number.format(lessons.completed)}
          />
          <Metric icon="🏁" label={t('completion')} value={pct(lessons.completionPercent)} />
          <Metric icon="🎯" label={t('averageScore')} value={pct(quiz.averageScore)} />
          <Metric icon="✨" label={t('firstTry')} value={pct(quiz.firstTryCorrectPercent)} />
          <Metric icon="⭐" label={t('averageXp')} value={number.format(xp.average)} />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card as="section" aria-labelledby="progress" className="flex flex-col gap-3">
          <div>
            <h2 id="progress" className="text-xl font-extrabold">
              {t('progressTitle')}
            </h2>
            <p className="text-sm text-muted">{t('progressHint')}</p>
          </div>
          <BarList
            bars={overview.progress.map((p) => ({
              key: p.bucket,
              label: t(`bucket.${p.bucket}`),
              value: p.students,
              display: t('studentsCount', { count: p.students }),
            }))}
          />
        </Card>

        <Card as="section" aria-labelledby="engagement" className="flex flex-col gap-3">
          <div>
            <h2 id="engagement" className="text-xl font-extrabold">
              {t('engagementTitle')}
            </h2>
            <p className="text-sm text-muted">{t('engagementHint')}</p>
          </div>
          <DailyChart days={engagement.days} />
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-muted">{t('minutesPerDay')}</dt>
              <dd className="text-xl font-extrabold tabular-nums">
                {engagement.averageMinutesPerActiveDay ?? t('none')}
              </dd>
            </div>
            <div>
              <dt className="text-muted">{t('onStreak')}</dt>
              <dd className="text-xl font-extrabold tabular-nums">
                {number.format(engagement.studentsOnStreak)}
              </dd>
            </div>
          </dl>
        </Card>
      </div>

      <section aria-labelledby="worlds" className="flex flex-col gap-3">
        <h2 id="worlds" className="text-xl font-extrabold">
          {t('worldsTitle')}
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {worlds.worlds.map((w) => {
            const style = worldStyle(w.color);
            const title = contentText(w.title, locale);
            return (
              <Card
                key={w.worldId}
                as="article"
                className={`flex flex-col gap-3 border-2 ${style.card}`}
              >
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-3xl">
                    {w.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-extrabold">{title}</h3>
                    <p className="text-xs text-muted">
                      {t('lessonCount', { count: w.lessonCount })}
                    </p>
                  </div>
                  <span className="text-2xl font-extrabold tabular-nums">
                    {pct(w.completionPercent)}
                  </span>
                </div>
                <ProgressBar
                  value={w.completionPercent}
                  label={`${title}: ${t('completion')}`}
                  barClassName={style.bar}
                />
                <dl className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <dt className="text-xs text-muted">{t('started')}</dt>
                    <dd className="font-bold tabular-nums">{number.format(w.studentsStarted)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">{t('finishedWorld')}</dt>
                    <dd className="font-bold tabular-nums">{number.format(w.studentsFinished)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">{t('averageScore')}</dt>
                    <dd className="font-bold tabular-nums">{pct(w.averageScore)}</dd>
                  </div>
                </dl>
                <details>
                  <summary className="min-h-11 cursor-pointer py-2 text-sm font-bold text-brand-700">
                    {t('showLessons')}
                  </summary>
                  <ul className="flex flex-col divide-y divide-line text-sm">
                    {w.lessons.map((l) => (
                      <li key={l.lessonId} className="flex flex-col gap-1 py-2">
                        <span className="font-semibold">{contentText(l.title, locale)}</span>
                        <span className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted tabular-nums">
                          <span>
                            {t('started')}: {l.started}
                          </span>
                          <span>
                            {t('finished')}: {l.completed}
                          </span>
                          <span>
                            {t('finishRate')}: {pct(l.finishRate)}
                          </span>
                          <span>
                            {t('averageScore')}: {pct(l.averageScore)}
                          </span>
                          <span>
                            {t('avgMinutes')}: {l.averageMinutes ?? t('none')}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </details>
              </Card>
            );
          })}
        </div>
      </section>

      <div className="grid gap-3 lg:grid-cols-3">
        <LessonRanking title={t('mostCompleted')} lessons={worlds.mostCompleted} show="completed" />
        <LessonRanking
          title={t('leastCompleted')}
          lessons={worlds.leastCompleted}
          show="completed"
        />
        <LessonRanking
          title={t('hardest')}
          hint={t('hardestHint')}
          lessons={worlds.hardest}
          show="score"
        />
      </div>

      <Card as="section" aria-labelledby="activities" className="flex flex-col gap-3">
        <div>
          <h2 id="activities" className="text-xl font-extrabold">
            {t('activitiesTitle')}
          </h2>
          <p className="text-sm text-muted">
            {t('activitiesHint', { count: activities.minStudents })}
          </p>
        </div>
        {activities.activities.length === 0 ? (
          <p className="text-sm text-muted">{t('noData')}</p>
        ) : (
          <ol className="flex flex-col divide-y divide-line">
            {activities.activities.map((a) => (
              <li
                key={a.activityId}
                className="flex flex-wrap items-center justify-between gap-2 py-2"
              >
                <span className="flex min-w-0 flex-col">
                  <span className="font-semibold">
                    {contentText(a.title, locale) || contentText(a.lessonTitle, locale)}
                  </span>
                  <span className="text-xs text-muted">
                    {contentText(a.worldTitle, locale)} · {contentText(a.lessonTitle, locale)} ·{' '}
                    <span className="font-mono">{a.type}</span>
                  </span>
                </span>
                <span className="flex flex-wrap items-center gap-3 text-sm tabular-nums">
                  <span>
                    <span className="text-muted">{t('firstTry')}: </span>
                    <strong>{pct(a.firstTryCorrectPercent)}</strong>
                  </span>
                  <span>
                    <span className="text-muted">{t('tries')}: </span>
                    <strong>{a.averageTries}</strong>
                  </span>
                  <span className="text-muted">{t('studentsCount', { count: a.students })}</span>
                  {user.role === 'ADMIN' && (
                    <Link
                      href={`/admin/content/lessons/${a.lessonId}`}
                      className="font-bold text-brand-700 underline"
                    >
                      {t('editLesson')}
                    </Link>
                  )}
                </span>
              </li>
            ))}
          </ol>
        )}
      </Card>

      <Card as="section" aria-labelledby="badges" className="flex flex-col gap-3">
        <h2 id="badges" className="text-xl font-extrabold">
          {t('badgesTitle')}
        </h2>
        <BarList
          barClassName="bg-amber-400"
          bars={overview.badges.map((b) => ({
            key: b.badgeId,
            icon: b.icon,
            label: contentText(b.name, locale),
            value: b.students,
            display: t('studentsCount', { count: b.students }),
          }))}
        />
      </Card>

      <p className="text-xs text-muted">
        {t('updated', { time: time.format(new Date(overview.generatedAt)) })}
      </p>
    </>
  );
}
