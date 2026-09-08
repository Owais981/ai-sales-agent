import { useEffect, useRef, useState } from 'react'
import { getTestChat, sendTestChatMessage } from '../api/testChat'
import type { ConversationDetail } from '../types'
import { AppLayout } from '../components/layout/AppLayout'
import { PageHeader } from '../components/PageHeader'
import { ConversationStatusBadge } from '../components/StatusBadges'
import { MessageBubble } from '../components/MessageBubble'
import { TestChatComposer } from '../components/TestChatComposer'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { FullPageSpinner } from '../components/ui/Spinner'
import { COLORS } from '../lib/theme'

const STORAGE_KEY = 'ai_sales_agent_test_chat_session'

function loadOrCreateSessionId(): string {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (existing) return existing
  const created = crypto.randomUUID()
  localStorage.setItem(STORAGE_KEY, created)
  return created
}

export function TestChatPage() {
  const [sessionId, setSessionId] = useState(loadOrCreateSessionId)
  const [conversation, setConversation] = useState<ConversationDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoading(true)
    getTestChat(sessionId)
      .then(setConversation)
      .finally(() => setIsLoading(false))
  }, [sessionId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation?.messages?.length])

  async function handleSend(content: string) {
    const updated = await sendTestChatMessage(sessionId, content)
    setConversation(updated)
  }

  function handleNewConversation() {
    const created = crypto.randomUUID()
    localStorage.setItem(STORAGE_KEY, created)
    setConversation(null)
    setSessionId(created)
  }

  return (
    <AppLayout>
      <div className="flex h-full flex-col overflow-hidden p-6">
        <PageHeader
          title="Test Chat"
          subtitle="Simulate the AI agent, powered by your real knowledge base"
          action={
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-1.5"
                style={{ background: `${COLORS.emerald}18`, border: `1px solid ${COLORS.emerald}40` }}
              >
                <span className="pulse-dot h-1.5 w-1.5 rounded-full" style={{ background: COLORS.emerald }} />
                <span className="text-xs font-semibold" style={{ color: COLORS.emerald, fontFamily: 'JetBrains Mono' }}>
                  Live Agent
                </span>
              </div>
              <Button variant="secondary" onClick={handleNewConversation}>
                New Conversation
              </Button>
            </div>
          }
        />

        <div className="mt-6 flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#1e293b]">
          {isLoading ? (
            <FullPageSpinner />
          ) : (
            <>
              {conversation && (
                <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-3">
                  <span className="text-sm font-medium text-white/70">Session: {sessionId.slice(0, 8)}</span>
                  <ConversationStatusBadge status={conversation.status} />
                </div>
              )}
              <div className="flex-1 space-y-4 overflow-y-auto p-6">
                {!conversation || conversation.messages.length === 0 ? (
                  <EmptyState
                    title="Say hello to get started"
                    description="Try asking something a real customer might, e.g. 'what services do you offer?' or 'how much does it cost?'"
                  />
                ) : (
                  conversation.messages.map((message) => <MessageBubble key={message.id} message={message} />)
                )}
                <div ref={messagesEndRef} />
              </div>
              <TestChatComposer onSend={handleSend} />
            </>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
