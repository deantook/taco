import type { Book, PagePayload } from '../types/api'
import { apiFetch } from './client'

export function fetchBookPage(current: number, size: number) {
  const q = new URLSearchParams({
    current: String(current),
    size: String(size),
  })
  return apiFetch<PagePayload<Book>>(`/book?${q.toString()}`, {
    method: 'GET',
  })
}

export function getBook(id: number) {
  return apiFetch<Book>(`/book/${id}`, { method: 'GET' })
}

export function createBook(body: Partial<Book>) {
  return apiFetch<Book>('/book', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function updateBook(id: number, body: Partial<Book>) {
  return apiFetch<Book>(`/book/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export function deleteBook(id: number) {
  return apiFetch<void>(`/book/${id}`, { method: 'DELETE' })
}
