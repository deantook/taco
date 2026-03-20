import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  BookOpen,
  Film,
  LogOut,
  Moon,
  Shield,
  Sparkles,
  Sun,
  Tv,
  Users,
} from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { useTheme } from '../theme/ThemeContext'
import { Button } from '../components/ui/Button'

const nav = [
  { to: '/person', label: '人物', icon: Users },
  { to: '/movie', label: '电影', icon: Film },
  { to: '/book', label: '书', icon: BookOpen },
  { to: '/tv-series', label: '电视剧', icon: Tv },
  { to: '/anime-series', label: '番剧', icon: Sparkles },
  { to: '/role', label: '角色', icon: Shield },
] as const

export function AdminLayout() {
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const location = useLocation()

  const title =
    nav.find(
      (n) =>
        location.pathname === n.to || location.pathname.startsWith(`${n.to}/`)
    )?.label ?? '控制台'

  return (
    <div className="flex min-h-screen font-sans">
      <aside className="flex w-56 shrink-0 flex-col border-r border-black/8 bg-[var(--color-surface)] dark:border-white/10 dark:bg-neutral-950">
        <div className="flex h-14 items-center border-b border-black/8 px-4 dark:border-white/10">
          <Link
            to="/person"
            className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
          >
            taco
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-2">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-[var(--radius-panel)] px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-black/5 text-neutral-900 dark:bg-white/10 dark:text-white'
                    : 'text-neutral-600 hover:bg-black/5 dark:text-neutral-400 dark:hover:bg-white/5'
                }`
              }
            >
              <Icon className="size-4 shrink-0 opacity-70" strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-[var(--color-canvas)] dark:bg-[var(--color-canvas-dark)]">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-black/8 px-6 dark:border-white/10">
          <h1 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {title}
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              type="button"
              className="size-8 p-0"
              onClick={toggle}
              aria-label={dark ? '浅色模式' : '深色模式'}
            >
              {dark ? (
                <Sun className="size-4" strokeWidth={1.75} />
              ) : (
                <Moon className="size-4" strokeWidth={1.75} />
              )}
            </Button>
            <span className="max-w-[12rem] truncate text-sm text-neutral-500 dark:text-neutral-400">
              {user?.username ?? user?.email ?? '—'}
            </span>
            <Button
              variant="ghost"
              type="button"
              className="gap-1.5 px-2"
              onClick={() => logout()}
            >
              <LogOut className="size-4" strokeWidth={1.75} />
              退出
            </Button>
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
