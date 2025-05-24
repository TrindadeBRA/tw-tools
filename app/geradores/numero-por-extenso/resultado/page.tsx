import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resultado da Conversão | Número por Extenso em Português | TW Tools",
  description: "Resultado da conversão de números para texto por extenso em português do Brasil. Visualize e copie valores escritos por extenso para documentos oficiais, cheques e contratos.",
  keywords: "número por extenso resultado, texto por extenso, valor em reais por extenso, converter número para texto, português por extenso, texto formal",
  alternates: {
    canonical: "https://tools.thetrinityweb.com.br/geradores/numero-por-extenso/resultado",
  },
  openGraph: {
    title: "Resultado da Conversão de Número por Extenso",
    description: "Visualize e copie o número convertido para texto por extenso em português. Pronto para usar em documentos oficiais.",
    url: "https://tools.thetrinityweb.com.br/geradores/numero-por-extenso/resultado",
    siteName: "TW Tools",
    type: "website",
  },
};

const infoItems = [
  {
      title: "Sobre este Resultado",
      type: "info" as const,
      content: (<p>O resultado apresenta o <strong>valor numérico convertido para texto por extenso em português do Brasil</strong>, conforme as opções selecionadas. Pronto para ser usado em <strong>documentos oficiais, contratos, cheques</strong> e outras aplicações que exigem valores escritos por extenso. Nossa conversão segue as normas ortográficas da língua portuguesa.</p>)
  },
  {
      title: "Como Utilizar o Texto Gerado",
      type: "usage" as const,
      content: (<p>✓ <strong>Copie o texto gerado</strong> para uso em seus documentos<br />✓ <strong>Verifique se a formatação</strong> está de acordo com o desejado<br />✓ <strong>Insira em contratos, documentos legais ou financeiros</strong><br />✓ <strong>Confira a grafia</strong> antes de finalizar documentos importantes<br />✓ <strong>Use em cheques bancários</strong> para valores em reais</p>)
  },
  {
      title: "Casos de Uso do Número por Extenso",
      type: "info" as const,
      content: (<p>• <strong>Contratos de aluguel e compra/venda</strong> - valores precisam estar por extenso<br />• <strong>Recibos e notas promissórias</strong> - para evitar fraudes<br />• <strong>Procurações e documentos legais</strong> - exigência de valores por extenso<br />• <strong>Propostas comerciais e orçamentos</strong> - clareza na apresentação de valores</p>)
  },
  {
      title: "Próximos Passos",
      type: "features" as const,
      content: (<p>✓ <strong>Copie o resultado</strong> para seu documento<br />✓ <strong>Volte para gerar outros valores</strong> se necessário<br />✓ <strong>Verifique a grafia correta</strong> para documentos oficiais<br />✓ <strong>Experimente diferentes formatos</strong> de letra (maiúsculas, minúsculas)<br />✓ <strong>Compartilhe nossa ferramenta</strong> com quem precisar de textos por extenso</p>)
  },
  {
      title: "Dicas para Uso Correto",
      type: "usage" as const,
      content: (<p>• Sempre <strong>confira se o valor numérico corresponde</strong> ao texto por extenso<br />• Em documentos formais, <strong>utilize primeira letra maiúscula</strong><br />• Para valores monetários, certifique-se que os <strong>centavos estão corretamente descritos</strong><br />• <strong>Evite abreviações</strong> em documentos oficiais</p>)
  },
  {
      title: "Aviso Legal",
      type: "legal" as const,
      content: (<p>Esta ferramenta busca oferecer resultados precisos seguindo as normas da língua portuguesa, mas recomendamos sempre verificar a grafia final em documentos importantes. A responsabilidade pelo uso do texto gerado é do usuário.</p>)
  }
]

export default function ResultadoPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  // Verificar se há erro na requisição
  const hasError = searchParams.error === 'true';
  
  // Extrair valores para uso no Schema.org
  const valorOriginal = searchParams.formattedValue || '';
  const valorPorExtenso = searchParams.resultado || '';
  
  return (
    <>
      <Header
        miniTitle="Resultado da Conversão"
        title="Número por Extenso em Português"
        description="Confira abaixo o número convertido para texto por extenso em português do Brasil. Copie facilmente para seus documentos oficiais."
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Número por Extenso"
          description="Valor convertido para texto por extenso conforme suas preferências. O texto está pronto para ser copiado e usado em seus documentos oficiais."
          notFoundTitle="Conversão Não Realizada"
          notFoundDescription={hasError ? "Ocorreu um erro ao processar sua solicitação." : "Não foi possível realizar a conversão do número para texto por extenso."}
          notFoundMessage={hasError ? "Verifique se o valor informado é válido e tente novamente com um formato numérico correto." : "Verifique se o valor informado é válido e tente novamente. Apenas números são aceitos para conversão."}
          infoTitle="Valor Convertido por Extenso"
          infoMessage="Você pode copiar o texto abaixo para usar em seus documentos oficiais, cheques ou contratos. O texto segue as normas ortográficas do português brasileiro."
          resultLabel="Resultado em Texto"
          backPath="/geradores/numero-por-extenso"
          buttonText="Converter Outro Número"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "formattedValue", label: "Valor Original" },
              { name: "resultado", label: "Por Extenso" },
              { name: "unit", label: "Tipo de Unidade" },
              { name: "letterCase", label: "Formato do Texto" }
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
      
      {/* Schema.org structured data for SEO */}
      {!hasError && valorOriginal && valorPorExtenso && (
        <Script id="schema-numero-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Conversor de Números por Extenso - Resultado",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL"
            },
            "mainEntity": {
              "@type": "Thing",
              "name": "Conversão de número para texto",
              "description": `Conversão do valor ${valorOriginal} para texto por extenso em português: ${valorPorExtenso}`
            }
          })
        }} />
      )}
    </>
  );
} 