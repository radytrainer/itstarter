'use client';

import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { LocalizedText } from '@itstarter/shared';
import { Button } from '../ui/button';
import { Feedback } from '../ui/feedback';

const inputClass =
  'min-h-11 w-full rounded-control border border-line bg-surface px-3 py-2 text-base focus:border-brand-500';

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: (id: string) => React.ReactNode;
  hint?: string;
}) {
  const id = useId();
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      {children(id)}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function TextInput({
  label,
  value,
  onChange,
  type = 'text',
  ...rest
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      {(id) => (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
          {...rest}
        />
      )}
    </Field>
  );
}

/** English (required) + Khmer (optional) side by side. */
export function LocalizedInput({
  label,
  value,
  onChange,
  multiline,
  required = true,
}: {
  label: string;
  value: LocalizedText | null | undefined;
  onChange: (value: LocalizedText | null) => void;
  multiline?: boolean;
  required?: boolean;
}) {
  const t = useTranslations('admin.common');
  const en = value?.en ?? '';
  const km = value?.km ?? '';
  const update = (next: { en: string; km: string }) => {
    if (!next.en.trim() && !next.km.trim() && !required) return onChange(null);
    onChange(next.km.trim() ? { en: next.en, km: next.km } : { en: next.en });
  };
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="mb-1 text-sm font-bold">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        <Field label={t('english')}>
          {(id) => (
            <Tag
              id={id}
              value={en}
              required={required}
              onChange={(e) => update({ en: e.target.value, km })}
              className={inputClass}
              rows={2}
            />
          )}
        </Field>
        <Field label={t('khmer')}>
          {(id) => (
            <Tag
              id={id}
              lang="km"
              value={km}
              onChange={(e) => update({ en, km: e.target.value })}
              className={inputClass}
              rows={2}
            />
          )}
        </Field>
      </div>
    </fieldset>
  );
}

export function SelectInput<V extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: V;
  onChange: (value: V) => void;
  options: { value: V; label: string }[];
}) {
  return (
    <Field label={label}>
      {(id) => (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as V)}
          className={inputClass}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}

/** JSON editor for advanced settings. Reports whether the text is valid JSON. */
export function JsonInput({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: unknown;
  onChange: (value: Record<string, unknown> | null) => void;
  hint?: string;
}) {
  const t = useTranslations('admin.common');
  const [text, setText] = useState(() => JSON.stringify(value ?? {}, null, 2));
  const [invalid, setInvalid] = useState(false);
  return (
    <Field label={label} hint={hint}>
      {(id) => (
        <>
          <textarea
            id={id}
            value={text}
            spellCheck={false}
            rows={Math.min(12, Math.max(3, text.split('\n').length))}
            aria-invalid={invalid}
            onChange={(e) => {
              setText(e.target.value);
              try {
                const parsed: unknown = JSON.parse(e.target.value || '{}');
                const ok = parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed);
                setInvalid(!ok);
                onChange(ok ? (parsed as Record<string, unknown>) : null);
              } catch {
                setInvalid(true);
                onChange(null);
              }
            }}
            className={`${inputClass} font-mono text-sm aria-[invalid=true]:border-amber-500`}
          />
          {invalid && <p className="text-sm text-amber-800">{t('invalidJson')}</p>}
        </>
      )}
    </Field>
  );
}

/** Deleting needs two presses, so a mis-tap can't remove anything. */
export function ConfirmButton({
  label,
  onConfirm,
  busy,
}: {
  label: string;
  onConfirm: () => void;
  busy?: boolean;
}) {
  const t = useTranslations('admin.common');
  const [armed, setArmed] = useState(false);
  return (
    <Button
      variant="secondary"
      className="!text-amber-800"
      loading={busy}
      onClick={() => {
        if (armed) {
          setArmed(false);
          onConfirm();
        } else {
          setArmed(true);
        }
      }}
      onBlur={() => setArmed(false)}
    >
      {armed ? t('confirmDelete') : `🗑️ ${label}`}
    </Button>
  );
}

/** A one-time password, big and easy to read out loud. */
export function TemporaryPassword({ username, password }: { username: string; password: string }) {
  const t = useTranslations('admin.students');
  return (
    <Feedback tone="info" icon="🔑" title={t('tempPasswordTitle', { username })}>
      <p className="my-2 rounded-control bg-white px-3 py-2 font-mono text-2xl font-extrabold tracking-wide text-ink">
        {password}
      </p>
      <p className="text-sm">{t('tempPasswordHelp')}</p>
    </Feedback>
  );
}

export function ErrorBox({ message, problems }: { message: string; problems?: string[] }) {
  return (
    <Feedback tone="warning" role="alert" title={message}>
      {problems && problems.length > 0 && (
        <ul className="list-disc pl-5">
          {problems.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
    </Feedback>
  );
}

export const STATUS_OPTIONS = ['draft', 'published', 'archived'] as const;
