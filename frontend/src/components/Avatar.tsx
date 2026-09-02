import type { Channel } from '../lib/customer'
import { COLORS } from '../lib/theme'

const CHANNEL_COLOR: Record<Channel, string> = {
  whatsapp: COLORS.emerald,
  website: COLORS.cyan,
  test: COLORS.violet,
}

export function Avatar({ name, channel }: { name: string; channel: Channel }) {
  const initial = name.trim().charAt(0).toUpperCase() || '?'
  const color = CHANNEL_COLOR[channel]
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
      style={{ background: `${color}22`, color }}
      aria-hidden="true"
    >
      {initial}
    </div>
  )
}
