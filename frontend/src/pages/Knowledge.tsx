import { useEffect, useState } from 'react'
import { deleteDocument, ingestUrl, listKnowledge, reindexAll, reindexDocument } from '../api/knowledge'
import type { KnowledgeDocument } from '../types'
import { AppLayout } from '../components/layout/AppLayout'
import { PageHeader } from '../components/PageHeader'
import { IngestForm } from '../components/IngestForm'
import { KnowledgeTable } from '../components/KnowledgeTable'
import { Card, CardBody, CardHeader } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { FullPageSpinner } from '../components/ui/Spinner'

const POLL_INTERVAL_MS = 4000

export function KnowledgePage() {
  const [documents, setDocuments] = useState<KnowledgeDocument[] | null>(null)

  function refresh() {
    listKnowledge().then(setDocuments)
  }

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  async function handleIngest(url: string) {
    await ingestUrl(url)
    refresh()
  }

  async function handleReindex(id: string) {
    await reindexDocument(id)
    refresh()
  }

  async function handleDelete(id: string) {
    await deleteDocument(id)
    refresh()
  }

  return (
    <AppLayout>
      <div className="flex h-full flex-col gap-6 overflow-y-auto p-6">
        <PageHeader
          title="Knowledge Base"
          subtitle={documents ? `${documents.length} document(s) · AI-indexed` : undefined}
        />

        <Card>
          <CardHeader>
            <h2 className="text-sm font-semibold text-white/85">Add Website Content</h2>
            <p className="mt-0.5 text-xs text-white/40">
              Add pages like About Us, Services, Pricing, or FAQ. The AI only answers from what's indexed here.
            </p>
          </CardHeader>
          <CardBody>
            <IngestForm onSubmit={handleIngest} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/85">Indexed Content</h2>
            <Button variant="secondary" onClick={() => reindexAll().then(refresh)}>
              Re-index All
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            {!documents ? (
              <FullPageSpinner />
            ) : (
              <KnowledgeTable documents={documents} onReindex={handleReindex} onDelete={handleDelete} />
            )}
          </CardBody>
        </Card>
      </div>
    </AppLayout>
  )
}
