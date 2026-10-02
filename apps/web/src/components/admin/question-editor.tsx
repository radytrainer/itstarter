'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { LocalizedText } from '@itstarter/shared';
import { Button } from '../ui/button';
import {
  ConfirmButton,
  ErrorBox,
  JsonInput,
  LocalizedInput,
  SelectInput,
  TextInput,
} from './fields';
import { problemsOf, useAdminAction } from './use-admin-action';

export interface AdminOption {
  label: LocalizedText;
  isCorrect: boolean;
  groupKey: string | null;
  matchKey: string | null;
  correctOrder: number | null;
}

export interface AdminQuestion {
  id?: string;
  kind: string;
  prompt: LocalizedText;
  hint: LocalizedText | null;
  explanation: LocalizedText | null;
  difficulty: number;
  config: Record<string, unknown>;
  publicConfig: Record<string, unknown>;
  options: AdminOption[];
}

export const QUESTION_KINDS = [
  'single_choice',
  'true_false',
  'number',
  'safe_or_dangerous',
  'matching',
  'ordering',
  'generated',
  'key_combo',
  'categorize',
  'cell_select',
  'format_text',
  'prompt_builder',
] as const;

/** Kinds that use the options table (others keep their answer in "Answer settings"). */
const USES_OPTIONS = new Set([
  'single_choice',
  'matching',
  'ordering',
  'categorize',
  'prompt_builder',
]);

/** Starting answer settings for each kind, so editors see the expected shape. */
const CONFIG_TEMPLATES: Record<string, Record<string, unknown>> = {
  true_false: { answer: true },
  number: { answer: 0 },
  safe_or_dangerous: { answer: 'dangerous' },
  generated: { generator: 'addition' },
  key_combo: { answer: ['Ctrl', 'C'] },
  cell_select: { answer: 'B2' },
  format_text: { answer: { bold: true } },
};

export function emptyQuestion(): AdminQuestion {
  return {
    kind: 'single_choice',
    prompt: { en: '' },
    hint: null,
    explanation: null,
    difficulty: 1,
    config: {},
    publicConfig: {},
    options: [
      { label: { en: '' }, isCorrect: true, groupKey: null, matchKey: null, correctOrder: null },
      { label: { en: '' }, isCorrect: false, groupKey: null, matchKey: null, correctOrder: null },
    ],
  };
}

const cell = 'min-h-10 w-full rounded-lg border border-line bg-surface px-2 text-sm';

/**
 * Edits one question. The API validates it (e.g. "Mark exactly 1 correct option") and the
 * problems are listed here in plain English, so an unanswerable question can't be saved.
 */
