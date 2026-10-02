import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { LessonEditor, type AdminLesson } from '@/components/admin/lesson-editor';
import { contentText } from '@/i18n/content';
import { apiGet } from '@/lib/server-api';
import { requireAdmin } from '@/lib/session';

export default async function LessonEditorPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const lesson = await apiGet<AdminLesson>(`/api/admin/lessons/${id}`);
  const t = await getTranslations('admin.content');
  const locale = await getLocale();
  return (
    <>
      <Link
        href={`/admin/content/worlds/${lesson.worldId}`}
        className="w-fit font-bold text-brand-700"
      >
        ← {t('backToLessons')}
      </Link>
      <h1 className="text-3xl font-extrabold">
        {lesson.icon} {contentText(lesson.title, locale)}
      </h1>
      <LessonEditor lesson={lesson} />
    </>
  );
}
