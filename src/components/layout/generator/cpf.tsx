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

const cpfFormSchema = z.object({
  state: z.object({
    id: z.union([z.string(), z.number()]),
    title: z.string(),
    description: z.string().optional(),
  }),
  withPunctuation: z.boolean(),
  generatedCPF: z.string().optional(),
})

type CPFFormData = z.infer<typeof cpfFormSchema>

export default function CPFGeneratorClient() {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CPFFormData>({
    resolver: zodResolver(cpfFormSchema),
    defaultValues: {
      state: stateOptions[0],
      withPunctuation: booleanOptions[0].id === 'true',
      generatedCPF: '',
    },
  })

  const generatedCPF = watch('generatedCPF')

  const handleStateChange = (value: Option) => {
    setValue('state', value)
  }

  const handlePunctuationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('withPunctuation', e.target.value === 'true')
  }

  const generateCPF = (data: CPFFormData) => {
    // Generate 9 random digits
    const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
    
    // Add state-specific first digit based on selected state
    const stateCode = stateOptions.findIndex(state => state.id === data.state.id)
    digits[0] = stateCode

    // Calculate first check digit
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += digits[i] * (10 - i)
    }
    let firstCheckDigit = 11 - (sum % 11)
    if (firstCheckDigit >= 10) firstCheckDigit = 0
    digits.push(firstCheckDigit)

    // Calculate second check digit
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += digits[i] * (11 - i)
    }
    let secondCheckDigit = 11 - (sum % 11)
    if (secondCheckDigit >= 10) secondCheckDigit = 0
    digits.push(secondCheckDigit)

    // Format CPF based on punctuation option
    const cpf = data.withPunctuation
      ? `${digits.slice(0, 3).join('')}.${digits.slice(3, 6).join('')}.${digits.slice(6, 9).join('')}-${digits.slice(9).join('')}`
      : digits.join('')

    setValue('generatedCPF', cpf)
  }

  const clearForm = () => {
    setValue('generatedCPF', '')
  }

  return (
    <FormPage
      title="Como Gerar CPF Válido Online"
      description="O CPF (Cadastro de Pessoas Físicas) é o documento oficial de identificação fiscal no Brasil. Nossa ferramenta gera números válidos de CPF por estado, seguindo todos os algoritmos e regras oficiais da Receita Federal, perfeito para testes e desenvolvimento de software."
    >
      <form onSubmit={handleSubmit(generateCPF)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <InputSelect
                label="Estado de Origem do CPF"
                description="Selecione o estado para gerar um CPF válido com o dígito verificador específico da região"
                options={stateOptions}
                defaultValue={stateOptions[0]}
                onChange={handleStateChange}
                error={errors.state?.message}
              />
            </div>

            <div className="col-span-full">
              <InputRadio
                name="punctuation"
                label="Formato do CPF"
                description="Escolha se deseja gerar o CPF com ou sem pontuação (pontos e hífen)"
                options={booleanOptions}
                defaultOption="true"
                onChange={handlePunctuationChange}
                error={errors.withPunctuation?.message}
              />
            </div>

            {generatedCPF && (
              <CopyResult
                label="CPF Válido Gerado"
                value={generatedCPF}
              />
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar CPF
          </Button>
          <Button type="submit">
            Gerar Novo CPF
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 