'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import InputCountry, { Country } from '@/components/ui/InputCountry'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'
import { phoneMask } from '@/data/masks'

// Schema for form validation
const whatsappSchema = z.object({
  phoneNumber: z.string().min(1, 'Número de telefone é obrigatório'),
  message: z.string().optional(),
  country: z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    flag: z.string()
  })
})

type WhatsAppData = z.infer<typeof whatsappSchema>

export default function WhatsAppGenerator() {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<WhatsAppData>({
    resolver: zodResolver(whatsappSchema),
    defaultValues: {
      phoneNumber: '',
      message: '',
      country: {
        id: 'BR',
        name: 'Brasil',
        code: '55',
        flag: '🇧🇷'
      }
    },
  })

  // Watch for country changes
  const selectedCountry = watch('country')

  const generateWhatsAppLink = (data: WhatsAppData) => {
    try {
      // Remove all non-digits from phone number
      const cleanPhone = data.phoneNumber.replace(/\D/g, '')
      
      // Create the WhatsApp URL
      const baseUrl = `https://wa.me/${data.country.code}${cleanPhone}`
      const finalUrl = data.message 
        ? `${baseUrl}?text=${encodeURIComponent(data.message)}`
        : baseUrl

      // Redirect to result page with the generated URL
      router.push(`/geradores/whatsapp/resultado?url=${encodeURIComponent(finalUrl)}`)
    } catch (error) {
      console.error('Erro ao gerar link:', error)
      router.push(`/geradores/whatsapp/resultado?error=true`)
    }
  }

  const clearForm = () => {
    setValue('phoneNumber', '')
    setValue('message', '')
  }

  return (
    <FormPage
      title="Gerador de Link do WhatsApp"
      description="Gere links para iniciar conversas no WhatsApp com facilidade."
    >
      <form onSubmit={handleSubmit(generateWhatsAppLink)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <InputCountry
                    label="País"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.country?.message}
                  />
                )}
              />
            </div>

            <div className="sm:col-span-4">
              <InputText
                label="Número de Telefone"
                placeholder="Digite o número de telefone aqui..."
                {...register('phoneNumber')}
                error={errors.phoneNumber?.message}
                onChange={(e) => {
                  const masked = phoneMask(e.target.value, selectedCountry.code)
                  setValue('phoneNumber', masked)
                }}
              />
            </div>
            
            <div className="col-span-full">
              <InputText
                label="Mensagem (opcional)"
                placeholder="Digite sua mensagem aqui..."
                {...register('message')}
                error={errors.message?.message}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Gerar Link
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 