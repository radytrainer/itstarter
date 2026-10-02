import { z } from 'zod';

export const LOCALES = ['en', 'km'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Text stored in the database in every supported language.
 * English is required; Khmer falls back to English until it is translated.
 */
export const localizedTextSchema = z.object({
  en: z.string().min(1),
  km: z.string().min(1).optional(),
});

export type LocalizedText = z.infer<typeof localizedTextSchema>;

export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.en;
}
