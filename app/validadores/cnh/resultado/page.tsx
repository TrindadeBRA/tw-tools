import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resultado da Validação de CNH | TW Tools",
  description: "Confira o resultado da validação do número de CNH. Verificação rápida e confiável de Carteira Nacional de Habilitação.",
};

const infoItems = [
  {
      title: "Sobre este Resultado",
      type: "info" as const,
      content: (<p>Este resultado indica se o número de CNH fornecido é válido de acordo com o algoritmo verificador. A validação verifica os dígitos verificadores e a estrutura do número.</p>)
  },
  {
      title: "Como Utilizar",
      type: "usage" as const,
      content: (<p>✓ Use este resultado para validação de dados cadastrais<br />✓ Verifique a conformidade de documentos<br />✓ Identifique erros de digitação em formulários</p>)
  },
  {
      title: "Próximos Passos",
      type: "features" as const,
      content: (<p>✓ Copie o resultado para seu sistema<br />✓ Verifique outros documentos em nosso site<br />✓ Compartilhe a ferramenta com colegas</p>)
  },
  {
      title: "Aviso Legal",
      type: "legal" as const,
      content: (<p>Esta validação verifica apenas a conformidade matemática do número de CNH com o algoritmo verificador. Não atesta a autenticidade ou emissão oficial do documento pelo órgão competente.</p>)
  }
]

export default function ResultadoPage() {
  // Verificar se há erro na requisição
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const hasError = searchParams.get('error') === 'true';
  const isValid = searchParams.get('valida') === 'true';
  
  return (
    <>
      <Header
        miniTitle="Resultado"
        title="Resultado da Validação de CNH"
        description="Confira o resultado da validação do número de CNH informado."
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Resultado da Validação"
          description={isValid ? "O número de CNH informado é válido!" : "O número de CNH informado é inválido!"}
          notFoundTitle="Não Foi Possível Validar"
          notFoundDescription={hasError ? "Ocorreu um erro ao processar sua solicitação." : "Não foi possível validar o número de CNH."}
          notFoundMessage={hasError ? "Verifique se os dados informados são válidos e tente novamente." : "Verifique o número e tente novamente."}
          infoTitle="Sobre a Validação"
          infoMessage="A validação verifica se o número da CNH segue o padrão matemático oficial de verificação."
          resultLabel="Número da CNH"
          backPath="/validadores/cnh"
          buttonText="Validar outro número"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "cnh", label: "Número Original" },
              { name: "cnhFormatada", label: "Número Formatado" },
              { name: "valida", label: "É Válido?" },
              { name: "mensagem", label: "Detalhes" }
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
      
      {/* Schema.org structured data for SEO */}
      {!hasError && (
        <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Validador de CNH - Resultado",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL"
            },
            "mainEntity": {
              "@type": "Thing",
              "name": "Validação de CNH",
              "description": `Resultado da validação do número de CNH: ${isValid ? 'Válido' : 'Inválido'}`
            }
          })
        }} />
      )}
    </>
  );
} 