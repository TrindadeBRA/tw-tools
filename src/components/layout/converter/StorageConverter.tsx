'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import InputSelect from '@/components/ui/InputSelect'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

const storageUnits = [
  { id: 'bit', title: 'Bit (b)' },
  { id: 'byte', title: 'Byte (B)' },
  { id: 'kilobyte', title: 'Kilobyte (KB)' },
  { id: 'megabyte', title: 'Megabyte (MB)' },
  { id: 'gigabyte', title: 'Gigabyte (GB)' },
  { id: 'terabyte', title: 'Terabyte (TB)' }
]

const storageSchema = z.object({
  value: z.string()
    .min(1, 'O valor é obrigatório')
    .refine((val) => !isNaN(Number(val)), 'Digite um número válido')
    .refine((val) => Number(val) >= 0, 'O valor deve ser positivo'),
  unit: z.object({
    id: z.string(),
    title: z.string()
  })
})

type StorageData = z.infer<typeof storageSchema>

// Função para formatar números de armazenamento
function formatStorage(value: number): string {
  return value.toFixed(6).replace(/\.?0+$/, '')
}

const convertStorage = (value: number, fromUnit: string): { [key: string]: string } => {
  // Convert to bits first
  const toBits: { [key: string]: number } = {
    bit: 1,
    byte: 8,
    kilobyte: 8 * 1024,
    megabyte: 8 * 1024 * 1024,
    gigabyte: 8 * 1024 * 1024 * 1024,
    terabyte: 8 * 1024 * 1024 * 1024 * 1024
  }

  // Convert from bits to target unit
  const fromBits: { [key: string]: number } = {
    bit: 1,
    byte: 1/8,
    kilobyte: 1/(8 * 1024),
    megabyte: 1/(8 * 1024 * 1024),
    gigabyte: 1/(8 * 1024 * 1024 * 1024),
    terabyte: 1/(8 * 1024 * 1024 * 1024 * 1024)
  }

  const valueInBits = value * toBits[fromUnit]
  
  // Calculate all conversions
  const results: { [key: string]: string } = {}
  storageUnits.forEach(unit => {
    const convertedValue = valueInBits * fromBits[unit.id]
    results[unit.id] = formatStorage(convertedValue)
  })
  
  return results
}

export default function StorageConverter() {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<StorageData>({
    resolver: zodResolver(storageSchema),
    defaultValues: {
      value: '',
      unit: storageUnits[0]
    },
  })

  const onSubmit = (data: StorageData) => {
    try {
      const value = Number(data.value)
      
      // Calculate all conversions
      const results = convertStorage(value, data.unit.id)
      
      // Format the original value with its unit
      const valorOriginal = `${formatStorage(value)} ${data.unit.title}`
      
      // Create URL parameters for all conversions
      const params = new URLSearchParams()
      params.append('valorOriginal', valorOriginal)
      
      // Add all conversion results
      Object.entries(results).forEach(([unit, value]) => {
        params.append(unit, value)
      })
      
      // Redirect to result page with all parameters
      router.push(`/conversores/armazenamento/resultado?${params.toString()}`)
    } catch (error) {
      console.error('Erro ao processar dados:', error)
      router.push(`/conversores/armazenamento/resultado?error=true`)
    }
  }

  const clearForm = () => {
    setValue('value', '')
    setValue('unit', storageUnits[0])
  }

  return (
    <FormPage
      title="Conversor de Armazenamento Digital"
      description="Converta facilmente entre diferentes unidades de armazenamento digital como bits, bytes, kilobytes, megabytes, gigabytes e terabytes."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputText
                label="Valor"
                placeholder="Digite o valor"
                {...register('value')}
                error={errors.value?.message}
              />
              <p className="mt-1 text-xs text-gray-500">
                Digite o valor que deseja converter. Use vírgula ou ponto para decimais.
              </p>
            </div>
            
            <div className="sm:col-span-3">
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Unidade de Armazenamento"
                    options={storageUnits}
                    defaultValue={storageUnits[0]}
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