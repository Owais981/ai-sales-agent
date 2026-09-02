import { apiClient } from './client'
import type { CurrentUser } from '../types'

export async function login(email: string, password: string): Promise<string> {
  const response = await apiClient.post<{ access_token: string }>('/auth/login', { email, password })
  return response.data.access_token
}

export async function fetchCurrentUser(): Promise<CurrentUser> {
  const response = await apiClient.get<CurrentUser>('/auth/me')
  return response.data
}
