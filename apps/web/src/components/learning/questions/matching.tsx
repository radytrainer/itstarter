'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { contentText } from '@/i18n/content';
import type { QuestionInputProps, QuestionKindDef } from './types';

type Pairs = Record<string, string>; // leftId → rightId

// Each pair gets a colour + number so matches are visible without relying on colour alone.
const PAIR_STYLES = [
  'border-violet-500 bg-violet-50',
  'border-sky-500 bg-sky-50',
  'border-emerald-500 bg-emerald-50',
  'border-amber-500 bg-amber-50',
  'border-rose-500 bg-rose-50',
  'border-teal-500 bg-teal-50',
];

/**
 * Tap-to-match: tap an item on the left, then its partner on the right. Works with touch,
 * mouse, keyboard and screen readers (unlike drag-and-drop).
 */
function MatchingInput({ question, value, onChange, disabled, locale }: QuestionInputProps<Pairs>) {
  const t = useTranslations('lesson');
  const [activeLeft, setActiveLeft] = useState<string | null>(null);
  const lefts = question.options.filter((o) => o.groupKey === 'left');
  const rights = question.options.filter((o) => o.groupKey === 'right');
  const leftIndex = (leftId: string) => lefts.findIndex((l) => l.id === leftId);
  const pairOfRight = (rightId: string) =>
    Object.entries(value).find(([, r]) => r === rightId)?.[0];

  function pickRight(rightId: string) {
    if (!activeLeft) return;
    const next = { ...value };
    const previousOwner = pairOfRight(rightId);
    if (previousOwner) delete next[previousOwner];
    next[activeLeft] = rightId;
    onChange(next);
    setActiveLeft(null);
  }

  function unpair(leftId: string) {
    const next = { ...value };
    delete next[leftId];
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted">{t('matchingHelp')}</p>
      <div className="grid grid-cols-2 gap-3">
        <ul className="flex flex-col gap-2">
          {lefts.map((left, i) => {
            const paired = value[left.id];
            const style = paired ? PAIR_STYLES[i % PAIR_STYLES.length] : '';
            const partner = rights.find((r) => r.id === paired);
            return (
              <li key={left.id}>
                <button
                  type="button"
                  disabled={disabled}
                  aria-pressed={activeLeft === left.id}
                  aria-label={
                    partner
                      ? `${contentText(left.label, locale)}, ${t('matchedWith', { item: contentText(partner.label, locale) })}`
                      : undefined
                  }
                  onClick={() =>
                    paired
                      ? unpair(left.id)
                      : setActiveLeft(activeLeft === left.id ? null : left.id)
                  }
                  className={`flex min-h-14 w-full items-center gap-2 rounded-control border-2 px-3 py-2 text-left font-bold ${
                    activeLeft === left.id
                      ? 'border-brand-600 bg-brand-100 ring-2 ring-brand-300'
                      : paired
                        ? style
                        : 'border-line bg-surface'
                  }`}
                >
                  {paired && (
                    <span
                      aria-hidden="true"
                      className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-sm"
                    >
                      {i + 1}
                    </span>
                  )}
                  {contentText(left.label, locale)}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="flex flex-col gap-2">
          {rights.map((right) => {
            const owner = pairOfRight(right.id);
            const index = owner ? leftIndex(owner) : -1;
            return (
              <li key={right.id}>
                <button
                  type="button"
                  disabled={disabled || !activeLeft}
                  onClick={() => pickRight(right.id)}
                  className={`flex min-h-14 w-full items-center gap-2 rounded-control border-2 px-3 py-2 text-left font-semibold disabled:cursor-default ${
                    owner
                      ? PAIR_STYLES[index % PAIR_STYLES.length]
                      : activeLeft
                        ? 'border-dashed border-brand-300 bg-surface'
                        : 'border-line bg-surface'
                  }`}
                >
                  {owner && (
                    <span
                      aria-hidden="true"
                      className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-sm"
                    >
                      {index + 1}
                    </span>
                  )}
                  {contentText(right.label, locale)}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export const matching: QuestionKindDef<Pairs> = {
  Input: MatchingInput,
  initial: () => ({}),
  isReady: (value, question) =>
    question.options.filter((o) => o.groupKey === 'left').every((l) => value[l.id] !== undefined),
  toAnswer: (value) => ({ pairs: Object.entries(value).map(([left, right]) => ({ left, right })) }),
  fromRevealed: (revealed) =>
    'pairs' in revealed && !('moves' in revealed)
      ? Object.fromEntries(revealed.pairs.map((p) => [p.left, p.right]))
      : {},
  describe: (revealed, question, _t, locale) => {
    if (!('pairs' in revealed) || 'moves' in revealed) return '';
    const label = (id: string) => {
      const o = question.options.find((x) => x.id === id);
      return o ? contentText(o.label, locale) : '';
    };
    return revealed.pairs.map((p) => `${label(p.left)} → ${label(p.right)}`).join(' · ');
  },
};
