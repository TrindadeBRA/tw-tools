'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

// Schema for form validation
const ageCalculatorSchema = z.object({
  birthDate: z.string()
    .min(1, 'Data de nascimento é obrigatória')
    .refine((date) => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(date)) return false
      
      const [year, month, day] = date.split('-').map(Number)
      const dateObj = new Date(year, month - 1, day)
      
      return dateObj.getFullYear() === year &&
             dateObj.getMonth() === month - 1 &&
             dateObj.getDate() === day
    }, 'Data inválida')
    .refine((date) => {
      const birthDate = new Date(date)
      const today = new Date()
      return birthDate <= today
    }, 'A data de nascimento não pode ser futura')
})

type AgeCalculatorData = z.infer<typeof ageCalculatorSchema>

export default function AgeCalculator() {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AgeCalculatorData>({
    resolver: zodResolver(ageCalculatorSchema),
    defaultValues: {
      birthDate: '',
    },
  })

  const calculateAge = (data: AgeCalculatorData) => {
    try {
      const birthDate = new Date(data.birthDate)
      const today = new Date()
      
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      
      // Calculate months and days
      let months = monthDiff
      if (months < 0) months += 12
      
      let days = today.getDate() - birthDate.getDate()
      if (days < 0) {
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthDate.getDate())
        days = Math.floor((today.getTime() - lastMonth.getTime()) / (1000 * 60 * 60 * 24))
      }
      
      // Format the results
      const ageInYears = age.toString()
      const ageInMonths = (age * 12 + months).toString()
      const ageInDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)).toString()
      
      // Create formatted age string
      const formattedAge = `${age} anos, ${months} meses e ${days} dias`
      
      // Redirect to result page with all calculated values
      router.push(`/calculadoras/idade/resultado?birthDate=${encodeURIComponent(data.birthDate)}&ageInYears=${encodeURIComponent(ageInYears)}&ageInMonths=${encodeURIComponent(ageInMonths)}&ageInDays=${encodeURIComponent(ageInDays)}&formattedAge=${encodeURIComponent(formattedAge)}`)
    } catch (error) {
      console.error('Erro ao calcular idade:', error)
      router.push(`/calculadoras/idade/resultado?error=true`)
    }
  }

  const clearForm = () => {
    setValue('birthDate', '')
  }

  return (
    <FormPage
      title="Calculadora de Idade"
      description="Calcule sua idade exata em anos, meses e dias a partir da sua data de nascimento."
    >
      <form onSubmit={handleSubmit(calculateAge)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputText
                label="Data de Nascimento"
                type="date"
                placeholder="YYYY-MM-DD"
                {...register('birthDate')}
                error={errors.birthDate?.message}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Calcular Idade
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 