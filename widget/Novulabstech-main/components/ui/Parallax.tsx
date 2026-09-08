'use client';

import { useEffect } from 'react';

/**
 * Scroll-linked depth for `[data-parallax]` elements.
 *
 * Usage: `<div data-parallax="40">` — the value is the maximum travel in pixels,
 * reached when the element is at the very edge of the viewport. Omit it for the
 * 36px default.
 *
 * The offset is deliberately expressed as a bounded pixel maximum rather than
 * the more common "fraction of scroll distance". A fractional speed produces
 * unbounded travel on tall pages, which for a layer that fills its container —
 * a hero background — eventually drags its own edge into frame. Bounding the
 * travel lets the matching CSS scale headroom be computed exactly.
 *
 * Implementation notes, because naive parallax is a reliable source of jank:
 *
 * - Scroll handler is passive and does nothing but store the offset. All
 *   reads/writes happen in one rAF tick, so we never interleave layout reads
 *   with style writes and force synchronous reflow.
 * - Only `transform: translate3d` is written — never `top` or `background-position`
 *   — so the work stays on the compositor and off the main thread.
 * - An IntersectionObserver keeps a live set of on-screen elements. Off-screen
 *   elements are not transformed at all, so a long page with many parallax
 *   targets costs the same as one with a few.
 * - `will-change` is applied only while an element is actually on screen.
 *   Leaving it on permanently forces the browser to hold a layer per element for
 *   the life of the page, which costs more memory than the effect is worth.
 * - Disabled outright under `prefers-reduced-motion`. Scroll-linked movement is
 *   among the most reliable triggers for vestibular symptoms, so this is a hard
 *   opt-out, not a reduced-amplitude version.
 */
export default function Parallax() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]')
    );
    if (nodes.length === 0) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const visible = new Set<HTMLElement>();
    let ticking = false;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            visible.add(el);
            el.style.willChange = 'transform';
          } else {
            visible.delete(el);
            el.style.willChange = 'auto';
            el.style.transform = '';
          }
        });
        if (visible.size) schedule();
      },
      { rootMargin: '120px 0px' }
    );

    nodes.forEach((el) => io.observe(el));

    function apply() {
      ticking = false;
      const viewportH = window.innerHeight;

      visible.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Distance of the element's centre from the viewport's centre, then
        // normalised to -1..1 across the full range over which any part of the
        // element can be on screen. Zero when perfectly centred, so the element
        // sits at its authored position mid-screen and drifts symmetrically
        // either side of it.
        const fromCentre = rect.top + rect.height / 2 - viewportH / 2;
        const range = viewportH / 2 + rect.height / 2;
        const progress = Math.max(-1, Math.min(1, fromCentre / range));

        const maxTravel = parseFloat(el.dataset.parallax || '') || 36;
        const shift = -progress * maxTravel;
        el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
      });
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
      nodes.forEach((el) => {
        el.style.transform = '';
        el.style.willChange = 'auto';
      });
    };
  }, []);

  return null;
}