export function QuestionEditor({
  activityId,
  question,
  onDone,
}: {
  activityId: string;
  question: AdminQuestion;
  onDone?: () => void;
}) {
  const t = useTranslations('admin.content');
  const tc = useTranslations('admin.common');
  const { run, busy, error } = useAdminAction();
  const [q, setQ] = useState<AdminQuestion>(question);
  const [config, setConfig] = useState<Record<string, unknown> | null>(question.config);
  const [publicConfig, setPublicConfig] = useState<Record<string, unknown> | null>(
    question.publicConfig,
  );
  const [configKey, setConfigKey] = useState(0); // re-mounts the JSON box when the kind changes
  const set = (patch: Partial<AdminQuestion>) => setQ((current) => ({ ...current, ...patch }));
  const setOption = (index: number, patch: Partial<AdminOption>) =>
    set({ options: q.options.map((o, i) => (i === index ? { ...o, ...patch } : o)) });

  async function save() {
    if (!config || !publicConfig) return;
    const body = { ...q, config, publicConfig, options: USES_OPTIONS.has(q.kind) ? q.options : [] };
    const ok = q.id
      ? await run('PUT', `/api/admin/questions/${q.id}`, body)
      : await run('POST', `/api/admin/activities/${activityId}/questions`, body);
    if (ok) onDone?.();
  }

  return (
    <div className="flex flex-col gap-3 rounded-control border border-line bg-slate-50 p-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <SelectInput
          label={t('kind')}
          value={q.kind}
          onChange={(kind) => {
            set({ kind });
            setConfig(CONFIG_TEMPLATES[kind] ?? {});
            setConfigKey((k) => k + 1);
          }}
          options={QUESTION_KINDS.map((k) => ({ value: k, label: k }))}
        />
        <TextInput
          label={t('difficulty')}
          type="number"
          min={1}
          max={3}
          value={q.difficulty}
          onChange={(v) => set({ difficulty: Number(v) || 1 })}
        />
      </div>
      <LocalizedInput
        label={t('prompt')}
        value={q.prompt}
        onChange={(v) => set({ prompt: v ?? { en: '' } })}
        multiline
      />
      <LocalizedInput
        label={t('hint')}
        value={q.hint}
        onChange={(v) => set({ hint: v })}
        required={false}
      />
      <LocalizedInput
        label={t('explanation')}
        value={q.explanation}
        onChange={(v) => set({ explanation: v })}
        required={false}
      />

      {USES_OPTIONS.has(q.kind) && (
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-bold">{t('options')}</legend>
          {q.options.map((option, i) => (
            <div
              key={i}
              className="grid grid-cols-2 gap-2 rounded-lg bg-white p-2 sm:grid-cols-[2fr_2fr_auto_1fr_1fr_1fr_auto]"
            >
              <input
                aria-label={`${t('label')} ${i + 1} (EN)`}
                className={cell}
                value={option.label.en}
                onChange={(e) => setOption(i, { label: { ...option.label, en: e.target.value } })}
              />
              <input
                aria-label={`${t('label')} ${i + 1} (KM)`}
                lang="km"
                className={cell}
                value={option.label.km ?? ''}
                onChange={(e) =>
                  setOption(i, {
                    label: e.target.value
                      ? { ...option.label, km: e.target.value }
                      : { en: option.label.en },
                  })
                }
              />
              <label className="flex items-center gap-1 text-sm font-semibold">
                <input
                  type="checkbox"
                  className="size-5"
                  checked={option.isCorrect}
                  onChange={(e) => setOption(i, { isCorrect: e.target.checked })}
                />
                {t('correct')}
              </label>
              <input
                aria-label={`${t('group')} ${i + 1}`}
                placeholder={t('group')}
                className={cell}
                value={option.groupKey ?? ''}
                onChange={(e) => setOption(i, { groupKey: e.target.value || null })}
              />
              <input
                aria-label={`${t('matchKey')} ${i + 1}`}
                placeholder={t('matchKey')}
                className={cell}
                value={option.matchKey ?? ''}
                onChange={(e) => setOption(i, { matchKey: e.target.value || null })}
              />
              <input
                aria-label={`${t('order')} ${i + 1}`}
                placeholder={t('order')}
                type="number"
                min={1}
                className={cell}
                value={option.correctOrder ?? ''}
                onChange={(e) =>
                  setOption(i, { correctOrder: e.target.value ? Number(e.target.value) : null })
                }
              />
              <button
                type="button"
                aria-label={`${tc('delete')} ${i + 1}`}
                onClick={() => set({ options: q.options.filter((_, j) => j !== i) })}
                className="min-h-10 rounded-lg px-2 text-amber-800"
              >
                ✕
              </button>
            </div>
          ))}
          <Button
            variant="ghost"
            className="self-start"
            onClick={() =>
              set({
                options: [
                  ...q.options,
                  {
                    label: { en: '' },
                    isCorrect: false,
                    groupKey: null,
                    matchKey: null,
                    correctOrder: null,
                  },
                ],
              })
            }
          >
            ➕ {t('addOption')}
          </Button>
        </fieldset>
      )}

      <div className="grid gap-3 lg:grid-cols-2">
        <JsonInput
          key={`c${configKey}`}
          label={t('answerConfig')}
          value={config}
          onChange={setConfig}
        />
        <JsonInput label={t('publicConfig')} value={publicConfig} onChange={setPublicConfig} />
      </div>

      {error && <ErrorBox message={error.message} problems={problemsOf(error)} />}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={save}
          loading={busy}
          loadingText={tc('saving')}
          disabled={!config || !publicConfig || !q.prompt.en}
        >
          💾 {tc('save')}
        </Button>
        {q.id && (
          <ConfirmButton
            label={tc('delete')}
            busy={busy}
            onConfirm={() => run('DELETE', `/api/admin/questions/${q.id}`)}
          />
        )}
        {!q.id && onDone && (
          <Button variant="ghost" onClick={onDone}>
            {tc('cancel')}
          </Button>
        )}
      </div>
    </div>
  );
}
