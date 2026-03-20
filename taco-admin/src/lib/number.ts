/** 空串为 null；否则解析整数，非法为 null */
export function parseIntOptional(s: string): number | null {
  const t = s.trim()
  if (!t) {
    return null
  }
  const n = Number.parseInt(t, 10)
  return Number.isFinite(n) ? n : null
}
