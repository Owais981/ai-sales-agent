import { useState, type FormEvent } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

export function IngestForm({ onSubmit }: { onSubmit: (url: string) => Promise<void> }) {
  const [url, setUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!url.trim()) return
    setIsSubmitting(true)
    try {
      await onSubmit(url.trim())
      setUrl('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="flex-1">
        <Input
          id="knowledge-url"
          label="Website page URL"
          type="url"
          placeholder="https://example.com/pricing"
          required
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding…' : 'Add & Ingest'}
      </Button>
    </form>
  )
}
