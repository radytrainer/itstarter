'use client';

import { useTranslations } from 'next-intl';
import type { PlayQuestion } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import type { QuestionInputProps, QuestionKindDef } from './types';

type Choices = Record<string, string>; // part → optionId

const PART_STYLE: Record<string, string> = {
  role: 'border-violet-400 bg-violet-50',
  task: 'border-sky-400 bg-sky-50',
  context: 'border-emerald-400 bg-emerald-50',
  format: 'border-amber-400 bg-amber-50',
};

const partsOf = (question: PlayQuestion) => [
  ...new Set(question.options.map((o) => o.groupKey ?? '')),
];

/** ROLE + TASK + CONTEXT + FORMAT = a good prompt. Pick one piece per part; see the prompt grow. */
function PromptBuilderInput({
  question,
  value,
  onChange,
  disabled,
  locale,
}: QuestionInputProps<Choices>) {
  const t = useTranslations('lesson');
  const parts = partsOf(question);
  const built = parts
    .map((part) => question.options.find((o) => o.id === value[part]))
    .filter(Boolean)
    .map((o) => contentText(o!.label, locale))
    .join(' ');

  return (
    <div className="flex flex-col gap-4">
      {parts.map((part) => (
        <fieldset key={part} className="flex flex-col gap-2">
          <legend className="mb-1 text-sm font-extrabold tracking-wide">
            {t(`parts.${part}`)}
          </legend>
          {question.options
            .filter((o) => o.groupKey === part)
            .map((option) => {
              const selected = value[part] === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={disabled}
                  onClick={() => onChange({ ...value, [part]: option.id })}
                  className={`min-h-12 rounded-control border-2 px-4 py-2 text-left font-semibold ${
                    selected
                      ? (PART_STYLE[part] ?? 'border-brand-500 bg-brand-50')
                      : 'border-line bg-surface'
                  }`}
                >
                  {contentText(option.label, locale)}
                </button>
              );
            })}
        </fieldset>
      ))}
      <div aria-live="polite" className="rounded-card bg-slate-900 p-4 text-white">
        <p className="text-xs font-bold uppercase tracking-wide opacity-70">{t('yourPrompt')}</p>
        <p className="mt-1 text-lg">{built || '…'}</p>
      </div>
    </div>
  );
}

export const promptBuilder: QuestionKindDef<Choices> = {
  Input: PromptBuilderInput,
  initial: () => ({}),
  isReady: (value, question) => partsOf(question).every((part) => value[part]),
  toAnswer: (value) => ({ optionIds: Object.values(value) }),
  fromRevealed: (revealed, question) =>
    'optionIds' in revealed
      ? Object.fromEntries(
          revealed.optionIds.map((id) => [
            question.options.find((o) => o.id === id)?.groupKey ?? '',
            id,
          ]),
        )
      : {},
  describe: (revealed, question, _t, locale) =>
    'optionIds' in revealed
      ? revealed.optionIds
          .map((id) => contentText(question.options.find((o) => o.id === id)?.label, locale))
          .join(' ')
      : '',
};
