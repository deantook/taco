import type { TokenResponse, UserPublicResponse } from '../types/api'
import { apiFetch } from './client'

export type LoginBody = {
  login: string
  password: string
}

export function login(body: LoginBody) {
  return apiFetch<TokenResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
    skipAuth: true,
  })
}

export function fetchMe() {
  return apiFetch<UserPublicResponse>('/auth/me', { method: 'GET' })
}
