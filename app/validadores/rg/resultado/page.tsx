import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";

export const metadata: Metadata = {
  title: "Resultado da Validação de RG | Validador de RG Online - TW Tools",
  description: "Confira o resultado da validação do RG. Nossa ferramenta verifica se o RG é válido de acordo com as regras dos órgãos emissores.",
};

export default function RGValidatorResult() {
  return (
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
  );
} 