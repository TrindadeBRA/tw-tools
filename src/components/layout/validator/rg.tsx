'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { rgMask } from '@/data/masks'

const rgValidatorSchema = z.object({
  rg: z.string().min(9, 'RG deve ter 9 dígitos').max(12, 'RG inválido'),
  isValid: z.boolean().optional(),
})

type RGValidatorData = z.infer<typeof rgValidatorSchema>

export default function RGValidatorClient() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RGValidatorData>({
    resolver: zodResolver(rgValidatorSchema),
    defaultValues: {
      rg: '',
      isValid: undefined,
    },
  })

  const isValid = watch('isValid')

  const validateRG = (data: RGValidatorData) => {
    const rg = data.rg.replace(/\D/g, '')

    // Basic validations
    if (rg.length !== 9) {
      setValue('isValid', false)
      return
    }

    // Check if all digits are the same
    if (/^(\d)\1{8}$/.test(rg)) {
      setValue('isValid', false)
      return
    }

    // Calculate check digit using weights 2 to 9
    let sum = 0
    for (let i = 0; i < 8; i++) {
      sum += parseInt(rg.charAt(i)) * (2 + i)
    }
    
    let checkDigit: string | number = 11 - (sum % 11)
    if (checkDigit === 10) checkDigit = 'X'
    else if (checkDigit === 11) checkDigit = '0'
    else checkDigit = checkDigit.toString()

    // Compare calculated check digit with actual one
    const lastDigit = rg.charAt(8).toUpperCase()
    const isValidRG = checkDigit === lastDigit

    setValue('isValid', isValidRG)
  }

  const clearForm = () => {
    setValue('rg', '')
    setValue('isValid', undefined)
  }

  const handleRGChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const maskedValue = rgMask(value)
    setValue('rg', maskedValue)
  }

  return (
    <FormPage
      title="Como Validar RG Online"
      description="Valide números de RG instantaneamente com nossa ferramenta online gratuita. Verifique se um RG é válido de acordo com as regras dos órgãos emissores."
    >
      <form onSubmit={handleSubmit(validateRG)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <InputText
                label="Digite o RG"
                placeholder="00.000.000-0"
                {...register('rg')}
                onChange={handleRGChange}
                error={errors.rg?.message}
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
                        {isValid ? 'RG Válido' : 'RG Inválido'}
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
            Validar RG
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 