import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";

export const metadata: Metadata = {
  title: "Resultado da Validação de CPF | Validador de CPF Online - TW Tools",
  description: "Confira o resultado da validação do CPF. Nossa ferramenta verifica se o CPF é válido de acordo com as regras da Receita Federal do Brasil.",
};

export default function CPFValidatorResult() {
  return (
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
  );
} 