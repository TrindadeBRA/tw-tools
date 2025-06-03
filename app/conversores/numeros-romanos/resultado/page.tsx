import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Resultado | Conversor de Números Romanos - TW Tools",
    description: "Resultado da conversão de números romanos. Veja o valor convertido entre sistemas decimal e romano.",
};

const infoItems = [
    {
        title: "Sobre este Resultado",
        type: "info" as const,
        content: (<p>O resultado mostra a conversão entre os sistemas de numeração decimal e romano. Os números romanos são representados usando as letras I, V, X, L, C, D e M.</p>)
    },
    {
        title: "Como Utilizar",
        type: "usage" as const,
        content: (<p>✓ Copie o resultado usando o botão de cópia<br />✓ Verifique se a conversão está correta<br />✓ Use o botão "Nova Conversão" para converter outro número</p>)
    },
    {
        title: "Regras dos Números Romanos",
        type: "features" as const,
        content: (
            <div>
                <p>
                    ✓ Símbolos: I(1), V(5), X(10), L(50), C(100), D(500), M(1000)<br />
                    ✓ Maior → Menor: XVI = 16 | Menor antes subtrai: IV = 4<br />
                    ✓ Barra superior = x1000: V̄ = 5000, X̄ = 10000
                </p>
            </div>
        )
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta é fornecida apenas para fins educacionais e de referência. Os resultados devem ser verificados em casos de uso crítico.</p>)
    }
]

export default function ResultadoPage() {
    const breadcrumbs = [
        {
            name: 'Conversores',
            href: '/conversores',
            current: false
        },
        {
            name: 'Números Romanos',
            href: '/conversores/numeros-romanos',
            current: false
        },
        {
            name: 'Resultado',
            href: '/conversores/numeros-romanos/resultado',
            current: true
        }
    ];

    // Verificar se há erro na requisição - MÉTODO SEGURO PARA SSR
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const hasError = searchParams.get('error') === 'true';
    const errorMessage = searchParams.get('errorMessage');
    
    // Extrair valores para uso no Schema.org
    const resultado = searchParams.get('resultado') || '';
    
    return (
        <>
            <Header
                miniTitle="Resultado"
                title="Resultado da Conversão"
                description="Veja o resultado da conversão entre números romanos e decimais."
                breadcrumbs={breadcrumbs}
            />
            <Suspense fallback={<LoadingResult />}>
                <ResultClient
                    title="Resultado da Conversão"
                    description="O valor convertido é:"
                    notFoundTitle="Resultado Não Encontrado"
                    notFoundDescription={hasError ? (errorMessage ? decodeURIComponent(errorMessage) : "Ocorreu um erro ao processar sua solicitação.") : "Não foi possível encontrar um resultado."}
                    notFoundMessage={hasError ? "Verifique se o número informado é válido e tente novamente." : "Verifique os dados e tente novamente."}
                    infoTitle="Informações Importantes"
                    infoMessage="Os números romanos são representados usando as letras I, V, X, L, C, D e M."
                    resultLabel="Valor Convertido"
                    backPath="/conversores/numeros-romanos"
                    buttonText="Nova Conversão"
                    multipleParams={{ 
                        enabled: true, 
                        params: [
                            { name: "valorOriginal", label: "Valor Original" },
                            { name: "resultado", label: "Valor Convertido" }
                        ]
                    }}
                />
            </Suspense>
            <InfoSection items={infoItems} />
            
            {/* Schema.org structured data for SEO - apenas quando houver resultado */}
            {!hasError && resultado && (
                <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Conversor de Números Romanos - Resultado",
                        "applicationCategory": "UtilityApplication",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "BRL"
                        },
                        "mainEntity": {
                            "@type": "Thing",
                            "name": "Resultado da Conversão de Números Romanos",
                            "description": `Resultado da conversão: ${resultado}`
                        }
                    })
                }} />
            )}
        </>
    );
} 