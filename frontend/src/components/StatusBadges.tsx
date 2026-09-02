import { Badge } from './ui/Badge'
import type { ConversationStatus, LeadStatus } from '../types'

const conversationTone: Record<ConversationStatus, { tone: 'emerald' | 'amber' | 'violet' | 'gray'; label: string }> = {
  AI_ACTIVE: { tone: 'emerald', label: 'AI Active' },
  HUMAN_REQUESTED: { tone: 'amber', label: 'Human Requested' },
  HUMAN_ACTIVE: { tone: 'violet', label: 'Human Active' },
  CLOSED: { tone: 'gray', label: 'Closed' },
}

export function ConversationStatusBadge({ status }: { status: ConversationStatus }) {
  const { tone, label } = conversationTone[status]
  return <Badge tone={tone}>{label}</Badge>
}

const leadTone: Record<LeadStatus, { tone: 'cyan' | 'amber' | 'violet' | 'emerald' | 'rose'; label: string }> = {
  NEW: { tone: 'cyan', label: 'New' },
  CONTACTED: { tone: 'amber', label: 'Contacted' },
  QUALIFIED: { tone: 'violet', label: 'Qualified' },
  CONVERTED: { tone: 'emerald', label: 'Converted' },
  LOST: { tone: 'rose', label: 'Lost' },
}

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const { tone, label } = leadTone[status]
  return <Badge tone={tone}>{label}</Badge>
}
