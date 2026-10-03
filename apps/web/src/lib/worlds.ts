/**
 * World colour tokens → Tailwind classes. Classes are written out in full so Tailwind can see them.
 * A world's `color` column holds one of these keys; unknown keys fall back to brand colours.
 */
export interface WorldStyle {
  /** Card background/border */
  card: string;
  /** Icon circle */
  icon: string;
  /** Progress bar fill */
  bar: string;
  /** Text accent */
  text: string;
}

export const WORLD_STYLES: Record<string, WorldStyle> = {
  violet: {
    card: 'bg-violet-50 border-violet-200',
    icon: 'bg-violet-100',
    bar: 'bg-violet-500',
    text: 'text-violet-800',
  },
  indigo: {
    card: 'bg-indigo-50 border-indigo-200',
    icon: 'bg-indigo-100',
    bar: 'bg-indigo-500',
    text: 'text-indigo-800',
  },
  sky: {
    card: 'bg-sky-50 border-sky-200',
    icon: 'bg-sky-100',
    bar: 'bg-sky-500',
    text: 'text-sky-800',
  },
  emerald: {
    card: 'bg-emerald-50 border-emerald-200',
    icon: 'bg-emerald-100',
    bar: 'bg-emerald-500',
    text: 'text-emerald-800',
  },
  amber: {
    card: 'bg-amber-50 border-amber-200',
    icon: 'bg-amber-100',
    bar: 'bg-amber-500',
    text: 'text-amber-900',
  },
  rose: {
    card: 'bg-rose-50 border-rose-200',
    icon: 'bg-rose-100',
    bar: 'bg-rose-500',
    text: 'text-rose-800',
  },
  orange: {
    card: 'bg-orange-50 border-orange-200',
    icon: 'bg-orange-100',
    bar: 'bg-orange-500',
    text: 'text-orange-800',
  },
  fuchsia: {
    card: 'bg-fuchsia-50 border-fuchsia-200',
    icon: 'bg-fuchsia-100',
    bar: 'bg-fuchsia-500',
    text: 'text-fuchsia-800',
  },
  cyan: {
    card: 'bg-cyan-50 border-cyan-200',
    icon: 'bg-cyan-100',
    bar: 'bg-cyan-600',
    text: 'text-cyan-800',
  },
  slate: {
    card: 'bg-slate-100 border-slate-300',
    icon: 'bg-slate-200',
    bar: 'bg-slate-600',
    text: 'text-slate-800',
  },
  lime: {
    card: 'bg-lime-50 border-lime-200',
    icon: 'bg-lime-100',
    bar: 'bg-lime-600',
    text: 'text-lime-800',
  },
  teal: {
    card: 'bg-teal-50 border-teal-200',
    icon: 'bg-teal-100',
    bar: 'bg-teal-500',
    text: 'text-teal-800',
  },
};

const FALLBACK: WorldStyle = {
  card: 'bg-brand-50 border-brand-200',
  icon: 'bg-brand-100',
  bar: 'bg-brand-600',
  text: 'text-brand-800',
};

export function worldStyle(color: string): WorldStyle {
  return WORLD_STYLES[color] ?? FALLBACK;
}
