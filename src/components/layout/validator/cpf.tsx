'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { cpfMask } from '@/data/masks'
import { useRouter } from 'next/navigation'

const cpfValidatorSchema = z.object({
  cpf: z.string().min(11, 'CPF deve ter 11 dígitos').max(14, 'CPF inválido'),
})

type CPFValidatorData = z.infer<typeof cpfValidatorSchema>

export default function CPFValidatorClient() {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CPFValidatorData>({
    resolver: zodResolver(cpfValidatorSchema),
    defaultValues: {
      cpf: '',
    },
  })

  const validateCPF = (data: CPFValidatorData) => {
    const cpf = data.cpf.replace(/\D/g, '')

    // Basic validations
    if (cpf.length !== 11) {
      redirectToResult(cpf, 'Inválido')
      return
    }

    // Check if all digits are the same
    if (/^(\d)\1{10}$/.test(cpf)) {
      redirectToResult(cpf, 'Inválido')
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

    redirectToResult(cpf, isValidCPF ? 'Válido' : 'Inválido')
  }

  const redirectToResult = (cpf: string, result: string) => {
    // Format CPF for display
    const formattedCPF = cpfMask(cpf)
    
    // Redirect to the result page with parameters
    router.push(`/validadores/cpf/resultado?documento=${encodeURIComponent(formattedCPF)}&resultado=${encodeURIComponent(result)}`)
  }

  const clearForm = () => {
    setValue('cpf', '')
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const maskedValue = cpfMask(value)
    setValue('cpf', maskedValue)
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
                onChange={handleCPFChange}
                error={errors.cpf?.message}
              />
            </div>
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