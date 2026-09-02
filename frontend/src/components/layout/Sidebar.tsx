import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { COLORS, type AccentColor } from '../../lib/theme'
import { DashboardIcon, LeadsIcon, ConversationsIcon, BeakerIcon, KnowledgeIcon, SettingsIcon, LogoutIcon } from '../icons'

const navItems: { to: string; label: string; end?: boolean; Icon: typeof DashboardIcon; accent: AccentColor }[] = [
  { to: '/', label: 'Dashboard', end: true, Icon: DashboardIcon, accent: 'violet' },
  { to: '/leads', label: 'Leads', Icon: LeadsIcon, accent: 'rose' },
  { to: '/conversations', label: 'Conversations', Icon: ConversationsIcon, accent: 'amber' },
  { to: '/test-chat', label: 'Test Chat', Icon: BeakerIcon, accent: 'violet' },
  { to: '/knowledge', label: 'Knowledge', Icon: KnowledgeIcon, accent: 'cyan' },
  { to: '/settings', label: 'Settings', Icon: SettingsIcon, accent: 'emerald' },
]

export function Sidebar() {
  const { user, logout } = useAuth()
  const initials = (user?.name ?? '?')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-white/[0.07] bg-[#0d0d1a]">
      <div className="flex items-center gap-3 px-5 py-5">
        <div
          className="floating flex h-9 w-9 items-center justify-center rounded-xl text-white"
          style={{ background: `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.cyan})` }}
        >
          <span className="text-base leading-none">⬡</span>
        </div>
        <div>
          <div className="text-sm font-bold leading-none text-white/95">Sales & Lead</div>
          <div className="mt-0.5 text-xs font-semibold" style={{ color: COLORS.violet }}>
            AI Agent
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-2">
        <div className="mb-2 px-2 text-xs font-medium tracking-widest text-white/25 uppercase" style={{ fontFamily: 'JetBrains Mono' }}>
          Navigation
        </div>
        {navItems.map((item) => {
          const color = COLORS[item.accent]
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `nav-item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? '' : 'text-white/50 hover:text-white/85'
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? `${color}18` : 'transparent',
                border: isActive ? `1px solid ${color}30` : '1px solid transparent',
                color: isActive ? color : undefined,
              })}
            >
              {({ isActive }) => (
                <>
                  <item.Icon className="h-5 w-5 shrink-0" />
                  {item.label}
                  {isActive && <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-white/[0.07] px-3 pt-2 pb-4">
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.04] px-3 py-3">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold"
            style={{ background: `${COLORS.violet}33`, color: COLORS.violet }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-semibold text-white/80">{user?.name}</div>
            <div className="truncate text-xs text-white/35" style={{ fontFamily: 'JetBrains Mono' }}>
              {user?.is_admin ? 'Admin' : 'Sales Manager'}
            </div>
          </div>
          <button
            onClick={logout}
            aria-label="Log out"
            title="Log out"
            className="shrink-0 rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/[0.08] hover:text-white/80"
          >
            <LogoutIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
