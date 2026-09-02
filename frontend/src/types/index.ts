export type ConversationStatus = 'AI_ACTIVE' | 'HUMAN_REQUESTED' | 'HUMAN_ACTIVE' | 'CLOSED'
export type SenderType = 'CUSTOMER' | 'AI' | 'SALES_MANAGER' | 'SYSTEM'
export type MessageDirection = 'INBOUND' | 'OUTBOUND'
export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'LOST'
export type LeadSource = 'WHATSAPP_AI' | 'MANUAL'
export type KnowledgeDocumentStatus = 'PENDING' | 'INDEXED' | 'FAILED' | 'STALE'

export interface Customer {
  id: string
  name: string | null
  phone_number: string
  email: string | null
  captured_phone: string | null
}

export interface Message {
  id: string
  conversation_id: string
  sender_type: SenderType
  content: string
  direction: MessageDirection
  external_message_id: string | null
  created_at: string
}

export interface ConversationListItem {
  id: string
  customer: Customer
  status: ConversationStatus
  last_message_preview: string | null
  last_message_at: string
  assigned_sales_manager_id: string | null
}

export interface ConversationDetail extends ConversationListItem {
  started_at: string
  messages: Message[]
}

export interface Lead {
  id: string
  customer: Customer
  conversation_id: string
  interested_in: string
  summary: string
  status: LeadStatus
  source: LeadSource
  created_at: string
  updated_at: string
}

export interface KnowledgeDocument {
  id: string
  source_url: string
  title: string | null
  status: KnowledgeDocumentStatus
  last_indexed_at: string | null
  error_message: string | null
  chunk_count: number
}

export interface Paginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface DashboardStats {
  total_leads: number
  new_leads: number
  active_conversations: number
  human_handovers: number
  recent_leads: Lead[]
}

export interface CurrentUser {
  id: string
  email: string
  name: string
  is_admin: boolean
}
