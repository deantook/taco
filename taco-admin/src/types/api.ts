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

export type Movie = {
  id: number | null
  title: string | null
  originalTitle: string | null
  description: string | null
  duration: number | null
  releaseDate: string | number | null
  country: string | null
  language: string | null
  coverUrl: string | null
  metadata: unknown
  createdAt: string | number | null
  updatedAt: string | number | null
}

export type Book = {
  id: number | null
  title: string | null
  originalTitle: string | null
  description: string | null
  pageCount: number | null
  publisher: string | null
  publishDate: string | number | null
  coverUrl: string | null
  metadata: unknown
  createdAt: string | number | null
  updatedAt: string | number | null
}

export type TvSeries = {
  id: number | null
  title: string | null
  originalTitle: string | null
  description: string | null
  seasonCount: number | null
  episodeCount: number | null
  releaseDate: string | number | null
  status: unknown
  country: string | null
  language: string | null
  coverUrl: string | null
  metadata: unknown
  createdAt: string | number | null
  updatedAt: string | number | null
}

export type AnimeSeries = {
  id: number | null
  title: string | null
  originalTitle: string | null
  description: string | null
  episodeCount: number | null
  releaseDate: string | number | null
  season: string | null
  status: unknown
  studio: string | null
  coverUrl: string | null
  metadata: unknown
  createdAt: string | number | null
  updatedAt: string | number | null
}
