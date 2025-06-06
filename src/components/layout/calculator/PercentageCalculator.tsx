'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import InputSelect from '@/components/ui/InputSelect'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'
import { currencyMask, numberMask } from '@/data/masks'
import { useState } from 'react'

// Define Zod schema for form validation
const percentageSchema = z.object({
  calculationType: z.object({
    id: z.string(),
    title: z.string()
  }),
  percentage: z.string().optional(),
  value1: z.string().optional(),
  value2: z.string().optional()
}).refine((data) => {
  // Validação específica para cada tipo de cálculo
  switch (data.calculationType.id) {
    case 'type1':
      return data.percentage && data.value1 && 
             !isNaN(Number(data.percentage.replace(',', '.'))) && 
             !isNaN(Number(data.value1.replace(',', '.')))
    case 'type2':
      return data.value1 && data.value2 && 
             !isNaN(Number(data.value1.replace(',', '.'))) && 
             !isNaN(Number(data.value2.replace(',', '.')))
    case 'type3':
    case 'type4':
      return data.value1 && data.value2 && 
             !isNaN(Number(data.value1.replace(',', '.'))) && 
             !isNaN(Number(data.value2.replace(',', '.')))
    default:
      return false
  }
}, {
  message: "Preencha todos os campos com valores válidos"
})

type PercentageData = z.infer<typeof percentageSchema>

