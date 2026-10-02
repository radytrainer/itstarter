interface ProgressBarProps {
  /** 0–100 */
  value: number;
  /** Accessible name, e.g. "Brain Playground progress". */
  label: string;
  /** Tailwind background class for the filled part. */
  barClassName?: string;
  size?: 'sm' | 'md';
}

export function ProgressBar({
  value,
  label,
  barClassName = 'bg-brand-600',
  size = 'md',
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={`w-full overflow-hidden rounded-full bg-slate-200 ${size === 'sm' ? 'h-2' : 'h-3'}`}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-500 ${barClassName}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
