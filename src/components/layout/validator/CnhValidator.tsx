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
        router.push(`/validadores/cnh/resultado?valida=false&mensagem=${encodeURIComponent('A CNH deve ter 11 dígitos numéricos')}`)
        return
      }

      // Verificar se todos os dígitos são iguais (caso especial)
      if (/^(\d)\1{10}$/.test(cnhNumerica)) {
        router.push(`/validadores/cnh/resultado?valida=false&mensagem=${encodeURIComponent('CNH inválida: todos os dígitos são iguais')}`)
        return
      }

      // Extrair os 9 primeiros dígitos para cálculo
      const cnhBase = cnhNumerica.slice(0, 9)
      const digits = cnhBase.split('').map(Number)
      
      // Inicializar variáveis
      let dv1 = 0
      let dv2 = 0
      let weight1 = 9
      let weight2 = 1
      let isFirstDigitGreaterThan9 = false
      
      // Calcular os dígitos verificadores
      for (let i = 0; i < 9; i++) {
        const digit = digits[i]
        dv1 += digit * weight1
        dv2 += digit * weight2
        weight1--
        weight2++
      }
      
      // Primeiro dígito verificador
      dv1 = dv1 % 11
      if (dv1 > 9) {
        dv1 = 0
        isFirstDigitGreaterThan9 = true
      }
      
      // Segundo dígito verificador
      dv2 = dv2 % 11
      if (isFirstDigitGreaterThan9) {
        if (dv2 - 2 < 0) {
          dv2 += 9
        } else {
          dv2 -= 2
        }
      }
      
      if (dv2 > 9) {
        dv2 = 0
      }
      
      // Verificar se os dígitos verificadores estão corretos
      const expectedDV = String(dv1) + String(dv2)
      const actualDV = cnhNumerica.slice(9)
      const isValid = expectedDV === actualDV
      
      // Formatar a CNH para exibição (com pontuação)
      const cnhFormatada = `${cnhNumerica.slice(0, 3)}.${cnhNumerica.slice(3, 6)}.${cnhNumerica.slice(6, 9)}-${cnhNumerica.slice(9)}`
      
      // Preparar mensagem com base na validação
      const mensagem = isValid
        ? 'A CNH informada é válida'
        : 'A CNH informada é inválida'
      
      // Redirecionar para a página de resultado com apenas dados úteis
      router.push(`/validadores/cnh/resultado?valida=${isValid}&cnh=${encodeURIComponent(cnhFormatada)}&mensagem=${encodeURIComponent(mensagem)}`)
    } catch (error) {
      console.error('Erro ao validar CNH:', error)
      router.push(`/validadores/cnh/resultado?valida=false&mensagem=${encodeURIComponent('Erro ao processar a validação')}`)
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