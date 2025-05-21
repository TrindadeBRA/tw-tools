'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputRadio from '@/components/ui/InputRadio'
import InputSelect, { Option } from '@/components/ui/InputSelect'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import CopyResult from '@/components/ui/CopyResult'
import { booleanOptions, stateOptions } from '@/data/consts'

const rgFormSchema = z.object({
  state: z.object({
    id: z.union([z.string(), z.number()]),
    title: z.string(),
    description: z.string().optional(),
  }),
  withPunctuation: z.boolean(),
  generatedRG: z.string().optional(),
})

type RGFormData = z.infer<typeof rgFormSchema>

export default function RGGeneratorClient() {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RGFormData>({
    resolver: zodResolver(rgFormSchema),
    defaultValues: {
      state: stateOptions[0],
      withPunctuation: booleanOptions[0].id === 'true',
      generatedRG: '',
    },
  })

  const generatedRG = watch('generatedRG')

  const handleStateChange = (value: Option) => {
    setValue('state', value)
  }

  const handlePunctuationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('withPunctuation', e.target.value === 'true')
  }

  const generateRG = (data: RGFormData) => {
    // Gera os 8 primeiros dígitos aleatoriamente
    const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10))

    // Calcula o dígito verificador usando peso crescente (2 a 9)
    let sum = 0
    for (let i = 0; i < 8; i++) {
      sum += digits[i] * (2 + i)
    }

    // Calcula o dígito verificador
    let checkDigit: string | number = 11 - (sum % 11)
    if (checkDigit === 10) checkDigit = 'X'
    else if (checkDigit === 11) checkDigit = '0'

    // Formata o RG baseado na opção de pontuação
    const rgString = [...digits, checkDigit].join('')
    const rg = data.withPunctuation
      ? rgString.replace(/^(\d{2})(\d{3})(\d{3})([0-9X])$/, '$1.$2.$3-$4')
      : rgString

    setValue('generatedRG', rg)
  }

  const clearForm = () => {
    setValue('generatedRG', '')
  }

  return (
    <FormPage
      title="Como Gerar RG Válido Online"
      description="O RG (Registro Geral) é o documento oficial de identificação no Brasil. Nossa ferramenta gera números válidos de RG por estado, seguindo os algoritmos e regras oficiais dos órgãos emissores, perfeito para testes e desenvolvimento de software."
    >
      <form onSubmit={handleSubmit(generateRG)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <InputSelect
                label="Estado Emissor do RG"
                description="Selecione o estado para gerar um RG válido de acordo com as regras locais"
                options={stateOptions}
                defaultValue={stateOptions[0]}
                onChange={handleStateChange}
                error={errors.state?.message}
              />
            </div>

            <div className="col-span-full">
              <InputRadio
                name="punctuation"
                label="Formato do RG"
                description="Escolha se deseja gerar o RG com ou sem pontuação (pontos e hífen)"
                options={booleanOptions}
                defaultOption="true"
                onChange={handlePunctuationChange}
                error={errors.withPunctuation?.message}
              />
            </div>

            {generatedRG && (
              <CopyResult
                label="RG Válido Gerado"
                value={generatedRG}
              />
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar RG
          </Button>
          <Button type="submit">
            Gerar Novo RG
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 