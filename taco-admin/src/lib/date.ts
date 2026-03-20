/** 展示用：兼容后端 Date 序列化为时间戳或 ISO 字符串 */
export function formatDisplayDate(
  value: string | number | null | undefined
): string {
  if (value == null || value === '') {
    return '—'
  }
  const d =
    typeof value === 'number' ? new Date(value) : new Date(String(value))
  if (Number.isNaN(d.getTime())) {
    return '—'
  }
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/** 表单 date input：yyyy-MM-dd */
export function toDateInputValue(
  value: string | number | null | undefined
): string {
  if (value == null || value === '') {
    return ''
  }
  const d =
    typeof value === 'number' ? new Date(value) : new Date(String(value))
  if (Number.isNaN(d.getTime())) {
    return ''
  }
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
