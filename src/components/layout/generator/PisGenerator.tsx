'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

// Schema para validação do formulário
const generatorSchema = z.object({
  quantidade: z.string()
    .min(1, 'A quantidade é obrigatória')
    .regex(/^[0-9]+$/, 'Digite apenas números')
    .refine((value) => {
      const num = parseInt(value)
      return num > 0 && num <= 100
    }, 'A quantidade deve estar entre 1 e 100')
})

type GeneratorData = z.infer<typeof generatorSchema>

export default function PisGenerator() {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GeneratorData>({
    resolver: zodResolver(generatorSchema),
    defaultValues: {
      quantidade: '1'
    },
  })

  // Função para gerar um dígito verificador válido
  const generateCheckDigit = (numbers: number[]): number => {
    const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let sum = 0
    
    for (let i = 0; i < 10; i++) {
      sum += numbers[i] * weights[i]
    }
    
    const remainder = sum % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  // Função para gerar um número PIS/PASEP/NIT válido
  const generatePis = (): string => {
    const numbers: number[] = []
    
    // Gera os 10 primeiros dígitos aleatoriamente
    for (let i = 0; i < 10; i++) {
      numbers.push(Math.floor(Math.random() * 10))
    }
    
    // Gera o dígito verificador
    numbers.push(generateCheckDigit(numbers))
    
    // Formata o número
    return numbers.join('').replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3-$4')
  }

  const generateNumbers = (data: GeneratorData) => {
    try {
      const quantidade = parseInt(data.quantidade)
      const numeros: string[] = []
      
      // Gera a quantidade solicitada de números
      for (let i = 0; i < quantidade; i++) {
        numeros.push(generatePis())
      }
      
      // Cria um objeto com os números para a URL
      const params = new URLSearchParams()
      numeros.forEach((numero, index) => {
        params.append(`numero${index + 1}`, numero)
      })
      
      // Redireciona para a página de resultado com os números gerados
      router.push(`/geradores/pis/resultado?${params.toString()}`)
    } catch (error) {
      console.error('Erro ao gerar números:', error)
      router.push('/geradores/pis/resultado?error=true')
    }
  }

  const clearForm = () => {
    setValue('quantidade', '1')
  }

  return (
    <FormPage
      title="Gerador de PIS/PASEP/NIT"
      description="Gere números de PIS/PASEP/NIT válidos para testes"
    >
      <form onSubmit={handleSubmit(generateNumbers)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputText
                label="Quantidade de Números"
                placeholder="1"
                type="number"
                min="1"
                max="100"
                {...register('quantidade')}
                error={errors.quantidade?.message}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Gerar Números
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 