export default function PercentageCalculator() {
  const router = useRouter()
  
  // Estados para armazenar os valores formatados
  const [percentageDisplay, setPercentageDisplay] = useState('')
  const [value1Display, setValue1Display] = useState('')
  const [value2Display, setValue2Display] = useState('')
  
  const calculationTypes = [
    { id: 'type1', title: 'Quanto é X% de Y?' },
    { id: 'type2', title: 'X é qual porcentagem de Y?' },
    { id: 'type3', title: 'Aumento percentual' },
    { id: 'type4', title: 'Diminuição percentual' }
  ]
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<PercentageData>({
    resolver: zodResolver(percentageSchema),
    defaultValues: {
      calculationType: calculationTypes[0],
      percentage: '',
      value1: '',
      value2: ''
    },
  })

  const selectedType = watch('calculationType')

  const calculatePercentage = (data: PercentageData) => {
    try {
      // Convert string values to numbers
      const percentage = data.percentage ? 
        Number(data.percentage.replace(/\./g, '').replace(',', '.')) : 0
      
      // Converter valores monetários para números
      const value1 = data.value1 ? 
        Number(data.value1.replace(/[^\d]/g, '')) / 100 : 0
      const value2 = data.value2 ? 
        Number(data.value2.replace(/[^\d]/g, '')) / 100 : 0

      let result = 0
      let resultLabel = ''
      let originalValue = ''

      switch (data.calculationType.id) {
        case 'type1':
          // Quanto é X% de Y?
          result = (percentage * value1) / 100
          originalValue = `${percentage}% de ${currencyMask((value1 * 100).toString())}`
          resultLabel = 'Resultado'
          break

        case 'type2':
          // X é qual porcentagem de Y?
          result = (value1 * 100) / value2
          resultLabel = 'Porcentagem'
          originalValue = `${currencyMask((value1 * 100).toString())} de ${currencyMask((value2 * 100).toString())}`
          break

        case 'type3':
          // Aumento percentual
          result = ((value2 - value1) * 100) / value1
          resultLabel = 'Aumento'
          originalValue = `De ${currencyMask((value1 * 100).toString())} para ${currencyMask((value2 * 100).toString())}`
          break

        case 'type4':
          // Diminuição percentual
          result = ((value1 - value2) * 100) / value1
          resultLabel = 'Diminuição'
          originalValue = `De ${currencyMask((value1 * 100).toString())} para ${currencyMask((value2 * 100).toString())}`
          break
      }

      // Formatar resultado
      const formattedResult = result.toFixed(2)
      const formattedResultWithSymbol = data.calculationType.id === 'type1' 
        ? currencyMask((result * 100).toString())
        : `${formattedResult}%`

      // Redirect to result page with all calculated values
      router.push(`/calculadoras/porcentagem/resultado?calculationType=${encodeURIComponent(data.calculationType.title)}&originalValue=${encodeURIComponent(originalValue)}&result=${encodeURIComponent(formattedResultWithSymbol)}&resultLabel=${encodeURIComponent(resultLabel)}`)
    } catch (error) {
      console.error('Erro ao calcular porcentagem:', error)
      router.push(`/calculadoras/porcentagem/resultado?error=true`)
    }
  }

  const clearForm = () => {
    setValue('calculationType', calculationTypes[0])
    setValue('percentage', '')
    setValue('value1', '')
    setValue('value2', '')
    setPercentageDisplay('')
    setValue1Display('')
    setValue2Display('')
  }

  // Funções para lidar com as mudanças nos inputs
  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = numberMask(value)
    setPercentageDisplay(formatted)
    // Remove todos os caracteres não numéricos exceto vírgula e ponto
    const cleanValue = value.replace(/[^\d,.]/g, '')
    setValue('percentage', cleanValue)
  }

  const handleValue1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = currencyMask(value)
    setValue1Display(formatted)
    // Remove todos os caracteres não numéricos exceto vírgula e ponto
    const cleanValue = value.replace(/[^\d,.]/g, '')
    setValue('value1', cleanValue)
  }

  const handleValue2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = currencyMask(value)
    setValue2Display(formatted)
    // Remove todos os caracteres não numéricos exceto vírgula e ponto
    const cleanValue = value.replace(/[^\d,.]/g, '')
    setValue('value2', cleanValue)
  }

  return (
    <FormPage
      title="Calculadora de Porcentagem"
      description="Calcule porcentagens de diferentes formas: valor percentual, porcentagem de um valor, aumento ou diminuição percentual."
    >
      <form onSubmit={handleSubmit(calculatePercentage)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Calculation Type Selection */}
            <div className="sm:col-span-full">
              <Controller
                name="calculationType"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Tipo de Cálculo"
                    options={calculationTypes}
                    defaultValue={calculationTypes[0]}
                    onChange={(value) => field.onChange(value)}
                    error={errors.calculationType?.message}
                  />
                )}
              />
            </div>

            {/* Dynamic Fields based on calculation type */}
            {selectedType.id === 'type1' && (
              <>
                <div className="sm:col-span-3">
                  <InputText
                    label="Porcentagem (%)"
                    placeholder="Ex: 10"
                    value={percentageDisplay}
                    onChange={handlePercentageChange}
                    error={errors.percentage?.message}
                  />
                </div>
                <div className="sm:col-span-3">
                  <InputText
                    label="Valor (R$)"
                    placeholder="Ex: 100,00"
                    value={value1Display}
                    onChange={handleValue1Change}
                    error={errors.value1?.message}
                  />
                </div>
              </>
            )}

            {selectedType.id === 'type2' && (
              <>
                <div className="sm:col-span-3">
                  <InputText
                    label="Valor (R$)"
                    placeholder="Ex: 50,00"
                    value={value1Display}
                    onChange={handleValue1Change}
                    error={errors.value1?.message}
                  />
                </div>
                <div className="sm:col-span-3">
                  <InputText
                    label="Valor Total (R$)"
                    placeholder="Ex: 200,00"
                    value={value2Display}
                    onChange={handleValue2Change}
                    error={errors.value2?.message}
                  />
                </div>
              </>
            )}

            {(selectedType.id === 'type3' || selectedType.id === 'type4') && (
              <>
                <div className="sm:col-span-3">
                  <InputText
                    label="Valor Inicial (R$)"
                    placeholder="Ex: 100,00"
                    value={value1Display}
                    onChange={handleValue1Change}
                    error={errors.value1?.message}
                  />
                </div>
                <div className="sm:col-span-3">
                  <InputText
                    label="Valor Final (R$)"
                    placeholder="Ex: 120,00"
                    value={value2Display}
                    onChange={handleValue2Change}
                    error={errors.value2?.message}
                  />
                </div>
              </>
            )}

            {/* Error message display */}
            {errors.root && (
              <div className="sm:col-span-full text-red-600 text-sm">
                {errors.root.message}
              </div>
            )}
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