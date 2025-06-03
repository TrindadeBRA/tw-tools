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
    .refine((val) => {
      if (val.trim() === '') return false;
      
      // Se for decimal para romano
      if (val.match(/^\d+$/)) {
        const num = parseInt(val);
        return num > 0 && num <= 999999;
      }
      
      // Se for romano para decimal
      return /^[IVXLCDM\u0304]+$/i.test(val);
    }, 'Valor inválido. Para números decimais, use valores entre 1 e 999999. Para números romanos, use apenas os caracteres I, V, X, L, C, D, M')
})

type RomanNumeralData = z.infer<typeof romanNumeralSchema>

// Roman numeral conversion functions
const romanToDecimal = (roman: string): number => {
  const romanNumerals: { [key: string]: number } = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000,
    'I\u0304': 1000, 'V\u0304': 5000, 'X\u0304': 10000, 'L\u0304': 50000,
    'C\u0304': 100000, 'D\u0304': 500000, 'M\u0304': 1000000
  }

  let result = 0
  let prevValue = 0
  let chars: string[] = []

  // Primeiro, separar os caracteres e barras em um array
  let i = 0
  while (i < roman.length) {
    const currentChar = roman[i].toUpperCase()
    const nextChar = roman[i + 1]

    if (nextChar === '\u0304') {
      chars.push(currentChar + '\u0304')
      i += 2
    } else {
      chars.push(currentChar)
      i++
    }
  }

  // Agora processar da direita para a esquerda
  for (let i = chars.length - 1; i >= 0; i--) {
    const value = romanNumerals[chars[i]] || 0

    if (value >= prevValue) {
      result += value
    } else {
      result -= value
    }
    prevValue = value
  }

  return result
}

const decimalToRoman = (num: number): string => {
  if (num <= 0 || num > 999999) {
    throw new Error('Número deve estar entre 1 e 999999')
  }

  // Separar milhares e o resto
  const thousands = Math.floor(num / 1000)
  const remainder = num % 1000

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

  // Converter milhares usando a notação com barra
  let result = ''
  if (thousands > 0) {
    const thousandsRoman = convertThousands(thousands)
    result += thousandsRoman
  }

  // Converter o resto normalmente
  if (remainder > 0) {
    let remainingNum = remainder
    for (const { value, symbol } of romanNumerals) {
      while (remainingNum >= value) {
        result += symbol
        remainingNum -= value
      }
    }
  }

  return result
}

// Função auxiliar para converter milhares usando a notação com barra
const convertThousands = (thousands: number): string => {
  if (thousands <= 0) return ''

  const romanNumeralsThousands = [
    { value: 900, symbol: 'C\u0304M\u0304' },
    { value: 500, symbol: 'D\u0304' },
    { value: 400, symbol: 'C\u0304D\u0304' },
    { value: 100, symbol: 'C\u0304' },
    { value: 90, symbol: 'X\u0304C\u0304' },
    { value: 50, symbol: 'L\u0304' },
    { value: 40, symbol: 'X\u0304L\u0304' },
    { value: 10, symbol: 'X\u0304' },
    { value: 9, symbol: 'I\u0304X\u0304' },
    { value: 5, symbol: 'V\u0304' },
    { value: 4, symbol: 'I\u0304V\u0304' },
    { value: 1, symbol: 'I\u0304' }
  ]

  let result = ''
  let num = thousands

  for (const { value, symbol } of romanNumeralsThousands) {
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
        if (isNaN(decimalNum) || decimalNum <= 0 || decimalNum > 999999) {
          throw new Error('O valor deve estar entre 1 e 999999')
        }
        result = decimalToRoman(decimalNum)
        originalValue = `Decimal: ${decimalNum}`
      } else {
        // Validate Roman numeral format
        if (!/^[IVXLCDM\u0304]+$/i.test(inputValue)) {
          throw new Error('Número romano inválido. Use apenas os caracteres I, V, X, L, C, D, M')
        }
        result = romanToDecimal(inputValue).toString()
        originalValue = `Romano: ${inputValue.toUpperCase()}`
      }

      router.push(`/conversores/numeros-romanos/resultado?valorOriginal=${encodeURIComponent(originalValue)}&resultado=${encodeURIComponent(result)}`)
    } catch (error) {
      console.error('Erro ao converter:', error)
      const errorMessage = encodeURIComponent((error as Error).message || 'Erro ao converter o número')
      router.push(`/conversores/numeros-romanos/resultado?error=true&errorMessage=${errorMessage}`)
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