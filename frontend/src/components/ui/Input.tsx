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
        className={`rounded-xl border border-indigo-500/30 bg-[#263449] px-3 py-2 text-sm text-white/85 placeholder:text-white/30
          focus:border-indigo-400 focus:outline focus:outline-2 focus:outline-indigo-500/30 ${className}`}
        {...rest}
      />
    </div>
  )
}
