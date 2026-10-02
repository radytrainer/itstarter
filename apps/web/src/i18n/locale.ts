import { DEFAULT_LOCALE, LOCALES, type Locale } from '@itstarter/shared';

/** Cookie holding the chosen language. Set on login (from the profile) and by the language switch. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export function toLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Browser only. Not HttpOnly on purpose: it holds no secret, and the client sets it. */
export function rememberLocale(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
}
