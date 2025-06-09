'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

// Schema for form validation
const ruleOfThreeSchema = z.object({
  value1: z.string().min(1, 'Primeiro valor é obrigatório').refine((val) => !isNaN(Number(val)), {
    message: 'Deve ser um número válido'
  }),
  value2: z.string().min(1, 'Segundo valor é obrigatório').refine((val) => !isNaN(Number(val)), {
    message: 'Deve ser um número válido'
  }),
  value3: z.string().min(1, 'Terceiro valor é obrigatório').refine((val) => !isNaN(Number(val)), {
    message: 'Deve ser um número válido'
  })
})

type RuleOfThreeData = z.infer<typeof ruleOfThreeSchema>

export default function RuleOfThree() {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RuleOfThreeData>({
    resolver: zodResolver(ruleOfThreeSchema),
    defaultValues: {
      value1: '',
      value2: '',
      value3: ''
    },
  })

  const calculateRuleOfThree = (data: RuleOfThreeData) => {
    try {
      const a = Number(data.value1) // Valor A
      const b = Number(data.value2) // Valor B  
      const c = Number(data.value3) // Valor C
      
      // Verificação de divisão por zero
      if (a === 0) {
        console.error('Erro: Divisão por zero não é permitida')
        router.push('/calculadoras/regra-de-tres/resultado?error=division_by_zero')
        return
      }
      
      // Regra de três: A está para B assim como C está para X
      // A : B = C : X
      // X = (B * C) / A
      const result = (b * c) / a
      
      // Verificar se o resultado é válido
      if (!isFinite(result)) {
        console.error('Erro: Resultado inválido')
        router.push('/calculadoras/regra-de-tres/resultado?error=invalid_result')
        return
      }
      
      // Format the result to 2 decimal places
      const formattedResult = result.toFixed(2)
      
      // Create a formatted expression showing the calculation
      const expression = `${a} : ${b} = ${c} : ${formattedResult}`
      const calculation = `X = (${b} × ${c}) ÷ ${a} = ${formattedResult}`
      
      // Redirect to result page with all calculated values
      router.push(`/calculadoras/regra-de-tres/resultado?valorA=${encodeURIComponent(a)}&valorB=${encodeURIComponent(b)}&valorC=${encodeURIComponent(c)}&resultado=${encodeURIComponent(formattedResult)}&expressao=${encodeURIComponent(expression)}&calculo=${encodeURIComponent(calculation)}`)
    } catch (error) {
      console.error('Erro ao calcular:', error)
      router.push('/calculadoras/regra-de-tres/resultado?error=calculation_error')
    }
  }

  const clearForm = () => {
    setValue('value1', '')
    setValue('value2', '')
    setValue('value3', '')
  }

  return (
    <FormPage
      title="Calculadora de Regra de Três"
      description="Calcule proporções usando a regra de três simples. Insira três valores e descubra o quarto valor proporcional."
    >
      <form onSubmit={handleSubmit(calculateRuleOfThree)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {/* Primeira linha */}
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <InputText
                    label="Valor de A"
                    placeholder="Ex: 10"
                    type="number"
                    step="any"
                    {...register('value1')}
                    error={errors.value1?.message}
                  />
                </div>
                <div className="flex justify-center">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-lg text-gray-500">está para</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <InputText
                    label="Valor de B"
                    placeholder="Ex: 20"
                    type="number"
                    step="any"
                    {...register('value2')}
                    error={errors.value2?.message}
                  />
                </div>
              </div>

              {/* Seta */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-gray-300"></div>
              </div>

              {/* Segunda linha */}
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <InputText
                    label="Valor de C"
                    placeholder="Ex: 30"
                    type="number"
                    step="any"
                    {...register('value3')}
                    error={errors.value3?.message}
                  />
                </div>
                <div className="flex justify-center">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-lg text-gray-500">está para</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-center h-[42px]">
                  <span className="text-2xl font-bold text-gray-900">X</span>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-8">
              <p>O valor X será calculado automaticamente</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Calcular
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 