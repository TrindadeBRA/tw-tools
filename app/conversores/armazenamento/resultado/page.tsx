import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Resultado | Conversor de Armazenamento Digital - TW Tools",
    description: "Resultado da conversão de unidades de armazenamento digital. Visualize e copie os valores convertidos entre bits, bytes, kilobytes, megabytes, gigabytes e terabytes.",
    keywords: "resultado conversor armazenamento, conversão bits bytes, resultado kilobytes megabytes, conversão gigabytes terabytes",
    alternates: {
        canonical: "https://tools.thetrinityweb.com.br/conversores/armazenamento/resultado",
    },
    openGraph: {
        title: "Resultado - Conversor de Armazenamento Digital",
        description: "Visualize o resultado da sua conversão de unidades de armazenamento digital.",
        url: "https://tools.thetrinityweb.com.br/conversores/armazenamento/resultado",
        siteName: "TW Tools",
        type: "website",
    },
};

const infoItems = [
    {
        title: "Sobre o Resultado",
        type: "info" as const,
        content: (<p>O resultado mostra a conversão do valor informado entre diferentes unidades de armazenamento digital. Você pode ver todas as conversões possíveis e copiar qualquer valor com um clique.</p>)
    },
    {
        title: "Como Utilizar o Resultado",
        type: "usage" as const,
        content: (<p>✓ <strong>Copie o valor</strong> desejado com um clique<br />✓ <strong>Compare diferentes</strong> unidades de armazenamento<br />✓ <strong>Use os valores</strong> em seus cálculos e projetos<br />✓ <strong>Compartilhe</strong> o resultado com outros profissionais</p>)
    },
    {
        title: "Precisão dos Resultados",
        type: "features" as const,
        content: (<p>✓ <strong>Cálculos precisos</strong> com até 6 casas decimais<br />✓ <strong>Conversões baseadas</strong> em padrões binários (base 2)<br />✓ <strong>Resultados verificados</strong> e confiáveis<br />✓ <strong>Formatação adequada</strong> para cada unidade</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Os resultados são calculados com base em padrões binários (base 2) para unidades de armazenamento, onde 1 KB = 1.024 bytes. Para aplicações críticas, recomendamos sempre verificar os resultados.</p>)
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
            name: 'Armazenamento Digital',
            href: '/conversores/armazenamento',
            current: false
        },
        {
            name: 'Resultado',
            href: '/conversores/armazenamento/resultado',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Resultado"
                title="Resultado da Conversão"
                description="Visualize o resultado da sua conversão de unidades de armazenamento digital. Compare diferentes unidades e copie os valores com um clique."
                breadcrumbs={breadcrumbs}
            />
            <Suspense fallback={<LoadingResult />}>
                <ResultClient
                    title="Resultado da Conversão"
                    description="Aqui está o resultado da sua conversão de unidades de armazenamento digital."
                    notFoundTitle="Resultado Não Encontrado"
                    notFoundDescription="Ocorreu um erro ao processar sua solicitação."
                    notFoundMessage="Verifique se os dados informados são válidos e tente novamente."
                    infoTitle="Informações Importantes"
                    infoMessage="Os resultados são calculados com base em padrões binários (base 2) para unidades de armazenamento."
                    resultLabel="Valor Original"
                    backPath="/conversores/armazenamento"
                    buttonText="Nova Conversão"
                    multipleParams={{
                        enabled: true,
                        params: [
                            { name: "valorOriginal", label: "Valor Original" },
                            { name: "bit", label: "Bits (b)" },
                            { name: "byte", label: "Bytes (B)" },
                            { name: "kilobyte", label: "Kilobytes (KB)" },
                            { name: "megabyte", label: "Megabytes (MB)" },
                            { name: "gigabyte", label: "Gigabytes (GB)" },
                            { name: "terabyte", label: "Terabytes (TB)" }
                        ]
                    }}
                />
            </Suspense>
            <InfoSection items={infoItems} />
            
            {/* Schema.org structured data for SEO */}
            <Script id="schema-resultado-armazenamento" type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Resultado - Conversor de Armazenamento Digital",
                    "description": "Visualize o resultado da sua conversão de unidades de armazenamento digital.",
                    "url": "https://tools.thetrinityweb.com.br/conversores/armazenamento/resultado",
                    "applicationCategory": "Ferramenta de Conversão",
                    "operatingSystem": "Web",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "BRL"
                    }
                })
            }} />
        </>
    );
} 