import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resultado | Calculadora de Regra de Três - TW Tools",
  description: "Resultado do cálculo de regra de três. Veja o valor proporcional calculado e a expressão matemática completa.",
};

const infoItems = [
    {
        title: "Sobre o Resultado",
        type: "info" as const,
        content: (<p>O resultado mostra o quarto valor da proporção, calculado usando a regra de três. A expressão matemática mostra como o cálculo foi realizado.</p>)
    },
    {
        title: "Como Interpretar",
        type: "usage" as const,
        content: (<p>✓ O resultado é o valor proporcional calculado<br />✓ A expressão mostra a operação matemática completa<br />✓ O resultado é apresentado com duas casas decimais<br />✓ Você pode copiar o resultado para usar em outros lugares</p>)
    },
    {
        title: "Dicas de Uso",
        type: "features" as const,
        content: (<p>✓ Verifique se os valores de entrada estão corretos<br />✓ Use o botão "Voltar" para fazer um novo cálculo<br />✓ Copie o resultado para usar em outros cálculos<br />✓ Verifique a expressão para entender o cálculo</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Os resultados são calculados automaticamente e devem ser verificados em casos de uso crítico. Esta ferramenta é fornecida apenas para fins educacionais e de referência.</p>)
    }
]

export default function ResultadoPage() {
  const breadcrumbs = [
    {
      name: 'Calculadoras',
      href: '/calculadoras',
      current: false
    },
    {
      name: 'Regra de Três',
      href: '/calculadoras/regra-de-tres',
      current: false
    },
    {
      name: 'Resultado',
      href: '/calculadoras/regra-de-tres/resultado',
      current: true
    }
  ];

  // Verificar se há erro na requisição - MÉTODO SEGURO PARA SSR
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const hasError = searchParams.get('error') === 'true';
  
  // Extrair valores para uso no Schema.org
  const resultadoPrincipal = searchParams.get('resultado') || '';
  
  return (
    <>
      <Header
        miniTitle="Resultado"
        title="Resultado da Regra de Três"
        description="Veja o resultado do cálculo de proporção e a expressão matemática completa."
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Resultado da Regra de Três"
          description="O valor proporcional calculado é:"
          notFoundTitle="Resultado Não Encontrado"
          notFoundDescription={hasError ? "Ocorreu um erro ao processar sua solicitação." : "Não foi possível encontrar um resultado."}
          notFoundMessage={hasError ? "Verifique se os valores informados são válidos e tente novamente." : "Verifique os valores e tente novamente."}
          infoTitle="Informações Importantes"
          infoMessage="O resultado é apresentado com duas casas decimais para maior precisão."
          resultLabel="Resultado"
          backPath="/calculadoras/regra-de-tres"
          buttonText="Fazer Novo Cálculo"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "valor1", label: "Primeiro Valor" },
              { name: "valor2", label: "Segundo Valor" },
              { name: "valor3", label: "Terceiro Valor" },
              { name: "resultado", label: "Resultado" },
              { name: "expressao", label: "Expressão Matemática" }
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
      
      {/* Schema.org structured data for SEO - apenas quando houver resultado */}
      {!hasError && resultadoPrincipal && (
        <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Calculadora de Regra de Três - Resultado",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL"
            },
            "mainEntity": {
              "@type": "Thing",
              "name": "Resultado da Regra de Três",
              "description": `Resultado do cálculo de proporção: ${resultadoPrincipal}`
            }
          })
        }} />
      )}
    </>
  );
} 