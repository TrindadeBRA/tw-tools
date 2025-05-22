'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import CopyResult from '@/components/ui/CopyResult'
import FormPage from '../template/FormPage'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

interface ResultClientProps {
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
  paramName?: string
  multipleParams?: {
    enabled: boolean;
    params: {
      name: string;
      label: string;
    }[];
  }
}

interface MultipleResults {
  [key: string]: string;
}

export default function ResultClient({
  title = "Resultado Gerado",
  description = "O resultado foi gerado com sucesso e está pronto para uso.",
  notFoundTitle = "Resultado Não Encontrado",
  notFoundDescription = "Não foi possível encontrar um resultado gerado. Por favor, tente gerar novamente.",
  notFoundMessage = "Nenhum resultado foi encontrado. Clique abaixo para gerar um novo.",
  infoTitle = "Informações Importantes",
  infoMessage = "Este resultado foi gerado para fins de teste e desenvolvimento.",
  resultLabel = "Resultado Gerado",
  backPath = "/",
  buttonText = "Gerar Novo",
  paramName = "cpf",
  multipleParams = { enabled: false, params: [] }
}: Partial<ResultClientProps>) {
  const searchParams = useSearchParams()
  const [result, setResult] = useState<string>('')
  const [multiResults, setMultiResults] = useState<MultipleResults>({})
  const router = useRouter()

  useEffect(() => {
    if (multipleParams?.enabled) {
      // Manipular múltiplos parâmetros (como dados de cartão)
      const results: MultipleResults = {}
      let allParamsPresent = true
      
      multipleParams.params.forEach(param => {
        const value = searchParams.get(param.name)
        if (value) {
          results[param.name] = value
        } else {
          allParamsPresent = false
        }
      })
      
      if (allParamsPresent) {
        setMultiResults(results)
      }
    } else {
      // Manipular um único parâmetro (padrão)
      const resultParam = searchParams.get(paramName)
      if (resultParam) {
        setResult(resultParam)
      }
    }
  }, [searchParams, paramName, multipleParams])

  const handleGenerateNew = () => {
    // Navegar de volta para a página do gerador
    router.push(backPath)
  }

  // Verificar se não há resultado para exibir
  const hasNoResult = multipleParams?.enabled 
    ? Object.keys(multiResults).length === 0
    : !result

  if (hasNoResult) {
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
          {multipleParams?.enabled ? (
            // Exibir múltiplos resultados
            <>
              {multipleParams.params.map((param, index) => (
                <div key={index} className="col-span-full">
                  <CopyResult
                    label={param.label}
                    value={multiResults[param.name] || ''}
                  />
                </div>
              ))}
            </>
          ) : (
            // Exibir resultado único
            <div className="col-span-full">
              <CopyResult
                label={resultLabel}
                value={result}
              />
            </div>
          )}

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