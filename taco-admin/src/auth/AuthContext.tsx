import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import * as authApi from '../api/auth'
import type { UserPublicResponse } from '../types/api'

type AuthContextValue = {
  token: string | null
  user: UserPublicResponse | null
  loading: boolean
  login: (login: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const TOKEN_KEY = 'taco_token'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  )
  const [user, setUser] = useState<UserPublicResponse | null>(null)

  /** 已持有 token 但尚未拿到用户信息时视为加载中（含初次 /auth/me） */
  const loading = Boolean(token) && user === null

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const login = useCallback(async (loginStr: string, password: string) => {
    const res = await authApi.login({ login: loginStr, password })
    localStorage.setItem(TOKEN_KEY, res.token)
    setToken(res.token)
  }, [])

  useEffect(() => {
    if (!token) {
      return
    }
    let cancelled = false
    authApi
      .fetchMe()
      .then((u) => {
        if (!cancelled) {
          setUser(u)
        }
      })
      .catch(() => {
        if (!cancelled) {
          logout()
        }
      })
    return () => {
      cancelled = true
    }
  }, [token, logout])

  const value = useMemo(
    () => ({ token, user, loading, login, logout }),
    [token, user, loading, login, logout]
  )

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- context hook paired with provider
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
