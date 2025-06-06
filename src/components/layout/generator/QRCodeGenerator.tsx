'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

// Define the schema with Zod
const qrCodeSchema = z.object({
  text: z.string().min(1, 'O texto é obrigatório').max(1000, 'O texto deve ter no máximo 1000 caracteres'),
})

type QRCodeData = z.infer<typeof qrCodeSchema>

export default function QRCodeGenerator() {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QRCodeData>({
    resolver: zodResolver(qrCodeSchema),
    defaultValues: {
      text: '',
    },
  })

  const generateQRCode = (data: QRCodeData) => {
    try {
      // Encode the text to base64 to handle special characters
      const encodedText = btoa(encodeURIComponent(data.text))
      
      // Redirect to the result page with the encoded text
      router.push(`/geradores/qrcode/resultado?text=${encodedText}`)
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error)
      router.push(`/geradores/qrcode/resultado?error=true`)
    }
  }

  const clearForm = () => {
    setValue('text', '')
  }

  return (
    <FormPage
      title="Gerador de QR Code"
      description="Gere um QR Code a partir de qualquer texto"
    >
      <form onSubmit={handleSubmit(generateQRCode)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <InputText
                label="Texto para QR Code"
                placeholder="Digite o texto que deseja converter em QR Code"
                {...register('text')}
                error={errors.text?.message}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Gerar QR Code
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 