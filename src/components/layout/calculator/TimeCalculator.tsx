'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import InputSelect from '@/components/ui/InputSelect'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'
import { timeMask } from '@/data/masks'

// Defina o schema com Zod
const timeCalculatorSchema = z.object({
  time1: z.string().min(1, 'Horário 1 é obrigatório'),
  operation: z.object({
    id: z.string(),
    title: z.string()
  }),
  time2: z.string().min(1, 'Horário 2 é obrigatório')
})

type TimeCalculatorData = z.infer<typeof timeCalculatorSchema>

export default function TimeCalculator() {
  const router = useRouter()
  
  const operationOptions = [
    { id: '+', title: 'Soma (+)', icon: '➕' },
    { id: '-', title: 'Subtração (-)', icon: '➖' }
  ]
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<TimeCalculatorData>({
    resolver: zodResolver(timeCalculatorSchema),
    defaultValues: {
      time1: '',
      operation: operationOptions[0],
      time2: ''
    },
  })

  const calculateTime = (data: TimeCalculatorData) => {
    try {
      const [hours1, minutes1] = data.time1.split(':').map(Number)
      const [hours2, minutes2] = data.time2.split(':').map(Number)
      const totalMinutes1 = hours1 * 60 + minutes1
      const totalMinutes2 = hours2 * 60 + minutes2

      let resultMinutes
      if (data.operation.id === '+') {
        resultMinutes = totalMinutes1 + totalMinutes2
      } else {
        resultMinutes = totalMinutes1 - totalMinutes2
      }

      // Determina o sinal
      const isNegative = resultMinutes < 0
      const absMinutes = Math.abs(resultMinutes)
      const resultHours = Math.floor(absMinutes / 60)
      const resultMins = absMinutes % 60
      const result = `${isNegative ? '-' : ''}${String(resultHours).padStart(2, '0')}:${String(resultMins).padStart(2, '0')}`

      const operationComplete = `${data.time1} ${data.operation.id} ${data.time2}`

      router.push(`/calculadoras/horas/resultado?time1=${encodeURIComponent(data.time1)}&operation=${encodeURIComponent(data.operation.id)}&time2=${encodeURIComponent(data.time2)}&result=${encodeURIComponent(result)}&operationComplete=${encodeURIComponent(operationComplete)}`)
    } catch (error) {
      console.error('Erro ao calcular horário:', error)
      router.push(`/calculadoras/horas/resultado?error=true`)
    }
  }

  const clearForm = () => {
    setValue('time1', '')
    setValue('operation', operationOptions[0])
    setValue('time2', '')
  }

  return (
    <FormPage
      title="Calculadora de Horas"
      description="Digite os horários e escolha a operação desejada"
    >
      <form onSubmit={handleSubmit(calculateTime)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Primeiro horário */}
            <div className="sm:col-span-2">
              <InputText
                label="Horário 1"
                placeholder="00:00"
                {...register('time1')}
                error={errors.time1?.message}
                onChange={(e) => {
                  const masked = timeMask(e.target.value)
                  setValue('time1', masked)
                }}
              />
            </div>
            
            {/* Operação */}
            <div className="sm:col-span-2">
              <Controller
                name="operation"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Operação"
                    options={operationOptions}
                    defaultValue={operationOptions[0]}
                    onChange={(value) => field.onChange(value)}
                    error={errors.operation?.message}
                  />
                )}
              />
            </div>
            
            {/* Segundo horário */}
            <div className="sm:col-span-2">
              <InputText
                label="Horário 2"
                placeholder="00:00"
                {...register('time2')}
                error={errors.time2?.message}
                onChange={(e) => {
                  const masked = timeMask(e.target.value)
                  setValue('time2', masked)
                }}
              />
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