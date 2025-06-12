import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resultado da Validação PIS/PASEP/NIT | TW Tools",
  description: "Resultado da validação do número PIS/PASEP/NIT. Verifique se o número é válido e obtenha informações adicionais.",
};

const infoItems = [
    {
        title: "Sobre este Resultado",
        type: "info" as const,
        content: (<p>O resultado mostra se o número PIS/PASEP/NIT informado é válido de acordo com o algoritmo oficial de validação.</p>)
    },
    {
        title: "Como Interpretar",
        type: "usage" as const,
        content: (<p>✓ Número Válido: O número está formatado corretamente e passa na validação do dígito verificador<br />✓ Número Inválido: O número não passa na validação do dígito verificador ou está em formato incorreto</p>)
    },
    {
        title: "Próximos Passos",
        type: "features" as const,
        content: (<p>✓ Verifique se o número está correto<br />✓ Em caso de invalidez, confira a digitação<br />✓ Para validação oficial, consulte os órgãos competentes</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta validação é apenas para fins de verificação e não garante a autenticidade oficial do documento. Para validação oficial, consulte os órgãos competentes.</p>)
    }
]

export default function ResultadoPage() {
  const breadcrumbs = [
    {
      name: 'Validadores',
      href: '/validadores',
      current: false
    },
    {
      name: 'PIS/PASEP/NIT',
      href: '/validadores/pis',
      current: false
    },
    {
      name: 'Resultado',
      href: '/validadores/pis/resultado',
      current: true
    }
  ];

  // Verificar se há erro na requisição - MÉTODO SEGURO PARA SSR
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const hasError = searchParams.get('error') === 'true';
  
  // Extrair valores para uso no Schema.org
  const numero = searchParams.get('numero') || '';
  const valido = searchParams.get('valido') === 'true';
  
  return (
    <>
      <Header
        miniTitle="Resultado"
        title="Resultado da Validação PIS/PASEP/NIT"
        description="Verifique o resultado da validação do seu número PIS/PASEP/NIT"
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Resultado da Validação"
          description="O número PIS/PASEP/NIT foi validado com sucesso."
          notFoundTitle="Erro na Validação"
          notFoundDescription={hasError ? "Ocorreu um erro ao processar sua solicitação." : "Não foi possível validar o número."}
          notFoundMessage={hasError ? "Verifique se o número informado está correto e tente novamente." : "Verifique o número e tente novamente."}
          infoTitle="Informações Importantes"
          infoMessage="Este resultado é apenas para fins de verificação e não garante a autenticidade oficial do documento."
          resultLabel="Número PIS/PASEP/NIT"
          backPath="/validadores/pis"
          buttonText="Validar Outro Número"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "numero", label: "Número PIS/PASEP/NIT" },
              { name: "valido", label: "Status da Validação" }
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
            "name": "Validador de PIS/PASEP/NIT - Resultado",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL"
            },
            "mainEntity": {
              "@type": "Thing",
              "name": "Validação de PIS/PASEP/NIT",
              "description": `Resultado da validação do número PIS/PASEP/NIT: ${numero} - ${valido ? 'Válido' : 'Inválido'}`
            }
          })
        }} />
      )}
    </>
  );
} 