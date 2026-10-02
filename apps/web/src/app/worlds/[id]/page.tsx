import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import type { LessonStatus, WorldDetail } from '@itstarter/shared';
import { AppShell } from '@/components/app-shell';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { contentText } from '@/i18n/content';
import { apiGet } from '@/lib/server-api';
import { requireUser } from '@/lib/session';
import { worldStyle } from '@/lib/worlds';

export const dynamic = 'force-dynamic';

const STATUS_STYLE: Record<LessonStatus, { chip: string; icon: string }> = {
  not_started: { chip: 'bg-slate-100 text-slate-700', icon: '○' },
  in_progress: { chip: 'bg-amber-100 text-amber-900', icon: '◐' },
  completed: { chip: 'bg-emerald-100 text-emerald-800', icon: '✓' },
};

export default async function WorldPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const world = await apiGet<WorldDetail>(`/api/worlds/${id}`);
  const t = await getTranslations('world');
  const td = await getTranslations('dashboard');
  const tc = await getTranslations('common');
  const locale = await getLocale();
  const style = worldStyle(world.color);
  const title = contentText(world.title, locale);
  const isStudent = user.role === 'STUDENT';

  return (
    <AppShell signedIn>
      <Link href="/" className="flex min-h-11 w-fit items-center font-bold text-brand-700">
        ← {t('backHome')}
      </Link>

      <Card className={`flex flex-col gap-3 ${style.card}`}>
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className={`flex size-16 shrink-0 items-center justify-center rounded-2xl text-4xl ${style.icon}`}
          >
            {world.icon}
          </span>
          <div className="min-w-0">
            <h1 className={`text-2xl font-extrabold sm:text-3xl ${style.text}`}>{title}</h1>
            {world.description && (
              <p className="text-muted">{contentText(world.description, locale)}</p>
            )}
          </div>
        </div>
        {isStudent && world.lessonsTotal > 0 && (
          <div className="flex flex-col gap-1.5">
            <ProgressBar value={world.percent} label={title} barClassName={style.bar} />
            <p className="text-sm font-semibold text-muted">
              {td('lessonsCount', { done: world.lessonsCompleted, total: world.lessonsTotal })}
            </p>
          </div>
        )}
      </Card>

      <section className="flex flex-col gap-3" aria-labelledby="lessons-title">
        <h2 id="lessons-title" className="text-xl font-extrabold">
          {t('lessons')}
        </h2>
        {world.lessons.length === 0 && <p className="text-muted">{td('comingSoon')}</p>}
        <ol className="flex flex-col gap-3">
          {world.lessons.map((lesson, index) => {
            const status = STATUS_STYLE[lesson.status];
            const action =
              lesson.status === 'completed'
                ? t('replay')
                : lesson.status === 'in_progress'
                  ? t('continue')
                  : t('start');
            return (
              <li key={lesson.id}>
                <Card className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-2xl"
                    >
                      {lesson.icon ?? index + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-extrabold leading-tight">
                        {contentText(lesson.title, locale)}
                      </h3>
                      {lesson.summary && (
                        <p className="text-sm text-muted">{contentText(lesson.summary, locale)}</p>
                      )}
                      <p className="mt-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-muted">
                        <span>⏱ {tc('minutes', { count: lesson.estimatedMinutes })}</span>
                        {isStudent && (
                          <span className={`rounded-full px-2 py-0.5 ${status.chip}`}>
                            <span aria-hidden="true">{status.icon}</span>{' '}
                            {t(`status.${lesson.status}`)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <ButtonLink
                    href={`/lessons/${lesson.id}`}
                    variant={lesson.status === 'completed' ? 'secondary' : 'primary'}
                    className="sm:w-40"
                    aria-label={`${action}: ${contentText(lesson.title, locale)}`}
                  >
                    {action}
                  </ButtonLink>
                </Card>
              </li>
            );
          })}
        </ol>
      </section>
    </AppShell>
  );
}
