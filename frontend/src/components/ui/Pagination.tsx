import { Button } from './Button'

export function Pagination({
  page,
  pageCount,
  onPageChange,
}: {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}) {
  if (pageCount <= 1) return null

  return (
    <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-3">
      <Button variant="secondary" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        Previous
      </Button>
      <span className="text-xs text-white/40" style={{ fontFamily: 'JetBrains Mono' }}>
        Page {page} of {pageCount}
      </span>
      <Button variant="secondary" onClick={() => onPageChange(page + 1)} disabled={page >= pageCount}>
        Next
      </Button>
    </div>
  )
}
