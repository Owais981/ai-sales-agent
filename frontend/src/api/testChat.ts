import { apiClient } from './client'
import type { ConversationDetail } from '../types'

export async function getTestChat(sessionId: string): Promise<ConversationDetail | null> {
  const response = await apiClient.get<ConversationDetail | null>(`/test-chat/${sessionId}`)
  // The backend returns a genuinely empty body (not JSON "null") when there's
  // no prior conversation for this session - axios hands that back as "",
  // which is truthy-adjacent enough to slip past `?.` guards downstream.
  // Normalize it to a real null here so callers only ever see one shape.
  return response.data && typeof response.data === 'object' ? response.data : null
}

export async function sendTestChatMessage(sessionId: string, content: string): Promise<ConversationDetail> {
  const response = await apiClient.post<ConversationDetail>(`/test-chat/${sessionId}/messages`, { content })
  return response.data
}
