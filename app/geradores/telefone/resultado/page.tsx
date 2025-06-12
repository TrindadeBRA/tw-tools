import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resultado | Gerador de Número de Telefone - TW Tools",
  description: "Número de telefone gerado com formatação internacional.",
};

const infoItems = [
    {
        title: "Sobre este Resultado",
        type: "info" as const,
        content: (<p>O número de telefone gerado segue o formato internacional padrão, incluindo o código do país e a formatação específica de cada região.</p>)
    },
    {
        title: "Como Utilizar",
        type: "usage" as const,
        content: (<p>✓ Copie o número completo<br />✓ Use apenas para testes<br />✓ Verifique a formatação<br />✓ Confirme o código do país</p>)
    },
    {
        title: "Próximos Passos",
        type: "features" as const,
        content: (<p>✓ Teste o número em seu sistema<br />✓ Verifique a validação<br />✓ Confirme a formatação<br />✓ Teste a integração</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Este número é fictício e gerado apenas para fins de teste. Não utilize para fins maliciosos ou fraudulentos.</p>)
    }
]

export default function ResultadoPage() {
  const breadcrumbs = [
    {
      name: 'Geradores',
      href: '/geradores',
      current: false
    },
    {
      name: 'Número de Telefone',
      href: '/geradores/telefone',
      current: false
    },
    {
      name: 'Resultado',
      href: '/geradores/telefone/resultado',
      current: true
    }
  ];

  // Verificar se há erro na requisição - MÉTODO SEGURO PARA SSR
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const hasError = searchParams.get('error') === 'true';
  
  // Extrair valores para uso no Schema.org
  const numero = searchParams.get('numero') || '';
  const pais = searchParams.get('pais') || '';
  
  return (
    <>
      <Header
        miniTitle="Resultado"
        title="Número de Telefone Gerado"
        description="Número de telefone gerado com formatação internacional."
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Número de Telefone Gerado"
          description="O número foi gerado com sucesso seguindo o formato internacional."
          notFoundTitle="Número Não Gerado"
          notFoundDescription={hasError ? "Ocorreu um erro ao gerar o número." : "Não foi possível gerar um número válido."}
          notFoundMessage={hasError ? "Verifique as configurações e tente novamente." : "Tente gerar um novo número."}
          infoTitle="Informações do Número"
          infoMessage="Este número segue o formato internacional padrão."
          resultLabel="Número de Telefone"
          backPath="/geradores/telefone"
          buttonText="Gerar Novo Número"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "numero", label: "Número Completo" },
              { name: "pais", label: "País" },
              { name: "codigo", label: "Código do País" }
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
      
      {/* Schema.org structured data for SEO - apenas quando houver resultado */}
      {!hasError && numero && (
        <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Gerador de Número de Telefone - Resultado",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL"
            },
            "mainEntity": {
              "@type": "Thing",
              "name": "Número de Telefone Gerado",
              "description": `Número de telefone gerado para ${pais}`
            }
          })
        }} />
      )}
    </>
  );
} 