import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resultado - Gerador de PIS/PASEP/NIT | TW Tools",
  description: "Números de PIS/PASEP/NIT gerados para testes e desenvolvimento. Verifique os números gerados e obtenha informações adicionais.",
};

const infoItems = [
    {
        title: "Sobre este Resultado",
        type: "info" as const,
        content: (<p>Os números gerados são válidos de acordo com o algoritmo oficial de PIS/PASEP/NIT e podem ser utilizados para testes e desenvolvimento.</p>)
    },
    {
        title: "Como Utilizar",
        type: "usage" as const,
        content: (<p>✓ Copie os números gerados para seus testes<br />✓ Utilize em ambientes de desenvolvimento<br />✓ Verifique a validade usando nosso validador<br />✓ Mantenha um registro dos números utilizados</p>)
    },
    {
        title: "Próximos Passos",
        type: "features" as const,
        content: (<p>✓ Verifique a validade dos números gerados<br />✓ Utilize em seus testes e desenvolvimento<br />✓ Mantenha um registro dos números utilizados<br />✓ Consulte a documentação oficial quando necessário</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Os números gerados são apenas para fins de teste e desenvolvimento. Não utilize para fins fraudulentos ou ilegais. Para uso oficial, consulte os órgãos competentes.</p>)
    }
]

export default function ResultadoPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const breadcrumbs = [
    {
      name: 'Geradores',
      href: '/geradores',
      current: false
    },
    {
      name: 'PIS/PASEP/NIT',
      href: '/geradores/pis',
      current: false
    },
    {
      name: 'Resultado',
      href: '/geradores/pis/resultado',
      current: true
    }
  ];

  // Verificar se há erro na requisição
  const hasError = searchParams.error === 'true';
  
  // Extrair e processar os números de forma segura
  let numeros: string[] = [];
  try {
    // Contar quantos números foram gerados
    let count = 1;
    while (searchParams[`numero${count}`]) {
      const numero = searchParams[`numero${count}`];
      if (typeof numero === 'string') {
        numeros.push(numero);
      }
      count++;
    }
  } catch (error) {
    console.error('Erro ao processar números:', error);
    numeros = [];
  }

  // Criar array de parâmetros para o ResultClient
  const params = numeros.map((numero, index) => ({
    name: `numero${index + 1}`,
    label: `Número ${index + 1}`
  }));

  return (
    <>
      <Header
        miniTitle="Resultado"
        title="Números PIS/PASEP/NIT Gerados"
        description="Verifique os números de PIS/PASEP/NIT gerados para seus testes"
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Números Gerados"
          description="Os números PIS/PASEP/NIT foram gerados com sucesso."
          notFoundTitle="Erro na Geração"
          notFoundDescription={hasError ? "Ocorreu um erro ao gerar os números." : "Não foi possível gerar os números."}
          notFoundMessage={hasError ? "Verifique os parâmetros informados e tente novamente." : "Tente gerar novamente."}
          infoTitle="Informações Importantes"
          infoMessage="Estes números são apenas para fins de teste e desenvolvimento."
          resultLabel="Números PIS/PASEP/NIT"
          backPath="/geradores/pis"
          buttonText="Gerar Novos Números"
          multipleParams={{ 
            enabled: true, 
            params: params
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
      
      {/* Schema.org structured data for SEO - apenas quando houver resultado */}
      {!hasError && numeros.length > 0 && (
        <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Gerador de PIS/PASEP/NIT - Resultado",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL"
            },
            "mainEntity": {
              "@type": "Thing",
              "name": "Geração de PIS/PASEP/NIT",
              "description": `Foram gerados ${numeros.length} números PIS/PASEP/NIT válidos para testes`
            }
          })
        }} />
      )}
    </>
  );
} 