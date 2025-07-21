import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resultado da Rescisão CLT 2025 - Cálculo Detalhado | TW Tools",
  description: "Resultado detalhado do cálculo de rescisão CLT com valores atualizados de 2025. Veja todas as verbas rescisórias, descontos e valor líquido a receber.",
};

const infoItems = [
    {
        title: "Sobre este Resultado",
        type: "info" as const,
        content: (
            <p>
                Este resultado foi calculado com base na legislação trabalhista vigente e nos valores atualizados de 2025. 
                Inclui todas as verbas rescisórias aplicáveis ao seu tipo de rescisão: saldo de salário, aviso prévio, 13º salário, 
                férias, multa do FGTS e os respectivos descontos de INSS e IRPF.
            </p>
        )
    },
    {
        title: "Como Utilizar este Resultado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Confira se os dados informados estão corretos<br />
                ✓ Use este cálculo como base para negociações<br />
                ✓ Guarde o resultado para suas referências<br />
                ✓ Compare com os valores oferecidos pela empresa<br />
                ✓ Consulte um profissional para casos complexos
            </p>
        )
    },
    {
        title: "Próximos Passos",
        type: "features" as const,
        content: (
            <p>
                ✓ Solicite o Termo de Rescisão (TRCT) à empresa<br />
                ✓ Verifique se todos os valores estão corretos<br />
                ✓ Solicite as guias para saque do FGTS<br />
                ✓ Procure informações sobre seguro-desemprego<br />
                ✓ Guarde toda documentação da rescisão
            </p>
        )
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (
            <p>
                Este cálculo é uma estimativa baseada na legislação vigente. Valores finais podem variar devido a acordos coletivos, 
                convenções específicas da categoria ou particularidades do contrato de trabalho. Para cálculos oficiais, 
                consulte sempre um contador ou advogado trabalhista especializado.
            </p>
        )
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
      name: 'Rescisão CLT',
      href: '/calculadoras/rescisao-clt',
      current: false
    },
    {
      name: 'Resultado',
      href: '/calculadoras/rescisao-clt/resultado',
      current: true
    }
  ];

  // Verificar se há erro na requisição - MÉTODO SEGURO PARA SSR
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const hasError = searchParams.get('error') === 'true';
  
  // Extrair valores para uso no Schema.org
  const valorTotal = searchParams.get('valorTotal') || '';
  
  return (
    <>
      <Header
        miniTitle="Resultado"
        title="Resultado da Rescisão CLT"
        description="Resultado detalhado do seu cálculo de rescisão trabalhista com todas as verbas e descontos aplicáveis."
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Resultado da Rescisão CLT"
          description="Confira abaixo o cálculo detalhado da sua rescisão trabalhista com todos os valores atualizados para 2025."
          notFoundTitle="Resultado Não Encontrado"
          notFoundDescription={hasError ? "Ocorreu um erro ao processar o cálculo da rescisão." : "Não foi possível encontrar um resultado de cálculo."}
          notFoundMessage={hasError ? "Verifique se os dados informados são válidos e tente novamente." : "Verifique os dados e refaça o cálculo."}
          infoTitle="Informações Importantes"
          infoMessage="Este cálculo é uma estimativa baseada na legislação vigente. Para cálculos oficiais, consulte um profissional especializado."
          resultLabel="Cálculo de Rescisão CLT"
          backPath="/calculadoras/rescisao-clt"
          buttonText="Calcular Nova Rescisão"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "tipoRescisao", label: "Tipo de Rescisão" },
              { name: "salario", label: "Salário Bruto" },
              { name: "dataAdmissao", label: "Data de Admissão" },
              { name: "dataRescisao", label: "Data de Rescisão" },
              { name: "saldoSalario", label: "Saldo de Salário" },
              { name: "avisoPreVio", label: "Aviso Prévio" },
              { name: "decimoTerceiro", label: "13º Salário Proporcional" },
              { name: "feriasProporcionais", label: "Férias Proporcionais + 1/3" },
              { name: "feriasVencidas", label: "Férias Vencidas + 1/3" },
              { name: "multaFgts", label: "Multa do FGTS" },
              { name: "descontoInss", label: "Desconto INSS" },
              { name: "descontoIrpf", label: "Desconto IRPF" },
              { name: "totalVencimentos", label: "Total de Vencimentos" },
              { name: "totalDescontos", label: "Total de Descontos" },
              { name: "valorTotal", label: "Valor Líquido a Receber" },
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
      
      {/* Schema.org structured data for SEO - apenas quando houver resultado */}
      {!hasError && valorTotal && (
        <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Calculadora de Rescisão CLT - Resultado",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL"
            },
            "mainEntity": {
              "@type": "Thing",
              "name": "Cálculo de Rescisão Trabalhista CLT",
              "description": `Resultado do cálculo de rescisão trabalhista: ${valorTotal}`
            }
          })
        }} />
      )}
    </>
  );
}