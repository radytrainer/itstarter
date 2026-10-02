'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { Role } from '@itstarter/shared';

const ITEMS = [
  { href: '/admin', key: 'overview', icon: '📊', roles: ['TEACHER', 'ADMIN'] },
  { href: '/admin/progress', key: 'progress', icon: '📋', roles: ['TEACHER', 'ADMIN'] },
  { href: '/admin/analytics', key: 'analytics', icon: '📈', roles: ['TEACHER', 'ADMIN'] },
  { href: '/admin/students', key: 'students', icon: '🎓', roles: ['TEACHER', 'ADMIN'] },
  { href: '/admin/content', key: 'content', icon: '📚', roles: ['ADMIN'] },
  { href: '/admin/badges', key: 'badges', icon: '🏅', roles: ['ADMIN'] },
  { href: '/admin/staff', key: 'staff', icon: '🧑‍🏫', roles: ['ADMIN'] },
  { href: '/admin/audit', key: 'audit', icon: '📜', roles: ['ADMIN'] },
] as const;

/** Scrollable tabs on phones, a side menu on large screens. Teachers see only their tools. */
export function AdminNav({ role }: { role: Role }) {
  const t = useTranslations('admin.nav');
  const pathname = usePathname();
  const items = ITEMS.filter((item) => (item.roles as readonly Role[]).includes(role));
  const active = (href: string) =>
    href === '/admin' ? pathname === href : pathname.startsWith(href);

  return (
    <nav
      aria-label={t('overview')}
      className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0"
    >
      <ul className="flex gap-1 lg:flex-col">
        {items.map((item) => (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              aria-current={active(item.href) ? 'page' : undefined}
              className="flex min-h-11 items-center gap-2 rounded-full px-4 font-bold whitespace-nowrap text-muted hover:bg-slate-100 aria-[current=page]:bg-brand-600 aria-[current=page]:text-white lg:rounded-control"
            >
              <span aria-hidden="true">{item.icon}</span>
              {t(item.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
