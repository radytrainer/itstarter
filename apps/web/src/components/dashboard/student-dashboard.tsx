import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import type { Dashboard } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { worldStyle } from '@/lib/worlds';
import { BadgeIcon } from '../ui/badge-icon';
import { ButtonLink } from '../ui/button';
import { InstallApp } from '../pwa';
import { Card } from '../ui/card';
import { ProgressBar } from '../ui/progress-bar';
import { StatPill } from '../ui/stat-pill';
import { WorldCard } from './world-card';

export async function StudentDashboard({ data }: { data: Dashboard }) {
  const t = await getTranslations('dashboard');
  const tc = await getTranslations('common');
  const tb = await getTranslations('badges');
  const locale = await getLocale();
  const { student, course, worlds } = data;
  const level = student.level;
  const next = data.continue;

  return (
    <>
      {/* Welcome + stats */}
      <section className="flex flex-col gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">
            {t('greeting', { name: student.displayName })}
          </h1>
          <p className="text-lg text-muted">{t('subtitle')}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatPill icon="⭐" tone="xp">
            {tc('xp', { xp: student.xpTotal })}
          </StatPill>
          <StatPill icon="🔥" tone="streak">
            {t('streak', { count: student.streak })}
          </StatPill>
          <StatPill icon={level.icon} tone="level">
            {t('level', { number: level.number })} · {contentText(level.name, locale)}
          </StatPill>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Continue learning: the one obvious next step */}
        {next ? (
          <Card className={`flex flex-col gap-3 border-2 ${worldStyle(next.worldColor).card}`}>
            <h2 className="text-sm font-extrabold uppercase tracking-wide text-muted">
              {next.started ? t('continueTitle') : t('startTitle')}
            </h2>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="text-4xl">
                {next.icon ?? '📘'}
              </span>
              <div className="min-w-0">
                <p className="text-xl font-extrabold leading-tight">
                  {contentText(next.title, locale)}
                </p>
                <p className="text-sm text-muted">{contentText(next.worldTitle, locale)}</p>
              </div>
            </div>
            <ButtonLink href={`/lessons/${next.lessonId}`} size="lg" fullWidth>
              {next.started ? t('continueButton') : t('startButton')} →
            </ButtonLink>
          </Card>
        ) : (
          <Card className="flex items-center justify-center text-center text-xl font-extrabold">
            {t('allDone')}
          </Card>
        )}

        {/* Overall progress + level */}
        <Card className="flex flex-col gap-4">
          {course && (
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-extrabold">{t('progress')}</h2>
                <span className="font-bold text-brand-700">
                  {t('percentDone', { percent: course.percent })}
                </span>
              </div>
              <ProgressBar value={course.percent} label={t('progress')} />
              <p className="text-sm text-muted">
                {t('lessonsCount', { done: course.lessonsCompleted, total: course.lessonsTotal })}
              </p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="font-extrabold">
                <span aria-hidden="true">{level.icon}</span> {contentText(level.name, locale)}
              </h2>
              <span className="text-sm font-bold text-muted">
                {t('level', { number: level.number })}
              </span>
            </div>
            <ProgressBar
              value={level.percentToNext}
              label={t('level', { number: level.number })}
              barClassName="bg-amber-400"
            />
            <p className="text-sm text-muted">
              {level.next
                ? t('toNextLevel', {
                    xp: level.xpToNext,
                    name: contentText(level.next.name, locale),
                  })
                : t('maxLevel')}
            </p>
          </div>
        </Card>
      </div>

      {/* Worlds */}
      <InstallApp variant="card" />

      <section className="flex flex-col gap-3" aria-labelledby="worlds-title">
        <h2 id="worlds-title" className="text-xl font-extrabold">
          {t('worldsTitle')}
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {worlds.map((world) => (
            <li key={world.id}>
              <WorldCard world={world} />
            </li>
          ))}
        </ul>
      </section>

      {/* Badges */}
      <section className="flex flex-col gap-3" aria-labelledby="badges-title">
        <div className="flex items-center justify-between gap-2">
          <h2 id="badges-title" className="text-xl font-extrabold">
            {t('badgesTitle')}
          </h2>
          <Link href="/badges" className="flex min-h-11 items-center px-2 font-bold text-brand-700">
            {t('seeAll')} →
          </Link>
        </div>
        <Card>
          <ul className="flex flex-wrap gap-3">
            {data.badges.map((badge) => (
              <li key={badge.code}>
                <BadgeIcon
                  icon={badge.icon}
                  name={contentText(badge.name, locale)}
                  earned={badge.earned}
                  lockedLabel={tb('locked')}
                />
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </>
  );
}
