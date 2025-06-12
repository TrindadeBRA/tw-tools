import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Resultado do IMC | Avaliação Nutricional Personalizada - TW Tools",
    description: "Visualize seu resultado do IMC e receba recomendações personalizadas baseadas nos padrões da OMS. Entenda o que seu IMC significa para sua saúde.",
    keywords: "resultado imc, avaliação nutricional, índice massa corporal, classificação imc, peso ideal, saúde peso",
    alternates: {
        canonical: "https://tools.thetrinityweb.com.br/calculadoras/imc/resultado",
    },
    openGraph: {
        title: "Resultado do IMC | Avaliação Nutricional",
        description: "Confira seu resultado do IMC e receba orientações personalizadas para sua saúde.",
        url: "https://tools.thetrinityweb.com.br/calculadoras/imc/resultado",
        siteName: "TW Tools",
        type: "website",
    },
};

const infoItems = [
    {
        title: "Interpretação do Resultado",
        type: "info" as const,
        content: (<p>Seu resultado é baseado nos critérios oficiais da Organização Mundial da Saúde (OMS) para o Índice de Massa Corporal. O IMC é um indicador internacional que relaciona peso e altura, fornecendo uma referência importante para avaliação do estado nutricional em adultos.</p>)
    },
    {
        title: "Recomendações Personalizadas",
        type: "usage" as const,
        content: (<p>
            ✓ Registre seu IMC para acompanhamento longitudinal<br />
            ✓ Compare com medições trimestrais anteriores<br />
            ✓ Agende consulta com nutricionista ou médico<br />
            ✓ Defina metas realistas de peso se necessário<br />
            ✓ Mantenha um diário alimentar detalhado
        </p>)
    },
    {
        title: "Orientações de Saúde",
        type: "features" as const,
        content: (<p>
            ✓ Adote uma dieta balanceada e nutritiva<br />
            ✓ Pratique exercícios físicos 150 min/semana<br />
            ✓ Realize check-up médico anual<br />
            ✓ Monitore outros indicadores de saúde<br />
            ✓ Mantenha boa hidratação diária<br />
            ✓ Priorize sono de qualidade
        </p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>O IMC é um indicador populacional que pode apresentar limitações individuais. Atletas, gestantes, idosos, crianças e adolescentes necessitam de métodos específicos de avaliação. Para uma análise completa do seu estado nutricional, busque orientação profissional qualificada. Os resultados não substituem avaliação médica ou nutricional presencial.</p>)
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
    const peso = searchParams.get('peso') || '';
    const altura = searchParams.get('altura') || '';
    const imc = searchParams.get('imc') || '';
    const categoria = searchParams.get('categoria') || '';
    
    return (
        <>
            <Header
                miniTitle="Resultado da Avaliação"
                title="Resultado da sua Avaliação de IMC"
                description="Confira seu Índice de Massa Corporal calculado com precisão e receba orientações personalizadas baseadas nos padrões internacionais da OMS."
                breadcrumbs={breadcrumbs}
            />
            <Suspense fallback={<LoadingResult />}>
                <ResultClient
                    title="Avaliação Nutricional - IMC"
                    description="Seu Índice de Massa Corporal (IMC) foi calculado com precisão seguindo os padrões da OMS."
                    notFoundTitle="Avaliação Indisponível"
                    notFoundDescription={hasError ? "Não foi possível processar seu IMC com os dados fornecidos." : "Dados insuficientes para calcular o IMC."}
                    notFoundMessage={hasError ? "Por favor, verifique se os valores de peso e altura estão corretos e dentro dos limites aceitáveis." : "Retorne e forneça seus dados novamente."}
                    infoTitle="Análise do Resultado"
                    infoMessage="O IMC é um importante indicador do estado nutricional, relacionando seu peso e altura. Considere-o como parte de uma avaliação mais ampla de saúde."
                    resultLabel="Seu IMC Calculado"
                    backPath="/calculadoras/imc"
                    buttonText="Realizar Nova Avaliação"
                    multipleParams={{ 
                        enabled: true, 
                        params: [
                            { name: "peso", label: "Peso Corporal" },
                            { name: "altura", label: "Altura" },
                            { name: "imc", label: "IMC" },
                            { name: "categoria", label: "Classificação Nutricional" }
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
                        "name": "Resultado da Calculadora de IMC",
                        "description": "Resultado da avaliação do Índice de Massa Corporal com recomendações personalizadas",
                        "url": "https://tools.thetrinityweb.com.br/calculadoras/imc/resultado",
                        "medicineSystem": "http://schema.org/WesternConventional",
                        "relevantSpecialty": "http://schema.org/Nutrition",
                        "mainEntity": {
                            "@type": "MedicalTest",
                            "name": "Avaliação do IMC",
                            "description": "Cálculo do Índice de Massa Corporal segundo padrões da OMS",
                            "usesDevice": {
                                "@type": "MedicalDevice",
                                "name": "Calculadora de IMC Online",
                                "description": "Ferramenta digital para cálculo preciso do IMC"
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
                            },
                            "signDetected": {
                                "@type": "MedicalSign",
                                "name": categoria,
                                "description": `Classificação do IMC: ${categoria}`
                            }
                        },
                        "study": {
                            "@type": "MedicalStudy",
                            "healthCondition": {
                                "@type": "MedicalCondition",
                                "name": "Estado Nutricional",
                                "description": "Avaliação do estado nutricional através do IMC"
                            },
                            "studySubject": {
                                "@type": "MedicalEntity",
                                "name": "Composição Corporal",
                                "description": "Relação entre peso e altura para avaliação nutricional"
                            }
                        }
                    })
                }} />
            )}
        </>
    );
}