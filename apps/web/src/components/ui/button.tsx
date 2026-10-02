import Link from 'next/link';
import type { ButtonHTMLAttributes, ComponentProps } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'success';
type Size = 'md' | 'lg';

interface StyleOptions {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800',
  secondary: 'bg-surface text-ink border border-line hover:bg-slate-50 active:bg-slate-100',
  ghost: 'bg-transparent text-brand-700 hover:bg-brand-50 active:bg-brand-100',
  success: 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:bg-emerald-800',
};

// Every size keeps at least a 48px touch target.
const SIZES: Record<Size, string> = {
  md: 'min-h-12 px-4 text-base',
  lg: 'min-h-14 px-6 text-lg',
};

export function buttonClasses({ variant = 'primary', size = 'md', fullWidth }: StyleOptions = {}) {
  return [
    'inline-flex items-center justify-center gap-2 rounded-control font-bold transition-colors',
    'disabled:cursor-not-allowed disabled:opacity-50 select-none',
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? 'w-full' : '',
  ].join(' ');
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, StyleOptions {
  /** Shows this text and disables the button while an action runs. */
  loadingText?: string;
  loading?: boolean;
}

export function Button({
  variant,
  size,
  fullWidth,
  loading,
  loadingText,
  className = '',
  children,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${buttonClasses({ variant, size, fullWidth })} ${className}`}
      {...rest}
    >
      {loading && loadingText ? loadingText : children}
    </button>
  );
}

/** A link that looks like a button. */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  className = '',
  ...rest
}: ComponentProps<typeof Link> & StyleOptions) {
  return (
    <Link className={`${buttonClasses({ variant, size, fullWidth })} ${className}`} {...rest} />
  );
}
