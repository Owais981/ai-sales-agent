import type { GrowthRate } from '../lib/chartData'
import { COLORS } from '../lib/theme'

/** Shows the direction + size of change vs the prior period (e.g. "▲ 25%
 * vs last week"). Color and arrow carry the direction so it reads correctly
 * even to a viewer skimming past the number itself. */
export function GrowthBadge({ growth, periodLabel }: { growth: GrowthRate; periodLabel: string }) {
  const { changePct, current, previous } = growth

  if (changePct === null) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: COLORS.cyan }}>
        New {periodLabel}
      </span>
    )
  }

  if (changePct === 0 && current === 0 && previous === 0) {
    return <span className="text-xs text-white/40">No leads {periodLabel}</span>
  }

  const isFlat = changePct === 0
  const isUp = changePct > 0
  const color = isFlat ? 'rgba(255,255,255,0.5)' : isUp ? COLORS.emerald : COLORS.rose
  const arrow = isFlat ? '→' : isUp ? '▲' : '▼'

  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color }} title={`${current} vs ${previous} ${periodLabel}`}>
      {arrow} {Math.abs(changePct).toFixed(0)}% <span className="font-normal text-white/40">{periodLabel}</span>
    </span>
  )
}
