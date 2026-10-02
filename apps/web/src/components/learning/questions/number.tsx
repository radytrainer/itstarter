'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import type { QuestionInputProps, QuestionKindDef } from './types';

/** Accepts what students naturally type: "6.50", "6,5", "$6.50", " 25 ". */
export function parseNumber(text: string): number | null {
  const cleaned = text
    .trim()
    .replace(/[$៛\s]/g, '')
    .replace(',', '.');
  if (cleaned === '' || !/^-?\d*\.?\d+$/.test(cleaned)) return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

function NumberInput({ value, onChange, disabled, review }: QuestionInputProps<string>) {
  const t = useTranslations('lesson');
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-muted">
        {t('numberLabel')}
      </label>
      <input
        id={id}
        inputMode="decimal"
        autoComplete="off"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`min-h-16 w-full max-w-xs rounded-xl border-2 bg-surface px-4 text-3xl font-extrabold tabular-nums outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-100 disabled:opacity-100 ${
          !review
            ? 'border-line'
            : review.correct
              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
              : 'border-amber-400 bg-amber-50 text-amber-950'
        }`}
      />
    </div>
  );
}

export const numberKind: QuestionKindDef<string> = {
  Input: NumberInput,
  initial: () => '',
  isReady: (value) => parseNumber(value) !== null,
  toAnswer: (value) => ({ value: parseNumber(value)! }),
  fromRevealed: (revealed) => ('value' in revealed ? String(revealed.value) : ''),
  describe: (revealed) => ('value' in revealed ? String(revealed.value) : ''),
};
