import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
    label: string
    error?: string
    placeholder?: string
}

export default function InputText({ label, error, placeholder, type, id, ...props }: InputProps) {
    return (
        <>
            <div className="relative">
                <label
                    htmlFor={id}
                    className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
                >
                    {label}
                </label>
                <input
                    {...props}
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-main-600 sm:text-sm/6"
                />
            </div>
            <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
                {error}
            </p>
        </>
    )
}
