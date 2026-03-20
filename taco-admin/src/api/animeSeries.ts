import type { AnimeSeries, PagePayload } from '../types/api'
import { apiFetch } from './client'

export function fetchAnimeSeriesPage(current: number, size: number) {
  const q = new URLSearchParams({
    current: String(current),
    size: String(size),
  })
  return apiFetch<PagePayload<AnimeSeries>>(`/anime-series?${q.toString()}`, {
    method: 'GET',
  })
}

export function getAnimeSeries(id: number) {
  return apiFetch<AnimeSeries>(`/anime-series/${id}`, { method: 'GET' })
}

export function createAnimeSeries(body: Partial<AnimeSeries>) {
  return apiFetch<AnimeSeries>('/anime-series', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function updateAnimeSeries(id: number, body: Partial<AnimeSeries>) {
  return apiFetch<AnimeSeries>(`/anime-series/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export function deleteAnimeSeries(id: number) {
  return apiFetch<void>(`/anime-series/${id}`, { method: 'DELETE' })
}
