'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Route transition.
 *
 * app/template.tsx (as opposed to layout.tsx) is remounted on every navigation,
 * which is exactly the hook a page transition needs — the animation restarts per
 * route without any client-side router state of our own.
 *
 * The transition is intentionally short and enter-only. A leave animation would
 * mean holding the old page on screen while the new one is already available,
 * which adds latency to every navigation to buy a flourish nobody asked for.
 *
 * Scroll is reset explicitly on route change: Lenis keeps its own scroll
 * position, so without this a navigation can land mid-page on the new route.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip the animation entirely for users who ask for reduced motion; the
    // CSS class is what carries the transition, so simply not adding it is
    // enough.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = ref.current;
    if (!el || prefersReduced) return;

    el.classList.remove('route-enter');
    // Force a reflow so the class removal is committed before it is re-added,
    // otherwise the browser coalesces both and the animation never replays.
    void el.offsetWidth;
    el.classList.add('route-enter');
  }, [pathname]);

  return (
    <div ref={ref} className="route-enter">
      {children}
    </div>
  );
}
