'use client';

import { useEffect } from 'react';

/**
 * Entrance reveal driver for `[data-reveal]` elements.
 *
 * Why this exists alongside AOS: AOS is already wired into ~97 elements and is
 * left as-is, but it is a library-wide init that we cannot easily make
 * motion-preference aware per element, and it does not release its compositor
 * layers. This handles content AOS does not reach, using one shared
 * IntersectionObserver rather than a scroll listener, so reveal work happens off
 * the main thread's scroll path.
 *
 * Behaviour notes:
 * - Elements reveal once and are then unobserved. Re-animating on every scroll
 *   pass is the single most common way reveal animations become irritating.
 * - `rootMargin` fires the reveal slightly before the element reaches the
 *   viewport edge, so the transition is already underway by the time it is
 *   properly visible. Revealing exactly at the boundary reads as laggy.
 * - If the user prefers reduced motion, every element is set to its final state
 *   immediately and no observer is created at all.
 * - If IntersectionObserver is unavailable, everything is revealed immediately.
 *   Content must never depend on animation to become visible.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]')
    );
    if (nodes.length === 0) return;

    const revealAll = () => {
      nodes.forEach((el) => {
        el.dataset.reveal = 'is-visible';
      });
    };

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.dataset.reveal = 'is-visible';
          observer.unobserve(el);
        });
      },
      {
        // Start the transition 12% of the viewport height before the element
        // scrolls into view.
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.01,
      }
    );

    nodes.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
