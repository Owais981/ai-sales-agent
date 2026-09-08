import { useEffect, useMemo, useState } from 'react'
import { fetchDashboardStats } from '../api/dashboard'
import { listLeads } from '../api/leads'
import { listConversations } from '../api/conversations'
import type { ConversationListItem, DashboardStats, Lead } from '../types'
import { AppLayout } from '../components/layout/AppLayout'
import { PageHeader } from '../components/PageHeader'
import { StatCard } from '../components/StatCard'
import { LeadTable } from '../components/LeadTable'
import { Card, CardHeader, CardBody } from '../components/ui/Card'
import { FullPageSpinner } from '../components/ui/Spinner'
import { LeadsIcon, ConversationsIcon } from '../components/icons'
import { COLORS } from '../lib/theme'
import { TrendBarChart } from '../components/charts/TrendBarChart'
import { HorizontalBarChart } from '../components/charts/HorizontalBarChart'
import { GrowthBadge } from '../components/GrowthBadge'
import {
  leadsPerDay,
  leadsPerWeek,
  leadsPerMonth,
  leadsByStatus,
  conversationsByStatus,
  computeGrowth,
} from '../lib/chartData'

function formatDate(value: Date): string {
  return value.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })
}

type Granularity = 'day' | 'week' | 'month'
const GRANULARITY_OPTIONS: { key: Granularity; label: string; growthLabel: string }[] = [
  { key: 'day', label: 'Daily', growthLabel: 'vs yesterday' },
  { key: 'week', label: 'Weekly', growthLabel: 'vs last week' },
  { key: 'month', label: 'Monthly', growthLabel: 'vs last month' },
]

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [leads, setLeads] = useState<Lead[] | null>(null)
  const [conversations, setConversations] = useState<ConversationListItem[] | null>(null)
  const [granularity, setGranularity] = useState<Granularity>('day')

  useEffect(() => {
    fetchDashboardStats().then(setStats)
    // The charts below aggregate across every lead/conversation (trend/status
    // breakdown), not one page's worth - page_size is set to the API's max
    // rather than switching to a dedicated paginated view here. Fine at this
    // project's scale; a server-side aggregation endpoint would be the real
    // fix once a business has thousands of records.
    listLeads({ page_size: 500 }).then((data) => setLeads(data.results))
    listConversations({ page_size: 500 }).then((data) => setConversations(data.results))
  }, [])

  const trendData = useMemo(() => {
    if (!leads) return []
    if (granularity === 'week') return leadsPerWeek(leads)
    if (granularity === 'month') return leadsPerMonth(leads)
    return leadsPerDay(leads)
  }, [leads, granularity])

  const growth = useMemo(() => computeGrowth(trendData), [trendData])
  const growthLabel = GRANULARITY_OPTIONS.find((opt) => opt.key === granularity)!.growthLabel

  const statusData = useMemo(() => (leads ? leadsByStatus(leads) : []), [leads])
  const conversationStatusData = useMemo(
    () => (conversations ? conversationsByStatus(conversations) : []),
    [conversations],
  )
  const qualifiedCount = useMemo(
    () => (leads ? leads.filter((l) => l.status === 'QUALIFIED').length : 0),
    [leads],
  )
  const convertedCount = useMemo(
    () => (leads ? leads.filter((l) => l.status === 'CONVERTED').length : 0),
    [leads],
  )
  const conversionRate = leads && leads.length > 0 ? Math.round((convertedCount / leads.length) * 1000) / 10 : 0

  return (
    <AppLayout>
      {!stats ? (
        <FullPageSpinner />
      ) : (
        <div className="flex h-full flex-col gap-6 overflow-y-auto p-6">
          <PageHeader title="Sales Manager Overview" subtitle={formatDate(new Date())} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Leads" value={stats.total_leads} icon={<LeadsIcon className="h-5 w-5" />} accent="indigo" />
            <StatCard label="Qualified Leads" value={qualifiedCount} icon={<LeadsIcon className="h-5 w-5" />} accent="emerald" />
            <StatCard label="Conversion Rate" value={`${conversionRate}%`} icon={<LeadsIcon className="h-5 w-5" />} accent="amber" />
            <StatCard
              label="Active Conversations"
              value={stats.active_conversations}
              icon={<ConversationsIcon className="h-5 w-5" />}
              accent="cyan"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex flex-col gap-6 lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-sm font-semibold text-white/85">Leads Over Time</h2>
                    {leads && <GrowthBadge growth={growth} periodLabel={growthLabel} />}
                  </div>
                  <div className="flex gap-1 rounded-lg bg-white/[0.04] p-1">
                    {GRANULARITY_OPTIONS.map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setGranularity(opt.key)}
                        className="rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
                        style={
                          granularity === opt.key
                            ? { background: COLORS.indigo, color: 'white' }
                            : { color: 'rgba(255,255,255,0.5)' }
                        }
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </CardHeader>
                <CardBody>
                  {leads ? <TrendBarChart data={trendData} color={COLORS.indigo} unit="lead" /> : <FullPageSpinner />}
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-sm font-semibold text-white/85">Recent Leads</h2>
                </CardHeader>
                <CardBody className="p-0">
                  <LeadTable leads={stats.recent_leads} />
                </CardBody>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <h2 className="text-sm font-semibold text-white/85">Leads by Status</h2>
                </CardHeader>
                <CardBody>
                  {leads ? <HorizontalBarChart data={statusData} unit="lead" /> : <FullPageSpinner />}
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-sm font-semibold text-white/85">AI vs Human Handling</h2>
                </CardHeader>
                <CardBody>
                  {conversations ? (
                    <HorizontalBarChart data={conversationStatusData} unit="conversation" />
                  ) : (
                    <FullPageSpinner />
                  )}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
