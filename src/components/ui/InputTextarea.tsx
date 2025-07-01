import { ComponentProps } from 'react'

interface InputTextareaProps extends ComponentProps<'textarea'> {
    label: string
    description?: string
    error?: string
    placeholder?: string
    className?: string
    rows?: number
}

export default function InputTextarea({ label, description, error, placeholder, id, className, rows = 4, ...props }: InputTextareaProps) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm/6 font-semibold text-gray-900">
                {label}
            </label>
            {description && <p className="mt-1 text-sm/6 text-gray-600">{description}</p>}
            
            <div className="relative mt-2">
                <textarea
                    {...props}
                    id={id}
                    placeholder={placeholder}
                    rows={rows}
                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-main-600 sm:text-sm/6 resize-vertical"
                />
            </div>
            
            {error && (
                <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    )
} 