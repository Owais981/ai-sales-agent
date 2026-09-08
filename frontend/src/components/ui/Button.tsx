import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { COLORS } from '../../lib/theme'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary: 'text-white hover:opacity-90',
  secondary: 'bg-white/[0.06] text-white/70 border border-white/[0.08] hover:bg-white/[0.1] hover:text-white/90',
  danger: 'text-white hover:opacity-90',
  ghost: 'bg-transparent text-white/60 hover:bg-white/[0.06] hover:text-white/85',
}

const variantBg: Partial<Record<Variant, string>> = {
  primary: COLORS.indigo,
  danger: COLORS.rose,
}

export function Button({ variant = 'primary', className = '', style, children, disabled, ...rest }: ButtonProps) {
  const bg = variantBg[variant]
  return (
    <button
      disabled={disabled}
      style={{ background: bg, ...style }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold
        transition-all duration-200 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
