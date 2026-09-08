"use client";

import dynamic from 'next/dynamic';

/**
 * Heavy client-only components wrapped here with ssr:false.
 * Preloader has been moved to layout.tsx as a static import
 * to prevent the initial content flash (FOUC).
 */
const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress'), { ssr: false });
const FloatingCTA    = dynamic(() => import('@/components/ui/FloatingCTA'),    { ssr: false });
const ScrollReveal   = dynamic(() => import('@/components/ui/ScrollReveal'),   { ssr: false });
const Parallax       = dynamic(() => import('@/components/ui/Parallax'),       { ssr: false });
const SmoothScroll   = dynamic(() => import('@/components/ui/SmoothScroll'),   { ssr: false });

export default function ClientShell() {
  return (
    <>
      <ScrollProgress />
      <FloatingCTA />
      <ScrollReveal />
      <Parallax />
      <SmoothScroll />
    </>
  );
}
