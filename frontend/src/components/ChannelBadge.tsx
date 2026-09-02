import { getChannel } from '../lib/customer'
import { COLORS } from '../lib/theme'
import { WhatsAppIcon, GlobeIcon, BeakerIcon } from './icons'

const CHANNEL_CONFIG = {
  whatsapp: { label: 'WhatsApp', color: COLORS.emerald, Icon: WhatsAppIcon },
  website: { label: 'Website', color: COLORS.cyan, Icon: GlobeIcon },
  test: { label: 'Test', color: COLORS.violet, Icon: BeakerIcon },
} as const

export function ChannelBadge({ phoneNumber }: { phoneNumber: string }) {
  const { label, color, Icon } = CHANNEL_CONFIG[getChannel(phoneNumber)]
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={{ background: `${color}18`, color }}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  )
}
