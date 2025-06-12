'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputCountry, { Country } from '@/components/ui/InputCountry'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'
import { phoneMask } from '@/data/masks'

// Schema for form validation
const phoneNumberSchema = z.object({
  country: z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    flag: z.string()
  })
})

type PhoneNumberData = z.infer<typeof phoneNumberSchema>

export default function PhoneNumberGenerator() {
  const router = useRouter()
  
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PhoneNumberData>({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
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

  const generatePhoneNumber = (data: PhoneNumberData) => {
    try {
      // Generate random phone number based on country code
      let phoneNumber = ''
      
      // Different lengths based on country code
      switch (data.country.code) {
        case '55': // Brazil (11 digits: 2 DDD + 9 number)
          // Generate DDD (11-99)
          const ddd = Math.floor(Math.random() * 89) + 11
          // Generate 9 digits (first digit is 9 for mobile)
          const number = '9' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('')
          phoneNumber = ddd.toString() + number
          break

        case '1': // USA/Canada (10 digits)
          phoneNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '44': // UK (11 digits, starting with 7)
          phoneNumber = '7' + Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '351': // Portugal (9 digits)
          phoneNumber = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '34': // Spain (9 digits)
          phoneNumber = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '33': // France (9 digits)
          phoneNumber = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '49': // Germany (10-11 digits)
          phoneNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '39': // Italy (10 digits)
          phoneNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '81': // Japan (10 digits)
          phoneNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '86': // China (11 digits)
          phoneNumber = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '91': // India (10 digits)
          phoneNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '52': // Mexico (10 digits)
          phoneNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '54': // Argentina (10 digits)
          phoneNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '56': // Chile (9 digits)
          phoneNumber = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '57': // Colombia (10 digits)
          phoneNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '58': // Venezuela (10 digits)
          phoneNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '51': // Peru (9 digits)
          phoneNumber = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('')
          break

        case '61': // Australia (9 digits)
          phoneNumber = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('')
          break

        default:
          // Generic format for other countries (10 digits)
          phoneNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
      }

      // Apply mask based on country
      const maskedNumber = phoneMask(phoneNumber, data.country.code)
      
      // Create the full phone number with country code
      const fullNumber = `+${data.country.code} ${maskedNumber}`

      // Redirect to result page with the generated number
      router.push(`/geradores/telefone/resultado?numero=${encodeURIComponent(fullNumber)}&pais=${encodeURIComponent(data.country.name)}&codigo=${encodeURIComponent(data.country.code)}`)
    } catch (error) {
      console.error('Erro ao gerar número:', error)
      router.push(`/geradores/telefone/resultado?error=true`)
    }
  }

  return (
    <FormPage
      title="Gerador de Número de Telefone"
      description="Gere números de telefone válidos para diferentes países com formatação correta."
    >
      <form onSubmit={handleSubmit(generatePhoneNumber)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
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
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="submit">
            Gerar Número
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 