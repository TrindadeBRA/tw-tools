import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
  title: "Resultado | Gerador de CNH - TW Tools",
  description: "Resultado da geração de CNH válida para testes e desenvolvimento de sistemas.",
};

const infoItems = [
  {
      title: "Sobre este Resultado",
      type: "info" as const,
      content: (<p>A CNH gerada segue o formato padrão da Carteira Nacional de Habilitação brasileira. O algoritmo usado para validação é o mesmo utilizado pelos órgãos oficiais de trânsito, resultando em números válidos para uso em ambientes de teste.</p>)
  },
  {
      title: "Como Utilizar",
      type: "usage" as const,
      content: (<p>✓ Copie o número de CNH para uso em testes<br />✓ Utilize em sistemas que exigem validação de CNH<br />✓ Teste a formatação e o algoritmo de validação</p>)
  },
  {
      title: "Próximos Passos",
      type: "features" as const,
      content: (<p>✓ Utilize o resultado em ambientes de teste<br />✓ Implemente a validação em seu sistema<br />✓ Verifique a integração com outros documentos</p>)
  },
  {
      title: "Aviso Legal",
      type: "legal" as const,
      content: (<p>Os números gerados são válidos apenas para fins de teste e desenvolvimento de sistemas. O uso destes números para criação de documentos falsos ou fraudes é ilegal e pode resultar em penalidades legais. Os usuários são os únicos responsáveis pelo uso adequado desta ferramenta.</p>)
  }
]

export default function ResultadoPage() {
  return (
    <>
      <Header
        miniTitle="Resultado"
        title="CNH Gerada"
        description="Número de CNH válido gerado de acordo com os parâmetros especificados."
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="CNH Válida Gerada"
          description="O seguinte número de CNH foi gerado e é válido para testes:"
          notFoundTitle="Erro na Geração"
          notFoundDescription="Não foi possível gerar a CNH com os parâmetros informados."
          notFoundMessage="Verifique os parâmetros e tente novamente."
          infoTitle="Informações Importantes"
          infoMessage="O número de CNH gerado é válido apenas para fins de teste e desenvolvimento."
          resultLabel="CNH Gerada"
          backPath="/geradores/cnh"
          buttonText="Gerar Outra CNH"
          multipleParams={{ 
            enabled: true,
            params: [
              { name: "cnh", label: "CNH" }
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
    </>
  );
} 