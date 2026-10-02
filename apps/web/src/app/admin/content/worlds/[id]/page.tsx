import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import type { ContentStatus, LocalizedText } from '@itstarter/shared';
import { AddContentForm, ReorderableList } from '@/components/admin/content-lists';
import { contentText } from '@/i18n/content';
import { apiGet } from '@/lib/server-api';
import { requireAdmin } from '@/lib/session';

interface Row {
  id: string;
  slug: string;
  title: LocalizedText;
  icon: string | null;
  status: ContentStatus;
}

export default async function WorldLessonsPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const t = await getTranslations('admin.content');
  const locale = await getLocale();

  // Find the world (and its course) for the heading.
  const courses = await apiGet<{ id: string }[]>('/api/admin/courses');
  let world: Row | undefined;
  for (const course of courses) {
    world = (await apiGet<Row[]>(`/api/admin/courses/${course.id}/worlds`)).find(
      (w) => w.id === id,
    );
    if (world) break;
  }
  if (!world) notFound();
  const lessons = await apiGet<(Row & { activities: number })[]>(`/api/admin/worlds/${id}/lessons`);

  return (
    <>
      <Link href="/admin/content" className="w-fit font-bold text-brand-700">
        ← {t('backToWorlds')}
      </Link>
      <h1 className="text-3xl font-extrabold">
        {world.icon} {contentText(world.title, locale)}
      </h1>
      <h2 className="text-xl font-extrabold">{t('lessons')}</h2>
      <ReorderableList
        reorderPath={`/api/admin/worlds/${id}/lessons/reorder`}
        patchBase="/api/admin/lessons/"
        items={lessons.map((l) => ({
          id: l.id,
          slug: l.slug,
          title: l.title,
          icon: l.icon,
          status: l.status,
          count: t('activityCount', { count: l.activities }),
          href: `/admin/content/lessons/${l.id}`,
        }))}
      />
      <AddContentForm kind="lesson" path={`/api/admin/worlds/${id}/lessons`} />
    </>
  );
}
