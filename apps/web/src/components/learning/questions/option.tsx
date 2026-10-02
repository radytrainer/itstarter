'use client';

import { useId, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import type { Review } from './types';

/**
 * One answer option (multiple choice, true/false, safe/dangerous). Same look everywhere:
 * idle → selected → after Check, the right one turns green ✓ and the student's own pick is marked
 * "Your answer" (amber, never red: feedback is never punishing).
 */
export type OptionState = 'idle' | 'selected' | 'correct' | 'yours' | 'dimmed';

export function optionState(
  selected: boolean,
  isRight: boolean,
  review: Review | null | undefined,
) {
  if (!review) return selected ? 'selected' : 'idle';
  if (review.correct) return selected ? 'correct' : 'dimmed';
  if (isRight) return 'correct';
  return selected ? 'yours' : 'dimmed';
}

const BOX: Record<OptionState, string> = {
  idle: 'border-line bg-surface hover:border-brand-300 hover:bg-brand-50/60',
  selected: 'border-brand-600 bg-brand-50 text-brand-900 shadow-sm',
  correct: 'border-emerald-500 bg-emerald-50 text-emerald-900',
  yours: 'border-amber-400 bg-amber-50 text-amber-950',
  dimmed: 'border-line bg-surface opacity-55',
};

const BADGE: Record<OptionState, string> = {
  idle: 'border-slate-300 bg-surface text-muted group-hover:border-brand-400 group-hover:text-brand-700',
  selected: 'border-brand-600 bg-brand-600 text-white',
  correct: 'border-emerald-600 bg-emerald-600 text-white',
  yours: 'border-amber-500 bg-amber-500 text-white',
  dimmed: 'border-slate-200 bg-surface text-slate-400',
};

const TAG: Partial<Record<OptionState, string>> = {
  correct: 'bg-emerald-600 text-white',
  yours: 'bg-amber-500 text-white',
};

interface OptionButtonProps {
  state: OptionState;
  /** The student's own choice (announced as checked, before and after Check). */
  selected: boolean;
  /** Shown in the key badge: A, B, C… (rows) — keyboard shortcut too. */
  letter?: string;
  /** Emoji picture (shown big in tiles). */
  emoji?: string;
  layout?: 'row' | 'tile';
  disabled: boolean;
  onSelect: () => void;
  children: ReactNode;
}

export function OptionButton({
  state,
  selected,
  letter,
  emoji,
  layout = 'row',
  disabled,
  onSelect,
  children,
}: OptionButtonProps) {
  const t = useTranslations('lesson');
  const tagId = useId();
  const tag = state === 'correct' ? t('correctAnswer') : state === 'yours' ? t('yourAnswer') : null;

  const tagEl = tag && (
    // Not part of the option's name (screen readers hear it as a description instead).
    <span
      id={tagId}
      aria-hidden="true"
      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${TAG[state]}`}
    >
      {state === 'correct' ? '✓ ' : ''}
      {tag}
    </span>
  );

  if (layout === 'tile') {
    return (
      <button
        type="button"
        role="radio"
        aria-checked={selected}
        aria-describedby={tag ? tagId : undefined}
        disabled={disabled}
        onClick={onSelect}
        className={`group relative flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border-2 px-4 pt-6 pb-4 text-lg font-extrabold transition-all duration-150 enabled:active:scale-[0.98] ${BOX[state]}`}
      >
        {emoji && (
          <span aria-hidden="true" className="text-4xl leading-none">
            {emoji}
          </span>
        )}
        <span>{children}</span>
        {tag && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2">{tagEl}</span>}
      </button>
    );
  }

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-describedby={tag ? tagId : undefined}
      disabled={disabled}
      onClick={onSelect}
      className={`group flex min-h-14 w-full items-center gap-3 rounded-xl border-2 px-3.5 py-3 text-left text-base font-semibold transition-all duration-150 enabled:active:scale-[0.99] sm:text-lg ${BOX[state]}`}
    >
      {letter && (
        <span
          aria-hidden="true"
          className={`flex size-8 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-extrabold transition-colors ${BADGE[state]}`}
        >
          {state === 'correct' ? '✓' : letter}
        </span>
      )}
      {emoji && (
        <span aria-hidden="true" className="text-2xl leading-none">
          {emoji}
        </span>
      )}
      <span className="min-w-0 flex-1 break-words">{children}</span>
      {tagEl}
    </button>
  );
}

export const LETTERS = 'ABCDEFGHI';
