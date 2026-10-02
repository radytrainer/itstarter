'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { LessonCompleteResult, LessonPlay, LocalizedText } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { useErrorMessage } from '@/lib/messages';
import { BadgeIcon } from '../ui/badge-icon';
import { Button, ButtonLink } from '../ui/button';
import { Card } from '../ui/card';
import { Feedback } from '../ui/feedback';
import { learningApi } from './learning-api';

interface Props {
  lesson: LessonPlay;
  locale: string;
  preview: boolean;
  /** Active seconds not reported yet (they are sent with "lesson complete"). */
  elapsedSeconds: () => number;
  /** Server says something is unfinished: jump back to it. */
  onIncomplete: (missingActivityIds: string[]) => void;
}

export function RewardStep({ lesson, locale, preview, elapsedSeconds, onIncomplete }: Props) {
  const t = useTranslations('lesson');
  const errorMessage = useErrorMessage();
  const [result, setResult] = useState<LessonCompleteResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sent = useRef(false);
  const message = lesson.activities.at(-1)?.config.message as LocalizedText | undefined;

  async function complete() {
    setError(null);
    const res = await learningApi.completeLesson(lesson.id, elapsedSeconds());
    if (res.success) return setResult(res.data);
    if (res.error.code === 'LESSON_INCOMPLETE') {
      const missing =
        (res.error.details as { missingActivityIds?: string[] } | undefined)?.missingActivityIds ??
        [];
      return onIncomplete(missing);
    }
    setError(errorMessage(res.error));
  }

  useEffect(() => {
    if (preview || sent.current) return;
    sent.current = true;
    void complete();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- complete exactly once on arrival
  }, []);

  const worldHref = `/worlds/${lesson.world.id}`;

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <span aria-hidden="true" className="text-7xl animate-pop">
        🎉
      </span>
      <h2 className="text-3xl font-extrabold">{t('complete.title')}</h2>
      {message && <p className="text-xl font-semibold">{contentText(message, locale)}</p>}

      {result && (
        <div role="status" className="flex w-full max-w-sm flex-col gap-3">
          {result.firstCompletion ? (
            <Card className="border-2 border-amber-300 bg-amber-50 text-3xl font-extrabold text-amber-900 animate-pop">
              ⭐ {t('complete.xpEarned', { xp: result.lessonXpTotal })}
            </Card>
          ) : (
            <Feedback tone="info">{t('complete.noNewXp')}</Feedback>
          )}
          {result.levelUp && (
            <Card className="border-2 border-brand-300 bg-brand-50 text-xl font-extrabold text-brand-800 animate-pop">
              {t('complete.levelUp', {
                icon: result.level.icon,
                name: contentText(result.level.name, locale),
              })}
            </Card>
          )}
          {result.newAwards.length > 0 && (
            <Card className="flex flex-col gap-3 border-2 border-amber-300 bg-gradient-to-b from-amber-50 to-white">
              <p className="font-extrabold">{t('complete.newAwards')}</p>
              <ul className="flex flex-col gap-2">
                {result.newAwards.map((award) => (
                  <li key={award.code} className="flex items-center gap-3 text-left animate-pop">
                    <BadgeIcon
                      icon={award.icon}
                      name={contentText(award.name, locale)}
                      earned
                      lockedLabel=""
                    />
                    <span className="flex flex-col">
                      <span className="text-lg font-extrabold">
                        {contentText(award.name, locale)}
                      </span>
                      {award.xpBonus > 0 && (
                        <span className="text-sm font-bold text-amber-800">
                          {t('complete.bonus', { xp: award.xpBonus })}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
          {result.streak > 0 && (
            <p className="text-lg font-bold">{t('complete.streak', { count: result.streak })}</p>
          )}
        </div>
      )}

      {error && (
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Feedback tone="warning" role="alert">
            {error}
          </Feedback>
          <Button onClick={complete}>{t('tryAgain')}</Button>
        </div>
      )}

      {(result || preview) && (
        <div className="flex w-full max-w-sm flex-col gap-3">
          {(result?.nextLessonId ?? lesson.nextLessonId) && (
            <ButtonLink
              href={`/lessons/${result?.nextLessonId ?? lesson.nextLessonId}`}
              size="lg"
              fullWidth
            >
              {t('complete.nextLesson')} →
            </ButtonLink>
          )}
          <ButtonLink href={worldHref} variant="secondary" fullWidth>
            {t('complete.backToWorld')}
          </ButtonLink>
          <ButtonLink href="/" variant="ghost" fullWidth>
            {t('complete.home')}
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
