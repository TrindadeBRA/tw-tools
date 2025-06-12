import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Resultado - Comparador de Preço por ml/g | TW Tools",
    description: "Resultado da comparação de preços por unidade (ml/g) entre diferentes produtos.",
};

const infoItems = [
    {
        title: "Sobre este Resultado",
        type: "info" as const,
        content: (<p>O resultado mostra a comparação detalhada entre os produtos, incluindo o preço por unidade (ml/g) de cada um, identificando qual oferece o melhor custo-benefício.</p>)
    },
    {
        title: "Como Interpretar",
        type: "usage" as const,
        content: (<p>✓ O produto com menor preço por unidade oferece o melhor custo-benefício<br />✓ A porcentagem de economia mostra quanto você pode economizar escolhendo o melhor produto<br />✓ Compare os resultados considerando também a qualidade e suas necessidades específicas</p>)
    },
    {
        title: "Dicas de Uso",
        type: "features" as const,
        content: (<p>✓ Use esta ferramenta para comparar produtos similares<br />✓ Considere a qualidade e durabilidade além do preço<br />✓ Compare produtos da mesma categoria para resultados mais precisos<br />✓ Verifique se as unidades (ml/g) são equivalentes para sua necessidade</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Os resultados são baseados apenas nos dados fornecidos e não consideram outros fatores como qualidade, durabilidade, marca ou disponibilidade. Use esta informação como um guia, mas considere outros aspectos na sua decisão de compra.</p>)
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
            name: 'Comparador de Preço',
            href: '/calculadoras/comparador-preco',
            current: false
        },
        {
            name: 'Resultado',
            href: '/calculadoras/comparador-preco/resultado',
            current: true
        }
    ];

    // Verificar se há erro na requisição - MÉTODO SEGURO PARA SSR
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const hasError = searchParams.get('error') === 'true';
    
    // Extrair valores para uso no Schema.org
    const results = searchParams.get('results') || '';

    return (
        <>
            <Header
                miniTitle="Resultado"
                title="Comparação de Preços por Unidade"
                description="Resultado da comparação de preços por unidade (ml/g) entre os produtos informados."
                breadcrumbs={breadcrumbs}
            />
            <Suspense fallback={<LoadingResult />}>
                <ResultClient
                    title="Resultado da Comparação"
                    description="Aqui está a análise detalhada dos preços por unidade:"
                    notFoundTitle="Resultado Não Encontrado"
                    notFoundDescription={hasError ? "Ocorreu um erro ao processar sua solicitação." : "Não foi possível encontrar um resultado."}
                    notFoundMessage={hasError ? "Verifique se os dados informados são válidos e tente novamente." : "Verifique os dados e tente novamente."}
                    infoTitle="Informações Importantes"
                    infoMessage="Os resultados são baseados apenas nos dados fornecidos. Considere outros fatores como qualidade e durabilidade na sua decisão de compra."
                    resultLabel="Comparação de Preços"
                    backPath="/calculadoras/comparador-preco"
                    buttonText="Nova Comparação"
                    multipleParams={{
                        enabled: true,
                        params: [
                            { 
                                name: "results", 
                                label: "Resultados Detalhados"
                            },
                            { 
                                name: "bestValue", 
                                label: "Melhor Custo-Benefício"
                            },
                            { 
                                name: "worstValue", 
                                label: "Pior Custo-Benefício"
                            },
                            { 
                                name: "savings", 
                                label: "Economia Percentual"
                            }
                        ]
                    }}
                />
            </Suspense>
            <InfoSection items={infoItems} />

            {/* Schema.org structured data for SEO - apenas quando houver resultado */}
            {!hasError && results && (
                <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Comparador de Preço por ml/g - Resultado",
                        "applicationCategory": "UtilityApplication",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "BRL"
                        },
                        "mainEntity": {
                            "@type": "Thing",
                            "name": "Comparação de Preços por Unidade",
                            "description": "Resultado da comparação de preços por unidade (ml/g) entre diferentes produtos"
                        }
                    })
                }} />
            )}
        </>
    );
} 