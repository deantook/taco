/** 空串视为 null；否则 JSON.parse */
export function parseOptionalJson(text: string): unknown {
  const t = text.trim()
  if (!t) {
    return null
  }
  return JSON.parse(t) as unknown
}
