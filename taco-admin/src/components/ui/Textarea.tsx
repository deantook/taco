import type { TextareaHTMLAttributes } from 'react'

export function Textarea({
  className = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full resize-y rounded-[var(--radius-panel)] border border-black/8 bg-white px-3 py-2 text-sm text-neutral-900 outline-none ring-neutral-900/10 placeholder:text-neutral-400 focus:ring-2 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:ring-white/10 ${className}`}
      rows={4}
      {...props}
    />
  )
}
