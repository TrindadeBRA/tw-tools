'use client'

import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'

export interface Country {
  id: string
  name: string
  code: string
  flag: string
}

const countries: Country[] = [
  { id: 'BR', name: 'Brasil', code: '55', flag: '🇧🇷' },
  { id: 'US', name: 'Estados Unidos', code: '1', flag: '🇺🇸' },
  { id: 'PT', name: 'Portugal', code: '351', flag: '🇵🇹' },
  { id: 'ES', name: 'Espanha', code: '34', flag: '🇪🇸' },
  { id: 'FR', name: 'França', code: '33', flag: '🇫🇷' },
  { id: 'DE', name: 'Alemanha', code: '49', flag: '🇩🇪' },
  { id: 'IT', name: 'Itália', code: '39', flag: '🇮🇹' },
  { id: 'GB', name: 'Reino Unido', code: '44', flag: '🇬🇧' },
  { id: 'CA', name: 'Canadá', code: '1', flag: '🇨🇦' },
  { id: 'AU', name: 'Austrália', code: '61', flag: '🇦🇺' },
  { id: 'JP', name: 'Japão', code: '81', flag: '🇯🇵' },
  { id: 'CN', name: 'China', code: '86', flag: '🇨🇳' },
  { id: 'RU', name: 'Rússia', code: '7', flag: '🇷🇺' },
  { id: 'IN', name: 'Índia', code: '91', flag: '🇮🇳' },
  { id: 'MX', name: 'México', code: '52', flag: '🇲🇽' },
  { id: 'AR', name: 'Argentina', code: '54', flag: '🇦🇷' },
  { id: 'CL', name: 'Chile', code: '56', flag: '🇨🇱' },
  { id: 'CO', name: 'Colômbia', code: '57', flag: '🇨🇴' },
  { id: 'PE', name: 'Peru', code: '51', flag: '🇵🇪' },
  { id: 'VE', name: 'Venezuela', code: '58', flag: '🇻🇪' }
]

interface InputCountryProps {
  label: string
  description?: string
  error?: string
  value?: Country
  onChange: (value: Country) => void
  className?: string
}

export default function InputCountry({ 
  label, 
  description,
  error, 
  value, 
  onChange,
  className 
}: InputCountryProps) {
  const [selected, setSelected] = useState<Country>(value || countries[0])

  const handleChange = (newValue: Country) => {
    setSelected(newValue)
    onChange(newValue)
  }

  return (
    <div className={className}>
      <Listbox value={selected} onChange={handleChange}>
        <Listbox.Label className="block text-sm/6 font-semibold text-gray-900">{label}</Listbox.Label>
        {description && <p className="mt-1 text-sm/6 text-gray-600">{description}</p>}
        
        <div className="relative mt-2">
          <Listbox.Button className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--color-main-600)] sm:text-sm/6">
            <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
              <span className="text-lg">{selected.flag}</span>
              <span className="block truncate">{selected.name} (+{selected.code})</span>
            </span>
            <ChevronUpDownIcon
              aria-hidden="true"
              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </Listbox.Button>

          <Listbox.Options
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
          >
            {countries.map((country) => (
              <Listbox.Option
                key={country.id}
                value={country}
                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-[var(--color-main-600)] data-focus:text-white data-focus:outline-hidden"
              >
                {({ selected, active }) => (
                  <>
                    <div className="flex items-center">
                      <span className="text-lg">{country.flag}</span>
                      <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                        {country.name} (+{country.code})
                      </span>
                    </div>

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