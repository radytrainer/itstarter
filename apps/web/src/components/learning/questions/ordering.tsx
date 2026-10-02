'use client';

import { useTranslations } from 'next-intl';
import { contentText } from '@/i18n/content';
import type { QuestionInputProps, QuestionKindDef } from './types';

/** Reorder with ▲/▼ buttons: big touch targets and fully keyboard/screen-reader friendly. */
function OrderingInput({
  question,
  value,
  onChange,
  disabled,
  locale,
}: QuestionInputProps<string[]>) {
  const t = useTranslations('lesson');
  const byId = new Map(question.options.map((o) => [o.id, o]));

  function move(index: number, delta: -1 | 1) {
    const target = index + delta;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target]!, next[index]!];
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted">{t('orderingHelp')}</p>
      <ol className="flex flex-col gap-2">
        {value.map((id, index) => {
          const label = contentText(byId.get(id)?.label, locale);
          return (
            <li
              key={id}
              className="flex items-center gap-2 rounded-control border-2 border-line bg-surface p-2 animate-rise"
            >
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-100 font-extrabold text-brand-800"
              >
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 font-semibold">{label}</span>
              <span className="flex shrink-0 flex-col gap-1 sm:flex-row">
                <button
                  type="button"
                  disabled={disabled || index === 0}
                  onClick={() => move(index, -1)}
                  aria-label={t('moveUp', { item: label })}
                  className="flex size-11 items-center justify-center rounded-lg border border-line bg-surface text-lg disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  disabled={disabled || index === value.length - 1}
                  onClick={() => move(index, 1)}
                  aria-label={t('moveDown', { item: label })}
                  className="flex size-11 items-center justify-center rounded-lg border border-line bg-surface text-lg disabled:opacity-30"
                >
                  ▼
                </button>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export const ordering: QuestionKindDef<string[]> = {
  Input: OrderingInput,
  initial: (question) => question.options.map((o) => o.id),
  isReady: () => true,
  toAnswer: (value) => ({ order: value }),
  fromRevealed: (revealed, question) =>
    'order' in revealed ? revealed.order : question.options.map((o) => o.id),
  describe: (revealed, question, _t, locale) =>
    'order' in revealed
      ? revealed.order
          .map(
            (id, i) =>
              `${i + 1}. ${contentText(question.options.find((o) => o.id === id)?.label, locale)}`,
          )
          .join('  ')
      : '',
};
