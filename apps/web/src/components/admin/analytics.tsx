import { useLocale, useTranslations } from 'next-intl';
import type { EngagementDay, LessonStats } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { Card } from '../ui/card';

// Display-only pieces for the analytics page. Every number is computed by the API.

export function Metric({
  icon,
  label,
  value,
  hint,
}: {
  icon: string;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card className="flex flex-col gap-1">
      <span className="flex items-center gap-2 text-sm font-bold text-muted">
        <span aria-hidden="true">{icon}</span>
        {label}
      </span>
      <span className="text-3xl font-extrabold tabular-nums">{value}</span>
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </Card>
  );
}

export interface Bar {
  key: string;
  label: string;
  value: number;
  /** Text shown at the end of the bar, e.g. "12 students". */
  display: string;
  icon?: string;
}

/** Horizontal bars, scaled to the largest value. Readable without the bars (text first). */
export function BarList({
  bars,
  barClassName = 'bg-brand-500',
}: {
  bars: Bar[];
  barClassName?: string;
}) {
  const max = Math.max(1, ...bars.map((b) => b.value));
  return (
    <ul className="flex flex-col gap-2">
      {bars.map((bar) => (
        <li key={bar.key} className="flex flex-col gap-1">
          <span className="flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 font-semibold">
              {bar.icon && (
                <span aria-hidden="true" className="mr-1">
                  {bar.icon}
                </span>
              )}
              {bar.label}
            </span>
            <span className="shrink-0 tabular-nums text-muted">{bar.display}</span>
          </span>
          <span aria-hidden="true" className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <span
              className={`block h-full rounded-full ${barClassName}`}
              style={{ width: `${(bar.value / max) * 100}%` }}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Active students per day as columns, plus the same numbers as a table for screen readers. */
export function DailyChart({ days }: { days: EngagementDay[] }) {
  const t = useTranslations('admin.analytics');
  const locale = useLocale();
  const short = new Intl.DateTimeFormat(locale === 'km' ? 'km-KH' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
  const label = (day: string) => short.format(new Date(`${day}T00:00:00Z`));
  const max = Math.max(1, ...days.map((d) => d.activeStudents));
  const first = days[0];
  const last = days.at(-1);

  return (
    <div className="flex flex-col gap-2">
      <div
        role="img"
        aria-label={
          first && last ? t('chartLabel', { from: label(first.day), to: label(last.day) }) : ''
        }
        className="flex h-32 items-end gap-px border-b border-line"
      >
        {days.map((d) => (
          <span
            key={d.day}
            title={`${label(d.day)}: ${d.activeStudents}`}
            className="min-w-0 flex-1 rounded-t bg-brand-500"
            style={{
              height: `${Math.max(d.activeStudents > 0 ? 4 : 1, (d.activeStudents / max) * 100)}%`,
            }}
          />
        ))}
      </div>
      {first && last && (
        <div className="flex justify-between text-xs text-muted" aria-hidden="true">
          <span>{label(first.day)}</span>
          <span>{label(last.day)}</span>
        </div>
      )}
      <details>
        <summary className="min-h-11 cursor-pointer py-2 text-sm font-bold text-brand-700">
          {t('showTable')}
        </summary>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm tabular-nums">
            <thead className="text-muted">
              <tr>
                <th className="py-1 pr-3">{t('day')}</th>
                <th className="py-1 pr-3">{t('activeStudents')}</th>
                <th className="py-1 pr-3">{t('lessonsFinished')}</th>
                <th className="py-1 pr-3">{t('minutes')}</th>
                <th className="py-1">{t('xp')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[...days].reverse().map((d) => (
                <tr key={d.day}>
                  <td className="py-1 pr-3">{label(d.day)}</td>
                  <td className="py-1 pr-3">{d.activeStudents}</td>
                  <td className="py-1 pr-3">{d.lessonsCompleted}</td>
                  <td className="py-1 pr-3">{d.minutes}</td>
                  <td className="py-1">{d.xp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

/** A short ranked list of lessons with one number each. */
export function LessonRanking({
  title,
  hint,
  lessons,
  show,
}: {
  title: string;
  hint?: string;
  lessons: LessonStats[];
  show: 'completed' | 'score';
}) {
  const t = useTranslations('admin.analytics');
  const locale = useLocale();
  return (
    <Card as="section" className="flex flex-col gap-2">
      <h3 className="font-extrabold">{title}</h3>
      {hint && <p className="text-xs text-muted">{hint}</p>}
      {lessons.length === 0 ? (
        <p className="text-sm text-muted">{t('noData')}</p>
      ) : (
        <ol className="flex flex-col gap-1 text-sm">
          {lessons.map((l) => (
            <li key={l.lessonId} className="flex items-baseline justify-between gap-3">
              <span className="min-w-0">
                <span className="font-semibold">{contentText(l.title, locale)}</span>
                <span className="block text-xs text-muted">
                  {contentText(l.worldTitle, locale)}
                </span>
              </span>
              <span className="shrink-0 font-bold tabular-nums">
                {show === 'completed'
                  ? t('studentsCount', { count: l.completed })
                  : t('percent', { value: l.averageScore ?? 0 })}
              </span>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}
