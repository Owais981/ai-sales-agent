import { useState, type FormEvent } from 'react'
import { Button } from './ui/Button'
import { COLORS } from '../lib/theme'

export function MessageComposer({
  disabled,
  disabledHint,
  onSend,
}: {
  disabled: boolean
  disabledHint?: string
  onSend: (content: string) => Promise<void>
}) {
  const [content, setContent] = useState('')
  const [isSending, setIsSending] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!content.trim()) return
    setIsSending(true)
    try {
      await onSend(content.trim())
      setContent('')
    } finally {
      setIsSending(false)
    }
  }

  if (disabled) {
    return (
      <div className="border-t border-white/[0.07] bg-white/[0.02] px-5 py-3 text-center text-sm text-white/40">
        {disabledHint || 'Take over this conversation to reply as the sales team.'}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-white/[0.07] p-4">
      <textarea
        rows={1}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Type a reply to the customer…"
        className="flex-1 resize-none rounded-xl border px-3 py-2 text-sm text-white/85 placeholder:text-white/30 focus:outline-none"
        style={{ background: '#263449', borderColor: `${COLORS.indigo}30` }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSubmit(event)
          }
        }}
      />
      <Button type="submit" disabled={isSending || !content.trim()}>
        {isSending ? 'Sending…' : 'Send'}
      </Button>
    </form>
  )
}
