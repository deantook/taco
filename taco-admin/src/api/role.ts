import type { Role } from '../types/api'
import { apiFetch } from './client'

export function fetchRoleList() {
  return apiFetch<Role[]>('/role', { method: 'GET' })
}

export function getRole(id: number) {
  return apiFetch<Role>(`/role/${id}`, { method: 'GET' })
}

export function createRole(body: Partial<Role>) {
  return apiFetch<Role>('/role', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function updateRole(id: number, body: Partial<Role>) {
  return apiFetch<Role>(`/role/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export function deleteRole(id: number) {
  return apiFetch<void>(`/role/${id}`, { method: 'DELETE' })
}
