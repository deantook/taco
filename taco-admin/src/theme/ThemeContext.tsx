import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'taco_theme'

type ThemeContextValue = {
  dark: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readInitialDark(): boolean {
  const s = localStorage.getItem(STORAGE_KEY)
  if (s === 'dark') {
    return true
  }
  if (s === 'light') {
    return false
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(() => readInitialDark())

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  }, [dark])

  const toggle = useCallback(() => {
    setDark((d) => !d)
  }, [])

  const value = useMemo(() => ({ dark, toggle }), [dark, toggle])

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- context hook paired with provider
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
