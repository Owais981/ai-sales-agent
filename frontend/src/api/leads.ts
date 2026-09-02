import { apiClient } from './client'
import type { Lead, LeadStatus, Paginated } from '../types'

export async function listLeads(params?: {
  status?: LeadStatus
  page?: number
  page_size?: number
}): Promise<Paginated<Lead>> {
  const response = await apiClient.get<Paginated<Lead>>('/leads/', { params })
  return response.data
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead> {
  const response = await apiClient.patch<Lead>(`/leads/${id}`, { status })
  return response.data
}
