'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import type { LocalizedText, PlayActivity } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { useErrorMessage } from '@/lib/messages';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Feedback } from '../ui/feedback';
import { learningApi } from './learning-api';

interface Field {
  key: string;
  label: LocalizedText;
  placeholder?: LocalizedText;
  maxLength: number;
  multiline: boolean;
}

type Template = 'document' | 'slides' | 'prompt' | 'budget';

const fieldClasses =
  'w-full rounded-control border border-line bg-surface px-4 py-3 text-lg focus:border-brand-500';

/** Live preview: what the student is making looks like a real document / slides / prompt / sheet. */
function Preview({
  template,
  fields,
  values,
  title,
  locale,
}: {
  template: Template;
  fields: Field[];
  values: Record<string, string>;
  title: string;
  locale: string;
}) {
  const t = useTranslations('lesson.creation');

  if (template === 'slides') {
    return (
      <ol className="grid gap-3 sm:grid-cols-3">
        {fields.map((f, i) => (
          <li
            key={f.key}
            className="flex aspect-video flex-col gap-1 overflow-hidden rounded-xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-white p-3"
          >
            <span className="text-xs font-bold text-muted">{t('slide', { number: i + 1 })}</span>
            <span className="font-extrabold leading-tight">
              {contentText(f.label, locale).split('·').pop()?.trim()}
            </span>
            <span className="text-sm break-words">{values[f.key]}</span>
          </li>
        ))}
      </ol>
    );
  }

  if (template === 'budget') {
    const total = fields.reduce(
      (sum, f) => sum + (Number(values[f.key]?.replace(',', '.')) || 0),
      0,
    );
    return (
      <table className="w-full border-collapse overflow-hidden rounded-xl border border-line text-left">
        <tbody>
          {fields.map((f) => (
            <tr key={f.key} className="border-b border-line">
              <th scope="row" className="bg-slate-50 px-3 py-2 font-semibold">
                {contentText(f.label, locale)}
              </th>
              <td className="px-3 py-2 text-right tabular-nums">{values[f.key] || '0'}</td>
            </tr>
          ))}
          <tr className="bg-emerald-50 font-extrabold">
            <th scope="row" className="px-3 py-2">
              =SUM · {t('total')}
            </th>
            <td className="px-3 py-2 text-right tabular-nums">
              ${Math.round(total * 100) / 100} {t('perWeek')}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  if (template === 'prompt') {
    const colors = ['bg-violet-100', 'bg-sky-100', 'bg-emerald-100', 'bg-amber-100'];
    return (
      <p className="rounded-card bg-slate-900 p-4 text-lg leading-relaxed text-white">
        {fields.map((f, i) =>
          values[f.key] ? (
            <span
              key={f.key}
              className={`mr-1 rounded px-1 text-slate-900 ${colors[i % colors.length]}`}
            >
              {values[f.key]}
            </span>
          ) : null,
        )}
        {fields.every((f) => !values[f.key]) && '…'}
      </p>
    );
  }

  // document
  return (
    <div className="rounded-sm border border-line bg-white p-5 shadow-card">
      <p className="mb-3 text-center text-2xl font-extrabold">{title}</p>
      <dl className="flex flex-col gap-1">
        {fields.map((f) => (
          <div key={f.key} className="flex flex-wrap gap-1">
            <dt className="font-bold">{contentText(f.label, locale)}:</dt>
            <dd className="break-words">{values[f.key]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Creative work (My Profile, My Weekly Budget, My Dream slides, My Own Prompt). Saved, never graded. */
export function CreationActivity({
  activity,
  locale,
  preview,
  saved,
  onDone,
}: {
  activity: PlayActivity;
  locale: string;
  preview: boolean;
  saved: Record<string, string> | undefined;
  onDone: (xp: number) => void;
}) {
  const t = useTranslations('lesson.creation');
  const errorMessage = useErrorMessage();
  const fields = (activity.config.fields ?? []) as Field[];
  const template = (activity.config.template ?? 'document') as Template;
  const [values, setValues] = useState<Record<string, string>>(() => saved ?? {});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const complete = fields.every((f) => values[f.key]?.trim());
  const title = activity.title ? contentText(activity.title, locale) : '';

  async function save(event: FormEvent) {
    event.preventDefault();
    if (preview) return onDone(0);
    setBusy(true);
    setError(null);
    const res = await learningApi.saveCreation(activity.id, values);
    setBusy(false);
    if (!res.success) return setError(errorMessage(res.error));
    onDone(res.data.xpAwarded);
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-5">
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="flex flex-col gap-4">
          {fields.map((f) => {
            const id = `${activity.id}-${f.key}`;
            const common = {
              id,
              value: values[f.key] ?? '',
              maxLength: f.maxLength,
              placeholder: f.placeholder ? contentText(f.placeholder, locale) : undefined,
              inputMode: template === 'budget' ? ('decimal' as const) : undefined,
              onChange: (e: { target: { value: string } }) =>
                setValues((v) => ({ ...v, [f.key]: e.target.value })),
            };
            return (
              <div key={f.key} className="flex flex-col gap-1.5">
                <label htmlFor={id} className="font-semibold">
                  {contentText(f.label, locale)}
                </label>
                {f.multiline ? (
                  <textarea rows={3} className={fieldClasses} {...common} />
                ) : (
                  <input className={`min-h-12 ${fieldClasses}`} {...common} />
                )}
              </div>
            );
          })}
        </Card>
        <section aria-label={t('preview')} className="flex flex-col gap-2">
          <p className="text-sm font-bold uppercase tracking-wide text-muted">{t('preview')}</p>
          <Preview
            template={template}
            fields={fields}
            values={values}
            title={title}
            locale={locale}
          />
        </section>
      </div>
      {error && (
        <Feedback tone="warning" role="alert">
          {error}
        </Feedback>
      )}
      <Button
        type="submit"
        size="lg"
        variant="success"
        disabled={!preview && !complete}
        loading={busy}
        loadingText={t('saving')}
        className="sm:w-64 sm:self-end"
      >
        💾 {t('save')}
      </Button>
    </form>
  );
}
