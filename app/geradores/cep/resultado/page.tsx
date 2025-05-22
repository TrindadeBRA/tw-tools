import { Metadata } from 'next'
import ResultClient from '@/components/layout/result/ResultClient'
import Header from '@/components/layout/Header'
import InfoSection from '@/components/layout/template/InfoSection'
import { Suspense } from 'react'
import LoadingResult from '@/components/layout/LoadingResult'

export const metadata: Metadata = {
  title: 'Resultado da Geração | CEP Válido Gerado - TW Tools',
  description: 'Resultado da geração de CEP válido. Nosso sistema gerou um CEP seguindo o padrão dos Correios. Utilize para testes e desenvolvimento de software.',
}

const infoItems = [
  {
    title: 'Sobre o Resultado',
    type: 'info' as const,
    content: (
      <p>
        O CEP gerado segue o padrão dos Correios para a região selecionada,
        permitindo a utilização em testes e desenvolvimento de aplicações que utilizam endereços.
      </p>
    )
  },
  {
    title: 'Como Utilizar',
    type: 'usage' as const,
    content: (
      <p>
        ✓ Copie o CEP gerado para utilizar em seus testes<br />
        ✓ Verifique se o formato atende às suas necessidades<br />
        ✓ Utilize a ferramenta para gerar novos CEPs conforme necessário
      </p>
    )
  },
  {
    title: 'Aviso Legal',
    type: 'legal' as const,
    content: (
      <p>
        Este CEP foi gerado exclusivamente para fins de teste e desenvolvimento.
        A utilização para fins fraudulentos ou ilegais é expressamente proibida
        e de total responsabilidade do usuário.
      </p>
    )
  }
]

export default function ResultadoPage() {
  return (
    <>
      <Header
        miniTitle="Resultado da Geração"
        title="CEP Válido Gerado"
        description="Resultado da geração de CEP válido. Utilize este CEP para testes e desenvolvimento de software, seguindo o padrão dos Correios."
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient 
          title="CEP Válido Gerado"
          description="O CEP gerado segue o padrão dos Correios e está pronto para uso em testes e desenvolvimento."
          notFoundTitle="CEP Não Encontrado"
          notFoundDescription="Não foi possível encontrar um CEP gerado. Por favor, tente gerar um novo CEP."
          notFoundMessage="Nenhum CEP foi encontrado. Clique abaixo para gerar um novo."
          infoTitle="Informações Importantes"
          infoMessage="Este CEP foi gerado seguindo o padrão dos Correios para a região selecionada e pode ser usado para testes em sistemas que utilizam endereços."
          resultLabel="CEP Válido Gerado"
          backPath="/geradores/cep"
          buttonText="Gerar Novo CEP"
          paramName="cep"
        />
      </Suspense>
      <InfoSection items={infoItems} />
    </>
  )
} 