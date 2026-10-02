'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { normalizeWords, type PlayQuestion } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import type { QuestionInputProps, QuestionKindDef } from './types';

interface WordValue {
  /** Tiles mode: the tiles placed, in order. */
  picked: string[];
  /** Typing mode: what the student typed. */
  typed: string;
}

/** Letters join with nothing ("c a t" → "cat"); words join with a space (sentence builder). */
const gapOf = (question: PlayQuestion) => (question.data.join === ' ' ? ' ' : '');
const tileText = (question: PlayQuestion, id: string) =>
  question.options.find((o) => o.id === id)?.label.en ?? '';

function built(value: WordValue, question: PlayQuestion): string {
  if (question.options.length === 0) return value.typed;
  return value.picked.map((id) => tileText(question, id)).join(gapOf(question));
}

/**
 * Word builder: tap letter tiles to spell a word, or word tiles to build a sentence; tap a placed
 * tile to send it back. Without tiles it is a typing box (spelling and typing practice).
 */
function WordBuilderInput({
  question,
  value,
  onChange,
  disabled,
  review,
}: QuestionInputProps<WordValue>) {
  const t = useTranslations('lesson.games');
  const inputId = useId();
  const sentence = gapOf(question) === ' ';
  const target = review?.revealed && 'word' in review.revealed ? review.revealed.word : null;

  if (question.options.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="text-sm font-bold text-muted">
          {t('typeHere')}
        </label>
        <input
          id={inputId}
          type="text"
          value={value.typed}
          onChange={(e) => onChange({ ...value, typed: e.target.value })}
          disabled={disabled}
          maxLength={120}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          lang="en"
          className={`min-h-14 rounded-control border-2 px-4 text-xl font-bold tracking-wide outline-none focus:border-brand-500 ${
            review
              ? review.correct
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-amber-400 bg-amber-50'
              : 'border-line bg-surface'
          }`}
        />
        {target && <p className="text-sm font-bold text-emerald-800">✓ {target}</p>}
      </div>
    );
  }

  const placed = new Set(value.picked);
  const free = question.options.filter((o) => !placed.has(o.id));

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">{sentence ? t('sentenceHelp') : t('spellHelp')}</p>

      {/* Answer slots */}
      <div
        aria-label={t('yourWord')}
        role="group"
        className={`flex min-h-16 flex-wrap items-center gap-1.5 rounded-2xl border-2 p-2 ${
          review
            ? review.correct
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-amber-400 bg-amber-50'
            : 'border-dashed border-brand-300 bg-brand-50/50'
        }`}
      >
        {value.picked.length === 0 && (
          <span className="px-2 text-sm text-muted">{t('tapTiles')}</span>
        )}
        {value.picked.map((id, i) => (
          <button
            key={id}
            type="button"
            disabled={disabled}
            onClick={() => onChange({ ...value, picked: value.picked.filter((p) => p !== id) })}
            aria-label={t('removeTile', { tile: tileText(question, id), position: i + 1 })}
            className={`flex min-h-12 min-w-12 items-center justify-center rounded-xl border-b-4 border-brand-700 bg-brand-600 px-3 text-xl font-extrabold text-white shadow animate-pop ${
              sentence ? 'text-lg' : 'uppercase'
            }`}
          >
            {tileText(question, id)}
          </button>
        ))}
      </div>
      {target && <p className="text-sm font-bold text-emerald-800">✓ {target}</p>}

      {/* Tiles to use */}
      <div className="flex flex-wrap justify-center gap-2">
        {free.map((o) => (
          <button
            key={o.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange({ ...value, picked: [...value.picked, o.id] })}
            className={`flex min-h-12 min-w-12 items-center justify-center rounded-xl border-2 border-b-4 border-line bg-surface px-3 text-xl font-extrabold text-ink shadow-sm transition-transform enabled:hover:border-brand-300 enabled:active:translate-y-0.5 ${
              sentence ? 'text-lg' : 'uppercase'
            }`}
          >
            {contentText(o.label, 'en')}
          </button>
        ))}
      </div>

      {value.picked.length > 0 && !disabled && (
        <button
          type="button"
          onClick={() => onChange({ ...value, picked: [] })}
          className="self-center text-sm font-semibold text-brand-700 underline underline-offset-4"
        >
          ↺ {t('startOver')}
        </button>
      )}
    </div>
  );
}

export const wordBuilder: QuestionKindDef<WordValue> = {
  Input: WordBuilderInput,
  initial: () => ({ picked: [], typed: '' }),
  isReady: (value) => value.picked.length > 0 || value.typed.trim().length > 0,
  toAnswer: (value, question) => ({ word: built(value, question) }),
  fromRevealed: (revealed, question) => {
    if (!('word' in revealed)) return { picked: [], typed: '' };
    if (question.options.length === 0) return { picked: [], typed: revealed.word };
    // Put the tiles in the right order (greedy: each piece takes the first free tile).
    const pieces = gapOf(question) === ' ' ? revealed.word.split(/\s+/) : [...revealed.word];
    const free = [...question.options];
    const picked: string[] = [];
    for (const piece of pieces) {
      const i = free.findIndex(
        (o) => normalizeWords(o.label.en) === normalizeWords(piece) || o.label.en === piece,
      );
      if (i >= 0) picked.push(free.splice(i, 1)[0]!.id);
    }
    return { picked, typed: '' };
  },
  describe: (revealed) => ('word' in revealed ? revealed.word : ''),
};
