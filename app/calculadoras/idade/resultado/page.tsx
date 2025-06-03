import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Resultado | Calculadora de Idade - TW Tools",
    description: "Veja o resultado do cálculo da sua idade em anos, meses e dias.",
};

const infoItems = [
    {
        title: "Sobre o Resultado",
        type: "info" as const,
        content: (<p>O resultado mostra sua idade exata em anos, meses e dias, calculada a partir da data de nascimento informada.</p>)
    },
    {
        title: "Como Interpretar",
        type: "usage" as const,
        content: (<p>✓ Anos: Sua idade em anos completos<br />✓ Meses: Total de meses desde o nascimento<br />✓ Dias: Total de dias desde o nascimento</p>)
    },
    {
        title: "Informações Adicionais",
        type: "features" as const,
        content: (<p>✓ O cálculo considera o dia atual<br />✓ Os resultados são precisos até o dia<br />✓ Você pode copiar os valores clicando neles</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Os resultados são calculados com base na data atual e podem variar dependendo do fuso horário. Esta ferramenta é fornecida apenas para fins informativos.</p>)
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
            name: 'Calculadora de Idade',
            href: '/calculadoras/idade',
            current: false
        },
        {
            name: 'Resultado',
            href: '/calculadoras/idade/resultado',
            current: true
        }
    ];

    // Verificar se há erro na requisição - MÉTODO SEGURO PARA SSR
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const hasError = searchParams.get('error') === 'true';
    
    // Extrair valores para uso no Schema.org
    const ageInYears = searchParams.get('ageInYears') || '';
    
    return (
        <>
            <Header
                miniTitle="Resultado"
                title="Resultado do Cálculo de Idade"
                description="Veja sua idade calculada em anos, meses e dias."
                breadcrumbs={breadcrumbs}
            />
            <Suspense fallback={<LoadingResult />}>
                <ResultClient
                    title="Sua Idade"
                    description="Resultado do cálculo baseado na data de nascimento informada"
                    notFoundTitle="Resultado Não Encontrado"
                    notFoundDescription={hasError ? "Ocorreu um erro ao calcular sua idade." : "Não foi possível calcular a idade."}
                    notFoundMessage={hasError ? "Verifique se a data informada é válida e tente novamente." : "Verifique os dados e tente novamente."}
                    infoTitle="Informações do Resultado"
                    infoMessage="Sua idade foi calculada com precisão até o dia atual."
                    resultLabel="Idade Calculada"
                    backPath="/calculadoras/idade"
                    buttonText="Calcular Novamente"
                    multipleParams={{ 
                        enabled: true, 
                        params: [
                            { name: "birthDate", label: "Data de Nascimento" },
                            { name: "formattedAge", label: "Idade Completa" },
                            { name: "ageInYears", label: "Idade em Anos" },
                            { name: "ageInMonths", label: "Idade em Meses" },
                            { name: "ageInDays", label: "Idade em Dias" }
                        ]
                    }}
                />
            </Suspense>
            <InfoSection items={infoItems} />
            
            {/* Schema.org structured data for SEO - apenas quando houver resultado */}
            {!hasError && ageInYears && (
                <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Calculadora de Idade - Resultado",
                        "applicationCategory": "UtilityApplication",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "BRL"
                        },
                        "mainEntity": {
                            "@type": "Thing",
                            "name": "Cálculo de Idade",
                            "description": `Idade calculada: ${ageInYears} anos`
                        }
                    })
                }} />
            )}
        </>
    );
} 