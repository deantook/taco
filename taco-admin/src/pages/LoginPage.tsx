import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ApiError } from '../api/client'
import { useAuth } from '../auth/AuthContext'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'

export function LoginPage() {
  const { token, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from =
    (location.state as { from?: { pathname?: string } })?.from?.pathname ??
    '/person'

  const [loginField, setLoginField] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (token) {
    return <Navigate to={from} replace />
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(loginField.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : '登录失败')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-canvas)] p-4 dark:bg-[var(--color-canvas-dark)]">
      <Card className="w-full max-w-[400px] p-8">
        <div className="mb-8 text-center">
          <h1 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            登录 taco
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            使用用户名或邮箱与密码
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="login"
              className="mb-1.5 block text-xs font-medium text-neutral-600 dark:text-neutral-400"
            >
              用户名或邮箱
            </label>
            <Input
              id="login"
              name="login"
              autoComplete="username"
              value={loginField}
              onChange={(e) => setLoginField(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-medium text-neutral-600 dark:text-neutral-400"
            >
              密码
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error ? (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          ) : null}
          <Button
            type="submit"
            variant="primary"
            className="w-full py-2.5"
            disabled={submitting}
          >
            {submitting ? '登录中…' : '继续'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
