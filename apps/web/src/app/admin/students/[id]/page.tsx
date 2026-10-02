import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import type { AwardView, Dashboard, LocalizedText, StudentPerformance } from '@itstarter/shared';
import { StudentActions } from '@/components/admin/student-actions';
import { PerformanceReport } from '@/components/performance/performance-report';
import { BadgeIcon } from '@/components/ui/badge-icon';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { StatPill } from '@/components/ui/stat-pill';
import { contentText } from '@/i18n/content';
import { apiGet } from '@/lib/server-api';
import { requireStaff } from '@/lib/session';
import { worldStyle } from '@/lib/worlds';

interface StudentDetail {
  id: string;
  username: string;
  displayName: string;
  status: 'active' | 'disabled';
  lastLoginAt: string | null;
  createdAt: string;
  cohortId: string | null;
  cohortName: string | null;
  dashboard: Dashboard;
  achievements: AwardView[];
  lessons: {
    lessonId: string;
    title: LocalizedText;
    worldTitle: LocalizedText;
    status: 'in_progress' | 'completed';
    bestScore: number | null;
    timeSpentSeconds: number;
    completedAt: string | null;
  }[];
}

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireStaff();
  const { id } = await params;
  const [student, cohorts, performance] = await Promise.all([
    apiGet<StudentDetail>(`/api/teacher/students/${id}`),
    apiGet<{ id: string; name: string }[]>('/api/teacher/cohorts'),
    apiGet<StudentPerformance>(`/api/teacher/students/${id}/performance`),
  ]);
  const tp = await getTranslations('performance');
  const t = await getTranslations('admin');
  const tb = await getTranslations('badges');
  const locale = await getLocale();
  const d = student.dashboard;
  const date = new Intl.DateTimeFormat(locale === 'km' ? 'km-KH' : 'en-GB', {
    dateStyle: 'medium',
  });
  const earned = [...d.badges, ...student.achievements].filter((b) => b.earned);

  return (
    <>
      <Link href="/admin/students" className="w-fit font-bold text-brand-700">
        ← {t('students.title')}
      </Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold">{student.displayName}</h1>
        <p className="text-muted">
          @{student.username} · {student.cohortName ?? t('students.noClass')} ·{' '}
          {student.status === 'active' ? t('students.active') : t('students.disabled')}
        </p>
        <div className="flex flex-wrap gap-2">
          <StatPill icon="⭐" tone="xp">
            {d.student.xpTotal} XP
          </StatPill>
          <StatPill icon={d.student.level.icon} tone="level">
            {t('students.level')} {d.student.level.number}
          </StatPill>
          <StatPill icon="🔥" tone="streak">
            {t('students.streak')}: {d.student.streak}
          </StatPill>
          <StatPill icon="🕐">
            {t('students.lastLogin')}:{' '}
            {student.lastLoginAt ? date.format(new Date(student.lastLoginAt)) : t('students.never')}
          </StatPill>
        </div>
      </div>

      <Card>
        <StudentActions role={user.role} student={student} cohorts={cohorts} />
      </Card>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-extrabold">{tp('staffTitle')}</h2>
        <PerformanceReport performance={performance} audience="staff" locale={locale} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-extrabold">{t('students.progress')}</h2>
        <Card className="flex flex-col gap-3">
          {d.worlds.map((w) => (
            <div key={w.id} className="flex flex-col gap-1">
              <div className="flex justify-between gap-2 text-sm font-semibold">
                <span>
                  {w.icon} {contentText(w.title, locale)}
                </span>
                <span className="text-muted">
                  {w.lessonsCompleted}/{w.lessonsTotal}
                </span>
              </div>
              <ProgressBar
                value={w.percent}
                label={contentText(w.title, locale)}
                barClassName={worldStyle(w.color).bar}
                size="sm"
              />
            </div>
          ))}
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-extrabold">{t('students.lessons')}</h2>
        <Card padded={false}>
          <ul className="divide-y divide-line">
            {student.lessons.length === 0 && (
              <li className="p-4 text-muted">{t('students.noLessons')}</li>
            )}
            {student.lessons.map((l) => (
              <li
                key={l.lessonId}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
              >
                <span className="flex flex-col">
                  <span className="font-bold">{contentText(l.title, locale)}</span>
                  <span className="text-sm text-muted">{contentText(l.worldTitle, locale)}</span>
                </span>
                <span className="flex flex-wrap gap-3 text-sm font-semibold">
                  <span
                    className={l.status === 'completed' ? 'text-emerald-700' : 'text-amber-800'}
                  >
                    {l.status === 'completed'
                      ? `✓ ${t('students.completed')}`
                      : t('students.inProgress')}
                  </span>
                  {l.bestScore !== null && (
                    <span>
                      {t('students.score')}: {l.bestScore}%
                    </span>
                  )}
                  <span className="text-muted">⏱ {Math.round(l.timeSpentSeconds / 60)} min</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-extrabold">{t('students.badges')}</h2>
        <Card>
          {earned.length === 0 ? (
            <p className="text-muted">{t('common.empty')}</p>
          ) : (
            <ul className="flex flex-wrap gap-3">
              {earned.map((b) => (
                <li key={b.code} className="flex items-center gap-2">
                  <BadgeIcon
                    icon={b.icon}
                    name={contentText(b.name, locale)}
                    earned
                    lockedLabel={tb('locked')}
                  />
                  <span className="text-sm font-semibold">{contentText(b.name, locale)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>
    </>
  );
}
