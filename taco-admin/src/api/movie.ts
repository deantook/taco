import type { Movie, PagePayload } from '../types/api'
import { apiFetch } from './client'

export function fetchMoviePage(current: number, size: number) {
  const q = new URLSearchParams({
    current: String(current),
    size: String(size),
  })
  return apiFetch<PagePayload<Movie>>(`/movie?${q.toString()}`, {
    method: 'GET',
  })
}

export function getMovie(id: number) {
  return apiFetch<Movie>(`/movie/${id}`, { method: 'GET' })
}

export function createMovie(body: Partial<Movie>) {
  return apiFetch<Movie>('/movie', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function updateMovie(id: number, body: Partial<Movie>) {
  return apiFetch<Movie>(`/movie/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export function deleteMovie(id: number) {
  return apiFetch<void>(`/movie/${id}`, { method: 'DELETE' })
}
