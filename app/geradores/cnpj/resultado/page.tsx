import { Metadata } from 'next'
import ResultClient from '@/components/layout/result/ResultClient'
import Header from '@/components/layout/Header'
import InfoSection from '@/components/layout/template/InfoSection'
import { Suspense } from 'react'
import LoadingResult from '@/components/layout/LoadingResult'

export const metadata: Metadata = {
  title: 'Resultado da Geração | CNPJ Válido Gerado - TW Tools',
  description: 'Resultado da geração de CNPJ válido. Nosso sistema gerou um CNPJ seguindo todos os padrões da Receita Federal. Utilize para testes e desenvolvimento de software.',
}

const infoItems = [
  {
    title: 'Sobre o Resultado',
    type: 'info' as const,
    content: (
      <p>
        O CNPJ gerado segue rigorosamente todas as regras estabelecidas pela Receita Federal do Brasil,
        incluindo os dígitos verificadores e a validação matemática completa.
      </p>
    )
  },
  {
    title: 'Como Utilizar',
    type: 'usage' as const,
    content: (
      <p>
        ✓ Copie o CNPJ gerado para utilizar em seus testes<br />
        ✓ Verifique se o formato atende às suas necessidades<br />
        ✓ Utilize a ferramenta para gerar novos CNPJs conforme necessário
      </p>
    )
  },
  {
    title: 'Aviso Legal',
    type: 'legal' as const,
    content: (
      <p>
        Este CNPJ foi gerado exclusivamente para fins de teste e desenvolvimento.
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
        title="CNPJ Válido Gerado"
        description="Resultado da geração de CNPJ válido. Utilize este CNPJ para testes e desenvolvimento de software, seguindo todas as regras da Receita Federal."
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient 
          title="CNPJ Válido Gerado"
          description="O CNPJ gerado segue todas as regras estabelecidas pela Receita Federal e está pronto para uso em testes e desenvolvimento."
          notFoundTitle="CNPJ Não Encontrado"
          notFoundDescription="Não foi possível encontrar um CNPJ gerado. Por favor, tente gerar um novo CNPJ."
          notFoundMessage="Nenhum CNPJ foi encontrado. Clique abaixo para gerar um novo."
          infoTitle="Informações Importantes"
          infoMessage="Este CNPJ foi gerado seguindo o algoritmo oficial da Receita Federal e pode ser usado para testes em sistemas que exigem validação."
          resultLabel="CNPJ Válido Gerado"
          backPath="/geradores/cnpj"
          buttonText="Gerar Novo CNPJ"
          paramName="cnpj"
        />
      </Suspense>
      <InfoSection items={infoItems} />
    </>
  )
} 