import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonStyles
}

export const buttonStyles = {
  base: 'rounded-md px-3 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer',
  primary: 'bg-main-600 text-white hover:bg-main-500 focus-visible:outline-main-600',
  secondary: 'text-gray-900',
  copy: 'bg-gray-400 text-white hover:bg-gray-500 focus-visible:outline-gray-600'
} as const

export default function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        buttonStyles.base,
        buttonStyles[variant],
        className
      )}
    />
  )
} 