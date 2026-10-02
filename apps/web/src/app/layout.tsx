import type { Metadata, Viewport } from 'next';
import { Noto_Sans_Khmer, Nunito } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { PwaSetup } from '@/components/pwa';
import './globals.css';

// Self-hosted at build time by next/font: no requests to Google from students' phones.
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito', display: 'swap' });
const khmer = Noto_Sans_Khmer({ subsets: ['khmer'], variable: '--font-khmer', display: 'swap' });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('app');
  return {
    title: t('name'),
    description: t('tagline'),
    applicationName: t('name'),
    icons: {
      icon: [
        { url: '/icons/icon.svg', type: 'image/svg+xml' },
        { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
    },
    // iPhone: open full screen from the home screen.
    appleWebApp: { capable: true, title: 'IT Starter', statusBarStyle: 'default' },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4f46e5',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${nunito.variable} ${khmer.variable}`}>
      <body className="min-h-dvh font-sans antialiased">
        <NextIntlClientProvider>
          <PwaSetup />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
