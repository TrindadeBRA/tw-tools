'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import InputSelect from '@/components/ui/InputSelect'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

// Schema for form validation
const romanNumeralSchema = z.object({
  inputType: z.object({
    id: z.string(),
    title: z.string()
  }),
  value: z.string().min(1, 'Campo obrigatório')
})

type RomanNumeralData = z.infer<typeof romanNumeralSchema>

// Roman numeral conversion functions
const romanToDecimal = (roman: string): number => {
  const romanNumerals: { [key: string]: number } = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  }

  let result = 0
  let prevValue = 0

  for (let i = roman.length - 1; i >= 0; i--) {
    const currentValue = romanNumerals[roman[i].toUpperCase()]
    if (currentValue >= prevValue) {
      result += currentValue
    } else {
      result -= currentValue
    }
    prevValue = currentValue
  }

  return result
}

const decimalToRoman = (num: number): string => {
  if (num <= 0 || num > 3999) {
    throw new Error('Número deve estar entre 1 e 3999')
  }

  const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
  ]

  let result = ''
  for (const { value, symbol } of romanNumerals) {
    while (num >= value) {
      result += symbol
      num -= value
    }
  }

  return result
}

export default function RomanNumeralConverter() {
  const router = useRouter()
  
  const conversionTypes = [
    { id: 'decimal', title: 'Decimal para Romano' },
    { id: 'roman', title: 'Romano para Decimal' }
  ]
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<RomanNumeralData>({
    resolver: zodResolver(romanNumeralSchema),
    defaultValues: {
      inputType: conversionTypes[0],
      value: ''
    },
  })

  const convertValue = (data: RomanNumeralData) => {
    try {
      const inputValue = data.value.trim()
      let result: string
      let originalValue: string

      if (data.inputType.id === 'decimal') {
        const decimalNum = parseInt(inputValue)
        if (isNaN(decimalNum)) {
          throw new Error('Valor decimal inválido')
        }
        result = decimalToRoman(decimalNum)
        originalValue = `Decimal: ${decimalNum}`
      } else {
        // Validate Roman numeral format
        if (!/^[IVXLCDM]+$/i.test(inputValue)) {
          throw new Error('Número romano inválido')
        }
        result = romanToDecimal(inputValue).toString()
        originalValue = `Romano: ${inputValue.toUpperCase()}`
      }

      router.push(`/conversores/numeros-romanos/resultado?valorOriginal=${encodeURIComponent(originalValue)}&resultado=${encodeURIComponent(result)}`)
    } catch (error) {
      console.error('Erro ao converter:', error)
      router.push(`/conversores/numeros-romanos/resultado?error=true`)
    }
  }

  const clearForm = () => {
    setValue('value', '')
    setValue('inputType', conversionTypes[0])
  }

  return (
    <FormPage
      title="Conversor de Números Romanos"
      description="Converta números entre algarismos romanos e decimais facilmente."
    >
      <form onSubmit={handleSubmit(convertValue)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Controller
                name="inputType"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Tipo de Conversão"
                    options={conversionTypes}
                    defaultValue={conversionTypes[0]}
                    onChange={(value) => field.onChange(value)}
                    error={errors.inputType?.message}
                  />
                )}
              />
            </div>
            
            <div className="sm:col-span-3">
              <InputText
                label="Valor"
                placeholder="Digite o valor a ser convertido"
                {...register('value')}
                error={errors.value?.message}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Converter
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 