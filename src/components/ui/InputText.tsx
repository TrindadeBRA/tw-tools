import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
    label: string
    description?: string
    error?: string
    placeholder?: string
    className?: string
}

export default function InputText({ label, description, error, placeholder, type, id, className, ...props }: InputProps) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm/6 font-semibold text-gray-900">
                {label}
            </label>
            {description && <p className="mt-1 text-sm/6 text-gray-600">{description}</p>}
            
            <div className="relative mt-2">
                <input
                    {...props}
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-main-600 sm:text-sm/6"
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
