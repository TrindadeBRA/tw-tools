'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FormPage from '../template/FormPage'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

interface ImageResultClientProps {
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

export default function ImageResultClient({
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
  paramName = "image",
  multipleParams = { enabled: false, params: [] }
}: Partial<ImageResultClientProps>) {
  const searchParams = useSearchParams()
  const [result, setResult] = useState<string>('')
  const [multiResults, setMultiResults] = useState<MultipleResults>({})
  const [copySuccess, setCopySuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (multipleParams?.enabled) {
      // Manipular múltiplos parâmetros
      const results: MultipleResults = {}
      let foundAnyParam = false
      
      multipleParams.params.forEach(param => {
        const value = searchParams.get(param.name)
        if (value) {
          results[param.name] = value
          foundAnyParam = true
        }
      })
      
      // Atualizar o estado se encontrou pelo menos um parâmetro
      if (foundAnyParam) {
        setMultiResults(results)
      } else {
        setMultiResults({})
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

  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar link:', err)
    }
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
              {/* Exibir a imagem primeiro */}
              {multiResults.image && (
                <div className="col-span-full">
                  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200">
                    <img 
                      src={multiResults.image} 
                      alt="Imagem gerada" 
                      className="max-w-full h-auto rounded-lg shadow-sm"
                    />
                    <div className="mt-4 flex flex-col items-center gap-4">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => handleCopyLink(multiResults.image)}
                      >
                        {copySuccess ? 'Link Copiado!' : 'Copiar Link da Imagem'}
                      </Button>
                      <a 
                        href={multiResults.image} 
                        download="imagem-gerada.png"
                        className="text-sm text-[var(--color-main-600)] hover:text-[var(--color-main-700)]"
                      >
                        Baixar Imagem
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Exibir os outros parâmetros */}
              {multipleParams.params
                .filter(param => param.name !== 'image' && multiResults[param.name]) // Excluir a imagem e mostrar apenas parâmetros com valor
                .map((param, index) => (
                  <div key={index} className="col-span-full">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-700">{param.label}</p>
                      <p className="mt-1 text-sm text-gray-900">{multiResults[param.name]}</p>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            // Exibir resultado único (imagem)
            <div className="col-span-full">
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200">
                <img 
                  src={result} 
                  alt="Imagem gerada" 
                  className="max-w-full h-auto rounded-lg shadow-sm"
                />
                <div className="mt-4 flex flex-col items-center gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleCopyLink(result)}
                  >
                    {copySuccess ? 'Link Copiado!' : 'Copiar Link da Imagem'}
                  </Button>
                  <a 
                    href={result} 
                    download="imagem-gerada.png"
                    className="text-sm text-[var(--color-main-600)] hover:text-[var(--color-main-700)]"
                  >
                    Baixar Imagem
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="col-span-full">
            <div className="bg-[var(--color-main-50)] p-4 rounded-md border border-[var(--color-main-100)]">
              <h3 className="text-sm text-[var(--color-main-800)] font-bold">{infoTitle}</h3>
              <div className="mt-2 text-sm text-[var(--color-main-800)]">
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