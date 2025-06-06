import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Resultado | Calculadora de Porcentagem - TW Tools",
    description: "Resultado do cálculo de porcentagem realizado pela calculadora TW Tools.",
};

const infoItems = [
    {
        title: "Sobre este Resultado",
        type: "info" as const,
        content: (<p>O resultado apresentado é o valor calculado com base nos dados fornecidos. Para valores monetários, o resultado é apresentado em reais (R$). Para cálculos de porcentagem, o resultado é apresentado com o símbolo %.</p>)
    },
    {
        title: "Como Utilizar",
        type: "usage" as const,
        content: (<p>✓ Verifique se o resultado corresponde ao esperado<br />✓ Copie o resultado usando o botão de cópia<br />✓ Realize novos cálculos retornando à página anterior</p>)
    },
    {
        title: "Próximos Passos",
        type: "features" as const,
        content: (<p>✓ Faça novos cálculos com outros valores<br />✓ Experimente diferentes tipos de cálculos percentuais<br />✓ Verifique os resultados em diferentes contextos</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Os resultados são aproximados e podem variar dependendo do contexto específico de uso. Esta ferramenta é fornecida apenas para fins educacionais e informativos.</p>)
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
            name: 'Porcentagem',
            href: '/calculadoras/porcentagem',
            current: false
        },
        {
            name: 'Resultado',
            href: '/calculadoras/porcentagem/resultado',
            current: true
        }
    ];

    // Verificar se há erro na requisição - MÉTODO SEGURO PARA SSR
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const hasError = searchParams.get('error') === 'true';
    
    // Extrair valores para uso no Schema.org
    const calculationType = searchParams.get('calculationType') || '';
    const result = searchParams.get('result') || '';
    
    return (
        <>
            <Header
                miniTitle="Resultado"
                title="Resultado do Cálculo"
                description="Resultado do cálculo de porcentagem realizado."
                breadcrumbs={breadcrumbs}
            />
            <Suspense fallback={<LoadingResult />}>
                <ResultClient
                    title="Resultado do Cálculo"
                    description="O resultado do seu cálculo de porcentagem está abaixo:"
                    notFoundTitle="Resultado Não Encontrado"
                    notFoundDescription={hasError ? "Ocorreu um erro ao processar sua solicitação." : "Não foi possível encontrar um resultado."}
                    notFoundMessage={hasError ? "Verifique se os dados informados são válidos e tente novamente." : "Verifique os dados e tente novamente."}
                    infoTitle="Informações Importantes"
                    infoMessage="O resultado é aproximado e pode variar dependendo do contexto específico de uso."
                    resultLabel="Resultado"
                    backPath="/calculadoras/porcentagem"
                    buttonText="Fazer Novo Cálculo"
                    multipleParams={{ 
                        enabled: true, 
                        params: [
                            { name: "calculationType", label: "Tipo de Cálculo" },
                            { name: "originalValue", label: "Valores Informados" },
                            { name: "result", label: "Resultado" }
                        ]
                    }}
                />
            </Suspense>
            <InfoSection items={infoItems} />
            
            {/* Schema.org structured data for SEO - apenas quando houver resultado */}
            {!hasError && result && (
                <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Calculadora de Porcentagem - Resultado",
                        "applicationCategory": "UtilityApplication",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "BRL"
                        },
                        "mainEntity": {
                            "@type": "Thing",
                            "name": calculationType,
                            "description": `Resultado do cálculo: ${result}`
                        }
                    })
                }} />
            )}
        </>
    );
} 