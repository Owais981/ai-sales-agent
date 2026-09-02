import type { KnowledgeDocument } from '../types'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { EmptyState } from './ui/EmptyState'
import { COLORS } from '../lib/theme'

const statusTone: Record<KnowledgeDocument['status'], 'gray' | 'emerald' | 'rose' | 'amber'> = {
  PENDING: 'amber',
  INDEXED: 'emerald',
  FAILED: 'rose',
  STALE: 'gray',
}

const UPLOAD_PREFIX = 'upload://'

function SourceCell({ sourceUrl }: { sourceUrl: string }) {
  if (sourceUrl.startsWith(UPLOAD_PREFIX)) {
    return (
      <span className="inline-flex items-center gap-1.5 text-white/60">
        <Badge tone="cyan">File</Badge>
        {sourceUrl.slice(UPLOAD_PREFIX.length)}
      </span>
    )
  }

  return (
    <a href={sourceUrl} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: COLORS.cyan }}>
      {sourceUrl}
    </a>
  )
}

export function KnowledgeTable({
  documents,
  onReindex,
  onDelete,
}: {
  documents: KnowledgeDocument[]
  onReindex: (id: string) => void
  onDelete: (id: string) => void
}) {
  if (documents.length === 0) {
    return (
      <EmptyState
        title="No knowledge content indexed yet"
        description="Add a page URL above, or drop .txt/.json files in backend/data/ and run `python -m app.ingest_folder`."
      />
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-white/[0.07] text-sm">
        <thead>
          <tr className="text-left text-xs font-medium tracking-wide text-white/40 uppercase" style={{ fontFamily: 'JetBrains Mono' }}>
            <th className="px-5 py-3">Title</th>
            <th className="px-5 py-3">Source URL</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Chunks</th>
            <th className="px-5 py-3">Last Indexed</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {documents.map((doc) => (
            <tr key={doc.id} className="transition-colors hover:bg-white/[0.03]">
              <td className="px-5 py-3 font-medium text-white/90">{doc.title || '—'}</td>
              <td className="max-w-xs truncate px-5 py-3 text-white/50">
                <SourceCell sourceUrl={doc.source_url} />
              </td>
              <td className="px-5 py-3">
                <Badge tone={statusTone[doc.status]}>{doc.status}</Badge>
                {doc.status === 'FAILED' && doc.error_message && (
                  <p className="mt-1 max-w-xs truncate text-xs" style={{ color: COLORS.rose }} title={doc.error_message}>
                    {doc.error_message}
                  </p>
                )}
              </td>
              <td className="px-5 py-3 text-white/60">{doc.chunk_count}</td>
              <td className="px-5 py-3 whitespace-nowrap text-white/40" style={{ fontFamily: 'JetBrains Mono' }}>
                {doc.last_indexed_at ? new Date(doc.last_indexed_at).toLocaleString() : '—'}
              </td>
              <td className="px-5 py-3 text-right whitespace-nowrap">
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => onReindex(doc.id)}>
                    Re-index
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(doc.id)}>
                    Remove
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
