import type { ReactNode } from 'react';

/**
 * Feedback messages. Tones are positive by design: there is no "error/wrong" tone for learning,
 * only "encourage" (try again, here's a clue).
 */
type Tone = 'success' | 'encourage' | 'info' | 'warning';

const TONES: Record<Tone, { box: string; icon: string }> = {
  success: { box: 'bg-success-50 text-success-700 border-emerald-200', icon: '🎉' },
  encourage: { box: 'bg-encourage-50 text-encourage-800 border-orange-200', icon: '💡' },
  info: { box: 'bg-brand-50 text-brand-800 border-brand-200', icon: 'ℹ️' },
  warning: { box: 'bg-amber-50 text-amber-900 border-amber-200', icon: '⚠️' },
};

interface FeedbackProps {
  tone: Tone;
  title?: string;
  children?: ReactNode;
  /** Overrides the tone's default emoji. */
  icon?: string;
  /** "alert" interrupts screen readers (problems); "status" is polite (results). */
  role?: 'alert' | 'status';
}

export function Feedback({ tone, title, children, icon, role = 'status' }: FeedbackProps) {
  const style = TONES[tone];
  return (
    <div
      role={role}
      className={`flex gap-3 rounded-control border px-4 py-3 animate-rise ${style.box}`}
    >
      <span aria-hidden="true" className="text-xl leading-7">
        {icon ?? style.icon}
      </span>
      <div className="flex flex-col gap-0.5">
        {title && <p className="font-bold">{title}</p>}
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
