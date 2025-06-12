'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import InputSelect from '@/components/ui/InputSelect'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

// Schema for form validation
const imageGeneratorSchema = z.object({
  text: z.string()
    .min(1, 'O texto é obrigatório')
    .max(50, 'O texto deve ter no máximo 50 caracteres'),
  color: z.object({
    id: z.string(),
    title: z.string()
  }),
  size: z.object({
    id: z.string(),
    title: z.string()
  })
})

type ImageGeneratorData = z.infer<typeof imageGeneratorSchema>

export default function ImageGenerator() {
  const router = useRouter()
  
  const colorOptions = [
    { id: 'black', title: 'Preto' },
    { id: 'blue', title: 'Azul' },
    { id: 'red', title: 'Vermelho' },
    { id: 'green', title: 'Verde' },
    { id: 'purple', title: 'Roxo' }
  ]

  const sizeOptions = [
    { id: 'small', title: 'Pequeno (300x300)' },
    { id: 'medium', title: 'Médio (500x500)' },
    { id: 'large', title: 'Grande (800x800)' }
  ]
  
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ImageGeneratorData>({
    resolver: zodResolver(imageGeneratorSchema),
    defaultValues: {
      text: '',
      color: colorOptions[0],
      size: sizeOptions[0]
    },
  })

  const generateImage = (data: ImageGeneratorData) => {
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        throw new Error('Could not get canvas context')
      }

      // Set canvas size based on selected size
      const dimensionsMap = {
        small: 300,
        medium: 500,
        large: 800
      } as const

      const dimensions = dimensionsMap[data.size.id as keyof typeof dimensionsMap]

      canvas.width = dimensions
      canvas.height = dimensions

      // Fill background
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Configure text
      ctx.fillStyle = data.color.id
      ctx.font = `bold ${dimensions / 10}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Draw text
      ctx.fillText(data.text, canvas.width / 2, canvas.height / 2)

      // Convert to base64
      const imageData = canvas.toDataURL('image/png')

      // Redirect to result page with the generated image
      router.push(`/geradores/imagem/resultado?image=${encodeURIComponent(imageData)}&text=${encodeURIComponent(data.text)}&color=${encodeURIComponent(data.color.title)}&size=${encodeURIComponent(data.size.title)}`)
    } catch (error) {
      console.error('Erro ao gerar imagem:', error)
      router.push(`/geradores/imagem/resultado?error=true`)
    }
  }

  const clearForm = () => {
    setValue('text', '')
    setValue('color', colorOptions[0])
    setValue('size', sizeOptions[0])
  }

  return (
    <FormPage
      title="Gerador de Imagem"
      description="Gere imagens personalizadas com texto, cor e tamanho de sua escolha."
    >
      <form onSubmit={handleSubmit(generateImage)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Controller
                name="text"
                control={control}
                render={({ field }) => (
                  <InputText
                    label="Texto"
                    placeholder="Digite o texto (máx. 50 caracteres)"
                    {...field}
                    error={errors.text?.message}
                  />
                )}
              />
            </div>

            <div className="sm:col-span-3">
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Cor do Texto"
                    options={colorOptions}
                    defaultValue={colorOptions[0]}
                    onChange={(value) => field.onChange(value)}
                    error={errors.color?.message}
                  />
                )}
              />
            </div>

            <div className="sm:col-span-3">
              <Controller
                name="size"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Tamanho da Imagem"
                    options={sizeOptions}
                    defaultValue={sizeOptions[0]}
                    onChange={(value) => field.onChange(value)}
                    error={errors.size?.message}
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
            Gerar Imagem
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 