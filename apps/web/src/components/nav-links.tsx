'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const ITEMS = [
  { href: '/', key: 'home', icon: '🏠' },
  { href: '/progress', key: 'progress', icon: '📈' },
  { href: '/badges', key: 'badges', icon: '🏅' },
  { href: '/profile', key: 'profile', icon: '🙂' },
] as const;

function isActive(pathname: string, href: string) {
  return href === '/'
    ? pathname === '/' || pathname.startsWith('/worlds')
    : pathname.startsWith(href);
}

/** Bottom tab bar on phones; inline links in the header from tablet width up. */
export function NavLinks({ variant }: { variant: 'bottom' | 'top' }) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  if (variant === 'top') {
    return (
      <nav aria-label={t('label')} className="hidden items-center gap-1 md:flex">
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(pathname, item.href) ? 'page' : undefined}
            title={t(item.key)}
            className="flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 font-bold text-muted hover:bg-slate-100 aria-[current=page]:bg-brand-50 aria-[current=page]:text-brand-700 lg:px-4"
          >
            <span aria-hidden="true">{item.icon}</span>
            {/* Tablets: icons only (4 items + language + account must fit); names from 1024px. */}
            <span className="sr-only lg:not-sr-only">{t(item.key)}</span>
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav
      aria-label={t('label')}
      className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
              className="flex min-h-16 flex-col items-center justify-center gap-0.5 text-xs font-bold text-muted aria-[current=page]:text-brand-700"
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                {item.icon}
              </span>
              {t(item.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
