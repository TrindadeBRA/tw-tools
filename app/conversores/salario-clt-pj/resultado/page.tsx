import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resultado | Conversor de Salário CLT/PJ - TW Tools",
  description: "Resultado da conversão entre salário CLT e PJ com todos os valores calculados, impostos e benefícios detalhados.",
};

const infoItems = [
    {
        title: "Sobre este Resultado",
        type: "info" as const,
        content: (<p>O resultado apresenta a conversão detalhada entre salário CLT e PJ, considerando todos os impostos, benefícios e custos envolvidos em cada modalidade de contratação.</p>)
    },
    {
        title: "Como Utilizar",
        type: "usage" as const,
        content: (<p>✓ Compare valores líquidos entre as modalidades<br />✓ Analise os custos totais para o empregador<br />✓ Considere benefícios não monetários do CLT<br />✓ Avalie a segurança jurídica de cada opção<br />✓ Use como base para negociações</p>)
    },
    {
        title: "Próximos Passos",
        type: "features" as const,
        content: (<p>✓ Consulte um contador para orientação fiscal<br />✓ Verifique benefícios específicos da empresa<br />✓ Considere custos adicionais não calculados<br />✓ Analise a estabilidade de cada modalidade<br />✓ Avalie impactos na aposentadoria</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Os valores são estimativas baseadas na legislação atual. Consulte sempre um profissional contábil ou jurídico para decisões definitivas, pois podem existir variações conforme benefícios, acordos coletivos e mudanças legislativas.</p>)
    }
]

export default function ResultadoPage() {
  // Definir breadcrumbs para navegação
  const breadcrumbs = [
    {
      name: 'Conversores',
      href: '/conversores',
      current: false
    },
    {
      name: 'Salário CLT/PJ',
      href: '/conversores/salario-clt-pj',
      current: false
    },
    {
      name: 'Resultado',
      href: '/conversores/salario-clt-pj/resultado',
      current: true
    }
  ];

  // Verificar se há erro na requisição - MÉTODO SEGURO PARA SSR
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const hasError = searchParams.get('error') === 'true';
  
  // Extrair valores para uso no Schema.org
  const valorOriginal = searchParams.get('valorOriginal') || '';
  const tipoConversao = searchParams.get('tipoConversao') || '';
  
  return (
    <>
      <Header
        miniTitle="Resultado"
        title="Resultado da Conversão de Salário"
        description="Resultado detalhado da conversão entre salário CLT e PJ com todos os valores, impostos e benefícios calculados."
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Conversão de Salário CLT/PJ"
          description="Resultado detalhado da conversão entre salário CLT e Pessoa Jurídica"
          notFoundTitle="Resultado Não Encontrado"
          notFoundDescription={hasError ? "Ocorreu um erro ao processar sua solicitação de conversão." : "Não foi possível encontrar um resultado da conversão."}
          notFoundMessage={hasError ? "Verifique se os dados informados são válidos e tente novamente." : "Verifique os dados e tente novamente."}
          infoTitle="Informações Importantes"
          infoMessage="Os valores apresentados são estimativas baseadas na legislação atual. Consulte sempre um contador para orientações específicas."
          resultLabel="Resultado da Conversão"
          backPath="/conversores/salario-clt-pj"
          buttonText="Nova Conversão"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "valorOriginal", label: "Valor Original" },
              { name: "tipoConversao", label: "Tipo de Conversão" },
              { name: "salarioLiquidoClt", label: "Salário Líquido CLT" },
              { name: "salarioBrutoClt", label: "Salário Bruto CLT" },
              { name: "valorLiquidoPj", label: "Valor Líquido PJ" },
              { name: "valorBrutoPj", label: "Valor Bruto PJ" },
              { name: "descontosClt", label: "Total de Descontos CLT" },
              { name: "impostosPj", label: "Total de Impostos PJ" },
              { name: "beneficiosClt", label: "Benefícios CLT (13º + Férias + FGTS)" },
              { name: "equivalenciaAnual", label: "Equivalência Anual" },
              { name: "diferenca", label: "Diferença entre Modalidades" }
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
      
      {/* Schema.org structured data for SEO - apenas quando houver resultado */}
      {!hasError && valorOriginal && (
        <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Conversor de Salário CLT/PJ - Resultado",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL"
            },
            "mainEntity": {
              "@type": "Thing",
              "name": `Conversão ${tipoConversao}`,
              "description": `Resultado da conversão de salário entre CLT e PJ para o valor de ${valorOriginal}`
            }
          })
        }} />
      )}
    </>
  );
}