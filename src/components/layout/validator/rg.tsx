'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { rgMask } from '@/data/masks'
import { useRouter } from 'next/navigation'

const rgValidatorSchema = z.object({
  rg: z.string().min(9, 'RG deve ter 9 dígitos').max(12, 'RG inválido'),
})

type RGValidatorData = z.infer<typeof rgValidatorSchema>

export default function RGValidatorClient() {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RGValidatorData>({
    resolver: zodResolver(rgValidatorSchema),
    defaultValues: {
      rg: '',
    },
  })

  const validateRG = (data: RGValidatorData) => {
    const rg = data.rg.replace(/\D/g, '')

    // Basic validations
    if (rg.length !== 9) {
      redirectToResult(rg, 'Inválido')
      return
    }

    // Check if all digits are the same
    if (/^(\d)\1{8}$/.test(rg)) {
      redirectToResult(rg, 'Inválido')
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

    redirectToResult(rg, isValidRG ? 'Válido' : 'Inválido')
  }

  const redirectToResult = (rg: string, result: string) => {
    // Format RG for display
    const formattedRG = rgMask(rg)
    
    // Redirect to the result page with parameters
    router.push(`/validadores/rg/resultado?documento=${encodeURIComponent(formattedRG)}&resultado=${encodeURIComponent(result)}`)
  }

  const clearForm = () => {
    setValue('rg', '')
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