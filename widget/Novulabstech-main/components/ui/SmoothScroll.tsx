'use client';

import { useEffect } from 'react';

/**
 * Lenis smooth scrolling.
 *
 * Deliberately conservative settings. Smooth scroll is the single easiest way to
 * make a site feel broken: too much duration and the page feels like it is
 * fighting the user's input, and momentum that overshoots makes precise reading
 * impossible. `lerp` 0.12 tracks the wheel closely enough that the page still
 * feels directly manipulated.
 *
 * Interactions with the rest of the motion system:
 *
 * - `syncTouch` is left OFF. Native touch scrolling on mobile is already smooth,
 *   hardware-accelerated, and matches platform expectations. Hijacking it is the
 *   main reason smooth-scroll libraries get a bad reputation on phones.
 * - Lenis moves the page with transforms rather than firing native scroll at the
 *   same cadence, so Parallax.tsx and ScrollProgress must be driven from Lenis's
 *   own tick. Lenis dispatches a `scroll` event, which those components already
 *   listen for, so no change is needed there — but this must stay true if Lenis
 *   is ever configured with a custom wrapper.
 * - Disabled entirely under `prefers-reduced-motion`. Animating a scroll the user
 *   initiated is exactly the class of motion that triggers vestibular symptoms.
 * - `html { scroll-behavior: smooth }` in globals.css is neutralised while Lenis
 *   is active, because the two fight each other over anchor navigation and the
 *   result is a visible double-animation.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    // Dynamic import keeps Lenis out of the initial bundle — it is presentation
    // polish, not something the first paint depends on.
    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;

      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';

      const instance = new Lenis({
        // ~0.12 keeps the page within a frame or two of the pointer. Higher
        // values read as lag rather than smoothness.
        lerp: 0.12,
        wheelMultiplier: 1,
        // Native touch scrolling is left alone. See note above.
        syncTouch: false,
        anchors: true,
      });

      lenis = instance as unknown as typeof lenis;

      const raf = (time: number) => {
        instance.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      // Restore the stylesheet's own behaviour if this ever unmounts.
      (instance as unknown as { _restore?: () => void })._restore = () => {
        root.style.scrollBehavior = previousScrollBehavior;
      };
    });

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
      if (lenis) {
        (lenis as unknown as { _restore?: () => void })._restore?.();
        lenis.destroy();
      }
    };
  }, []);

  return null;
}
