import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactElement } from 'react';
import en from '../messages/en.json';
import km from '../messages/km.json';

/** Renders a component the way the app does: inside the translation provider. */
export function renderWithIntl(ui: ReactElement, locale: 'en' | 'km' = 'en') {
  return render(
    <NextIntlClientProvider
      locale={locale}
      messages={locale === 'en' ? en : km}
      timeZone="Asia/Phnom_Penh"
    >
      {ui}
    </NextIntlClientProvider>,
  );
}
