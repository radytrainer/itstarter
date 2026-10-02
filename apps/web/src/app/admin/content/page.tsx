import { getTranslations } from 'next-intl/server';
import type { ContentStatus, LocalizedText } from '@itstarter/shared';
import { AddContentForm, ReorderableList } from '@/components/admin/content-lists';
import { apiGet } from '@/lib/server-api';
import { requireAdmin } from '@/lib/session';

interface AdminCourse {
  id: string;
  title: LocalizedText;
}
interface AdminWorld {
  id: string;
  slug: string;
  title: LocalizedText;
  icon: string;
  status: ContentStatus;
  lessons: number;
}

export default async function ContentPage() {
  await requireAdmin();
  const t = await getTranslations('admin.content');
  const courses = await apiGet<AdminCourse[]>('/api/admin/courses');
  const course = courses[0];
  const worlds = course ? await apiGet<AdminWorld[]>(`/api/admin/courses/${course.id}/worlds`) : [];

  return (
    <>
      <h1 className="text-3xl font-extrabold">{t('title')}</h1>
      <h2 className="text-xl font-extrabold">{t('worlds')}</h2>
      {course && (
        <>
          <ReorderableList
            reorderPath={`/api/admin/courses/${course.id}/worlds/reorder`}
            patchBase="/api/admin/worlds/"
            items={worlds.map((w) => ({
              id: w.id,
              slug: w.slug,
              title: w.title,
              icon: w.icon,
              status: w.status,
              count: t('lessonCount', { count: w.lessons }),
              href: `/admin/content/worlds/${w.id}`,
            }))}
          />
          <AddContentForm kind="world" path={`/api/admin/courses/${course.id}/worlds`} />
        </>
      )}
    </>
  );
}
