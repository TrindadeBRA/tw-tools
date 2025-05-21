'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputSelect, { Option } from '@/components/ui/InputSelect'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import CopyResult from '@/components/ui/CopyResult'
import { creditCardBrandOptions } from '@/data/consts'

const creditCardFormSchema = z.object({
  brand: z.object({
    id: z.union([z.string(), z.number()]),
    title: z.string(),
    description: z.string().optional(),
  }),
  generatedCard: z.string().optional(),
  generatedExpiry: z.string().optional(),
  generatedCVV: z.string().optional(),
})

type CreditCardFormData = z.infer<typeof creditCardFormSchema>

export default function CreditCardGeneratorClient() {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreditCardFormData>({
    resolver: zodResolver(creditCardFormSchema),
    defaultValues: {
      brand: creditCardBrandOptions[0],
      generatedCard: '',
      generatedExpiry: '',
      generatedCVV: '',
    },
  })

  const generatedCard = watch('generatedCard')
  const generatedExpiry = watch('generatedExpiry')
  const generatedCVV = watch('generatedCVV')

  const handleBrandChange = (value: Option) => {
    setValue('brand', value)
  }

  const generateLuhnNumber = (prefix: string, length: number): string => {
    // Generate random digits
    const digits = prefix.split('').map(Number)
    while (digits.length < length - 1) {
      digits.push(Math.floor(Math.random() * 10))
    }

    // Calculate Luhn check digit
    let sum = 0
    let isEven = true
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i]
      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      sum += digit
      isEven = !isEven
    }
    const checkDigit = (10 - (sum % 10)) % 10

    return digits.join('') + checkDigit
  }

  const generateCardNumber = (brand: string): string => {
    switch (brand) {
      case 'visa':
        return generateLuhnNumber('4', 16)
      case 'mastercard':
        return generateLuhnNumber('5' + Math.floor(Math.random() * 5 + 1), 16)
      case 'amex':
        return generateLuhnNumber('3' + (Math.random() < 0.5 ? '4' : '7'), 15)
      case 'discover':
        return generateLuhnNumber('6011', 16)
      case 'diners':
        return generateLuhnNumber('36', 14)
      case 'jcb':
        return generateLuhnNumber('35', 16)
      case 'hipercard':
        return generateLuhnNumber('606282', 16)
      case 'elo':
        const eloPrefixes = ['636368', '438935', '504175']
        return generateLuhnNumber(eloPrefixes[Math.floor(Math.random() * eloPrefixes.length)], 16)
      default:
        return generateLuhnNumber('4', 16) // Default to Visa
    }
  }

  const generateExpiry = (): string => {
    const now = new Date()
    const month = Math.floor(Math.random() * 12) + 1
    const year = now.getFullYear() + Math.floor(Math.random() * 5) + 1
    return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`
  }

  const generateCVV = (brand: string): string => {
    const length = brand === 'amex' ? 4 : 3
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
  }

  const formatCardNumber = (number: string): string => {
    if (number.length === 15) { // AMEX
      return number.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3')
    }
    if (number.length === 14) { // Diners
      return number.replace(/(\d{4})(\d{6})(\d{4})/, '$1 $2 $3')
    }
    // Default 16 digits
    return number.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
  }

  const generateCard = (data: CreditCardFormData) => {
    const cardNumber = generateCardNumber(data.brand.id as string)
    const expiry = generateExpiry()
    const cvv = generateCVV(data.brand.id as string)

    setValue('generatedCard', formatCardNumber(cardNumber))
    setValue('generatedExpiry', expiry)
    setValue('generatedCVV', cvv)
  }

  const clearForm = () => {
    setValue('generatedCard', '')
    setValue('generatedExpiry', '')
    setValue('generatedCVV', '')
  }

  return (
    <FormPage
      title="Como Gerar Cartão de Crédito Válido Online"
      description="O gerador de cartão de crédito cria números válidos seguindo o algoritmo Luhn e as regras específicas de cada bandeira. Ideal para testes de sistemas de pagamento e desenvolvimento de e-commerce."
    >
      <form onSubmit={handleSubmit(generateCard)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <InputSelect
                label="Bandeira do Cartão"
                description="Selecione a bandeira para gerar um cartão válido de acordo com suas regras"
                options={creditCardBrandOptions}
                defaultValue={creditCardBrandOptions[0]}
                onChange={handleBrandChange}
                error={errors.brand?.message}
              />
            </div>

            {generatedCard && (
              <>
                <CopyResult
                  label="Número do Cartão"
                  value={generatedCard}
                />
                  <CopyResult
                    label="Data de Validade"
                    value={generatedExpiry || ''}
                  />
                  <CopyResult
                    label="CVV"
                    value={generatedCVV || ''}
                  />
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar Cartão
          </Button>
          <Button type="submit">
            Gerar Novo Cartão
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 