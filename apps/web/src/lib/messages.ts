'use client';

import { useTranslations } from 'next-intl';
import type { ApiErrorBody } from '@itstarter/shared';

/**
 * Turns an API error into a message in the user's language. Known codes use our translations;
 * anything else falls back to a generic friendly message (never a raw technical one).
 */
export function useErrorMessage() {
  const t = useTranslations('errors');
  return (error: ApiErrorBody): string => {
    const code = error.code;
    if (code === 'RATE_LIMITED') {
      const seconds = (error.details as { retryAfterSeconds?: number } | undefined)
        ?.retryAfterSeconds;
      return t('RATE_LIMITED', { minutes: Math.max(1, Math.ceil((seconds ?? 60) / 60)) });
    }
    return t.has(code) ? t(code) : t('generic');
  };
}

/** A different encouraging phrase each time, from the translated list. */
export function pickPhrase(phrases: string[], seed: number): string {
  if (phrases.length === 0) return '';
  return phrases[Math.abs(Math.floor(seed)) % phrases.length]!;
}
