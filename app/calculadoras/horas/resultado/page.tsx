import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resultado | Calculadora de Horas - TW Tools",
  description: "Resultado do cálculo de horas realizado com nossa calculadora online.",
};

const infoItems = [
    {
        title: "Sobre este Resultado",
        type: "info" as const,
        content: (<p>O resultado mostra o horário final após realizar a operação matemática entre os dois horários informados.</p>)
    },
    {
        title: "Como Utilizar",
        type: "usage" as const,
        content: (<p>✓ O resultado está no formato 24 horas (HH:mm)<br />✓ Você pode copiar o resultado clicando no botão de cópia<br />✓ Para novos cálculos, clique em "Voltar"</p>)
    },
    {
        title: "Próximos Passos",
        type: "features" as const,
        content: (<p>✓ Verifique se o resultado faz sentido para seu caso<br />✓ Considere o formato 24 horas ao interpretar o resultado<br />✓ Para cálculos complexos, faça-os em etapas</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Este resultado é fornecido apenas para fins informativos. Para cálculos críticos ou oficiais, consulte um profissional qualificado.</p>)
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
      name: 'Calculadora de Horas',
      href: '/calculadoras/horas',
      current: false
    },
    {
      name: 'Resultado',
      href: '/calculadoras/horas/resultado',
      current: true
    }
  ];

  // Verificar se há erro na requisição - MÉTODO SEGURO PARA SSR
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const hasError = searchParams.get('error') === 'true';
  
  // Extrair valores para uso no Schema.org
  const resultadoPrincipal = searchParams.get('result') || '';
  
  return (
    <>
      <Header
        miniTitle="Resultado"
        title="Resultado do Cálculo"
        description="Confira o resultado do cálculo de horas realizado"
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Resultado do Cálculo"
          description="O resultado do cálculo de horas é:"
          notFoundTitle="Resultado Não Encontrado"
          notFoundDescription={hasError ? "Ocorreu um erro ao processar sua solicitação." : "Não foi possível encontrar um resultado."}
          notFoundMessage={hasError ? "Verifique se os horários informados são válidos e tente novamente." : "Verifique os dados e tente novamente."}
          infoTitle="Informações Importantes"
          infoMessage="O resultado está no formato 24 horas (HH:mm)."
          resultLabel="Horário Resultante"
          backPath="/calculadoras/horas"
          buttonText="Voltar para Calculadora"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "result", label: "Resultado" },
              { name: "operationComplete", label: "Operação Completa" }
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
            "name": "Calculadora de Horas - Resultado",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL"
            },
            "mainEntity": {
              "@type": "Thing",
              "name": "Resultado do Cálculo de Horas",
              "description": `Resultado do cálculo de horas: ${resultadoPrincipal}`
            }
          })
        }} />
      )}
    </>
  );
} 