interface StatPillProps {
  icon: string;
  /** Visible text, e.g. "420 XP". */
  children: React.ReactNode;
  tone?: 'xp' | 'streak' | 'level' | 'neutral';
}

const TONES = {
  xp: 'bg-amber-50 text-amber-900 border-amber-200',
  streak: 'bg-orange-50 text-orange-900 border-orange-200',
  level: 'bg-brand-50 text-brand-800 border-brand-200',
  neutral: 'bg-surface text-ink border-line',
};

export function StatPill({ icon, children, tone = 'neutral' }: StatPillProps) {
  return (
    <span
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3 text-sm font-bold ${TONES[tone]}`}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{children}</span>
    </span>
  );
}
