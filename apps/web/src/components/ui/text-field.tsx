'use client';

import { useId, useState, type InputHTMLAttributes } from 'react';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  /** Help text under the field (also announced by screen readers). */
  hint?: string;
  /** Problem text; marks the field invalid. */
  error?: string;
}

const INPUT_CLASSES =
  'min-h-12 w-full rounded-control border border-line bg-surface px-4 text-lg text-ink ' +
  'placeholder:text-slate-400 focus:border-brand-500 aria-[invalid=true]:border-amber-500';

export function TextField({ label, hint, error, className = '', ...input }: TextFieldProps) {
  const id = useId();
  const describedBy = error || hint ? `${id}-help` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className={`${INPUT_CLASSES} ${className}`}
        {...input}
      />
      {(error || hint) && (
        <p
          id={`${id}-help`}
          aria-live="polite"
          className={`text-sm ${error ? 'text-amber-800' : 'text-muted'}`}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

interface PasswordFieldProps extends Omit<TextFieldProps, 'type'> {
  showLabel: string;
  hideLabel: string;
}

export function PasswordField({
  showLabel,
  hideLabel,
  label,
  hint,
  error,
  ...input
}: PasswordFieldProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const describedBy = error || hint ? `${id}-help` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={INPUT_CLASSES}
          {...input}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          aria-controls={id}
          className="min-h-12 min-w-16 shrink-0 rounded-control border border-line bg-surface px-3 font-semibold text-brand-700"
        >
          {visible ? hideLabel : showLabel}
        </button>
      </div>
      {(error || hint) && (
        <p
          id={`${id}-help`}
          aria-live="polite"
          className={`text-sm ${error ? 'text-amber-800' : 'text-muted'}`}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
