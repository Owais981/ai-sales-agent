import type { ConversationListItem, ConversationStatus, Lead, LeadStatus } from '../types'
import { getChannel, type Channel } from './customer'

export interface CategoryDatum {
  label: string
  value: number
  color: string
}

export interface GrowthRate {
  current: number
  previous: number
  /** Percent change vs the prior period. Null when the prior period had zero
   * leads - "up from 0" can't be expressed as a percentage, so the caller
   * should show a "new" state instead of a misleading number. */
  changePct: number | null
}

const DAY_MS = 24 * 60 * 60 * 1000

/** Compares a trend series' last bucket (the current, still-in-progress
 * period - e.g. today, or this week-so-far) against the one immediately
 * before it (the last fully-complete period). Works with the output of
 * leadsPerDay/leadsPerWeek/leadsPerMonth interchangeably. */
export function computeGrowth(data: { label: string; value: number }[]): GrowthRate {
  const current = data.length >= 1 ? data[data.length - 1].value : 0
  const previous = data.length >= 2 ? data[data.length - 2].value : 0
  const changePct = previous === 0 ? (current === 0 ? 0 : null) : ((current - previous) / previous) * 100
  return { current, previous, changePct }
}

/** Daily lead counts for the trailing `days` days (oldest first), including
 * days with zero leads so the trend reads as a continuous timeline. */
export function leadsPerDay(leads: Lead[], days = 14): { label: string; value: number }[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const buckets = new Map<string, number>()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today.getTime() - i * DAY_MS)
    buckets.set(d.toISOString().slice(0, 10), 0)
  }

  for (const lead of leads) {
    const key = new Date(lead.created_at).toISOString().slice(0, 10)
    if (buckets.has(key)) {
      buckets.set(key, (buckets.get(key) ?? 0) + 1)
    }
  }

  return Array.from(buckets.entries()).map(([key, value]) => ({
    label: new Date(key).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    value,
  }))
}

/** Weekly lead counts for the trailing `weeks` weeks (oldest first, weeks
 * starting Monday), including empty weeks so the trend stays continuous. */
export function leadsPerWeek(leads: Lead[], weeks = 8): { label: string; value: number }[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dayOfWeek = (today.getDay() + 6) % 7 // Monday = 0
  const thisWeekStart = new Date(today.getTime() - dayOfWeek * DAY_MS)

  const buckets = new Map<string, number>()
  for (let i = weeks - 1; i >= 0; i--) {
    const d = new Date(thisWeekStart.getTime() - i * 7 * DAY_MS)
    buckets.set(d.toISOString().slice(0, 10), 0)
  }
  const starts = Array.from(buckets.keys()).sort()

  for (const lead of leads) {
    const created = new Date(lead.created_at)
    created.setHours(0, 0, 0, 0)
    const leadDow = (created.getDay() + 6) % 7
    const weekStart = new Date(created.getTime() - leadDow * DAY_MS).toISOString().slice(0, 10)
    if (buckets.has(weekStart)) {
      buckets.set(weekStart, (buckets.get(weekStart) ?? 0) + 1)
    }
  }

  return starts.map((key) => ({
    label: new Date(key).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    value: buckets.get(key) ?? 0,
  }))
}

/** Monthly lead counts for the trailing `months` months (oldest first),
 * including empty months so the trend stays continuous. */
export function leadsPerMonth(leads: Lead[], months = 6): { label: string; value: number }[] {
  const now = new Date()
  const buckets = new Map<string, number>()
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    buckets.set(`${d.getFullYear()}-${d.getMonth()}`, 0)
  }

  for (const lead of leads) {
    const created = new Date(lead.created_at)
    const key = `${created.getFullYear()}-${created.getMonth()}`
    if (buckets.has(key)) {
      buckets.set(key, (buckets.get(key) ?? 0) + 1)
    }
  }

  return Array.from(buckets.keys()).map((key) => {
    const [year, month] = key.split('-').map(Number)
    return {
      label: new Date(year, month, 1).toLocaleDateString(undefined, { month: 'short', year: '2-digit' }),
      value: buckets.get(key) ?? 0,
    }
  })
}

const LEAD_STATUS_ORDER: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST']
const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  QUALIFIED: 'Qualified',
  CONVERTED: 'Converted',
  LOST: 'Lost',
}
// Ordinal ramp for the in-progress pipeline stages (funnel = ordered, not
// arbitrary categories), plus a distinct hue for the terminal "Lost" state -
// validated dark-mode steps from the dataviz skill's reference palette.
const LEAD_STATUS_COLOR: Record<LeadStatus, string> = {
  NEW: '#6da7ec',
  CONTACTED: '#3987e5',
  QUALIFIED: '#2a78d6',
  CONVERTED: '#199e70',
  LOST: '#e66767',
}

export function leadsByStatus(leads: Lead[]): CategoryDatum[] {
  const counts = new Map<LeadStatus, number>()
  for (const lead of leads) counts.set(lead.status, (counts.get(lead.status) ?? 0) + 1)
  return LEAD_STATUS_ORDER.map((status) => ({
    label: LEAD_STATUS_LABEL[status],
    value: counts.get(status) ?? 0,
    color: LEAD_STATUS_COLOR[status],
  }))
}

const CHANNEL_ORDER: Channel[] = ['whatsapp', 'website', 'test']
const CHANNEL_LABEL: Record<Channel, string> = { whatsapp: 'WhatsApp', website: 'Website', test: 'Test Chat' }
// First three categorical slots - validated all-pairs-safe together (see
// dataviz skill reference palette).
const CHANNEL_COLOR: Record<Channel, string> = { whatsapp: '#3987e5', website: '#d95926', test: '#199e70' }

export function conversationsByChannel(conversations: ConversationListItem[]): CategoryDatum[] {
  const counts = new Map<Channel, number>()
  for (const conversation of conversations) {
    const channel = getChannel(conversation.customer.phone_number)
    counts.set(channel, (counts.get(channel) ?? 0) + 1)
  }
  return CHANNEL_ORDER.filter((channel) => (counts.get(channel) ?? 0) > 0).map((channel) => ({
    label: CHANNEL_LABEL[channel],
    value: counts.get(channel) ?? 0,
    color: CHANNEL_COLOR[channel],
  }))
}

const CONVERSATION_STATUS_ORDER: ConversationStatus[] = ['AI_ACTIVE', 'HUMAN_REQUESTED', 'HUMAN_ACTIVE', 'CLOSED']
const CONVERSATION_STATUS_LABEL: Record<ConversationStatus, string> = {
  AI_ACTIVE: 'AI handling',
  HUMAN_REQUESTED: 'Human requested',
  HUMAN_ACTIVE: 'Human active',
  CLOSED: 'Closed',
}
const CONVERSATION_STATUS_COLOR: Record<ConversationStatus, string> = {
  AI_ACTIVE: '#199e70',
  HUMAN_REQUESTED: '#c98500',
  HUMAN_ACTIVE: '#d55181',
  CLOSED: '#898781',
}

export function conversationsByStatus(conversations: ConversationListItem[]): CategoryDatum[] {
  const counts = new Map<ConversationStatus, number>()
  for (const conversation of conversations) counts.set(conversation.status, (counts.get(conversation.status) ?? 0) + 1)
  return CONVERSATION_STATUS_ORDER.filter((status) => (counts.get(status) ?? 0) > 0).map((status) => ({
    label: CONVERSATION_STATUS_LABEL[status],
    value: counts.get(status) ?? 0,
    color: CONVERSATION_STATUS_COLOR[status],
  }))
}
