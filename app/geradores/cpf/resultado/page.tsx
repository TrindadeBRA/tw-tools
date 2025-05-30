import { Metadata } from 'next'
import ResultClient from '@/components/layout/result/ResultClient'
import Header from '@/components/layout/Header'
import InfoSection from '@/components/layout/template/InfoSection'
import { Suspense } from 'react'
import LoadingResult from '@/components/layout/LoadingResult'

export const metadata: Metadata = {
  title: 'Resultado da Geração | CPF Válido Gerado - TW Tools',
  description: 'Resultado da geração de CPF válido. Nosso sistema gerou um CPF seguindo todos os padrões da Receita Federal. Utilize para testes e desenvolvimento de software.',
}

const infoItems = [
  {
    title: 'Sobre o Resultado',
    type: 'info' as const,
    content: (
      <p>
        O CPF gerado segue rigorosamente todas as regras estabelecidas pela Receita Federal do Brasil,
        incluindo os dígitos verificadores e a validação matemática completa.
      </p>
    )
  },
  {
    title: 'Como Utilizar',
    type: 'usage' as const,
    content: (
      <p>
        ✓ Copie o CPF gerado para utilizar em seus testes<br />
        ✓ Verifique se o formato atende às suas necessidades<br />
        ✓ Utilize a ferramenta para gerar novos CPFs conforme necessário
      </p>
    )
  },
  {
    title: 'Aviso Legal',
    type: 'legal' as const,
    content: (
      <p>
        Este CPF foi gerado exclusivamente para fins de teste e desenvolvimento.
        A utilização para fins fraudulentos ou ilegais é expressamente proibida
        e de total responsabilidade do usuário.
      </p>
    )
  }
]

export default function ResultadoPage() {
  const breadcrumbs = [
    {
      name: 'Geradores',
      href: '/geradores',
      current: false
    },
    {
      name: 'CPF',
      href: '/geradores/cpf',
      current: false
    },
    {
      name: 'Resultado',
      href: '/geradores/cpf/resultado',
      current: true
    }
  ];

  return (
    <>
      <Header
        miniTitle="Resultado da Geração"
        title="CPF Válido Gerado"
        description="Resultado da geração de CPF válido. Utilize este CPF para testes e desenvolvimento de software, seguindo todas as regras da Receita Federal."
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient 
          title="CPF Válido Gerado"
          description="O CPF gerado segue todas as regras estabelecidas pela Receita Federal e está pronto para uso em testes e desenvolvimento."
          notFoundTitle="CPF Não Encontrado"
          notFoundDescription="Não foi possível encontrar um CPF gerado. Por favor, tente gerar um novo CPF."
          notFoundMessage="Nenhum CPF foi encontrado. Clique abaixo para gerar um novo."
          infoTitle="Informações Importantes"
          infoMessage="Este CPF foi gerado seguindo o algoritmo oficial da Receita Federal e pode ser usado para testes em sistemas que exigem validação."
          resultLabel="CPF Válido Gerado"
          backPath="/geradores/cpf"
          buttonText="Gerar Novo CPF"
          paramName="cpf"
        />
      </Suspense>
      <InfoSection items={infoItems} />
    </>
  )
} 