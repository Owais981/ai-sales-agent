import { useEffect, useState } from 'react'
import { listConversations } from '../api/conversations'
import type { ConversationListItem } from '../types'
import { AppLayout } from '../components/layout/AppLayout'
import { PageHeader } from '../components/PageHeader'
import { ConversationList } from '../components/ConversationList'
import { Card, CardBody } from '../components/ui/Card'
import { FullPageSpinner } from '../components/ui/Spinner'
import { Pagination } from '../components/ui/Pagination'

const PAGE_SIZE = 20

export function ConversationsPage() {
  const [conversations, setConversations] = useState<ConversationListItem[] | null>(null)
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setConversations(null)
    listConversations({ page, page_size: PAGE_SIZE }).then((data) => {
      setConversations(data.results)
      setCount(data.count)
    })
  }, [page])

  const pageCount = Math.max(1, Math.ceil(count / PAGE_SIZE))

  return (
    <AppLayout>
      <div className="flex h-full flex-col gap-6 overflow-y-auto p-6">
        <PageHeader title="Conversations" subtitle={count ? `${count} total threads` : undefined} />
        {!conversations ? (
          <FullPageSpinner />
        ) : (
          <Card>
            <CardBody className="p-0">
              <ConversationList conversations={conversations} />
              <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
            </CardBody>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
