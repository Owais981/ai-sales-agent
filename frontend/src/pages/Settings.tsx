import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { fetchHealth, type HealthStatus } from '../api/system'
import { AppLayout } from '../components/layout/AppLayout'
import { PageHeader } from '../components/PageHeader'
import { SettingsPanel, SettingsRow } from '../components/SettingsPanel'
import { Badge } from '../components/ui/Badge'

export function SettingsPage() {
  const { user } = useAuth()
  const [health, setHealth] = useState<HealthStatus | null>(null)

  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch(() => setHealth(null))
  }, [])

  return (
    <AppLayout>
      <div className="flex h-full flex-col gap-6 overflow-y-auto p-6">
        <PageHeader title="Settings" subtitle="Configure your AI Sales Agent" />
        <div className="flex max-w-2xl flex-col gap-6">
          <SettingsPanel title="Account">
            <SettingsRow label="Name" value={user?.name} />
            <SettingsRow label="Email" value={user?.email} />
            <SettingsRow label="Role" value={user?.is_admin ? 'Admin' : 'Sales Manager'} />
          </SettingsPanel>

          <SettingsPanel
            title="System Status"
            description="WhatsApp, LLM, and database configuration are managed via environment variables on the server, not from this dashboard."
          >
            <SettingsRow
              label="API"
              value={health ? <Badge tone="emerald">Online</Badge> : <Badge tone="rose">Unreachable</Badge>}
            />
            {health && (
              <>
                <SettingsRow label="Application" value={health.app} />
                <SettingsRow label="Environment" value={health.environment} />
              </>
            )}
          </SettingsPanel>
        </div>
      </div>
    </AppLayout>
  )
}
