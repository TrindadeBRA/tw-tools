import { ComponentProps } from 'react'

interface Option {
    id: string
    title: string
    description?: string
}

interface InputCheckboxProps {
    label: string
    description?: string
    error?: string
    options: Option[]
    defaultChecked?: string[]
    showDividers?: boolean
    className?: string
}

export default function InputCheckbox({ label, description, error, options, defaultChecked = [], showDividers = false, className, ...props }: InputCheckboxProps) {
    return (
        <fieldset className={showDividers ? "border-t border-b border-gray-200" : className}>
            <legend className="text-sm/6 font-semibold text-gray-900">{label}</legend>
            {description && <p className="mt-1 text-sm/6 text-gray-600">{description}</p>}
            
            <div className={showDividers ? "divide-y divide-gray-200" : "space-y-4"}>
                {options.map((option) => (
                    <div key={option.id} className="relative flex gap-3 pt-3.5 pb-4">
                        <div className="min-w-0 flex-1 text-sm/6">
                            <label htmlFor={option.id} className="font-medium text-gray-900">
                                {option.title}
                            </label>
                            {option.description && (
                                <p id={`${option.id}-description`} className="text-gray-500">
                                    {option.description}
                                </p>
                            )}
                        </div>
                        <div className="flex h-6 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                                <input
                                    id={option.id}
                                    name={option.id}
                                    type="checkbox"
                                    defaultChecked={defaultChecked.includes(option.id)}
                                    aria-describedby={option.description ? `${option.id}-description` : undefined}
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-main-600 checked:bg-main-600 indeterminate:border-main-600 indeterminate:bg-main-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                    <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-checked:opacity-100"
                                    />
                                    <path
                                        d="M3 7H11"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-indeterminate:opacity-100"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {error && (
                <p className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            )}
        </fieldset>
    )
} 