import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export default function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        'rounded-md px-3 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2',
        variant === 'primary'
          ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
          : 'text-gray-900',
        className
      )}
    />
  )
} 