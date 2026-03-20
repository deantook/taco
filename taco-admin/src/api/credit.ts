import type { Credit } from '../types/api'
import { apiFetch } from './client'

export function fetchCreditsByContent(contentType: string, contentId: number) {
  const q = new URLSearchParams({
    contentType,
    contentId: String(contentId),
  })
  return apiFetch<Credit[]>(`/credit?${q.toString()}`, { method: 'GET' })
}

export function getCredit(id: number) {
  return apiFetch<Credit>(`/credit/${id}`, { method: 'GET' })
}

export function createCredit(body: Partial<Credit>) {
  return apiFetch<Credit>('/credit', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function updateCredit(id: number, body: Partial<Credit>) {
  return apiFetch<Credit>(`/credit/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export function deleteCredit(id: number) {
  return apiFetch<void>(`/credit/${id}`, { method: 'DELETE' })
}
