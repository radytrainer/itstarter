import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { LanguageSwitcher } from './language-switcher';
import { NavLinks } from './nav-links';

interface AppShellProps {
  children: React.ReactNode;
  /** Signed-in pages get the navigation; public pages (login) don't. */
  signedIn: boolean;
  /** Focus mode for lessons: no menu (the lesson has its own exit button). */
  focus?: boolean;
}

export async function AppShell({ children, signedIn, focus = false }: AppShellProps) {
  const showNav = signedIn && !focus;
  const t = await getTranslations('app');
  if (focus) {
    // Lessons: no site header or menu — the lesson draws its own slim bar (exit, progress, XP).
    return (
      <div className="flex min-h-dvh flex-col">
        <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4">{children}</main>
      </div>
    );
  }
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-2">
          <Link href="/" className="flex min-h-11 items-center gap-2 font-extrabold text-ink">
            <span aria-hidden="true" className="text-2xl">
              🚀
            </span>
            <span className="whitespace-nowrap text-base min-[400px]:text-lg">{t('name')}</span>
          </Link>
          {showNav && <NavLinks variant="top" />}
          <LanguageSwitcher signedIn={signedIn} />
        </div>
      </header>
      <main
        className={`mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 ${
          showNav ? 'pb-28 md:pb-10' : ''
        }`}
      >
        {children}
      </main>
      {showNav && <NavLinks variant="bottom" />}
    </div>
  );
}
