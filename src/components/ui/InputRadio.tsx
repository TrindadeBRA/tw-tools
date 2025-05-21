import { ComponentProps } from 'react'

interface Option {
    id: string
    title: string
}

interface InputRadioProps extends Omit<ComponentProps<'input'>, 'type'> {
    label: string
    description?: string
    error?: string
    options: Option[]
    defaultOption?: string
    name: string
}

export default function InputRadio({ label, description, error, options, defaultOption, name, ...props }: InputRadioProps) {
    return (
        <fieldset>
            <legend className="text-sm/6 font-semibold text-gray-900">{label}</legend>
            {description && <p className="mt-1 text-sm/6 text-gray-600">{description}</p>}
            
            <div className="mt-6 space-y-6 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                {options.map((option) => (
                    <div key={option.id} className="flex items-center">
                        <input
                            {...props}
                            id={option.id}
                            name={name}
                            type="radio"
                            value={option.id}
                            defaultChecked={option.id === defaultOption}
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-main-600 checked:bg-main-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                        />
                        <label htmlFor={option.id} className="ml-3 block text-sm/6 font-medium text-gray-900">
                            {option.title}
                        </label>
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
