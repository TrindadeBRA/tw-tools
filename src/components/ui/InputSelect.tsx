// 'use client'

import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'

export interface Option {
    id: string | number
    title: string
    description?: string
}

interface InputSelectProps {
    label: string
    description?: string
    error?: string
    options: Option[]
    defaultValue?: Option
    className?: string
    onChange?: (value: Option) => void
}

export default function InputSelect({ 
    label, 
    description, 
    error, 
    options, 
    defaultValue = options[0], 
    className,
    onChange,
    ...props 
}: InputSelectProps) {
    const [selected, setSelected] = useState(defaultValue)

    const handleChange = (value: Option) => {
        setSelected(value)
        onChange?.(value)
    }

    return (
        <div className={className}>
            <Listbox value={selected} onChange={handleChange}>
                <div className="relative">
                    <Listbox.Label className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900">
                        {label}
                    </Listbox.Label>
                    {description && <p className="mt-1 text-sm/6 text-gray-600">{description}</p>}
                    
                    <Listbox.Button className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--color-main-600)] sm:text-sm/6">
                        <span className="col-start-1 row-start-1 truncate pr-6">{selected.title}</span>
                        <ChevronUpDownIcon
                            aria-hidden="true"
                            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                    </Listbox.Button>

                    <Listbox.Options
                        className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                    >
                        {options.map((option) => (
                            <Listbox.Option
                                key={option.id}
                                value={option}
                                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-[var(--color-main-600)] data-focus:text-white data-focus:outline-hidden"
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span className="block truncate font-normal group-data-selected:font-semibold">
                                            {option.title}
                                        </span>
                                        {option.description && (
                                            <span className={`block truncate text-sm ${
                                                active ? 'text-white/90' : 'text-gray-500'
                                            }`}>
                                                {option.description}
                                            </span>
                                        )}

                                        {selected && (
                                            <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                                active ? 'text-white' : 'text-[var(--color-main-600)]'
                                            }`}>
                                                <CheckIcon aria-hidden="true" className="size-5" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>

                {error && (
                    <p className="mt-2 text-sm text-[var(--color-main-600)]">
                        {error}
                    </p>
                )}
            </Listbox>
        </div>
    )
} 