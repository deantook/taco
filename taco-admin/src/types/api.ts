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

/** 演职角色类型（Person 职业：演员/导演等） */
export type Role = {
  id: number | null
  code: string | null
  name: string | null
  category: unknown
  description: string | null
  createdAt: string | number | null
}

/** 作品—人物—职业 关系（credit 表） */
export type Credit = {
  id: number | null
  contentType: unknown
  contentId: number | null
  personId: number | null
  roleId: number | null
  subRole: string | null
  characterName: string | null
  /** 排序，对应后端列名 order */
  order: number | null
  extra: unknown
  createdAt: string | number | null
}
