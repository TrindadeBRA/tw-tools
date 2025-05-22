import { Metadata } from 'next'
import ResultClient from '@/components/layout/result/ResultClient'
import Header from '@/components/layout/Header'
import InfoSection from '@/components/layout/template/InfoSection'
import { Suspense } from 'react'
import LoadingResult from '@/components/layout/LoadingResult'

export const metadata: Metadata = {
  title: 'Resultado da Geração | RG Válido Gerado - TW Tools',
  description: 'Resultado da geração de RG válido. Nosso sistema gerou um RG seguindo todos os padrões dos órgãos emissores. Utilize para testes e desenvolvimento de software.',
}

const infoItems = [
  {
    title: 'Sobre o Resultado',
    type: 'info' as const,
    content: (
      <p>
        O RG gerado segue rigorosamente todas as regras estabelecidas pelos órgãos emissores de cada estado,
        incluindo os dígitos verificadores e a validação completa.
      </p>
    )
  },
  {
    title: 'Como Utilizar',
    type: 'usage' as const,
    content: (
      <p>
        ✓ Copie o RG gerado para utilizar em seus testes<br />
        ✓ Verifique se o formato atende às suas necessidades<br />
        ✓ Utilize a ferramenta para gerar novos RGs conforme necessário
      </p>
    )
  },
  {
    title: 'Aviso Legal',
    type: 'legal' as const,
    content: (
      <p>
        Este RG foi gerado exclusivamente para fins de teste e desenvolvimento.
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
        title="RG Válido Gerado"
        description="Resultado da geração de RG válido. Utilize este RG para testes e desenvolvimento de software, seguindo todas as regras dos órgãos emissores."
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient 
          title="RG Válido Gerado"
          description="O RG gerado segue todas as regras estabelecidas pelos órgãos emissores e está pronto para uso em testes e desenvolvimento."
          notFoundTitle="RG Não Encontrado"
          notFoundDescription="Não foi possível encontrar um RG gerado. Por favor, tente gerar um novo RG."
          notFoundMessage="Nenhum RG foi encontrado. Clique abaixo para gerar um novo."
          infoTitle="Informações Importantes"
          infoMessage="Este RG foi gerado seguindo os algoritmos oficiais dos órgãos emissores e pode ser usado para testes em sistemas que exigem validação."
          resultLabel="RG Válido Gerado"
          backPath="/geradores/rg"
          buttonText="Gerar Novo RG"
          paramName="rg"
        />
      </Suspense>
      <InfoSection items={infoItems} />
    </>
  )
} 