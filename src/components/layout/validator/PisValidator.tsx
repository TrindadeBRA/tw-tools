'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

// Schema para validação do PIS/PASEP/NIT
const pisSchema = z.object({
  pis: z.string()
    .min(1, 'O número do PIS/PASEP/NIT é obrigatório')
    .regex(/^[0-9.-]+$/, 'Digite apenas números, pontos ou hífens')
    .refine((value) => {
      // Remove caracteres não numéricos
      const numbers = value.replace(/[^0-9]/g, '')
      return numbers.length === 11
    }, 'O PIS/PASEP/NIT deve conter 11 dígitos')
})

type PisData = z.infer<typeof pisSchema>

export default function PisValidator() {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PisData>({
    resolver: zodResolver(pisSchema),
    defaultValues: {
      pis: ''
    },
  })

  const validatePis = (data: PisData) => {
    try {
      // Remove caracteres não numéricos
      const numbers = data.pis.replace(/[^0-9]/g, '')
      
      // Algoritmo de validação do PIS/PASEP/NIT
      const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      let sum = 0
      
      for (let i = 0; i < 10; i++) {
        sum += parseInt(numbers[i]) * weights[i]
      }
      
      const remainder = sum % 11
      const checkDigit = remainder < 2 ? 0 : 11 - remainder
      
      const isValid = checkDigit === parseInt(numbers[10])
      
      // Formata o número para exibição
      const formattedNumber = numbers.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3-$4')
      
      // Redireciona para a página de resultado com os dados
      router.push(`/validadores/pis/resultado?numero=${encodeURIComponent(formattedNumber)}&valido=${isValid}`)
    } catch (error) {
      console.error('Erro ao validar PIS/PASEP/NIT:', error)
      router.push('/validadores/pis/resultado?error=true')
    }
  }

  const clearForm = () => {
    setValue('pis', '')
  }

  return (
    <FormPage
      title="Validador de PIS/PASEP/NIT"
      description="Digite o número do PIS/PASEP/NIT para validar"
    >
      <form onSubmit={handleSubmit(validatePis)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputText
                label="Número do PIS/PASEP/NIT"
                placeholder="000.00000.00-0"
                {...register('pis')}
                error={errors.pis?.message}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Validar
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 