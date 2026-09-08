"use client";

import { useEffect } from 'react';

/**
 * Tiny client component that handles hash-based smooth-scrolling.
 * Kept separate so the parent page remains a Server Component.
 */
export default function HashScrollHandler() {
  useEffect(() => {
    const scroll = () => {
      if (window.location.hash) {
        const el = document.getElementById(window.location.hash.slice(1));
        if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      }
    };
    scroll();
    window.addEventListener('hashchange', scroll);
    return () => window.removeEventListener('hashchange', scroll);
  }, []);

  return null;
}
