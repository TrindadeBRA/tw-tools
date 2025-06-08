import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Resultado | Calculadora de Combustível - TW Tools",
    description: "Resultado da comparação entre álcool e gasolina.",
};

const infoItems = [
    {
        title: "Sobre o Resultado",
        type: "info" as const,
        content: (<p>O resultado indica qual combustível é mais vantajoso financeiramente, baseado na proporção de 70% entre os preços. Esta proporção considera a diferença de rendimento entre o álcool e a gasolina.</p>)
    },
    {
        title: "Como Interpretar",
        type: "usage" as const,
        content: (<p>✓ Se o resultado for "álcool", significa que o preço está compensando o menor rendimento<br />✓ Se o resultado for "gasolina", significa que o maior rendimento compensa o preço mais alto</p>)
    },
    {
        title: "Considerações",
        type: "features" as const,
        content: (<p>✓ O resultado é uma estimativa baseada em médias gerais<br />✓ O consumo real pode variar dependendo do veículo<br />✓ Considere outros fatores como disponibilidade e conveniência</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta calculadora fornece uma estimativa baseada em médias gerais. O consumo real pode variar dependendo do modelo do veículo, condições de uso e outros fatores. Consulte o manual do seu veículo para informações específicas sobre o consumo de combustível.</p>)
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
            name: 'Combustível',
            href: '/calculadoras/combustivel',
            current: false
        },
        {
            name: 'Resultado',
            href: '/calculadoras/combustivel/resultado',
            current: true
        }
    ];

    // Verificar se há erro na requisição - MÉTODO SEGURO PARA SSR
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const hasError = searchParams.get('error') === 'true';
    
    // Extrair valores para uso no Schema.org
    const betterFuel = searchParams.get('betterFuel') || '';
    
    return (
        <>
            <Header
                miniTitle="Resultado"
                title="Resultado da Comparação"
                description="Resultado da comparação entre álcool e gasolina."
                breadcrumbs={breadcrumbs}
            />
            <Suspense fallback={<LoadingResult />}>
                <ResultClient
                    title="Resultado da Comparação"
                    description="O resultado da comparação entre álcool e gasolina está abaixo:"
                    notFoundTitle="Resultado Não Encontrado"
                    notFoundDescription={hasError ? "Ocorreu um erro ao processar sua solicitação." : "Não foi possível encontrar um resultado."}
                    notFoundMessage={hasError ? "Verifique se os dados informados são válidos e tente novamente." : "Verifique os dados e tente novamente."}
                    infoTitle="Informações Importantes"
                    infoMessage="O resultado é baseado na proporção de 70% entre os preços, considerando a diferença de rendimento entre os combustíveis."
                    resultLabel="Combustível Recomendado"
                    backPath="/calculadoras/combustivel"
                    buttonText="Fazer Nova Comparação"
                    multipleParams={{ 
                        enabled: true, 
                        params: [
                            { name: "betterFuel", label: "Combustível Recomendado" },
                            { name: "reason", label: "Motivo" }
                        ]
                    }}
                />
            </Suspense>
            <InfoSection items={infoItems} />
            
            {/* Schema.org structured data for SEO - apenas quando houver resultado */}
            {!hasError && betterFuel && (
                <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Calculadora de Combustível - Resultado",
                        "applicationCategory": "UtilityApplication",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "BRL"
                        },
                        "mainEntity": {
                            "@type": "Thing",
                            "name": "Comparação de Combustíveis",
                            "description": `Resultado da comparação entre álcool e gasolina: ${betterFuel}`
                        }
                    })
                }} />
            )}
        </>
    );
} 