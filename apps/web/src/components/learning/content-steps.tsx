'use client';

import type { LocalizedText, PlayActivity } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { SpeakButton } from './speak-button';
import { Card } from '../ui/card';

// Renderers for the unscored steps. Their content comes from activity.config (public data).

interface Props {
  activity: PlayActivity;
  locale: string;
}

const text = (value: unknown, locale: string) =>
  value && typeof value === 'object' ? contentText(value as LocalizedText, locale) : '';

export function IntroStep({ activity, locale }: Props) {
  const { emoji, message } = activity.config as { emoji?: string; message?: LocalizedText };
  return (
    <Card className="flex flex-col items-center gap-5 px-6 py-10 text-center sm:py-14">
      <span
        aria-hidden="true"
        className="flex size-24 items-center justify-center rounded-full bg-brand-50 text-6xl animate-pop"
      >
        {emoji ?? '👋'}
      </span>
      <p className="max-w-lg text-xl font-bold leading-snug text-ink sm:text-2xl">
        {text(message, locale)}
      </p>
    </Card>
  );
}

export function LearnCards({ activity, locale }: Props) {
  const cards = (activity.config.cards ?? []) as {
    emoji?: string;
    title?: LocalizedText;
    body?: LocalizedText;
    /** English to read aloud (vocabulary cards). */
    say?: string;
  }[];
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {cards.map((card, i) => (
        <li key={i} className="animate-rise" style={{ animationDelay: `${i * 80}ms` }}>
          <Card className="flex h-full gap-3">
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-2xl"
            >
              {card.emoji}
            </span>
            <div className="flex min-w-0 flex-col gap-1">
              <h3 className="text-lg font-bold leading-snug">{text(card.title, locale)}</h3>
              <p className="leading-relaxed text-muted">{text(card.body, locale)}</p>
              {card.say && (
                <span className="mt-1">
                  <SpeakButton text={card.say} size="sm" />
                </span>
              )}
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export function SeeExample({ activity, locale }: Props) {
  const { example, levels, explanation } = activity.config as {
    /** Symbols only (a string) or words in both languages. */
    example?: string | LocalizedText;
    levels?: LocalizedText[];
    explanation?: LocalizedText;
  };
  return (
    <div className="flex flex-col gap-4">
      {example && (
        <Card className="bg-slate-900 text-center text-2xl font-extrabold tracking-wide text-white sm:text-3xl">
          <span className="break-words whitespace-pre-line">
            {typeof example === 'string' ? example : contentText(example, locale)}
          </span>
        </Card>
      )}
      {levels && (
        <ol className="flex flex-col gap-2">
          {levels.map((level, i) => (
            <li key={i}>
              <Card className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rose-100 font-extrabold text-rose-800">
                  {i + 1}
                </span>
                <span className="font-semibold">{contentText(level, locale)}</span>
              </Card>
            </li>
          ))}
        </ol>
      )}
      {explanation && (
        <p className="text-center text-lg font-semibold text-muted">
          💡 {text(explanation, locale)}
        </p>
      )}
    </div>
  );
}
