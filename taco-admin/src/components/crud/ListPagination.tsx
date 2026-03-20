import { Button } from '../ui/Button'

type ListPaginationProps = {
  total: number
  current: number
  size: number
  totalPages: number
  onCurrentChange: (c: number) => void
  onSizeChange: (s: number) => void
}

export function ListPagination({
  total,
  current,
  size,
  totalPages,
  onCurrentChange,
  onSizeChange,
}: ListPaginationProps) {
  if (total <= 0) {
    return null
  }

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-600 dark:text-neutral-400">
      <div className="flex items-center gap-2">
        <span>每页</span>
        <select
          value={size}
          onChange={(e) => {
            onSizeChange(Number(e.target.value))
            onCurrentChange(1)
          }}
          className="rounded-[var(--radius-panel)] border border-black/8 bg-white px-2 py-1 text-sm dark:border-white/10 dark:bg-neutral-950"
        >
          {[10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          type="button"
          disabled={current <= 1}
          onClick={() => onCurrentChange(Math.max(1, current - 1))}
        >
          上一页
        </Button>
        <span>
          {current} / {totalPages}
        </span>
        <Button
          variant="secondary"
          type="button"
          disabled={current >= totalPages}
          onClick={() =>
            onCurrentChange(current < totalPages ? current + 1 : current)
          }
        >
          下一页
        </Button>
      </div>
    </div>
  )
}
