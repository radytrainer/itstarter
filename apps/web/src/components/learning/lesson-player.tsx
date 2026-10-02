'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { LessonPlay, PlayActivity } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { useErrorMessage } from '@/lib/messages';
import { LanguageSwitcher } from '../language-switcher';
import { Button } from '../ui/button';
import { ActionBar, BarMessage } from './action-bar';
import { IntroStep, LearnCards, SeeExample } from './content-steps';
import { CreationActivity } from './creation-activity';
import { learningApi } from './learning-api';
import { MouseTrainer } from './mouse-trainer';
import { QuestionActivity } from './question-activity';
import { RewardStep } from './reward-step';
import { useActiveTime } from './use-active-time';

/** Activity type → how it is shown. Question-based types all use the question runner. */
const CONTENT_RENDERERS: Record<string, typeof IntroStep> = {
  intro: IntroStep,
  learn_card: LearnCards,
  see_example: SeeExample,
};

function firstOpenIndex(lesson: LessonPlay): number {
  const progress = lesson.progress;
  if (!progress || progress.status === 'completed') return 0;
  const done = new Set(progress.completedActivityIds);
  const index = lesson.activities.findIndex((a) => !done.has(a.id) && a.type !== 'reward');
  return index === -1 ? lesson.activities.length - 1 : index;
}

/**
 * Plays any lesson from data: one activity at a time, in order
 * (welcome → learn → see → play → challenge → reward).
 */
export function LessonPlayer({ lesson }: { lesson: LessonPlay }) {
  const t = useTranslations('lesson');
  const locale = useLocale();
  const errorMessage = useErrorMessage();
  const preview = lesson.progress === null;
  const [index, setIndex] = useState(() => firstOpenIndex(lesson));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [xpGained, setXpGained] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const solved = useMemo(
    () => new Set(lesson.progress?.solvedQuestionIds ?? []),
    [lesson.progress],
  );
  const completed = useMemo(
    () => new Set(lesson.progress?.completedActivityIds ?? []),
    [lesson.progress],
  );

  const activity = lesson.activities[index] as PlayActivity;
  const total = lesson.activities.length;

  const activeTime = useActiveTime(lesson.id, !preview);

  useEffect(() => {
    if (!preview) void learningApi.start(lesson.id);
  }, [lesson.id, preview]);

  // Move focus to the new step's heading so screen readers announce it.
  useEffect(() => {
    if (index > 0) headingRef.current?.focus();
  }, [index]);

  function advance() {
    setError(null);
    setIndex((i) => Math.min(i + 1, total - 1));
    window.scrollTo({ top: 0 });
  }

  async function finishContentStep() {
    if (preview || completed.has(activity.id)) return advance();
    setBusy(true);
    const res = await learningApi.completeActivity(activity.id);
    setBusy(false);
    if (!res.success) return setError(errorMessage(res.error));
    if (res.data.xpAwarded > 0) setXpGained((x) => x + res.data.xpAwarded);
    advance();
  }

  function jumpToMissing(missing: string[]) {
    const target = lesson.activities.findIndex((a) => missing.includes(a.id));
    if (target >= 0) setIndex(target);
  }

  const ContentRenderer = CONTENT_RENDERERS[activity.type];
  const stepTitle = activity.title
    ? contentText(activity.title, locale)
    : t(`steps.${activity.step}`);

  return (
    <div className="flex flex-1 flex-col">
      {/* Slim lesson bar: exit, progress through the steps, language, XP */}
      <header className="sticky top-0 z-30 -mx-4 border-b border-line bg-canvas/90 px-4 py-2.5 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link
            href={`/worlds/${lesson.world.id}`}
            aria-label={t('exit')}
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-slate-200/70 hover:text-ink"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </Link>
          <StepProgress
            current={index}
            total={total}
            label={t('stepOf', { current: index + 1, total })}
          />
          {xpGained > 0 && (
            <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-sm font-extrabold text-amber-900 tabular-nums animate-pop">
              ⭐ +{xpGained}
            </span>
          )}
          <div className="hidden shrink-0 sm:block">
            <LanguageSwitcher signedIn />
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 pt-5 sm:pt-8">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <span aria-hidden="true">{lesson.icon}</span>
          <span className="min-w-0 truncate font-semibold text-muted">
            {contentText(lesson.title, locale)}
          </span>
          <span aria-hidden="true" className="text-slate-300">
            •
          </span>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="shrink-0 font-bold text-brand-700 outline-none"
          >
            {stepTitle}
          </h1>
        </div>

        <section key={activity.id} className="flex flex-1 flex-col gap-4 animate-rise">
          {activity.type === 'reward' ? (
            <RewardStep
              lesson={lesson}
              locale={locale}
              preview={preview}
              elapsedSeconds={activeTime.take}
              onIncomplete={jumpToMissing}
            />
          ) : activity.type === 'mouse_trainer' ? (
            <MouseTrainer activity={activity} onFinish={finishContentStep} busy={busy} />
          ) : activity.type === 'creation' ? (
            <CreationActivity
              activity={activity}
              locale={locale}
              preview={preview}
              saved={lesson.progress?.creations[activity.id]}
              onDone={(xp) => {
                if (xp > 0) setXpGained((x) => x + xp);
                advance();
              }}
            />
          ) : ContentRenderer ? (
            <>
              <ContentRenderer activity={activity} locale={locale} />
              <ActionBar tone={error ? 'warning' : 'neutral'}>
                <div className="flex min-w-0 flex-1">
                  {error && <BarMessage tone="warning" icon="!" title={error} role="alert" />}
                </div>
                <Button
                  size="lg"
                  onClick={finishContentStep}
                  loading={busy}
                  loadingText={t('next')}
                  className="w-full sm:w-auto sm:min-w-44"
                >
                  {activity.step === 'welcome' ? t('start') : t('next')} →
                </Button>
              </ActionBar>
            </>
          ) : activity.questions.length > 0 ? (
            <QuestionActivity
              activity={activity}
              locale={locale}
              preview={preview}
              solvedQuestionIds={solved}
              onDone={advance}
              onXp={(xp) => setXpGained((x) => x + xp)}
            />
          ) : (
            <ActionBar tone="learn">
              <BarMessage tone="learn" icon="i" title={t('unsupported')} />
              <Button onClick={advance}>{t('skip')}</Button>
            </ActionBar>
          )}
        </section>
      </div>
    </div>
  );
}

/** One segment per step: done (filled), current (lighter), to come (grey). */
function StepProgress({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label: string;
}) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      className="flex h-2.5 min-w-0 flex-1 gap-1"
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-full flex-1 rounded-full transition-colors duration-500 ${
            i < current ? 'bg-brand-600' : i === current ? 'bg-brand-300' : 'bg-slate-200'
          }`}
        />
      ))}
    </div>
  );
}
