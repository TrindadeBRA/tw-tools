import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resultado da Conversão de Temperatura | Celsius, Fahrenheit, Kelvin | TW Tools",
  description: "Resultado da conversão de temperatura entre Celsius, Fahrenheit e Kelvin. Ferramenta online gratuita para conversões precisas de temperatura.",
  keywords: "resultado conversão temperatura, celsius, fahrenheit, kelvin, conversor temperatura online",
  alternates: {
    canonical: "https://tools.thetrinityweb.com.br/conversores/temperatura/resultado",
  },
  robots: {
    index: false,
  },
};

const infoItems = [
  {
    title: "Sobre o Resultado",
    type: "info" as const,
    content: (<p>O resultado apresenta a conversão da temperatura para todas as unidades disponíveis: <strong>Celsius (°C)</strong>, <strong>Fahrenheit (°F)</strong> e <strong>Kelvin (K)</strong>. Os valores são calculados usando fórmulas matemáticas padrão para garantir precisão.</p>)
  },
  {
    title: "Como Utilizar o Resultado",
    type: "usage" as const,
    content: (<p>✓ <strong>Copie os valores</strong> clicando no botão ao lado de cada resultado<br />✓ <strong>Compare as diferentes escalas</strong> para entender as equivalências<br />✓ <strong>Utilize em trabalhos científicos</strong> ou documentos técnicos<br />✓ <strong>Compartilhe o link</strong> para mostrar a conversão a outras pessoas</p>)
  },
  {
    title: "Conversões Adicionais",
    type: "features" as const,
    content: (<p>✓ Para <strong>converter outros valores</strong>, volte à página anterior<br />✓ Para <strong>visualizar as fórmulas utilizadas</strong>, consulte a seção informativa da página principal<br />✓ Explore nossas outras <strong>ferramentas de conversão</strong> para diferentes unidades</p>)
  },
  {
    title: "Aviso Legal",
    type: "legal" as const,
    content: (<p>As conversões são realizadas com fórmulas matemáticas padrão. Para aplicações críticas ou científicas que exigem precisão absoluta, recomendamos verificar os resultados com fontes especializadas.</p>)
  }
]

export default function ResultadoTemperaturaPage() {
  // Usando searchParams do Next.js 13+
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  
  // Verificar se há erro na requisição
  const hasError = searchParams.get('error') === 'true';
  
  // Extrair valores para uso no Schema.org
  const valorOriginal = searchParams.get('valorOriginal') || '';
  
  return (
    <>
      <Header
        miniTitle="Resultado"
        title="Conversão de Temperatura"
        description="Resultado da conversão de temperatura entre Celsius, Fahrenheit e Kelvin."
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Resultado da Conversão"
          description="Veja abaixo o resultado da conversão de temperatura para todas as unidades."
          notFoundTitle="Conversão Não Encontrada"
          notFoundDescription={hasError ? "Não foi possível processar os dados informados." : "Não foi possível realizar a conversão de temperatura."}
          notFoundMessage={hasError ? "Verifique se os valores informados são válidos e tente novamente." : "Verifique os valores inseridos e tente novamente."}
          infoTitle="Informações de Conversão"
          infoMessage="As conversões são calculadas usando fórmulas matemáticas padrão. Os resultados são exibidos com até 4 casas decimais para maior precisão."
          resultLabel="Valores Convertidos"
          backPath="/conversores/temperatura"
          buttonText="Nova Conversão"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "valorOriginal", label: "Valor Original" },
              { name: "celsius", label: "Celsius (°C)" },
              { name: "fahrenheit", label: "Fahrenheit (°F)" },
              { name: "kelvin", label: "Kelvin (K)" },
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
      
      {/* Schema.org structured data for SEO */}
      {!hasError && valorOriginal && (
        <Script id="schema-temperatura-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Conversor de Temperatura - Resultado",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL"
            },
            "mainEntity": {
              "@type": "Thing",
              "name": "Conversão de temperatura",
              "description": `Conversão de temperatura entre Celsius, Fahrenheit e Kelvin`
            }
          })
        }} />
      )}
    </>
  );
} 