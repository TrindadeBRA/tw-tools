'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputSelect from '@/components/ui/InputSelect'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

// Define schema with Zod
const plateSchema = z.object({
  format: z.object({
    id: z.string(),
    title: z.string()
  }),
  state: z.object({
    id: z.string(),
    title: z.string()
  })
})

type PlateData = z.infer<typeof plateSchema>

// Estados brasileiros
const states = [
  { id: 'AC', title: 'Acre' },
  { id: 'AL', title: 'Alagoas' },
  { id: 'AP', title: 'Amapá' },
  { id: 'AM', title: 'Amazonas' },
  { id: 'BA', title: 'Bahia' },
  { id: 'CE', title: 'Ceará' },
  { id: 'DF', title: 'Distrito Federal' },
  { id: 'ES', title: 'Espírito Santo' },
  { id: 'GO', title: 'Goiás' },
  { id: 'MA', title: 'Maranhão' },
  { id: 'MT', title: 'Mato Grosso' },
  { id: 'MS', title: 'Mato Grosso do Sul' },
  { id: 'MG', title: 'Minas Gerais' },
  { id: 'PA', title: 'Pará' },
  { id: 'PB', title: 'Paraíba' },
  { id: 'PR', title: 'Paraná' },
  { id: 'PE', title: 'Pernambuco' },
  { id: 'PI', title: 'Piauí' },
  { id: 'RJ', title: 'Rio de Janeiro' },
  { id: 'RN', title: 'Rio Grande do Norte' },
  { id: 'RS', title: 'Rio Grande do Sul' },
  { id: 'RO', title: 'Rondônia' },
  { id: 'RR', title: 'Roraima' },
  { id: 'SC', title: 'Santa Catarina' },
  { id: 'SP', title: 'São Paulo' },
  { id: 'SE', title: 'Sergipe' },
  { id: 'TO', title: 'Tocantins' }
]

const formatOptions = [
  { id: 'mercosul', title: 'Padrão Mercosul (ABC1D23)' },
  { id: 'antigo', title: 'Padrão Antigo (ABC1234)' }
]

export default function LicensePlateGenerator() {
  const router = useRouter()
  
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<PlateData>({
    resolver: zodResolver(plateSchema),
    defaultValues: {
      format: formatOptions[0],
      state: states[0]
    },
  })

  const generatePlate = (data: PlateData) => {
    try {
      let plate = ''
      
      if (data.format.id === 'mercosul') {
        // Gera placa no padrão Mercosul (ABC1D23)
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const numbers = '0123456789'
        
        // Primeiras 3 letras
        for (let i = 0; i < 3; i++) {
          plate += letters.charAt(Math.floor(Math.random() * letters.length))
        }
        
        // Primeiro número
        plate += numbers.charAt(Math.floor(Math.random() * numbers.length))
        
        // Letra do Mercosul
        plate += letters.charAt(Math.floor(Math.random() * letters.length))
        
        // Últimos 2 números
        for (let i = 0; i < 2; i++) {
          plate += numbers.charAt(Math.floor(Math.random() * numbers.length))
        }
      } else {
        // Gera placa no padrão antigo (ABC1234)
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const numbers = '0123456789'
        
        // Primeiras 3 letras
        for (let i = 0; i < 3; i++) {
          plate += letters.charAt(Math.floor(Math.random() * letters.length))
        }
        
        // 4 números
        for (let i = 0; i < 4; i++) {
          plate += numbers.charAt(Math.floor(Math.random() * numbers.length))
        }
      }

      // Adiciona o estado
      const plateWithState = `${plate}-${data.state.id}`

      // Redireciona para a página de resultado
      router.push(`/geradores/placa/resultado?placa=${encodeURIComponent(plate)}&estado=${encodeURIComponent(data.state.id)}&formato=${encodeURIComponent(data.format.id)}`)
    } catch (error) {
      console.error('Erro ao gerar placa:', error)
      router.push(`/geradores/placa/resultado?error=true`)
    }
  }

  const clearForm = () => {
    setValue('format', formatOptions[0])
    setValue('state', states[0])
  }

  return (
    <FormPage
      title="Gerador de Placas"
      description="Gere placas de veículos no padrão Mercosul ou padrão antigo"
    >
      <form onSubmit={handleSubmit(generatePlate)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Controller
                name="format"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Formato da Placa"
                    options={formatOptions}
                    defaultValue={formatOptions[0]}
                    onChange={(value) => field.onChange(value)}
                    error={errors.format?.message}
                  />
                )}
              />
            </div>
            
            <div className="sm:col-span-3">
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Estado"
                    options={states}
                    defaultValue={states[0]}
                    onChange={(value) => field.onChange(value)}
                    error={errors.state?.message}
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
            Gerar Placa
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 