import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'outline' | 'secondary'
}

export function Button({ className = '', variant, ...rest }: Props) {
  const base =
    'inline-flex items-center justify-center h-10 px-4 font-medium rounded-xl transition border'
  const styles =
    variant === 'outline'
      ? 'bg-white border-slate-300 hover:bg-slate-50'
      : variant === 'secondary'
      ? 'bg-white text-slate-900 border-transparent hover:bg-slate-100'
      : 'text-white bg-[var(--brand)] border-[var(--brand)] hover:bg-[var(--brand-dark)]'
  return <button className={`${base} ${styles} ${className}`} {...rest} />
}
