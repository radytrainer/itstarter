import type { LessonPlay } from '@itstarter/shared';
import { AppShell } from '@/components/app-shell';
import { LessonPlayer } from '@/components/learning/lesson-player';
import { apiGet } from '@/lib/server-api';
import { requireUser } from '@/lib/session';

export const dynamic = 'force-dynamic';

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await params;
  const lesson = await apiGet<LessonPlay>(`/api/lessons/${id}`);
  return (
    <AppShell signedIn focus>
      {/* key: a fresh player for each lesson (e.g. "Next lesson") */}
      <LessonPlayer key={lesson.id} lesson={lesson} />
    </AppShell>
  );
}
