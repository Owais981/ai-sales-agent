import { Link } from 'react-router-dom'
import type { Lead, LeadStatus } from '../types'
import { LeadStatusBadge } from './StatusBadges'
import { ChannelBadge } from './ChannelBadge'
import { Avatar } from './Avatar'
import { Select } from './ui/Select'
import { EmptyState } from './ui/EmptyState'
import { getChannel, getDisplayName, getShortIdentifier, getCapturedContact } from '../lib/customer'

const STATUS_OPTIONS: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST']

function formatDate(value: string): string {
  return new Date(value).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

export function LeadTable({
  leads,
  onStatusChange,
}: {
  leads: Lead[]
  onStatusChange?: (leadId: string, status: LeadStatus) => void
}) {
  if (leads.length === 0) {
    return <EmptyState title="No leads yet" description="Leads created from WhatsApp, your website, or test chats will show up here." />
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-white/[0.07] text-sm">
        <thead>
          <tr className="text-left text-xs font-medium tracking-wide text-white/40 uppercase" style={{ fontFamily: 'JetBrains Mono' }}>
            <th className="px-5 py-3">Customer</th>
            <th className="px-5 py-3">Contact</th>
            <th className="px-5 py-3">Interested In</th>
            <th className="px-5 py-3">Summary</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {leads.map((lead) => {
            const channel = getChannel(lead.customer.phone_number)
            const displayName = getDisplayName(lead.customer)
            const { primary: primaryContact, secondary: secondaryContact } = getCapturedContact(lead.customer)
            return (
              <tr key={lead.id} className="transition-colors hover:bg-white/[0.03]">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={displayName} channel={channel} />
                    <div>
                      <div className="whitespace-nowrap font-medium text-white/90">{displayName}</div>
                      <ChannelBadge phoneNumber={lead.customer.phone_number} />
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-white/60">
                  <div>
                    {channel === 'whatsapp'
                      ? lead.customer.phone_number
                      : (primaryContact ?? getShortIdentifier(lead.customer.phone_number))}
                  </div>
                  {secondaryContact && <div className="text-xs text-white/30">{secondaryContact}</div>}
                </td>
                <td className="max-w-[145px] truncate px-5 py-3 text-white/60" title={lead.interested_in}>
                  {lead.interested_in}
                </td>
                <td className="max-w-[220px] truncate px-5 py-3 text-white/50" title={lead.summary}>
                  {lead.summary}
                </td>
                <td className="px-5 py-3">
                  {onStatusChange ? (
                    <Select
                      value={lead.status}
                      onChange={(event) => onStatusChange(lead.id, event.target.value as LeadStatus)}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <LeadStatusBadge status={lead.status} />
                  )}
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-white/40" style={{ fontFamily: 'JetBrains Mono' }}>
                  <Link to={`/conversations/${lead.conversation_id}`} className="hover:underline">
                    {formatDate(lead.created_at)}
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
