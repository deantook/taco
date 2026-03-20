import type { ApiResult } from '../types/api'

export class ApiError extends Error {
  readonly code: number

  constructor(code: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.code = code
  }
}

export function getApiRoot(): string {
  const base = import.meta.env.VITE_API_BASE?.replace(/\/$/, '') ?? ''
  return base ? `${base}/api` : '/api'
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { skipAuth?: boolean }
): Promise<T> {
  const { skipAuth, ...rest } = init ?? {}
  const token = skipAuth ? null : localStorage.getItem('taco_token')
  const headers = new Headers(rest.headers)
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  const hasBody = rest.body !== undefined && rest.body !== null
  if (hasBody && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const url = `${getApiRoot()}${path.startsWith('/') ? path : `/${path}`}`
  const res = await fetch(url, { ...rest, headers })

  const text = await res.text()
  let json: ApiResult<T>
  try {
    json = JSON.parse(text) as ApiResult<T>
  } catch {
    throw new ApiError(res.status, text || res.statusText || '请求失败')
  }

  if (json.code !== 0) {
    throw new ApiError(json.code, json.message || '请求失败')
  }

  return json.data
}
