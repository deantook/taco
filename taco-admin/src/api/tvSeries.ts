import type { PagePayload, TvSeries } from '../types/api'
import { apiFetch } from './client'

export function fetchTvSeriesPage(current: number, size: number) {
  const q = new URLSearchParams({
    current: String(current),
    size: String(size),
  })
  return apiFetch<PagePayload<TvSeries>>(`/tv-series?${q.toString()}`, {
    method: 'GET',
  })
}

export function getTvSeries(id: number) {
  return apiFetch<TvSeries>(`/tv-series/${id}`, { method: 'GET' })
}

export function createTvSeries(body: Partial<TvSeries>) {
  return apiFetch<TvSeries>('/tv-series', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function updateTvSeries(id: number, body: Partial<TvSeries>) {
  return apiFetch<TvSeries>(`/tv-series/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export function deleteTvSeries(id: number) {
  return apiFetch<void>(`/tv-series/${id}`, { method: 'DELETE' })
}
