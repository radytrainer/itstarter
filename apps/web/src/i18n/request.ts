import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { LOCALE_COOKIE, toLocale } from './locale';

// No locale in the URL: the language comes from a cookie, so links stay short and shareable.
// A page can still ask for a specific language, e.g. getTranslations({ locale: 'km' }) on the
// offline page, which shows both languages at once.
export default getRequestConfig(async ({ locale: requested }) => {
  const locale = toLocale(requested ?? (await cookies()).get(LOCALE_COOKIE)?.value);
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
