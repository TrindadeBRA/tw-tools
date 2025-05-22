'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { cnpjMask } from '@/data/masks'
import { useRouter } from 'next/navigation'

const cnpjValidatorSchema = z.object({
  cnpj: z.string().min(14, 'CNPJ deve ter 14 dígitos').max(18, 'CNPJ inválido'),
})

type CNPJValidatorData = z.infer<typeof cnpjValidatorSchema>

export default function CNPJValidatorClient() {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CNPJValidatorData>({
    resolver: zodResolver(cnpjValidatorSchema),
    defaultValues: {
      cnpj: '',
    },
  })

  const validateCNPJ = (data: CNPJValidatorData) => {
    const cnpj = data.cnpj.replace(/\D/g, '')

    // Basic validations
    if (cnpj.length !== 14) {
      redirectToResult(cnpj, 'Inválido')
      return
    }

    // Check if all digits are the same
    if (/^(\d)\1{13}$/.test(cnpj)) {
      redirectToResult(cnpj, 'Inválido')
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

    redirectToResult(cnpj, isValidCNPJ ? 'Válido' : 'Inválido')
  }

  const redirectToResult = (cnpj: string, result: string) => {
    // Format CNPJ for display
    const formattedCNPJ = cnpjMask(cnpj)
    
    // Redirect to the result page with parameters
    router.push(`/validadores/cnpj/resultado?documento=${encodeURIComponent(formattedCNPJ)}&resultado=${encodeURIComponent(result)}`)
  }

  const clearForm = () => {
    setValue('cnpj', '')
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