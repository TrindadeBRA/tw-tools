'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'

const cpfValidatorSchema = z.object({
  cpf: z.string().min(11, 'CPF deve ter 11 dígitos').max(14, 'CPF inválido'),
  isValid: z.boolean().optional(),
})

type CPFValidatorData = z.infer<typeof cpfValidatorSchema>

export default function CPFValidatorClient() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CPFValidatorData>({
    resolver: zodResolver(cpfValidatorSchema),
    defaultValues: {
      cpf: '',
      isValid: undefined,
    },
  })

  const isValid = watch('isValid')

  const validateCPF = (data: CPFValidatorData) => {
    // Remove non-numeric characters
    const cpf = data.cpf.replace(/\D/g, '')

    // Basic validations
    if (cpf.length !== 11) {
      setValue('isValid', false)
      return
    }

    // Check if all digits are the same
    if (/^(\d)\1{10}$/.test(cpf)) {
      setValue('isValid', false)
      return
    }

    // Validate check digits
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let firstCheck = 11 - (sum % 11)
    if (firstCheck >= 10) firstCheck = 0

    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i)
    }
    let secondCheck = 11 - (sum % 11)
    if (secondCheck >= 10) secondCheck = 0

    // Compare calculated check digits with actual ones
    const isValidCPF = 
      firstCheck === parseInt(cpf.charAt(9)) && 
      secondCheck === parseInt(cpf.charAt(10))

    setValue('isValid', isValidCPF)
  }

  const clearForm = () => {
    setValue('cpf', '')
    setValue('isValid', undefined)
  }

  return (
    <FormPage
      title="Como Validar CPF Online"
      description="Valide números de CPF instantaneamente com nossa ferramenta online gratuita. Verifique se um CPF é válido de acordo com as regras da Receita Federal do Brasil."
    >
      <form onSubmit={handleSubmit(validateCPF)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <InputText
                label="Digite o CPF"
                placeholder="000.000.000-00"
                {...register('cpf')}
                error={errors.cpf?.message}
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
                        {isValid ? 'CPF Válido' : 'CPF Inválido'}
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
            Validar CPF
          </Button>
        </div>
      </form>
    </FormPage>
  )
}