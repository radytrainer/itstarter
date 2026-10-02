import { useTranslations } from 'next-intl';
import {
  COMMITMENT_TARGETS,
  type Commitment,
  type CommitmentLevel,
  type PerformanceWorld,
  type StudentPerformance,
} from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { worldStyle } from '@/lib/worlds';
import { Card } from '../ui/card';
import { ProgressBar } from '../ui/progress-bar';

/**
 * A student's performance and commitment, from the same data for two readers:
 * staff (numbers, "Commitment" score) and the student (friendly "My learning habit").
 * Feedback is never punishing: weak spots are "practise a little more".
 */
type Audience = 'staff' | 'student';

const LEVEL_STYLE: Record<CommitmentLevel, { chip: string; ring: string; icon: string }> = {
  not_started: { chip: 'bg-slate-100 text-slate-700', ring: 'text-slate-300', icon: '🌱' },
  starting: { chip: 'bg-amber-100 text-amber-900', ring: 'text-amber-500', icon: '🌿' },
  steady: { chip: 'bg-sky-100 text-sky-900', ring: 'text-sky-500', icon: '🌳' },
  strong: { chip: 'bg-emerald-100 text-emerald-900', ring: 'text-emerald-500', icon: '🏆' },
};

/** Small chip: "🌳 Steady learner · 55". Used in the progress list too. */
export function CommitmentChip({
  commitment,
  showScore = true,
}: {
  commitment: Commitment;
  showScore?: boolean;
}) {
  const t = useTranslations('performance');
  const style = LEVEL_STYLE[commitment.level];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ${style.chip}`}
    >
      <span aria-hidden="true">{style.icon}</span>
      {t(`levels.${commitment.level}`)}
      {showScore && <span className="tabular-nums">· {commitment.score}</span>}
    </span>
  );
}

/** Score in a ring (SVG), 0–100. */
function ScoreRing({ commitment, label }: { commitment: Commitment; label: string }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  return (
    <div
      className="relative size-28 shrink-0"
      role="img"
      aria-label={`${label}: ${commitment.score}/100`}
    >
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="10"
          className="stroke-slate-200"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          stroke="currentColor"
          className={`transition-[stroke-dashoffset] duration-700 ${LEVEL_STYLE[commitment.level].ring}`}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - commitment.score / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black tabular-nums">{commitment.score}</span>
        <span className="text-xs font-bold text-muted">/ 100</span>
      </span>
    </div>
  );
}

function HabitCard({ commitment, audience }: { commitment: Commitment; audience: Audience }) {
  const t = useTranslations('performance');
  const parts = [
    {
      key: 'consistency',
      value: commitment.activeDays,
      target: COMMITMENT_TARGETS.activeDays,
      percent: commitment.parts.consistency,
      icon: '📅',
    },
    {
      key: 'effort',
      value: commitment.minutes,
      target: COMMITMENT_TARGETS.minutes,
      percent: commitment.parts.effort,
      icon: '⏱️',
    },
    {
      key: 'progress',
      value: commitment.lessons,
      target: COMMITMENT_TARGETS.lessons,
      percent: commitment.parts.progress,
      icon: '📘',
    },
  ] as const;
  const title = audience === 'staff' ? t('commitment') : t('habitTitle');
  return (
    <Card className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-5">
        <ScoreRing commitment={commitment} label={title} />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <p className="text-sm font-bold text-muted">
            {title} · {t('last4Weeks')}
          </p>
          <div>
            <CommitmentChip commitment={commitment} showScore={false} />
          </div>
          <p className="text-ink">
            {audience === 'staff'
              ? t(`staffLevelHelp.${commitment.level}`)
              : t(`levelHelp.${commitment.level}`)}
          </p>
        </div>
      </div>
      <ul className="grid gap-3 sm:grid-cols-3">
        {parts.map((p) => (
          <li key={p.key} className="flex flex-col gap-1.5 rounded-xl bg-slate-50 p-3">
            <span className="flex items-center justify-between gap-2 text-sm font-bold">
              <span>
                <span aria-hidden="true">{p.icon}</span> {t(`parts.${p.key}`)}
              </span>
              <span className="tabular-nums text-muted">
                {t('partOf', { value: p.value, target: p.target })}
              </span>
            </span>
            <ProgressBar value={p.percent} label={t(`parts.${p.key}`)} size="sm" />
          </li>
        ))}
      </ul>
      {audience === 'staff' && <p className="text-xs text-muted">{t('formula')}</p>}
    </Card>
  );
}

function Stat({
  icon,
  label,
  value,
  sub,
}: {
  icon: string;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <li className="flex min-w-0 flex-col gap-0.5 rounded-card border border-line bg-surface p-3 shadow-card">
      <span className="truncate text-xs font-bold text-muted">
        <span aria-hidden="true">{icon}</span> {label}
      </span>
      <span className="text-2xl font-black tabular-nums">{value}</span>
      {sub && <span className="text-xs text-muted">{sub}</span>}
    </li>
  );
}

/** 4 rows of 7 days; darker = more minutes. */
function Calendar({ days, locale }: { days: StudentPerformance['days']; locale: string }) {
  const t = useTranslations('performance');
  const format = new Intl.DateTimeFormat(locale === 'km' ? 'km-KH' : 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
  const shade = (minutes: number) =>
    minutes === 0
      ? 'bg-slate-100'
      : minutes < 10
        ? 'bg-emerald-200'
        : minutes < 30
          ? 'bg-emerald-400'
          : 'bg-emerald-600';
  const active = days.filter((d) => d.minutes > 0 || d.xp > 0).length;
  return (
    <Card className="flex min-w-0 flex-col gap-3">
      <h3 className="font-extrabold">{t('calendar')}</h3>
      <p className="text-sm text-muted">{t('calendarSummary', { days: active })}</p>
      <ol className="grid grid-cols-7 gap-1.5" aria-label={t('calendar')}>
        {days.map((d) => {
          const label = t('dayTitle', {
            date: format.format(new Date(`${d.day}T00:00:00Z`)),
            minutes: d.minutes,
          });
          return (
            <li
              key={d.day}
              title={label}
              aria-label={label}
              className={`aspect-square rounded-md ${d.xp > 0 && d.minutes === 0 ? 'bg-emerald-200' : shade(d.minutes)}`}
            />
          );
        })}
      </ol>
      <p className="flex flex-wrap items-center gap-2 text-xs text-muted" aria-hidden="true">
        <span className="size-3 rounded bg-slate-100" /> {t('legendNone')}
        <span className="ml-2 size-3 rounded bg-emerald-200" />
        <span className="size-3 rounded bg-emerald-400" />
        <span className="size-3 rounded bg-emerald-600" /> {t('legendSome')}
      </p>
    </Card>
  );
}

function Weeks({ weeks, locale }: { weeks: StudentPerformance['weeks']; locale: string }) {
  const t = useTranslations('performance');
  const format = new Intl.DateTimeFormat(locale === 'km' ? 'km-KH' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
  const most = Math.max(30, ...weeks.map((w) => w.minutes));
  return (
    <Card className="flex min-w-0 flex-col gap-3">
      <h3 className="font-extrabold">{t('weeks')}</h3>
      <ol className="flex h-40 items-end gap-1.5 sm:gap-3">
        {weeks.map((w) => {
          const date = format.format(new Date(`${w.weekStart}T00:00:00Z`));
          const label = [
            t('weekOf', { date }),
            t('weekMinutes', { minutes: w.minutes }),
            w.accuracy === null ? null : t('weekAccuracy', { percent: w.accuracy }),
          ]
            .filter(Boolean)
            .join(' · ');
          return (
            <li
              key={w.weekStart}
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1"
              title={label}
              aria-label={label}
            >
              <span className="text-[10px] font-bold text-muted tabular-nums sm:text-xs">
                {w.minutes}
              </span>
              <span
                className="w-full rounded-t-md bg-brand-500"
                style={{ height: `${Math.max(w.minutes > 0 ? 6 : 2, (w.minutes / most) * 100)}%` }}
              />
              <span className="truncate text-[10px] text-muted sm:text-xs">{date}</span>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

function AccuracyText({ accuracy }: { accuracy: number | null }) {
  const t = useTranslations('performance');
  if (accuracy === null) return <span className="text-xs text-muted">{t('noAccuracy')}</span>;
  const tone = accuracy >= 80 ? 'text-emerald-700' : accuracy >= 60 ? 'text-ink' : 'text-amber-800';
  return <span className={`font-bold tabular-nums ${tone}`}>{accuracy}%</span>;
}

function Worlds({ worlds, locale }: { worlds: PerformanceWorld[]; locale: string }) {
  const t = useTranslations('performance');
  return (
    <Card padded={false}>
      <h3 className="px-4 pt-4 font-extrabold">{t('worlds')}</h3>
      <ul className="divide-y divide-line">
        {worlds.map((w) => (
          <li
            key={w.id}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1.5 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_8rem_6rem_5rem] sm:items-center"
          >
            <span className="min-w-0 truncate font-bold">
              <span aria-hidden="true">{w.icon}</span> {contentText(w.title, locale)}
            </span>
            <span className="text-right text-sm text-muted tabular-nums sm:order-last">
              {t('minutesShort', { minutes: w.minutes })}
            </span>
            <span className="flex items-center gap-2 text-sm">
              <ProgressBar
                value={w.lessonsTotal ? (w.lessonsCompleted / w.lessonsTotal) * 100 : 0}
                label={contentText(w.title, locale)}
                barClassName={worldStyle(w.color).bar}
                size="sm"
              />
              <span className="shrink-0 tabular-nums text-muted">
                {w.lessonsCompleted}/{w.lessonsTotal}
              </span>
            </span>
            <span className="text-right text-sm sm:text-left">
              <AccuracyText accuracy={w.accuracy} />
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Skills({ skills }: { skills: StudentPerformance['skills'] }) {
  const t = useTranslations('performance');
  if (skills.length === 0) return null;
  return (
    <Card className="flex min-w-0 flex-col gap-3">
      <h3 className="font-extrabold">{t('skills')}</h3>
      <ul className="flex flex-col gap-3">
        {skills.map((s) => (
          <li key={s.skill} className="flex flex-col gap-1">
            <span className="flex justify-between gap-2 text-sm">
              <span className="font-bold">{t(`skillNames.${s.skill}`)}</span>
              <span className="text-muted">
                {t('answeredCount', { count: s.answered })} · <AccuracyText accuracy={s.accuracy} />
              </span>
            </span>
            {s.accuracy !== null && (
              <ProgressBar
                value={s.accuracy}
                label={t(`skillNames.${s.skill}`)}
                barClassName={
                  s.accuracy >= 80
                    ? 'bg-emerald-500'
                    : s.accuracy >= 60
                      ? 'bg-brand-500'
                      : 'bg-amber-400'
                }
                size="sm"
              />
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}

/** For students: their best skill and the one to practise (only when there is enough data). */
function Highlights({ performance, locale }: { performance: StudentPerformance; locale: string }) {
  const t = useTranslations('performance');
  const scored = [
    ...performance.skills
      .filter((s) => s.accuracy !== null)
      .map((s) => ({ name: t(`skillNames.${s.skill}`), accuracy: s.accuracy! })),
    ...performance.worlds
      .filter((w) => w.accuracy !== null)
      .map((w) => ({ name: `${w.icon} ${contentText(w.title, locale)}`, accuracy: w.accuracy! })),
  ].sort((a, b) => b.accuracy - a.accuracy);
  const best = scored.filter((s) => s.accuracy >= 70).slice(0, 2);
  const practise = scored
    .filter((s) => s.accuracy < 70)
    .slice(-2)
    .reverse();
  return (
    <Card className="grid gap-4 sm:grid-cols-2">
      {scored.length === 0 ? (
        <p className="text-muted sm:col-span-2">{t('nothingYet')}</p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <h3 className="font-extrabold text-emerald-800">💪 {t('strengths')}</h3>
            <ul className="flex flex-wrap gap-2">
              {(best.length ? best : scored.slice(0, 1)).map((s) => (
                <li
                  key={s.name}
                  className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-900"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
          {practise.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="font-extrabold text-amber-900">🎯 {t('practise')}</h3>
              <ul className="flex flex-wrap gap-2">
                {practise.map((s) => (
                  <li
                    key={s.name}
                    className="rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-950"
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </Card>
  );
}

export function PerformanceReport({
  performance,
  audience,
  locale,
}: {
  performance: StudentPerformance;
  audience: Audience;
  locale: string;
}) {
  const t = useTranslations('performance');
  const p = performance;
  return (
    <div className="flex flex-col gap-4">
      <HabitCard commitment={p.commitment} audience={audience} />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Stat icon="📘" label={t('stats.lessons')} value={String(p.totals.lessonsCompleted)} />
        <Stat icon="❓" label={t('stats.answered')} value={String(p.totals.answered)} />
        <Stat
          icon="🎯"
          label={t('stats.accuracy')}
          value={p.totals.accuracy === null ? '—' : `${p.totals.accuracy}%`}
        />
        <Stat icon="⏱️" label={t('stats.minutes')} value={String(p.totals.minutes)} />
        <Stat icon="🎮" label={t('stats.games')} value={String(p.totals.gamesWon)} />
        <Stat
          icon="🔥"
          label={t('stats.streak')}
          value={String(p.currentStreak)}
          sub={t('stats.bestStreak', { days: p.longestStreak })}
        />
      </ul>
      {audience === 'student' && <Highlights performance={p} locale={locale} />}
      <div className="grid gap-4 lg:grid-cols-2">
        <Calendar days={p.days} locale={locale} />
        <Weeks weeks={p.weeks} locale={locale} />
      </div>
      <Worlds worlds={p.worlds} locale={locale} />
      <Skills skills={p.skills} />
    </div>
  );
}
