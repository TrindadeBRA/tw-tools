import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Resultado - Gerador de Placas | TW Tools",
    description: "Veja a placa de veículo gerada no padrão Mercosul ou padrão antigo.",
};

const infoItems = [
    {
        title: "Sobre o Resultado",
        type: "info" as const,
        content: (<p>A placa gerada segue o formato selecionado e inclui o estado brasileiro escolhido. Lembre-se que esta é uma placa aleatória gerada apenas para fins educacionais.</p>)
    },
    {
        title: "Como Usar",
        type: "usage" as const,
        content: (<p>✓ Copie a placa gerada<br />✓ Use apenas para fins educacionais<br />✓ Não use para fins ilegais<br />✓ Não tente clonar placas reais</p>)
    },
    {
        title: "Informações Adicionais",
        type: "features" as const,
        content: (<p>✓ A placa é gerada aleatoriamente<br />✓ O formato segue o padrão oficial<br />✓ O estado é adicionado ao final<br />✓ Pode ser usada em testes e desenvolvimento</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Este gerador é apenas para fins educacionais e de teste. As placas geradas são aleatórias e não representam placas reais. Não use para fins ilegais ou para tentar clonar placas de veículos.</p>)
    }
]

export default function ResultadoPage() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'Gerador de Placas',
            href: '/geradores/placa',
            current: false
        },
        {
            name: 'Resultado',
            href: '/geradores/placa/resultado',
            current: true
        }
    ];

    // Verificar se há erro na requisição - MÉTODO SEGURO PARA SSR
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const hasError = searchParams.get('error') === 'true';
    
    // Extrair valores para uso no Schema.org
    const placa = searchParams.get('placa') || '';
    const estado = searchParams.get('estado') || '';
    const formato = searchParams.get('formato') || '';
    
    return (
        <>
            <Header
                miniTitle="Resultado"
                title="Placa Gerada"
                description="Veja a placa de veículo gerada no formato selecionado"
                breadcrumbs={breadcrumbs}
            />
            <Suspense fallback={<LoadingResult />}>
                <ResultClient
                    title="Sua Placa Gerada"
                    description="Aqui está a placa gerada no formato solicitado"
                    notFoundTitle="Placa Não Gerada"
                    notFoundDescription={hasError ? "Ocorreu um erro ao gerar a placa." : "Não foi possível gerar uma placa."}
                    notFoundMessage={hasError ? "Tente novamente mais tarde." : "Verifique os dados e tente novamente."}
                    infoTitle="Informações Importantes"
                    infoMessage="Esta placa é gerada aleatoriamente e deve ser usada apenas para fins educacionais."
                    resultLabel="Placa"
                    backPath="/geradores/placa"
                    buttonText="Gerar Nova Placa"
                    multipleParams={{ 
                        enabled: true, 
                        params: [
                            { name: "placa", label: "Placa" },
                            { name: "estado", label: "Estado" },
                            { name: "formato", label: "Formato" }
                        ]
                    }}
                />
            </Suspense>
            <InfoSection items={infoItems} />
            
            {/* Schema.org structured data for SEO - apenas quando houver resultado */}
            {!hasError && placa && (
                <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Gerador de Placas - Resultado",
                        "applicationCategory": "UtilityApplication",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "BRL"
                        },
                        "mainEntity": {
                            "@type": "Thing",
                            "name": "Placa Gerada",
                            "description": `Placa ${placa}-${estado} no formato ${formato}`
                        }
                    })
                }} />
            )}
        </>
    );
} 