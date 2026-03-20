export type ApiResult<T> = {
  code: number
  message: string
  data: T
  timestamp: number
}

export type PagePayload<T> = {
  records: T[]
  total: number
  current: number
  size: number
  pages: number
}

export type UserPublicResponse = {
  id: number
  username: string
  email: string
  avatar: string | null
  bio: string | null
  status: string
}

export type TokenResponse = {
  token: string
  tokenType: string
  expiresIn: number
  user: UserPublicResponse
}

export type Person = {
  id: number | null
  name: string | null
  originalName: string | null
  avatar: string | null
  bio: string | null
  aliases: unknown
  gender: unknown
  birthDate: string | number | null
  createdAt: string | number | null
  updatedAt: string | number | null
}
