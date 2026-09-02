import type { ReactNode } from 'react'
import { Card, CardBody, CardHeader } from './ui/Card'

export function SettingsPanel({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-sm font-semibold text-white/85">{title}</h2>
        {description && <p className="mt-0.5 text-xs text-white/40">{description}</p>}
      </CardHeader>
      <CardBody className="flex flex-col gap-3">{children}</CardBody>
    </Card>
  )
}

export function SettingsRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] py-2 text-sm last:border-0 last:pb-0">
      <span className="text-white/45">{label}</span>
      <span className="font-medium text-white/90">{value}</span>
    </div>
  )
}
