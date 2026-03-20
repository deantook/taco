import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { ThemeProvider } from './theme/ThemeContext'
import { AdminLayout } from './layouts/AdminLayout'
import { LoginPage } from './pages/LoginPage'
import { PersonPage } from './pages/person/PersonPage'
import { RequireAuth } from './routes/RequireAuth'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<RequireAuth />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="/person" replace />} />
                <Route path="person" element={<PersonPage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/person" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
