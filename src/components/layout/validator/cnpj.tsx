'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { cnpjMask } from '@/data/masks'

const cnpjValidatorSchema = z.object({
  cnpj: z.string().min(14, 'CNPJ deve ter 14 dígitos').max(18, 'CNPJ inválido'),
  isValid: z.boolean().optional(),
})

type CNPJValidatorData = z.infer<typeof cnpjValidatorSchema>

export default function CNPJValidatorClient() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CNPJValidatorData>({
    resolver: zodResolver(cnpjValidatorSchema),
    defaultValues: {
      cnpj: '',
      isValid: undefined,
    },
  })

  const isValid = watch('isValid')

  const validateCNPJ = (data: CNPJValidatorData) => {
    const cnpj = data.cnpj.replace(/\D/g, '')

    // Basic validations
    if (cnpj.length !== 14) {
      setValue('isValid', false)
      return
    }

    // Check if all digits are the same
    if (/^(\d)\1{13}$/.test(cnpj)) {
      setValue('isValid', false)
      return
    }

    // Validate first check digit
    let sum = 0
    let weight = 5
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight
      weight = weight === 2 ? 9 : weight - 1
    }
    let firstCheck = 11 - (sum % 11)
    if (firstCheck >= 10) firstCheck = 0

    // Validate second check digit
    sum = 0
    weight = 6
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight
      weight = weight === 2 ? 9 : weight - 1
    }
    let secondCheck = 11 - (sum % 11)
    if (secondCheck >= 10) secondCheck = 0

    // Compare calculated check digits with actual ones
    const isValidCNPJ = 
      firstCheck === parseInt(cnpj.charAt(12)) && 
      secondCheck === parseInt(cnpj.charAt(13))

    setValue('isValid', isValidCNPJ)
  }

  const clearForm = () => {
    setValue('cnpj', '')
    setValue('isValid', undefined)
  }

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const maskedValue = cnpjMask(value)
    setValue('cnpj', maskedValue)
  }

  return (
    <FormPage
      title="Como Validar CNPJ Online"
      description="Valide números de CNPJ instantaneamente com nossa ferramenta online gratuita. Verifique se um CNPJ é válido de acordo com as regras da Receita Federal do Brasil."
    >
      <form onSubmit={handleSubmit(validateCNPJ)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <InputText
                label="Digite o CNPJ"
                placeholder="00.000.000/0000-00"
                {...register('cnpj')}
                onChange={handleCNPJChange}
                error={errors.cnpj?.message}
              />
            </div>

            {isValid !== undefined && (
              <div className="col-span-full">
                <div className={`rounded-md p-4 ${isValid ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {isValid ? (
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${isValid ? 'text-green-800' : 'text-red-800'}`}>
                        {isValid ? 'CNPJ Válido' : 'CNPJ Inválido'}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Validar CNPJ
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 