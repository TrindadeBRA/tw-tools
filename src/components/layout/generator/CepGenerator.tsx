'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputSelect, { Option } from '@/components/ui/InputSelect'
import InputRadio from '@/components/ui/InputRadio'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { booleanOptions, cepRanges, stateOptions } from '@/data/consts'
import { useRouter } from 'next/navigation'

const cepFormSchema = z.object({
  state: z.object({
    id: z.union([z.string(), z.number()]),
    title: z.string(),
    description: z.string().optional(),
  }),
  withPunctuation: z.boolean(),
})

type CEPFormData = z.infer<typeof cepFormSchema>

export default function CEPGeneratorClient() {
  const router = useRouter()
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CEPFormData>({
    resolver: zodResolver(cepFormSchema),
    defaultValues: {
      state: stateOptions[0],
      withPunctuation: booleanOptions[0].id === 'true',
    },
  })

  const handleStateChange = (value: Option) => {
    setValue('state', { id: String(value.id), title: value.title })
  }

  const handlePunctuationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('withPunctuation', e.target.value === 'true')
  }

  const generateCEP = (data: CEPFormData) => {
    const stateId = data.state.id as string
    
    // Se nenhum estado foi selecionado, gera um CEP aleatório de qualquer estado
    let prefix: number
    if (!stateId || stateId === '') {
      const randomState = stateOptions[Math.floor(Math.random() * stateOptions.length)].id as string
      const range = cepRanges[randomState]
      prefix = Math.floor(Math.random() * (range.end - range.start + 1)) + range.start
    } else {
      const range = cepRanges[stateId]
      prefix = Math.floor(Math.random() * (range.end - range.start + 1)) + range.start
    }

    // Gera os 3 últimos dígitos aleatoriamente
    const suffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    
    // Combina o prefixo do estado com o sufixo aleatório
    const cep = prefix.toString().padStart(5, '0') + suffix
    
    // Formata o CEP se necessário (00000-000)
    const formattedCEP = data.withPunctuation ? cep.replace(/(\d{5})(\d{3})/, '$1-$2') : cep
    
    // Redireciona para a página de resultado com o CEP gerado
    router.push(`/geradores/cep/resultado?cep=${encodeURIComponent(formattedCEP)}`)
  }

  return (
    <FormPage
      title="Como Gerar CEP Válido Online"
      description="O gerador de CEP cria números válidos seguindo o padrão dos Correios. Você pode especificar estado e escolher se deseja o CEP formatado."
    >
      <form onSubmit={handleSubmit(generateCEP)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <InputSelect
                label="Estado"
                description="Selecione o estado para gerar um CEP (opcional)"
                options={stateOptions}
                defaultValue={stateOptions[0]}
                onChange={handleStateChange}
                error={errors.state?.message}
              />
            </div>

            <div className="col-span-full">
              <InputRadio
                name="punctuation"
                label="Formato do CEP"
                description="Escolha se deseja gerar o CEP com ou sem pontuação (hífen)"
                options={booleanOptions}
                defaultOption="true"
                onChange={handlePunctuationChange}
                error={errors.withPunctuation?.message}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="submit">
            Gerar CEP
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 