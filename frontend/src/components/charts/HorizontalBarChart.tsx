import { useId, useState } from 'react'
import type { CategoryDatum } from '../../lib/chartData'

/** Horizontal bar chart for comparing a handful of named categories (channel
 * mix, pipeline stage, conversation state). Each bar carries its own direct
 * label, so no separate legend box is needed - identity is never color-alone.
 * Includes a hover tooltip per bar and a "View as table" toggle so every
 * value is reachable without hovering (dataviz skill: tooltips enhance,
 * never gate). */
export function HorizontalBarChart({ data, unit = 'lead' }: { data: CategoryDatum[]; unit?: string }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [showTable, setShowTable] = useState(false)
  const tableId = useId()
  const max = Math.max(1, ...data.map((d) => d.value))
  const total = data.reduce((sum, d) => sum + d.value, 0)

  if (total === 0) {
    return <p className="px-1 py-6 text-center text-sm text-white/30">No data yet.</p>
  }

  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          className="mb-2 text-xs text-white/35 underline decoration-dotted underline-offset-2 hover:text-white/60"
          aria-pressed={showTable}
          aria-controls={tableId}
        >
          {showTable ? 'View as chart' : 'View as table'}
        </button>
      </div>

      {showTable ? (
        <table id={tableId} className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-white/40" style={{ fontFamily: 'JetBrains Mono' }}>
              <th className="py-1 pr-3 font-medium">Category</th>
              <th className="py-1 font-medium">Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.label} className="border-t border-white/[0.06]">
                <td className="py-1.5 pr-3 text-white/80">{d.label}</td>
                <td className="py-1.5 text-white/60" style={{ fontFamily: 'JetBrains Mono' }}>
                  {d.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div id={tableId} className="flex flex-col gap-3">
          {data.map((d) => {
            const widthPct = (d.value / max) * 100
            const isHovered = hovered === d.label
            return (
              <div key={d.label} className="relative">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-white/70">{d.label}</span>
                  <span className="text-white/40" style={{ fontFamily: 'JetBrains Mono' }}>
                    {d.value}
                  </span>
                </div>
                <div className="h-[10px] rounded-full bg-white/[0.06]">
                  <button
                    type="button"
                    className="block h-full rounded-full transition-[filter] duration-150"
                    style={{
                      width: `${widthPct}%`,
                      background: d.color,
                      filter: isHovered ? 'brightness(1.2)' : undefined,
                    }}
                    onPointerEnter={() => setHovered(d.label)}
                    onPointerLeave={() => setHovered(null)}
                    onFocus={() => setHovered(d.label)}
                    onBlur={() => setHovered(null)}
                    aria-label={`${d.label}: ${d.value} ${unit}${d.value === 1 ? '' : 's'}`}
                  />
                </div>
                {isHovered && (
                  <div
                    className="pointer-events-none absolute -top-7 left-0 z-10 rounded-lg px-2.5 py-1 text-xs whitespace-nowrap shadow-lg"
                    style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <span className="font-semibold text-white">{d.value}</span>{' '}
                    <span className="text-white/50">
                      {unit}
                      {d.value === 1 ? '' : 's'}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
