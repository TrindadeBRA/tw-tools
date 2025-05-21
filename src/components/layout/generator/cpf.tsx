'use client'

import { useState } from 'react'
import InputRadio from '@/components/ui/InputRadio'
import InputSelect, { Option } from '@/components/ui/InputSelect'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import CopyResult from '@/components/ui/CopyResult'

const stateOptions: Option[] = [
  { id: 'SP', title: 'São Paulo' },
  { id: 'RJ', title: 'Rio de Janeiro' },
  { id: 'MG', title: 'Minas Gerais' },
  { id: 'RS', title: 'Rio Grande do Sul' },
  { id: 'BA', title: 'Bahia' },
  { id: 'PR', title: 'Paraná' },
  { id: 'PE', title: 'Pernambuco' },
  { id: 'CE', title: 'Ceará' },
  { id: 'PA', title: 'Pará' },
  { id: 'MA', title: 'Maranhão' },
  { id: 'SC', title: 'Santa Catarina' },
  { id: 'GO', title: 'Goiás' },
  { id: 'PB', title: 'Paraíba' },
  { id: 'ES', title: 'Espírito Santo' },
  { id: 'AM', title: 'Amazonas' },
  { id: 'RN', title: 'Rio Grande do Norte' },
  { id: 'AL', title: 'Alagoas' },
  { id: 'PI', title: 'Piauí' },
  { id: 'MT', title: 'Mato Grosso' },
  { id: 'DF', title: 'Distrito Federal' },
  { id: 'MS', title: 'Mato Grosso do Sul' },
  { id: 'SE', title: 'Sergipe' },
  { id: 'RO', title: 'Rondônia' },
  { id: 'TO', title: 'Tocantins' },
  { id: 'AC', title: 'Acre' },
  { id: 'AP', title: 'Amapá' },
  { id: 'RR', title: 'Roraima' }
]

const punctuationOptions = [
  { id: 'true', title: 'Sim' },
  { id: 'false', title: 'Não' }
]

export default function CPFGeneratorClient() {
  const [selectedState, setSelectedState] = useState<Option>(stateOptions[0])
  const [withPunctuation, setWithPunctuation] = useState<boolean>(true)
  const [generatedCPF, setGeneratedCPF] = useState<string>('')

  const handleStateChange = (value: Option) => {
    setSelectedState(value)
  }

  const handlePunctuationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithPunctuation(e.target.value === 'true')
  }

  const handleGenerateCPF = () => {
    // Generate 9 random digits
    const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
    
    // Add state-specific first digit based on selected state
    const stateCode = stateOptions.findIndex(state => state.id === selectedState.id)
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
    const cpf = withPunctuation
      ? `${digits.slice(0, 3).join('')}.${digits.slice(3, 6).join('')}.${digits.slice(6, 9).join('')}-${digits.slice(9).join('')}`
      : digits.join('')

    setGeneratedCPF(cpf)
  }

  return (
    <FormPage
      title="Gerador de CPF"
      description="O CPF (Cadastro de Pessoas Físicas) é um documento único emitido pela Receita Federal do Brasil. Cada número gerado segue um algoritmo específico e pode ser validado."
    >
      <form onSubmit={(e) => { e.preventDefault(); handleGenerateCPF() }}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <InputSelect
                label="Estado de Origem"
                description="Selecione o estado para o qual o CPF será gerado"
                options={stateOptions}
                defaultValue={selectedState}
                onChange={handleStateChange}
              />
            </div>

            <div className="col-span-full">
              <InputRadio
                name="punctuation"
                label="Gerar com pontuação?"
                options={punctuationOptions}
                defaultOption={withPunctuation ? 'true' : 'false'}
                onChange={handlePunctuationChange}
              />
            </div>

            {generatedCPF && (
              <CopyResult
                label="CPF Gerado:"
                value={generatedCPF}
              />
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={() => setGeneratedCPF('')}>
            Limpar
          </Button>
          <Button type="submit">
            Gerar CPF
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 