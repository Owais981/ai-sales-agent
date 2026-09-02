import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, id, className = '', ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-white/80">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-xl border border-violet-500/30 bg-[#1a1a2e] px-3 py-2 text-sm text-white/85 placeholder:text-white/30
          focus:border-violet-400 focus:outline focus:outline-2 focus:outline-violet-500/30 ${className}`}
        {...rest}
      />
    </div>
  )
}
