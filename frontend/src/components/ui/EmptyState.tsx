import type { ReactNode } from 'react'

export function EmptyState({ title, description, icon }: { title: string; description?: string; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
      {icon && <div className="mb-1 text-white/20">{icon}</div>}
      <p className="text-sm font-medium text-white/80">{title}</p>
      {description && <p className="max-w-sm text-sm text-white/40">{description}</p>}
    </div>
  )
}
