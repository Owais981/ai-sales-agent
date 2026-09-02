import type { Customer } from '../types'

export type Channel = 'whatsapp' | 'website' | 'test'

/**
 * The backend encodes the source of a conversation into the customer's
 * phone_number field itself (see backend conversation_service /
 * website_chat / test_chat): "web-<session>" for the public widget,
 * "test-<session>" for the dashboard's Test Chat, and a real phone number
 * for WhatsApp. Centralizing the parsing here so every list/detail view
 * shows a consistent, human-friendly label instead of the raw identifier.
 */
export function getChannel(phoneNumber: string): Channel {
  if (phoneNumber.startsWith('web-')) return 'website'
  if (phoneNumber.startsWith('test-')) return 'test'
  return 'whatsapp'
}

export function getDisplayName(customer: Pick<Customer, 'name' | 'phone_number'>): string {
  if (customer.name) return customer.name
  switch (getChannel(customer.phone_number)) {
    case 'website':
      return 'Website Visitor'
    case 'test':
      return 'Test Conversation'
    default:
      return customer.phone_number
  }
}

/** A short, still-identifying fragment of the raw session id, for when the
 * full "web-<uuid>" string would be noisy but distinguishing between
 * multiple visitors in a list is still useful. */
export function getShortIdentifier(phoneNumber: string): string {
  const channel = getChannel(phoneNumber)
  if (channel === 'whatsapp') return phoneNumber
  const raw = phoneNumber.replace(/^(web|test)-/, '')
  return raw.length > 12 ? `${raw.slice(0, 8)}…` : raw
}

/** Real contact details the customer actually provided (typed in chat and
 * auto-extracted, or set explicitly) - preferred over the meaningless
 * session id baked into phone_number for non-WhatsApp channels. */
export function getCapturedContact(
  customer: Pick<Customer, 'captured_phone' | 'email'>,
): { primary: string | null; secondary: string | null } {
  if (customer.captured_phone && customer.email) {
    return { primary: customer.captured_phone, secondary: customer.email }
  }
  return { primary: customer.captured_phone || customer.email || null, secondary: null }
}
