import type { ConversationDetail } from '../types'
import { ConversationStatusBadge } from './StatusBadges'
import { ChannelBadge } from './ChannelBadge'
import { Avatar } from './Avatar'
import { Button } from './ui/Button'
import { getChannel, getDisplayName, getShortIdentifier, getCapturedContact } from '../lib/customer'

export function ConversationHeader({
  conversation,
  onTakeover,
  onRelease,
  isUpdating,
}: {
  conversation: ConversationDetail
  onTakeover: () => void
  onRelease: () => void
  isUpdating: boolean
}) {
  const canTakeover = conversation.status === 'AI_ACTIVE' || conversation.status === 'HUMAN_REQUESTED'
  const canRelease = conversation.status === 'HUMAN_ACTIVE'
  const channel = getChannel(conversation.customer.phone_number)
  const displayName = getDisplayName(conversation.customer)
  const { primary: primaryContact, secondary: secondaryContact } = getCapturedContact(conversation.customer)

  return (
    <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-4">
      <div className="flex items-center gap-3">
        <Avatar name={displayName} channel={channel} />
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-white/90">{displayName}</p>
            <ChannelBadge phoneNumber={conversation.customer.phone_number} />
          </div>
          <p className="text-xs text-white/40">
            {channel === 'whatsapp'
              ? conversation.customer.phone_number
              : (primaryContact ?? getShortIdentifier(conversation.customer.phone_number))}
          </p>
          {secondaryContact && <p className="text-xs text-white/40">{secondaryContact}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ConversationStatusBadge status={conversation.status} />
        {canTakeover && (
          <Button onClick={onTakeover} disabled={isUpdating}>
            Take Over
          </Button>
        )}
        {canRelease && (
          <Button variant="secondary" onClick={onRelease} disabled={isUpdating}>
            Release to AI
          </Button>
        )}
      </div>
    </div>
  )
}
