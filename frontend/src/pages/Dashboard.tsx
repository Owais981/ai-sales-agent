import { useEffect, useMemo, useState } from 'react'
import { fetchDashboardStats } from '../api/dashboard'
import { listLeads } from '../api/leads'
import type { DashboardStats, Lead } from '../types'
import { AppLayout } from '../components/layout/AppLayout'
import { PageHeader } from '../components/PageHeader'
import { StatCard } from '../components/StatCard'
import { LeadTable } from '../components/LeadTable'
import { Card, CardHeader, CardBody } from '../components/ui/Card'
import { FullPageSpinner } from '../components/ui/Spinner'
import { LeadsIcon, ConversationsIcon, DashboardIcon, WhatsAppIcon } from '../components/icons'
import { COLORS } from '../lib/theme'
import { TrendBarChart } from '../components/charts/TrendBarChart'
import { HorizontalBarChart } from '../components/charts/HorizontalBarChart'
import { GrowthBadge } from '../components/GrowthBadge'
import { leadsPerDay, leadsPerWeek, leadsPerMonth, leadsByStatus, computeGrowth } from '../lib/chartData'

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
  const [granularity, setGranularity] = useState<Granularity>('day')

  useEffect(() => {
    fetchDashboardStats().then(setStats)
    // The charts below aggregate across every lead (trend/status breakdown),
    // not one page's worth - page_size is set to the API's max rather than
    // switching to a dedicated paginated view here. Fine at this project's
    // scale; a server-side aggregation endpoint would be the real fix once a
    // business has thousands of leads.
    listLeads({ page_size: 500 }).then((data) => setLeads(data.results))
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
  const contactedCount = useMemo(
    () => (leads ? leads.filter((l) => l.status !== 'NEW').length : 0),
    [leads],
  )
  const convertedCount = useMemo(
    () => (leads ? leads.filter((l) => l.status === 'CONVERTED').length : 0),
    [leads],
  )

  return (
    <AppLayout>
      {!stats ? (
        <FullPageSpinner />
      ) : (
        <div className="flex h-full flex-col gap-6 overflow-y-auto p-6">
          <PageHeader
            title="Sales Manager Overview"
            subtitle={`${formatDate(new Date())} · AI Agent Active`}
            action={
              <div
                className="flex items-center gap-2 rounded-xl px-4 py-2"
                style={{ background: `${COLORS.emerald}18`, border: `1px solid ${COLORS.emerald}40` }}
              >
                <span className="pulse-dot h-2 w-2 rounded-full" style={{ background: COLORS.emerald }} />
                <span className="text-xs font-semibold" style={{ color: COLORS.emerald }}>
                  AI Agent Online
                </span>
              </div>
            }
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Leads" value={stats.total_leads} icon={<LeadsIcon className="h-5 w-5" />} accent="violet" />
            <StatCard label="New Leads" value={stats.new_leads} icon={<DashboardIcon className="h-5 w-5" />} accent="cyan" />
            <StatCard
              label="Active Conversations"
              value={stats.active_conversations}
              icon={<ConversationsIcon className="h-5 w-5" />}
              accent="amber"
            />
            <StatCard
              label="Human Handovers"
              value={stats.human_handovers}
              icon={<WhatsAppIcon className="h-5 w-5" />}
              accent="emerald"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatCard label="Leads Contacted" value={contactedCount} icon={<ConversationsIcon className="h-5 w-5" />} accent="indigo" />
            <StatCard label="Confirmed Customers" value={convertedCount} icon={<LeadsIcon className="h-5 w-5" />} accent="emerald" />
          </div>

          <Card>
            <CardHeader className="flex items-center justify-between">
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
                        ? { background: COLORS.violet, color: 'white' }
                        : { color: 'rgba(255,255,255,0.5)' }
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardBody>
              {leads ? <TrendBarChart data={trendData} color={COLORS.violet} unit="lead" /> : <FullPageSpinner />}
            </CardBody>
          </Card>

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
              <h2 className="text-sm font-semibold text-white/85">Recent Leads</h2>
            </CardHeader>
            <CardBody className="p-0">
              <LeadTable leads={stats.recent_leads} />
            </CardBody>
          </Card>
        </div>
      )}
    </AppLayout>
  )
}
