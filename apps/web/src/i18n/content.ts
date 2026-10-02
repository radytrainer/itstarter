import { localize, type Locale, type LocalizedText } from '@itstarter/shared';
import { toLocale } from './locale';

/** Picks the right language from database content ({ en, km }); falls back to English. */
export function contentText(text: LocalizedText | null | undefined, locale: string): string {
  return text ? localize(text, toLocale(locale) as Locale) : '';
}
