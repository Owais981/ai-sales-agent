import { Link } from 'react-router-dom'
import type { ConversationListItem } from '../types'
import { ConversationStatusBadge } from './StatusBadges'
import { ChannelBadge } from './ChannelBadge'
import { Avatar } from './Avatar'
import { EmptyState } from './ui/EmptyState'
import { getChannel, getDisplayName } from '../lib/customer'

function formatDate(value: string): string {
  return new Date(value).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

export function ConversationList({ conversations }: { conversations: ConversationListItem[] }) {
  if (conversations.length === 0) {
    return <EmptyState title="No conversations yet" description="Chats from WhatsApp, your website, or test chats will appear here." />
  }

  return (
    <ul className="divide-y divide-white/[0.05]">
      {conversations.map((conversation) => {
        const channel = getChannel(conversation.customer.phone_number)
        const displayName = getDisplayName(conversation.customer)
        return (
          <li key={conversation.id}>
            <Link
              to={`/conversations/${conversation.id}`}
              className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-white/[0.03]"
            >
              <Avatar name={displayName} channel={channel} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-white/90">{displayName}</p>
                  <ChannelBadge phoneNumber={conversation.customer.phone_number} />
                </div>
                <p className="mt-0.5 truncate text-sm text-white/40">{conversation.last_message_preview || '—'}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <ConversationStatusBadge status={conversation.status} />
                <span className="text-xs text-white/30" style={{ fontFamily: 'JetBrains Mono' }}>
                  {formatDate(conversation.last_message_at)}
                </span>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
