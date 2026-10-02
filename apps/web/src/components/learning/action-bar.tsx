import type { ReactNode } from 'react';

/**
 * The lesson's bottom bar: feedback + the main button, always in the same place.
 * On phones it sticks to the bottom of the screen (no scrolling to find "Check"); on larger
 * screens it is a card under the question. Its colour tells the result at a glance.
 */
export type BarTone = 'neutral' | 'success' | 'learn' | 'retry' | 'warning';

const BAR: Record<BarTone, string> = {
  neutral: 'border-line bg-surface/95 backdrop-blur',
  success: 'border-emerald-200 bg-emerald-50',
  learn: 'border-amber-200 bg-amber-50',
  retry: 'border-orange-200 bg-orange-50',
  warning: 'border-amber-200 bg-amber-50',
};

export function ActionBar({ tone = 'neutral', children }: { tone?: BarTone; children: ReactNode }) {
  return (
    <div
      className={`sticky bottom-0 z-20 -mx-4 mt-auto border-t sm:mt-0 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-colors duration-300 sm:mx-0 sm:mb-6 sm:rounded-card sm:border sm:p-4 sm:shadow-card ${BAR[tone]}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        {children}
      </div>
    </div>
  );
}

const ICON: Record<Exclude<BarTone, 'neutral'>, { circle: string; text: string }> = {
  success: { circle: 'bg-emerald-600 text-white', text: 'text-emerald-900' },
  learn: { circle: 'bg-amber-500 text-white', text: 'text-amber-950' },
  retry: { circle: 'bg-orange-500 text-white', text: 'text-orange-950' },
  warning: { circle: 'bg-amber-500 text-white', text: 'text-amber-950' },
};

/** Result message inside the bar: icon, title, and an optional explanation. */
export function BarMessage({
  tone,
  icon,
  title,
  children,
  role = 'status',
}: {
  tone: Exclude<BarTone, 'neutral'>;
  icon: string;
  title: string;
  children?: ReactNode;
  role?: 'status' | 'alert';
}) {
  const style = ICON[tone];
  return (
    <div role={role} className={`flex min-w-0 flex-1 items-start gap-3 animate-rise ${style.text}`}>
      <span
        aria-hidden="true"
        className={`flex size-9 shrink-0 items-center justify-center rounded-full text-lg font-black ${style.circle}`}
      >
        {icon}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="text-lg font-extrabold leading-snug">{title}</p>
        {children && <div className="text-sm leading-relaxed sm:text-base">{children}</div>}
      </div>
    </div>
  );
}
