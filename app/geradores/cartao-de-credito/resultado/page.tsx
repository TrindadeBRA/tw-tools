import { Metadata } from 'next'
import ResultClient from '@/components/layout/result/ResultClient'
import Header from '@/components/layout/Header'
import InfoSection from '@/components/layout/template/InfoSection'
import { Suspense } from 'react'
import LoadingResult from '@/components/layout/LoadingResult'

export const metadata: Metadata = {
  title: 'Resultado da Geração | Cartão de Crédito Válido Gerado - TW Tools',
  description: 'Resultado da geração de cartão de crédito válido. Nosso sistema gerou um cartão seguindo o algoritmo Luhn e as regras das bandeiras. Utilize para testes e desenvolvimento de software.',
}

const infoItems = [
  {
    title: 'Sobre o Resultado',
    type: 'info' as const,
    content: (
      <p>
        O cartão de crédito gerado segue rigorosamente o algoritmo Luhn e as regras específicas da bandeira selecionada,
        incluindo número, data de validade e código de segurança (CVV).
      </p>
    )
  },
  {
    title: 'Como Utilizar',
    type: 'usage' as const,
    content: (
      <p>
        ✓ Copie os dados do cartão gerado para utilizar em seus testes<br />
        ✓ Verifique se o formato atende às suas necessidades<br />
        ✓ Utilize a ferramenta para gerar novos cartões conforme necessário
      </p>
    )
  },
  {
    title: 'Aviso Legal',
    type: 'legal' as const,
    content: (
      <p>
        Este cartão foi gerado exclusivamente para fins de teste e desenvolvimento.
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
        title="Cartão de Crédito Válido Gerado"
        description="Resultado da geração de cartão de crédito válido. Utilize estes dados para testes e desenvolvimento de software, especialmente em sistemas de pagamento."
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient 
          title="Cartão de Crédito Válido Gerado"
          description="O cartão gerado segue o algoritmo Luhn e as regras da bandeira selecionada, estando pronto para uso em testes e desenvolvimento."
          notFoundTitle="Cartão Não Encontrado"
          notFoundDescription="Não foi possível encontrar um cartão gerado. Por favor, tente gerar um novo cartão."
          notFoundMessage="Nenhum cartão foi encontrado. Clique abaixo para gerar um novo."
          infoTitle="Informações Importantes"
          infoMessage="Este cartão foi gerado seguindo o algoritmo Luhn e as regras da bandeira selecionada, e pode ser usado para testes em sistemas de pagamento que exigem validação."
          backPath="/geradores/cartao-de-credito"
          buttonText="Gerar Novo Cartão"
          multipleParams={{
            enabled: true,
            params: [
              { name: 'cartao', label: 'Número do Cartão' },
              { name: 'validade', label: 'Data de Validade' },
              { name: 'cvv', label: 'Código de Segurança (CVV)' },
              { name: 'bandeira', label: 'Bandeira' }
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
    </>
  )
} 