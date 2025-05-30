import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
  title: "Resultado do Gerador de Exemplo | Demonstração - TW Tools",
  description: "Visualize o resultado gerado pelo nosso gerador de exemplo. Esta é uma página de demonstração da estrutura de resultado.",
};

const infoItems = [
  {
      title: "Sobre este Resultado",
      type: "info" as const,
      content: (
          <p>
              Este é um exemplo de página de resultado que demonstra a estrutura completa. Em uma implementação real, aqui estariam informações relevantes sobre o resultado gerado.
          </p>
      )
  },
  {
      title: "Como Utilizar o Resultado",
      type: "usage" as const,
      content: (
          <p>
              ✓ Exemplo de uso do resultado 1<br />
              ✓ Exemplo de uso do resultado 2<br />
              ✓ Exemplo de uso do resultado 3<br />
              ✓ Opções de compartilhamento e cópia
          </p>
      )
  },
  {
      title: "Próximos Passos",
      type: "features" as const,
      content: (
          <p>
              ✓ Gerar outros exemplos<br />
              ✓ Explorar diferentes configurações<br />
              ✓ Compartilhar via URL<br />
              ✓ Salvar para uso futuro
          </p>
      )
  },
  {
      title: "Aviso Legal",
      type: "legal" as const,
      content: (
          <p>
              Este resultado foi gerado exclusivamente para fins de demonstração. Em uma implementação real, incluiria informações sobre uso adequado e limitações de responsabilidade.
          </p>
      )
  }
]

export default function ExemploResultado() {
  const breadcrumbs = [
    {
      name: 'Exemplo',
      href: '/exemplo',
      current: false
    },
    {
      name: 'Resultado',
      href: '/exemplo/resultado',
      current: true
    }
  ];

  return (
    <>
      <Header
        miniTitle="Resultado Gerado"
        title="Resultado do Gerador de Exemplo"
        description="Esta é uma demonstração de uma página de resultado. Aqui você encontra o resultado gerado com base nas opções selecionadas."
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Resultado do Gerador"
          description="Confira abaixo o resultado gerado com base nas suas configurações."
          notFoundTitle="Resultado Não Encontrado"
          notFoundDescription="Não foi possível encontrar um resultado gerado. Por favor, tente gerar novamente."
          notFoundMessage="Nenhum resultado foi encontrado. Clique abaixo para gerar um novo exemplo."
          infoTitle="Informações Importantes"
          infoMessage="Este é um resultado de demonstração gerado automaticamente. Em uma implementação real, poderia conter informações mais detalhadas sobre o conteúdo gerado."
          resultLabel="Exemplo Gerado"
          backPath="/exemplo"
          buttonText="Gerar Novo Exemplo"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "valor", label: "Valor Gerado" },
              { name: "tipo", label: "Tipo Selecionado" },
              { name: "quantidade", label: "Quantidade" },
              { name: "formato", label: "Formato" },
              { name: "opcoes", label: "Opções Selecionadas" }
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
    </>
  );
} 