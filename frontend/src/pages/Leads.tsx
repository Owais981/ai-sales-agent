import { useEffect, useState } from 'react'
import { listLeads, updateLeadStatus } from '../api/leads'
import type { Lead, LeadStatus } from '../types'
import { AppLayout } from '../components/layout/AppLayout'
import { PageHeader } from '../components/PageHeader'
import { LeadTable } from '../components/LeadTable'
import { Card, CardBody } from '../components/ui/Card'
import { FullPageSpinner } from '../components/ui/Spinner'
import { Pagination } from '../components/ui/Pagination'

const PAGE_SIZE = 20

export function LeadsPage() {
  const [leads, setLeads] = useState<Lead[] | null>(null)
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLeads(null)
    listLeads({ page, page_size: PAGE_SIZE }).then((data) => {
      setLeads(data.results)
      setCount(data.count)
    })
  }, [page])

  async function handleStatusChange(leadId: string, status: LeadStatus) {
    const updated = await updateLeadStatus(leadId, status)
    setLeads((prev) => (prev ? prev.map((lead) => (lead.id === leadId ? updated : lead)) : prev))
  }

  const pageCount = Math.max(1, Math.ceil(count / PAGE_SIZE))

  return (
    <AppLayout>
      <div className="flex h-full flex-col gap-6 overflow-y-auto p-6">
        <PageHeader title="Leads Pipeline" subtitle={count ? `${count} total leads` : undefined} />
        {!leads ? (
          <FullPageSpinner />
        ) : (
          <Card>
            <CardBody className="p-0">
              <LeadTable leads={leads} onStatusChange={handleStatusChange} />
              <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
            </CardBody>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
