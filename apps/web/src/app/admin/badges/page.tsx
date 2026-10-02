import { getTranslations } from 'next-intl/server';
import { BadgeEditor, type AdminBadge } from '@/components/admin/badge-editor';
import { apiGet } from '@/lib/server-api';
import { requireAdmin } from '@/lib/session';

export default async function AdminBadgesPage() {
  await requireAdmin();
  const t = await getTranslations('admin.badges');
  const badges = await apiGet<AdminBadge[]>('/api/admin/badges');
  return (
    <>
      <h1 className="text-3xl font-extrabold">{t('title')}</h1>
      <div className="flex flex-col gap-3">
        {badges.map((badge) => (
          <BadgeEditor key={`${badge.id}-${badge.updatedAt}`} badge={badge} />
        ))}
      </div>
    </>
  );
}
