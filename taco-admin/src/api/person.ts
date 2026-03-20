import type { PagePayload, Person } from '../types/api'
import { apiFetch } from './client'

export function fetchPersonPage(current: number, size: number) {
  const q = new URLSearchParams({
    current: String(current),
    size: String(size),
  })
  return apiFetch<PagePayload<Person>>(`/person?${q.toString()}`, {
    method: 'GET',
  })
}

export function getPerson(id: number) {
  return apiFetch<Person>(`/person/${id}`, { method: 'GET' })
}

export function createPerson(body: Partial<Person>) {
  return apiFetch<Person>('/person', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function updatePerson(id: number, body: Partial<Person>) {
  return apiFetch<Person>(`/person/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export function deletePerson(id: number) {
  return apiFetch<void>(`/person/${id}`, { method: 'DELETE' })
}
