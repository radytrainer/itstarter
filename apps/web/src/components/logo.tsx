/**
 * The IT Starter logo: a learning map (a student, the path through the worlds, the goal pin).
 * One SVG file, sharp at every size; decorative next to the site name (empty alt).
 */
export function Logo({ size = 32, priority = false }: { size?: number; priority?: boolean }) {
  return (
    // A plain <img>: the SVG is tiny and static, so Next's image optimiser adds nothing here.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icons/icon.svg"
      alt=""
      width={size}
      height={size}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className="shrink-0"
    />
  );
}
