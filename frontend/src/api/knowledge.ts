import { apiClient } from './client'
import type { KnowledgeDocument } from '../types'

export async function listKnowledge(): Promise<KnowledgeDocument[]> {
  const response = await apiClient.get<KnowledgeDocument[]>('/knowledge/')
  return response.data
}

export async function ingestUrl(url: string): Promise<KnowledgeDocument> {
  const response = await apiClient.post<KnowledgeDocument>('/knowledge/ingest', { url })
  return response.data
}

export async function reindexDocument(documentId: string): Promise<void> {
  await apiClient.post('/knowledge/reindex', { document_id: documentId })
}

export async function reindexAll(): Promise<void> {
  await apiClient.post('/knowledge/reindex', {})
}

export async function deleteDocument(documentId: string): Promise<void> {
  await apiClient.delete(`/knowledge/${documentId}`)
}
