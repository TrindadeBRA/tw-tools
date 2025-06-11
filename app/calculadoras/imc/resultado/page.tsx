import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resultado do IMC | Calculadora de IMC - TW Tools",
  description: "Veja o resultado do seu cálculo de IMC e entenda o que ele significa para sua saúde.",
};

const infoItems = [
    {
        title: "Sobre este Resultado",
        type: "info" as const,
        content: (<p>O resultado apresentado é baseado nos padrões estabelecidos pela Organização Mundial da Saúde (OMS) para o Índice de Massa Corporal (IMC).</p>)
    },
    {
        title: "Próximos Passos",
        type: "usage" as const,
        content: (<p>
            ✓ Anote seu resultado para acompanhamento<br />
            ✓ Compare com medições anteriores<br />
            ✓ Consulte um profissional de saúde<br />
            ✓ Estabeleça metas realistas se necessário
        </p>)
    },
    {
        title: "Recomendações",
        type: "features" as const,
        content: (<p>
            ✓ Mantenha uma alimentação equilibrada<br />
            ✓ Pratique atividades físicas regularmente<br />
            ✓ Faça acompanhamento médico periódico<br />
            ✓ Considere outros indicadores de saúde
        </p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>O IMC é apenas um indicador geral e pode não ser adequado para todos os indivíduos. Atletas, idosos, gestantes e crianças podem necessitar de outros métodos de avaliação. Consulte sempre um profissional de saúde.</p>)
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
      name: 'Calculadora de IMC',
      href: '/calculadoras/imc',
      current: false
    },
    {
      name: 'Resultado',
      href: '/calculadoras/imc/resultado',
      current: true
    }
  ];

  // Verificar se há erro na requisição
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const hasError = searchParams.get('error') === 'true';
  
  // Extrair valores para uso no Schema.org
  const imc = searchParams.get('imc') || '';
  const categoria = searchParams.get('categoria') || '';
  
  return (
    <>
      <Header
        miniTitle="Resultado do IMC"
        title="Seu Resultado do IMC"
        description="Confira o resultado do seu Índice de Massa Corporal e entenda o que ele significa para sua saúde."
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Resultado do IMC"
          description="Seu Índice de Massa Corporal (IMC) foi calculado com sucesso."
          notFoundTitle="Resultado Não Encontrado"
          notFoundDescription={hasError ? "Ocorreu um erro ao calcular seu IMC." : "Não foi possível encontrar um resultado."}
          notFoundMessage={hasError ? "Verifique se os dados informados são válidos e tente novamente." : "Verifique os dados e tente novamente."}
          infoTitle="Interpretação do Resultado"
          infoMessage="O IMC é uma medida que relaciona seu peso com sua altura. É importante lembrar que este é apenas um indicador geral de saúde."
          resultLabel="Seu IMC"
          backPath="/calculadoras/imc"
          buttonText="Calcular Novamente"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "peso", label: "Peso Informado" },
              { name: "altura", label: "Altura Informada" },
              { name: "imc", label: "IMC Calculado" },
              { name: "categoria", label: "Classificação" }
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
      
      {/* Schema.org structured data for SEO */}
      {!hasError && imc && categoria && (
        <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalCalculator",
            "name": "Calculadora de IMC - Resultado",
            "medicineSystem": "http://schema.org/WesternConventional",
            "relevantSpecialty": "http://schema.org/Nutrition",
            "mainEntity": {
              "@type": "MedicalTest",
              "name": "Cálculo do IMC",
              "usesDevice": {
                "@type": "MedicalDevice",
                "name": "Calculadora de IMC"
              },
              "value": {
                "@type": "MedicalValue",
                "value": imc,
                "unitText": "kg/m²"
              },
              "normalRange": {
                "@type": "MedicalValue",
                "value": "18.5-24.9",
                "unitText": "kg/m²"
              }
            }
          })
        }} />
      )}
    </>
  );
}