'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { PlayOption } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import type { QuestionInputProps, QuestionKindDef } from './types';

interface MemoryValue {
  pairs: { a: string; b: string }[];
  moves: number;
}

/** How long two different cards stay face up before turning back. */
const PEEK_MS = 1000;

function CardFace({ option, locale }: { option: PlayOption; locale: string }) {
  const emoji = option.media?.type === 'emoji' ? option.media.src : null;
  const label = contentText(option.label, locale);
  return (
    <>
      {emoji && (
        <span aria-hidden="true" className="text-3xl leading-none sm:text-4xl">
          {emoji}
        </span>
      )}
      <span
        className={`break-words text-center font-extrabold leading-tight ${
          label.length > 14 ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
        }`}
      >
        {label}
      </span>
    </>
  );
}

/**
 * Memory cards: turn over two cards at a time to find the pairs (word ↔ picture,
 * shortcut ↔ action, English ↔ Khmer). Found pairs stay face up. Fewer turns = better score.
 */
function MemoryInput({
  question,
  value,
  onChange,
  disabled,
  locale,
  review,
  submit,
}: QuestionInputProps<MemoryValue>) {
  const t = useTranslations('lesson.games');
  const [open, setOpen] = useState<string[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const cards = question.options;
  const totalPairs = cards.length / 2;
  const matched = new Set(value.pairs.flatMap((p) => [p.a, p.b]));
  const showAll = Boolean(review) || matched.size === cards.length;

  function turn(card: PlayOption) {
    if (disabled || matched.has(card.id) || open.includes(card.id) || open.length === 2) return;
    if (open.length === 0) return setOpen([card.id]);

    const first = cards.find((c) => c.id === open[0])!;
    const moves = value.moves + 1;
    if (first.groupKey === card.groupKey) {
      const pairs = [...value.pairs, { a: first.id, b: card.id }];
      setOpen([]);
      onChange({ pairs, moves });
      if (pairs.length === totalPairs) {
        timer.current = setTimeout(() => submit?.({ pairs, moves }), 700);
      }
    } else {
      setOpen([first.id, card.id]);
      onChange({ ...value, moves });
      timer.current = setTimeout(() => setOpen([]), PEEK_MS);
    }
  }

  const columns = cards.length <= 6 ? 'grid-cols-3' : 'grid-cols-4';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-muted">
        <span>{t('memoryHelp')}</span>
        <span aria-live="polite" className="tabular-nums">
          {t('pairsFound', { found: value.pairs.length, total: totalPairs })} ·{' '}
          {t('moves', { count: value.moves })}
        </span>
      </div>
      <div className={`grid gap-2 sm:gap-3 ${columns}`}>
        {cards.map((card, i) => {
          const isMatched = matched.has(card.id);
          const faceUp = showAll || isMatched || open.includes(card.id);
          return (
            <button
              key={card.id}
              type="button"
              disabled={disabled || isMatched}
              onClick={() => turn(card)}
              aria-label={
                faceUp ? contentText(card.label, locale) : t('cardFaceDown', { number: i + 1 })
              }
              className="aspect-[4/5] [perspective:800px] disabled:cursor-default"
            >
              <span
                className={`relative block size-full transition-transform duration-500 [transform-style:preserve-3d] ${
                  faceUp ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* Back of the card */}
                <span className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-brand-700 bg-gradient-to-br from-brand-500 to-brand-700 text-3xl text-white shadow-md [backface-visibility:hidden]">
                  <span aria-hidden="true">✦</span>
                </span>
                {/* Face */}
                <span
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-2xl border-2 p-1.5 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                    isMatched
                      ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                      : 'border-brand-300 bg-surface text-ink'
                  }`}
                >
                  <CardFace option={card} locale={locale} />
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const memoryGame: QuestionKindDef<MemoryValue> = {
  Input: MemoryInput,
  selfSubmit: true,
  restartOnRetry: true,
  initial: () => ({ pairs: [], moves: 0 }),
  isReady: (value, question) => value.pairs.length * 2 === question.options.length,
  toAnswer: (value) => ({ pairs: value.pairs, moves: Math.max(value.moves, 1) }),
  fromRevealed: (revealed) =>
    'pairs' in revealed && 'moves' in revealed
      ? { pairs: revealed.pairs, moves: revealed.moves }
      : { pairs: [], moves: 0 },
  describe: (revealed, question, _t, locale) => {
    if (!('pairs' in revealed) || !('moves' in revealed)) return '';
    const label = (id: string) =>
      contentText(question.options.find((o) => o.id === id)?.label, locale);
    return revealed.pairs.map((p) => `${label(p.a)} ↔ ${label(p.b)}`).join(' · ');
  },
};
