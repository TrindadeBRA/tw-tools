'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import InputSelect from '@/components/ui/InputSelect'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

// Define Zod schema for form validation
const temperatureSchema = z.object({
  temperature: z.string().min(1, 'Valor da temperatura é obrigatório'),
  unit: z.object({
    id: z.string(),
    title: z.string()
  })
})

type TemperatureData = z.infer<typeof temperatureSchema>

// Função para formatar números de temperatura
function formatTemperature(value: number): string {
  return value.toFixed(4).replace(/\.?0+$/, '')
}

export default function TemperatureConverter() {
  const router = useRouter()
  
  // Define temperature unit options
  const unitOptions = [
    { id: 'celsius', title: 'Celsius (°C)' },
    { id: 'fahrenheit', title: 'Fahrenheit (°F)' },
    { id: 'kelvin', title: 'Kelvin (K)' }
  ]
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<TemperatureData>({
    resolver: zodResolver(temperatureSchema),
    defaultValues: {
      temperature: '',
      unit: unitOptions[0]
    },
  })

  const convertTemperature = (data: TemperatureData) => {
    try {
      // Get input values
      const temperature = parseFloat(data.temperature.replace(',', '.'))
      const unit = data.unit.id
      
      // Validate input is a number
      if (isNaN(temperature)) {
        router.push(`/conversores/temperatura/resultado?error=true`)
        return
      }
      
      // Calculate converted values
      let celsius: number, fahrenheit: number, kelvin: number
      
      switch (unit) {
        case 'celsius':
          celsius = temperature
          fahrenheit = (temperature * 9/5) + 32
          kelvin = temperature + 273.15
          break
        case 'fahrenheit':
          celsius = (temperature - 32) * 5/9
          fahrenheit = temperature
          kelvin = (temperature - 32) * 5/9 + 273.15
          break
        case 'kelvin':
          celsius = temperature - 273.15
          fahrenheit = (temperature - 273.15) * 9/5 + 32
          kelvin = temperature
          break
        default:
          router.push(`/conversores/temperatura/resultado?error=true`)
          return
      }
      
      // Format the values
      const celsiusFormatted = formatTemperature(celsius)
      const fahrenheitFormatted = formatTemperature(fahrenheit)
      const kelvinFormatted = formatTemperature(kelvin)
      
      // Format the original value with its unit symbol
      let unitSymbol = ''
      switch (unit) {
        case 'celsius':
          unitSymbol = ' °C'
          break
        case 'fahrenheit':
          unitSymbol = ' °F'
          break
        case 'kelvin':
          unitSymbol = ' K'
          break
      }
      
      const valorOriginal = `${formatTemperature(temperature)}${unitSymbol}`
      
      // Redirect to result page with all parameters
      router.push(`/conversores/temperatura/resultado?valorOriginal=${encodeURIComponent(valorOriginal)}&celsius=${encodeURIComponent(celsiusFormatted)}&fahrenheit=${encodeURIComponent(fahrenheitFormatted)}&kelvin=${encodeURIComponent(kelvinFormatted)}`)
    } catch (error) {
      console.error('Erro ao converter temperatura:', error)
      router.push(`/conversores/temperatura/resultado?error=true`)
    }
  }

  const clearForm = () => {
    setValue('temperature', '')
    setValue('unit', unitOptions[0])
  }

  return (
    <FormPage
      title="Conversor de Temperatura"
      description="Converta valores entre Celsius, Fahrenheit e Kelvin de forma rápida e precisa."
    >
      <form onSubmit={handleSubmit(convertTemperature)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Temperature input field */}
            <div className="sm:col-span-3">
              <InputText
                label="Valor da Temperatura"
                placeholder="Ex: 25"
                {...register('temperature')}
                error={errors.temperature?.message}
              />
              <p className="mt-1 text-xs text-gray-500">
                Digite o valor da temperatura. Use vírgula ou ponto para decimais. Ex: 25,5
              </p>
            </div>
            
            {/* Temperature unit selection */}
            <div className="sm:col-span-3">
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Unidade de Temperatura"
                    options={unitOptions}
                    defaultValue={unitOptions[0]}
                    onChange={(value) => field.onChange(value)}
                    error={errors.unit?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Converter
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 