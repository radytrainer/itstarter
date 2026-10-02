'use client';

import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

interface DragState {
  x: number;
  y: number;
  /** Moved far enough to count as a drag (not a tap). */
  moved: boolean;
}

const DRAG_THRESHOLD_PX = 8;

/**
 * Drag with Pointer Events: works for touch, mouse and pen (HTML5 drag-and-drop doesn't
 * work on phones). Drop targets mark themselves with `data-drop="<key>"`.
 * A short movement still counts as a tap, so tap-to-place keeps working.
 */
export function useDrag(onDrop: (targetKey: string | null) => void) {
  const [drag, setDrag] = useState<DragState | null>(null);
  const start = useRef({ x: 0, y: 0 });
  // Read only in event handlers (never during render): lets the click after a drag be ignored.
  const justDragged = useRef(false);

  const handlers = {
    onPointerDown(event: ReactPointerEvent<HTMLElement>) {
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      start.current = { x: event.clientX, y: event.clientY };
      justDragged.current = false;
      setDrag({ x: 0, y: 0, moved: false });
    },
    onPointerMove(event: ReactPointerEvent<HTMLElement>) {
      if (!drag) return;
      const x = event.clientX - start.current.x;
      const y = event.clientY - start.current.y;
      setDrag({ x, y, moved: drag.moved || Math.hypot(x, y) > DRAG_THRESHOLD_PX });
    },
    onPointerUp(event: ReactPointerEvent<HTMLElement>) {
      if (!drag) return;
      const wasDrag = drag.moved;
      justDragged.current = wasDrag;
      setDrag(null);
      if (!wasDrag) return;
      // Look under the finger, ignoring the dragged element itself.
      const element = event.currentTarget;
      element.style.visibility = 'hidden';
      const below = document.elementFromPoint(event.clientX, event.clientY);
      element.style.visibility = '';
      onDrop(below?.closest('[data-drop]')?.getAttribute('data-drop') ?? null);
    },
    onPointerCancel() {
      setDrag(null);
    },
  };

  return {
    handlers,
    dragging: drag?.moved ?? false,
    /** Call from onClick: true if that "click" was really the end of a drag. */
    wasDragged: () => justDragged.current,
    style: drag
      ? {
          transform: `translate(${drag.x}px, ${drag.y}px)`,
          zIndex: 30,
          position: 'relative' as const,
          touchAction: 'none' as const,
        }
      : { touchAction: 'none' as const },
  };
}
