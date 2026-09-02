import type { SelectHTMLAttributes } from 'react'

export function Select({ className = '', ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`rounded-xl border border-violet-500/30 bg-[#1a1a2e] px-2.5 py-1.5 text-sm text-white/85
        focus:border-violet-400 focus:outline focus:outline-2 focus:outline-violet-500/30 ${className}`}
      {...rest}
    />
  )
}
