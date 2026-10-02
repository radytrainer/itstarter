interface BadgeIconProps {
  icon: string;
  name: string;
  earned: boolean;
  /** Screen-reader text for a locked badge, e.g. "Not yet earned". */
  lockedLabel: string;
  size?: 'sm' | 'lg';
}

export function BadgeIcon({ icon, name, earned, lockedLabel, size = 'sm' }: BadgeIconProps) {
  const box = size === 'lg' ? 'size-20 text-4xl' : 'size-14 text-2xl';
  return (
    <span
      role="img"
      aria-label={earned ? name : `${name} (${lockedLabel})`}
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full border-2 ${box} ${
        earned
          ? 'border-amber-300 bg-gradient-to-b from-amber-50 to-amber-100 shadow-sm'
          : 'border-dashed border-slate-300 bg-slate-50 grayscale opacity-60'
      }`}
    >
      <span aria-hidden="true">{icon}</span>
      {!earned && (
        <span
          aria-hidden="true"
          className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full bg-white text-xs shadow"
        >
          🔒
        </span>
      )}
    </span>
  );
}
