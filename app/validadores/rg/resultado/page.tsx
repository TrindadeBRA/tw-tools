import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
  title: "Resultado da Validação de RG | Validador de RG Online - TW Tools",
  description: "Confira o resultado da validação do RG. Nossa ferramenta verifica se o RG é válido de acordo com as regras dos órgãos emissores.",
};

const infoItems = [
  {
      title: "Sobre o Resultado da Validação",
      type: "info" as const,
      content: (
          <p>
              O resultado mostra se o RG informado é matematicamente válido de acordo com as regras estabelecidas pelos órgãos emissores. A validação verifica o dígito verificador e todas as regras necessárias para garantir a validade do RG.
          </p>
      )
  },
  {
      title: "O que significa RG válido?",
      type: "usage" as const,
      content: (
          <p>
              Um RG válido significa que o número atende a todas as regras matemáticas de formação, incluindo o dígito verificador. No entanto, isso não garante que o RG esteja ativo ou registrado oficialmente nos órgãos emissores.
          </p>
      )
  },
  {
      title: "Próximos Passos",
      type: "features" as const,
      content: (
          <p>
              ✓ Você pode validar outros RGs<br />
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

export default function RGValidatorResult() {
  const breadcrumbs = [
    {
      name: 'Validadores',
      href: '/validadores',
      current: false
    },
    {
      name: 'RG',
      href: '/validadores/rg',
      current: false
    },
    {
      name: 'Resultado',
      href: '/validadores/rg/resultado',
      current: true
    }
  ];

  return (
    <>
      <Header
        miniTitle="Resultado da Validação"
        title="Validação de RG"
        description="Confira o resultado da validação do RG. Nossa ferramenta verifica se o RG é válido de acordo com as regras dos órgãos emissores."
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Resultado da Validação de RG"
          description="Confira abaixo o resultado da validação do seu RG."
          notFoundTitle="Validação Não Encontrada"
          notFoundDescription="Não foi possível encontrar uma validação. Por favor, tente validar novamente."
          notFoundMessage="Nenhum resultado de validação foi encontrado. Clique abaixo para validar um RG."
          infoTitle="Informações Importantes"
          infoMessage="Esta validação verifica se o RG segue as regras matemáticas estabelecidas pelos órgãos emissores. No entanto, isso não garante que o RG esteja ativo ou registrado oficialmente."
          resultLabel="RG Validado"
          backPath="/validadores/rg"
          buttonText="Validar Outro RG"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "documento", label: "RG Verificado" },
              { name: "resultado", label: "Resultado" }
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
    </>
  );
} 