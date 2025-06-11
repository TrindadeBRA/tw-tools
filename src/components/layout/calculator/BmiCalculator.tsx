'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

// Define schema with Zod
const bmiSchema = z.object({
  weight: z.string().min(1, 'Peso é obrigatório')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Peso deve ser um número positivo'),
  height: z.string().min(1, 'Altura é obrigatória')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Altura deve ser um número positivo')
})

type BmiData = z.infer<typeof bmiSchema>

export default function BmiCalculator() {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BmiData>({
    resolver: zodResolver(bmiSchema),
    defaultValues: {
      weight: '',
      height: ''
    },
  })

  const calculateBmi = (data: BmiData) => {
    try {
      // Convert string values to numbers
      const weight = Number(data.weight)
      const height = Number(data.height)

      // Calculate BMI - weight in kg / (height in meters)²
      const heightInMeters = height / 100 // Convert cm to meters
      const bmi = weight / (heightInMeters * heightInMeters)
      
      // Round to 2 decimal places
      const bmiFormatted = bmi.toFixed(2)
      
      // Determine BMI category
      let category = ''
      if (bmi < 18.5) category = 'Abaixo do peso'
      else if (bmi < 24.9) category = 'Peso normal'
      else if (bmi < 29.9) category = 'Sobrepeso'
      else if (bmi < 34.9) category = 'Obesidade Grau I'
      else if (bmi < 39.9) category = 'Obesidade Grau II'
      else category = 'Obesidade Grau III'

      // Redirect to result page with all calculated values
      router.push(`/calculadoras/imc/resultado?peso=${encodeURIComponent(data.weight)}&altura=${encodeURIComponent(data.height)}&imc=${encodeURIComponent(bmiFormatted)}&categoria=${encodeURIComponent(category)}`)
    } catch (error) {
      console.error('Erro ao calcular IMC:', error)
      router.push(`/calculadoras/imc/resultado?error=true`)
    }
  }

  const clearForm = () => {
    setValue('weight', '')
    setValue('height', '')
  }

  return (
    <FormPage
      title="Calculadora de IMC"
      description="Calcule seu Índice de Massa Corporal (IMC)"
    >
      <form onSubmit={handleSubmit(calculateBmi)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputText
                label="Peso (kg)"
                placeholder="Ex: 70.5"
                {...register('weight')}
                error={errors.weight?.message}
              />
            </div>
            
            <div className="sm:col-span-3">
              <InputText
                label="Altura (cm)"
                placeholder="Ex: 170"
                {...register('height')}
                error={errors.height?.message}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Calcular IMC
          </Button>
        </div>
      </form>
    </FormPage>
  )
}