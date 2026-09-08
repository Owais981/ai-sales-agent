import { useState, type FormEvent } from 'react'
import { Button } from './ui/Button'
import { COLORS } from '../lib/theme'

const QUICK_PROMPTS = ['What services do you offer?', 'What is the pricing?', 'How do I get started?']

export function TestChatComposer({ onSend }: { onSend: (content: string) => Promise<void> }) {
  const [content, setContent] = useState('')
  const [isSending, setIsSending] = useState(false)

  async function submit(text: string) {
    if (!text.trim() || isSending) return
    setIsSending(true)
    try {
      await onSend(text.trim())
      setContent('')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="border-t border-white/[0.07] p-4">
      <div className="mb-3 flex flex-wrap gap-2">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => submit(prompt)}
            disabled={isSending}
            className="rounded-xl px-3 py-1.5 text-xs transition-all duration-200 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {prompt}
          </button>
        ))}
      </div>
      <form
        className="flex items-end gap-3"
        onSubmit={(event: FormEvent) => {
          event.preventDefault()
          submit(content)
        }}
      >
        <textarea
          rows={2}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Type a message as if you were the customer…"
          className="flex-1 resize-none rounded-2xl px-4 py-3 text-sm text-white/85 placeholder:text-white/30 focus:outline-none"
          style={{ background: '#263449', border: `1px solid ${COLORS.indigo}30` }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              submit(content)
            }
          }}
        />
        <Button type="submit" disabled={isSending || !content.trim()} className="min-w-20">
          {isSending ? 'Sending…' : 'Send'}
        </Button>
      </form>
    </div>
  )
}
