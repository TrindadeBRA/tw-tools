import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";

export const metadata: Metadata = {
  title: "Resultado da Validação de CNPJ | Validador de CNPJ Online - TW Tools",
  description: "Confira o resultado da validação do CNPJ. Nossa ferramenta verifica se o CNPJ é válido de acordo com as regras da Receita Federal do Brasil.",
};

export default function CNPJValidatorResult() {
  return (
    <Suspense fallback={<LoadingResult />}>
      <ResultClient
        title="Resultado da Validação de CNPJ"
        description="Confira abaixo o resultado da validação do seu CNPJ."
        notFoundTitle="Validação Não Encontrada"
        notFoundDescription="Não foi possível encontrar uma validação. Por favor, tente validar novamente."
        notFoundMessage="Nenhum resultado de validação foi encontrado. Clique abaixo para validar um CNPJ."
        infoTitle="Informações Importantes"
        infoMessage="Esta validação verifica se o CNPJ segue as regras matemáticas estabelecidas pela Receita Federal. No entanto, isso não garante que o CNPJ esteja ativo ou registrado oficialmente."
        resultLabel="CNPJ Validado"
        backPath="/validadores/cnpj"
        buttonText="Validar Outro CNPJ"
        multipleParams={{ 
          enabled: true, 
          params: [
            { name: "documento", label: "CNPJ Verificado" },
            { name: "resultado", label: "Resultado" }
          ]
        }}
      />
    </Suspense>
  );
} 