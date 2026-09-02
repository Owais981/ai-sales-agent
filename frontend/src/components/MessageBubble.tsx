import type { Message } from '../types'
import { COLORS } from '../lib/theme'

const senderConfig: Record<Message['sender_type'], { align: string; color?: string; label: string }> = {
  CUSTOMER: { align: 'justify-start', label: 'Customer' },
  AI: { align: 'justify-end', color: COLORS.violet, label: 'AI Sales Agent' },
  SALES_MANAGER: { align: 'justify-end', color: COLORS.indigo, label: 'Sales Manager' },
  SYSTEM: { align: 'justify-center', label: 'System' },
}

function formatTime(value: string): string {
  return new Date(value).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })
}

export function MessageBubble({ message }: { message: Message }) {
  const config = senderConfig[message.sender_type]

  if (message.sender_type === 'SYSTEM') {
    return (
      <div className="flex justify-center">
        <div className="rounded-xl bg-white/[0.05] px-3 py-1.5 text-xs text-white/40 italic">{message.content}</div>
      </div>
    )
  }

  return (
    <div className={`chat-message flex ${config.align}`}>
      <div className="max-w-[75%]">
        {config.color && (
          <div className="mb-1 flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'JetBrains Mono' }}>
            <span style={{ color: config.color }}>⬡</span> {config.label}
          </div>
        )}
        <div
          className="rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
          style={{
            background: config.color ? `${config.color}22` : '#1e1e30',
            color: 'rgba(255,255,255,0.88)',
            border: config.color ? `1px solid ${config.color}40` : '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {message.content}
        </div>
        <div className="mt-1 text-right text-[10px] text-white/25" style={{ fontFamily: 'JetBrains Mono' }}>
          {formatTime(message.created_at)}
        </div>
      </div>
    </div>
  )
}
