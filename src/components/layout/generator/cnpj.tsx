'use client';

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputRadio from '@/components/ui/InputRadio'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import CopyResult from '@/components/ui/CopyResult'
import { booleanOptions } from '@/data/consts'

const cnpjFormSchema = z.object({
  withPunctuation: z.boolean(),
  generatedCNPJ: z.string().optional(),
})

type CNPJFormData = z.infer<typeof cnpjFormSchema>

export default function CNPJGeneratorClient() {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CNPJFormData>({
    resolver: zodResolver(cnpjFormSchema),
    defaultValues: {
      withPunctuation: booleanOptions[0].id === 'true',
      generatedCNPJ: '',
    },
  })

  const generatedCNPJ = watch('generatedCNPJ')

  const handlePunctuationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('withPunctuation', e.target.value === 'true')
  }

  const generateCNPJ = (data: CNPJFormData) => {
    // Gera os 8 primeiros dígitos aleatoriamente (base do CNPJ)
    const numbers = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10))
    
    // Adiciona 0001 como identificador de matriz
    numbers.push(0, 0, 0, 1)

    // Calcula o primeiro dígito verificador
    let sum = 0
    let weight = 5
    for (let i = 0; i < 12; i++) {
      sum += numbers[i] * weight
      weight = weight === 2 ? 9 : weight - 1
    }
    const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    numbers.push(firstDigit)

    // Calcula o segundo dígito verificador
    sum = 0
    weight = 6
    for (let i = 0; i < 13; i++) {
      sum += numbers[i] * weight
      weight = weight === 2 ? 9 : weight - 1
    }
    const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    numbers.push(secondDigit)

    // Formata o CNPJ
    const cnpjString = numbers.join('')
    const cnpj = data.withPunctuation
      ? cnpjString.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
      : cnpjString

    setValue('generatedCNPJ', cnpj)
  }

  const clearForm = () => {
    setValue('generatedCNPJ', '')
  }

  return (
    <FormPage
      title="Como Gerar CNPJ Válido Online"
      description="O CNPJ (Cadastro Nacional da Pessoa Jurídica) é o registro obrigatório para empresas na Receita Federal. Nossa ferramenta gera números válidos de CNPJ seguindo todos os algoritmos e regras oficiais, perfeito para testes e desenvolvimento de software."
    >
      <form onSubmit={handleSubmit(generateCNPJ)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <InputRadio
                name="punctuation"
                label="Formato do CNPJ"
                description="Escolha se deseja gerar o CNPJ com ou sem pontuação (pontos, barra e hífen)"
                options={booleanOptions}
                defaultOption="true"
                onChange={handlePunctuationChange}
                error={errors.withPunctuation?.message}
              />
            </div>

            {generatedCNPJ && (
              <CopyResult
                label="CNPJ Válido Gerado"
                value={generatedCNPJ}
              />
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar CNPJ
          </Button>
          <Button type="submit">
            Gerar Novo CNPJ
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 