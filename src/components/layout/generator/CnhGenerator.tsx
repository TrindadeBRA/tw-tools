'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputRadio from '@/components/ui/InputRadio'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

// Definição do schema com Zod
const cnhSchema = z.object({
  comPontuacao: z.boolean()
})

type CnhData = z.infer<typeof cnhSchema>

export default function CnhGenerator() {
  const router = useRouter()
  
  // Opções para pontuação
  const pontuacaoOptions = [
    { id: 'true', title: 'Com pontuação' },
    { id: 'false', title: 'Sem pontuação' }
  ]
  
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CnhData>({
    resolver: zodResolver(cnhSchema),
    defaultValues: {
      comPontuacao: true
    },
  })

  const handlePontuacaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('comPontuacao', e.target.value === 'true')
  }

  const gerarCnh = (data: CnhData) => {
    // Gerar 9 dígitos aleatórios para a CNH
    const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
    
    // Gerar dígito do estado e categoria aleatoriamente
    digits[0] = Math.floor(Math.random() * 10) // Estado
    digits[1] = Math.floor(Math.random() * 5) + 1 // Categoria (1-5)
    
    // Calcular os dígitos verificadores (algoritmo semelhante ao do CPF)
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += digits[i] * (10 - i)
    }
    let firstCheckDigit = 11 - (sum % 11)
    if (firstCheckDigit >= 10) firstCheckDigit = 0
    digits.push(firstCheckDigit)
    
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += digits[i] * (11 - i)
    }
    let secondCheckDigit = 11 - (sum % 11)
    if (secondCheckDigit >= 10) secondCheckDigit = 0
    digits.push(secondCheckDigit)
    
    // Formatar CNH com base na opção de pontuação
    const cnh = data.comPontuacao
      ? `${digits.slice(0, 3).join('')}.${digits.slice(3, 6).join('')}.${digits.slice(6, 9).join('')}-${digits.slice(9).join('')}`
      : digits.join('')
    
    // Redirecionar para a página de resultado
    router.push(`/geradores/cnh/resultado?cnh=${encodeURIComponent(cnh)}`)
  }

  return (
    <FormPage
      title="Gerador de CNH"
      description="Configure o formato para gerar um número de CNH válido para testes."
    >
      <form onSubmit={handleSubmit(gerarCnh)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <InputRadio
                name="pontuacao"
                label="Formato da CNH"
                description="Escolha se deseja gerar a CNH com ou sem pontuação"
                options={pontuacaoOptions}
                defaultOption="true"
                onChange={handlePontuacaoChange}
                error={errors.comPontuacao?.message}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="submit">
            Gerar CNH
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 