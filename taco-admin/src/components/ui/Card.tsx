import type { HTMLAttributes } from 'react'

export function Card({
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[var(--radius-panel)] border border-black/8 bg-[var(--color-surface)] shadow-sm dark:border-white/10 dark:bg-[var(--color-surface-dark)] ${className}`}
      {...props}
    />
  )
}
