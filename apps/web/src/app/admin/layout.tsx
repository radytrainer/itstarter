import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { AdminNav } from '@/components/admin/admin-nav';
import { LanguageSwitcher } from '@/components/language-switcher';
import { requireStaff } from '@/lib/session';

// Everything under /admin: teachers and admins. Each page and API route checks again.
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireStaff();
  const t = await getTranslations('admin');

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2">
          <Link href="/admin" className="flex min-h-11 items-center gap-2 font-extrabold">
            <span aria-hidden="true" className="text-2xl">
              🚀
            </span>
            <span className="whitespace-nowrap">{t('title')}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden min-h-11 items-center px-3 font-bold text-brand-700 sm:flex"
            >
              {t('studentView')}
            </Link>
            <LanguageSwitcher signedIn />
          </div>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-4 lg:flex-row lg:gap-8 lg:py-8">
        <aside className="lg:w-56 lg:shrink-0">
          <AdminNav role={user.role} />
        </aside>
        <main className="flex min-w-0 flex-1 flex-col gap-5 pb-10">{children}</main>
      </div>
    </div>
  );
}
