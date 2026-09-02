import { useId, useState } from 'react'

/** Vertical bar chart for a daily count over time. Single series - per the
 * dataviz skill, a single series needs no legend box (the card title already
 * names what's plotted). Sparing direct labels: only the max bar and the
 * hovered bar show a value, everything else is reachable via the table
 * toggle or the axis. */
export function TrendBarChart({ data, color, unit = 'lead' }: { data: { label: string; value: number }[]; color: string; unit?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [showTable, setShowTable] = useState(false)
  const tableId = useId()
  const max = Math.max(1, ...data.map((d) => d.value))
  const maxIndex = data.findIndex((d) => d.value === max)
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-white/40">
          <span className="font-semibold text-white/70">{total}</span> total in this period
        </span>
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          className="text-xs text-white/35 underline decoration-dotted underline-offset-2 hover:text-white/60"
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
              <th className="py-1 pr-3 font-medium">Date</th>
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
        <div id={tableId} className="relative flex h-36 items-end gap-1">
          {data.map((d, i) => {
            const heightPct = total === 0 ? 0 : Math.max((d.value / max) * 100, d.value > 0 ? 6 : 0)
            const isHovered = hoveredIndex === i
            const showLabel = isHovered || (i === maxIndex && d.value > 0)
            return (
              <div key={d.label} className="group relative flex h-full flex-1 flex-col items-center justify-end">
                {showLabel && (
                  <div
                    className="absolute -top-6 rounded-md px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white"
                    style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {d.value}
                  </div>
                )}
                <button
                  type="button"
                  className="w-full rounded-t-[4px] transition-[filter] duration-150"
                  style={{
                    height: `${heightPct}%`,
                    minHeight: d.value > 0 ? 3 : 1,
                    background: d.value > 0 ? color : 'rgba(255,255,255,0.08)',
                    filter: isHovered ? 'brightness(1.25)' : undefined,
                  }}
                  onPointerEnter={() => setHoveredIndex(i)}
                  onPointerLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(i)}
                  onBlur={() => setHoveredIndex(null)}
                  aria-label={`${d.label}: ${d.value} ${unit}${d.value === 1 ? '' : 's'}`}
                />
              </div>
            )
          })}
        </div>
      )}
      {!showTable && (
        <div className="mt-2 flex gap-1 text-[10px] text-white/30" style={{ fontFamily: 'JetBrains Mono' }}>
          {data.map((d, i) => (
            <div key={d.label} className="flex-1 text-center">
              {i === 0 || i === data.length - 1 || i === Math.floor(data.length / 2) ? d.label : ''}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
