import type { ReactNode } from 'react'

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-2xl font-bold text-white/95">{title}</div>
        {subtitle && (
          <div className="mt-1 text-sm text-white/40" style={{ fontFamily: 'JetBrains Mono' }}>
            {subtitle}
          </div>
        )}
      </div>
      {action}
    </div>
  )
}
