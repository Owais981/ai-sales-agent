import { apiClient } from './client'
import type { ConversationDetail, ConversationListItem, Message, Paginated } from '../types'

export async function listConversations(params?: {
  page?: number
  page_size?: number
}): Promise<Paginated<ConversationListItem>> {
  const response = await apiClient.get<Paginated<ConversationListItem>>('/conversations/', { params })
  return response.data
}

export async function getConversation(id: string): Promise<ConversationDetail> {
  const response = await apiClient.get<ConversationDetail>(`/conversations/${id}`)
  return response.data
}

export async function takeoverConversation(id: string): Promise<ConversationDetail> {
  const response = await apiClient.post<ConversationDetail>(`/conversations/${id}/takeover`)
  return response.data
}

export async function releaseConversation(id: string): Promise<ConversationDetail> {
  const response = await apiClient.post<ConversationDetail>(`/conversations/${id}/release`)
  return response.data
}

export async function sendMessage(id: string, content: string): Promise<Message> {
  const response = await apiClient.post<Message>(`/conversations/${id}/messages`, { content })
  return response.data
}
