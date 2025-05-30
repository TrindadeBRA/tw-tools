import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
  title: "Resultado da Validação de CPF | Validador de CPF Online - TW Tools",
  description: "Confira o resultado da validação do CPF. Nossa ferramenta verifica se o CPF é válido de acordo com as regras da Receita Federal do Brasil.",
};

const infoItems = [
  {
      title: "Sobre o Resultado da Validação",
      type: "info" as const,
      content: (
          <p>
              O resultado mostra se o CPF informado é matematicamente válido de acordo com as regras estabelecidas pela Receita Federal do Brasil. A validação verifica os dígitos verificadores e todas as regras necessárias para garantir a validade do CPF.
          </p>
      )
  },
  {
      title: "O que significa CPF válido?",
      type: "usage" as const,
      content: (
          <p>
              Um CPF válido significa que o número atende a todas as regras matemáticas de formação, incluindo os dígitos verificadores. No entanto, isso não garante que o CPF esteja ativo ou registrado oficialmente na Receita Federal.
          </p>
      )
  },
  {
      title: "Próximos Passos",
      type: "features" as const,
      content: (
          <p>
              ✓ Você pode validar outros CPFs<br />
              ✓ Utilizar nossos outros validadores<br />
              ✓ Compartilhar o resultado por URL
          </p>
      )
  },
  {
      title: "Aviso Legal",
      type: "legal" as const,
      content: (
          <p>
              Esta ferramenta foi desenvolvida exclusivamente para fins de validação e desenvolvimento. A utilização para fins fraudulentos ou ilegais é expressamente proibida e de total responsabilidade do usuário.
          </p>
      )
  }
]

export default function CPFValidatorResult() {
  const breadcrumbs = [
    {
      name: 'Validadores',
      href: '/validadores',
      current: false
    },
    {
      name: 'CPF',
      href: '/validadores/cpf',
      current: false
    },
    {
      name: 'Resultado',
      href: '/validadores/cpf/resultado',
      current: true
    }
  ];

  return (
    <>
      <Header
        miniTitle="Resultado da Validação"
        title="Validação de CPF"
        description="Confira o resultado da validação do CPF. Nossa ferramenta verifica se o CPF é válido de acordo com as regras da Receita Federal do Brasil."
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Resultado da Validação de CPF"
          description="Confira abaixo o resultado da validação do seu CPF."
          notFoundTitle="Validação Não Encontrada"
          notFoundDescription="Não foi possível encontrar uma validação. Por favor, tente validar novamente."
          notFoundMessage="Nenhum resultado de validação foi encontrado. Clique abaixo para validar um CPF."
          infoTitle="Informações Importantes"
          infoMessage="Esta validação verifica se o CPF segue as regras matemáticas estabelecidas pela Receita Federal. No entanto, isso não garante que o CPF esteja ativo ou registrado oficialmente."
          resultLabel="CPF Validado"
          backPath="/validadores/cpf"
          buttonText="Validar Outro CPF"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "documento", label: "CPF Verificado" },
              { name: "resultado", label: "Resultado" }
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
    </>
  );
} 