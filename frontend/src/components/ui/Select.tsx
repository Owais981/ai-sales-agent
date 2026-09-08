import type { SelectHTMLAttributes } from 'react'

export function Select({ className = '', ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`rounded-xl border border-indigo-500/30 bg-[#263449] px-2.5 py-1.5 text-sm text-white/85
        focus:border-indigo-400 focus:outline focus:outline-2 focus:outline-indigo-500/30 ${className}`}
      {...rest}
    />
  )
}
