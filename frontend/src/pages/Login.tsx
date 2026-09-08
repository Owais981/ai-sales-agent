import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardBody } from '../components/ui/Card'
import { COLORS } from '../lib/theme'

export function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user) return <Navigate to="/" replace />

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await login(email, password)
      navigate('/', { replace: true })
    } catch {
      setError('Invalid email or password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] px-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
      <Card className="w-full max-w-sm">
        <CardBody className="flex flex-col gap-5 py-8">
          <div className="text-center">
            <div
              className="floating mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-white"
              style={{ background: `linear-gradient(135deg, ${COLORS.indigo}, ${COLORS.cyan})` }}
            >
              <span className="text-lg leading-none">⬡</span>
            </div>
            <h1 className="text-lg font-semibold text-white/95">Sales & Lead Agent</h1>
            <p className="text-sm text-white/40">Sign in to manage leads and conversations</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              id="email"
              label="Email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error && <p className="text-sm" style={{ color: COLORS.rose }}>{error}</p>}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
