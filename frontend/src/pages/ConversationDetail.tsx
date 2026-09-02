import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getConversation, releaseConversation, sendMessage, takeoverConversation } from '../api/conversations'
import type { ConversationDetail as ConversationDetailType } from '../types'
import { AppLayout } from '../components/layout/AppLayout'
import { ConversationHeader } from '../components/ConversationHeader'
import { MessageBubble } from '../components/MessageBubble'
import { MessageComposer } from '../components/MessageComposer'
import { FullPageSpinner } from '../components/ui/Spinner'

const POLL_INTERVAL_MS = 5000

export function ConversationDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [conversation, setConversation] = useState<ConversationDetailType | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const refresh = useCallback(() => {
    if (!id) return
    getConversation(id).then(setConversation)
  }, [id])

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [refresh])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation?.messages?.length])

  async function handleTakeover() {
    if (!id) return
    setIsUpdating(true)
    try {
      setConversation(await takeoverConversation(id))
    } finally {
      setIsUpdating(false)
    }
  }

  async function handleRelease() {
    if (!id) return
    setIsUpdating(true)
    try {
      setConversation(await releaseConversation(id))
    } finally {
      setIsUpdating(false)
    }
  }

  async function handleSend(content: string) {
    if (!id) return
    await sendMessage(id, content)
    refresh()
  }

  return (
    <AppLayout>
      {!conversation ? (
        <FullPageSpinner />
      ) : (
        <div className="flex h-full flex-col">
          <ConversationHeader
            conversation={conversation}
            onTakeover={handleTakeover}
            onRelease={handleRelease}
            isUpdating={isUpdating}
          />
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {conversation.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <MessageComposer disabled={conversation.status !== 'HUMAN_ACTIVE'} onSend={handleSend} />
        </div>
      )}
    </AppLayout>
  )
}
