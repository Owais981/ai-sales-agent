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
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const noObserver = typeof IntersectionObserver === 'undefined';

    // This component lives in the root layout, so it mounts once and survives
    // client-side navigation. Scanning only on mount meant every page reached
    // through the navbar kept its `[data-reveal]` elements at opacity 0 until a
    // hard refresh. A MutationObserver picks up elements as any page (or any
    // client-side re-render, e.g. a filter change) adds them.
    const seen = new WeakSet<Element>();

    const reveal = (el: HTMLElement) => {
      el.dataset.reveal = 'is-visible';
    };

    const io = prefersReduced || noObserver
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target as HTMLElement;
              reveal(el);
              io?.unobserve(el);
            });
          },
          {
            // Start the transition 12% of the viewport height before the
            // element scrolls into view.
            rootMargin: '0px 0px -12% 0px',
            threshold: 0.01,
          }
        );

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="is-visible"])')
        .forEach((el) => {
          if (seen.has(el)) return;
          seen.add(el);
          if (io) io.observe(el);
          else reveal(el);
        });
    };

    scan();

    let queued = false;
    const mutations = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      io?.disconnect();
    };
  }, []);

  return null;
}
