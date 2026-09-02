import type { ReactNode } from 'react'
import { COLORS, type AccentColor } from '../../lib/theme'

type Tone = AccentColor | 'gray'

const TONE_HEX: Record<Tone, string> = { ...COLORS, gray: '#94a3b8' }

export function Badge({ tone = 'gray', children }: { tone?: Tone; children: ReactNode }) {
  const color = TONE_HEX[tone]
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ background: `${color}18`, color }}
    >
      {children}
    </span>
  )
}
