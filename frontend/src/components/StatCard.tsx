import type { ReactNode } from 'react'
import { Card, CardBody } from './ui/Card'
import type { AccentColor } from '../lib/theme'
import { COLORS } from '../lib/theme'

export function StatCard({
  label,
  value,
  icon,
  accent = 'violet',
}: {
  label: string
  value: number | string
  icon?: ReactNode
  accent?: AccentColor
}) {
  const color = COLORS[accent]
  return (
    <Card className="stat-card-3d cursor-default">
      <CardBody className="flex items-start justify-between">
        <div>
          <p className="mb-1 text-xs font-medium tracking-widest text-white/40 uppercase" style={{ fontFamily: 'JetBrains Mono' }}>
            {label}
          </p>
          <p className="text-3xl font-bold tracking-tight" style={{ color }}>
            {value}
          </p>
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${color}18`, color }}>
            {icon}
          </div>
        )}
      </CardBody>
      <div className="mx-5 mb-5 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </Card>
  )
}
