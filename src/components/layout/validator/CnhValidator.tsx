'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

// Definição do schema com Zod
const cnhSchema = z.object({
  cnh: z.string().min(1, 'CNH é obrigatória')
})

type CnhData = z.infer<typeof cnhSchema>

export default function CnhValidator() {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CnhData>({
    resolver: zodResolver(cnhSchema),
    defaultValues: {
      cnh: '',
    },
  })

  const validarCnh = (data: CnhData) => {
    try {
      // Remover caracteres não-numéricos
      const cnhNumerica = data.cnh.replace(/[^\d]/g, '')
      
      // Verificar se possui exatamente 11 dígitos
      if (cnhNumerica.length !== 11) {
        router.push(`/validadores/cnh/resultado?cnh=${encodeURIComponent(data.cnh)}&valida=false&mensagem=${encodeURIComponent('A CNH deve ter 11 dígitos numéricos')}`)
        return
      }
      
      // Extrair dígitos
      const digits = cnhNumerica.split('').map(Number)
      
      // Calcular o primeiro dígito verificador
      let sum = 0
      for (let i = 0; i < 9; i++) {
        sum += digits[i] * (10 - i)
      }
      let expectedFirstDigit = 11 - (sum % 11)
      if (expectedFirstDigit >= 10) expectedFirstDigit = 0
      
      // Calcular o segundo dígito verificador
      sum = 0
      for (let i = 0; i < 9; i++) {
        sum += digits[i] * (11 - i)
      }
      sum += expectedFirstDigit * 2
      let expectedSecondDigit = 11 - (sum % 11)
      if (expectedSecondDigit >= 10) expectedSecondDigit = 0
      
      // Verificar se os dígitos verificadores estão corretos
      const isValid = expectedFirstDigit === digits[9] && expectedSecondDigit === digits[10]
      
      // Formatar a CNH para exibição (com pontuação)
      const cnhFormatada = isValid 
        ? `${cnhNumerica.slice(0, 3)}.${cnhNumerica.slice(3, 6)}.${cnhNumerica.slice(6, 9)}-${cnhNumerica.slice(9)}`
        : data.cnh
      
      // Preparar mensagem com base na validação
      const mensagem = isValid
        ? 'A CNH informada é válida de acordo com o algoritmo verificador'
        : 'A CNH informada é inválida: dígitos verificadores incorretos'
      
      // Redirecionar para a página de resultado
      router.push(`/validadores/cnh/resultado?cnh=${encodeURIComponent(data.cnh)}&cnhFormatada=${encodeURIComponent(cnhFormatada)}&valida=${isValid}&mensagem=${encodeURIComponent(mensagem)}`)
    } catch (error) {
      console.error('Erro ao validar CNH:', error)
      router.push(`/validadores/cnh/resultado?error=true`)
    }
  }

  const clearForm = () => {
    setValue('cnh', '')
  }

  return (
    <FormPage
      title="Validador de CNH"
      description="Verifique se um número de CNH é válido segundo o algoritmo verificador."
    >
      <form onSubmit={handleSubmit(validarCnh)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <InputText
                label="Número da CNH"
                placeholder="Digite o número da CNH"
                {...register('cnh')}
                error={errors.cnh?.message}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Validar CNH
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 