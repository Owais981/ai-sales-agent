'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Horizontal scroll rail.
 *
 * A track that advances horizontally as the page scrolls vertically through the
 * section. Built to avoid the two things that make this pattern hostile:
 *
 * 1. **It is a real scroll container, not a hijack.** The track is natively
 *    scrollable with `overflow-x: auto`, so a trackpad swipe, a shift-wheel, a
 *    touch drag, keyboard focus and a screen reader all work whether or not the
 *    scroll-linked enhancement is running. The vertical-scroll coupling only
 *    *assists*; it never becomes the sole means of access. Most implementations
 *    pin the viewport and trap the user, which breaks all of the above.
 *
 * 2. **The page never scrolls horizontally.** Overflow is contained by this
 *    element, so the document body is unaffected — the rule that a page must
 *    never scroll sideways stays intact.
 *
 * Disabled under `prefers-reduced-motion`, where it degrades to an ordinary
 * horizontally scrollable list with visible affordance.
 */
export default function HorizontalScroll({
  children,
  className = '',
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ticking = false;
    let active = false;

    const io = new IntersectionObserver(
      (entries) => {
        active = entries[0]?.isIntersecting ?? false;
        if (active) schedule();
      },
      { rootMargin: '100px 0px' }
    );
    io.observe(section);

    function apply() {
      ticking = false;
      if (!active || !section || !track) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      // Nothing to advance through — the content fits.
      if (maxScroll <= 0) return;

      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // Progress from the section entering the viewport bottom to leaving the
      // top, clamped so the track sits at a stable end state either side.
      const total = rect.height + viewportH;
      const travelled = viewportH - rect.top;
      const progress = Math.max(0, Math.min(1, travelled / total));

      track.scrollLeft = progress * maxScroll;
    }

    function schedule() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    schedule();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={sectionRef} className={className}>
      <div
        ref={trackRef}
        className="hscroll-track"
        role="group"
        aria-label={ariaLabel}
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
}
