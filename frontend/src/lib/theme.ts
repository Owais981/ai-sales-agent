/** Shared dark-theme design tokens, matching the approved visual design.
 * Centralized here so every component references the same palette instead
 * of re-typing hex values. */
export const COLORS = {
  violet: '#7c3aed',
  cyan: '#06b6d4',
  emerald: '#10b981',
  amber: '#f59e0b',
  rose: '#f43f5e',
  indigo: '#4f46e5',
} as const

export type AccentColor = keyof typeof COLORS

export const SURFACE = {
  base: '#0f172a',
  sidebar: '#0b1220',
  panel: '#1e293b',
  panel2: '#263449',
  border: 'rgba(255,255,255,0.07)',
} as const

export const TEXT = {
  primary: 'rgba(255,255,255,0.95)',
  secondary: 'rgba(255,255,255,0.7)',
  muted: 'rgba(255,255,255,0.45)',
  faint: 'rgba(255,255,255,0.3)',
} as const
