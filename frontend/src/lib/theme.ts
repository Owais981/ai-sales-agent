/** Shared dark-theme design tokens, matching the approved visual design.
 * Centralized here so every component references the same palette instead
 * of re-typing hex values. */
export const COLORS = {
  violet: '#7c3aed',
  cyan: '#06b6d4',
  emerald: '#10b981',
  amber: '#f59e0b',
  rose: '#f43f5e',
  indigo: '#6366f1',
} as const

export type AccentColor = keyof typeof COLORS

export const SURFACE = {
  base: '#0a0a12',
  sidebar: '#0d0d1a',
  panel: '#13131f',
  panel2: '#1a1a2e',
  border: 'rgba(255,255,255,0.07)',
} as const

export const TEXT = {
  primary: 'rgba(255,255,255,0.95)',
  secondary: 'rgba(255,255,255,0.7)',
  muted: 'rgba(255,255,255,0.45)',
  faint: 'rgba(255,255,255,0.3)',
} as const
