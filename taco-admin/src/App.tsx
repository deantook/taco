import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { ThemeProvider } from './theme/ThemeContext'
import { AdminLayout } from './layouts/AdminLayout'
import { AnimeSeriesPage } from './pages/anime/AnimeSeriesPage'
import { BookPage } from './pages/book/BookPage'
import { LoginPage } from './pages/LoginPage'
import { MoviePage } from './pages/movie/MoviePage'
import { PersonPage } from './pages/person/PersonPage'
import { RolePage } from './pages/role/RolePage'
import { TvSeriesPage } from './pages/tv/TvSeriesPage'
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
                <Route path="movie" element={<MoviePage />} />
                <Route path="book" element={<BookPage />} />
                <Route path="tv-series" element={<TvSeriesPage />} />
                <Route path="anime-series" element={<AnimeSeriesPage />} />
                <Route path="role" element={<RolePage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/person" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
