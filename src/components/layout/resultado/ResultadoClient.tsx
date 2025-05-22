'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import CopyResult from '@/components/ui/CopyResult'
import FormPage from '../template/FormPage'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

interface ResultadoClientProps {
  title: string
  description: string
  notFoundTitle: string
  notFoundDescription: string
  notFoundMessage: string
  infoTitle: string
  infoMessage: string
  resultLabel: string
  backPath: string
  buttonText: string
}

export default function ResultadoClient({
  title = "CPF Válido Gerado",
  description = "O CPF gerado segue todas as regras estabelecidas pela Receita Federal e está pronto para uso em testes e desenvolvimento.",
  notFoundTitle = "Resultado Não Encontrado",
  notFoundDescription = "Não foi possível encontrar um CPF gerado. Por favor, tente gerar um novo CPF.",
  notFoundMessage = "Nenhum CPF foi encontrado. Clique abaixo para gerar um novo.",
  infoTitle = "Informações Importantes",
  infoMessage = "Este CPF foi gerado seguindo o algoritmo oficial e pode ser usado para testes em sistemas que exigem validação.",
  resultLabel = "CPF Válido Gerado",
  backPath = "/geradores/cpf",
  buttonText = "Gerar Novo CPF"
}: Partial<ResultadoClientProps>) {
  const searchParams = useSearchParams()
  const [cpf, setCpf] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    // Get the CPF from the URL parameters
    const cpfParam = searchParams.get('cpf')
    if (cpfParam) {
      setCpf(cpfParam)
    }
  }, [searchParams])

  const handleGenerateNew = () => {
    // Navigate back to the generator page
    router.push(backPath)
  }

  if (!cpf) {
    return (
      <FormPage
        title={notFoundTitle}
        description={notFoundDescription}
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <p className="text-center text-gray-600">
                {notFoundMessage}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" onClick={handleGenerateNew}>
            {buttonText}
          </Button>
        </div>
      </FormPage>
    )
  }

  return (
    <FormPage
      title={title}
      description={description}
    >
      <div className="px-4 py-6 sm:p-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8">
          <div className="col-span-full">
            <CopyResult
              label={resultLabel}
              value={cpf}
            />
          </div>

          <div className="col-span-full">
            <div className="bg-[var(--color-main-50)] p-4 rounded-md border border-[var(--color-main-100)]">
              <h3 className="text-sm font-medium text-[var(--color-main-800)]">{infoTitle}</h3>
              <div className="mt-2 text-sm text-[var(--color-main-700)]">
                <p>{infoMessage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <Button type="button" onClick={handleGenerateNew}>
          {buttonText}
        </Button>
      </div>
    </FormPage>
  )
} 