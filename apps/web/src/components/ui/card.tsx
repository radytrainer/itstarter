import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'article' | 'li';
  padded?: boolean;
}

/** A background (bg-*, gradient) or a border colour (border-amber-300, not border-2) in className. */
const HAS_BACKGROUND = /(^|\s)(bg-|from-)/;
const HAS_BORDER_COLOR = /(^|\s)border-(?!\d|[xytrbl]-|[xytrbl]\b|solid|dashed|dotted|none)[a-z]/;

/**
 * White rounded card. Pass your own colours in className to change it: the default background
 * and border colour are then left out, so the result never depends on the order of CSS rules
 * (e.g. bg-slate-900 + text-white must not end up white on white).
 */
export function Card({ as: Tag = 'div', padded = true, className = '', ...rest }: CardProps) {
  const background = HAS_BACKGROUND.test(className) ? '' : 'bg-surface';
  const borderColor = HAS_BORDER_COLOR.test(className) ? '' : 'border-line';
  return (
    <Tag
      className={`rounded-card border ${borderColor} ${background} shadow-card ${padded ? 'p-4 sm:p-5' : ''} ${className}`}
      {...rest}
    />
  );
}
