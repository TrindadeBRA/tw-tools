import { Metadata } from "next";
import BmiCalculator from "@/components/layout/calculator/BmiCalculator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Calculadora de IMC Online | Índice de Massa Corporal Grátis - TW Tools",
    description: "Calcule seu IMC (Índice de Massa Corporal) gratuitamente. Ferramenta precisa baseada nos padrões da OMS para avaliar seu peso ideal e estado nutricional.",
    keywords: "calculadora imc, índice massa corporal, calcular peso ideal, imc online, imc grátis, calculadora peso ideal",
    alternates: {
        canonical: "https://tools.thetrinityweb.com.br/calculadoras/imc",
    },
    openGraph: {
        title: "Calculadora de IMC Online | Avalie seu Peso Ideal",
        description: "Calcule seu Índice de Massa Corporal (IMC) com nossa ferramenta gratuita e precisa. Baseada nos padrões da OMS.",
        url: "https://tools.thetrinityweb.com.br/calculadoras/imc",
        siteName: "TW Tools",
        type: "website",
    },
};

const infoItems = [
    {
        title: "Sobre a Calculadora de IMC",
        type: "info" as const,
        content: (<p>Nossa Calculadora de IMC (Índice de Massa Corporal) utiliza a fórmula validada pela Organização Mundial da Saúde para avaliar a relação entre peso e altura. O cálculo preciso divide o peso (em quilogramas) pelo quadrado da altura (em metros), fornecendo um indicador confiável do seu estado nutricional e composição corporal.</p>)
    },
    {
        title: "Interpretação do IMC",
        type: "usage" as const,
        content: (<p>
            ✓ Abaixo de 18,5: Baixo peso - Procure um nutricionista<br />
            ✓ 18,5 a 24,9: Peso normal - Parabéns, mantenha os bons hábitos<br />
            ✓ 25,0 a 29,9: Sobrepeso - Atenção aos hábitos alimentares<br />
            ✓ 30,0 a 34,9: Obesidade Grau I - Busque orientação profissional<br />
            ✓ 35,0 a 39,9: Obesidade Grau II - Acompanhamento médico necessário<br />
            ✓ Acima de 40,0: Obesidade Grau III - Tratamento especializado urgente
        </p>)
    },
    {
        title: "Recursos Exclusivos",
        type: "features" as const,
        content: (<p>
            ✓ Cálculo instantâneo com precisão de duas casas decimais<br />
            ✓ Classificação automática segundo padrões da OMS<br />
            ✓ Recomendações personalizadas por faixa<br />
            ✓ Interface responsiva e acessível<br />
            ✓ Resultados detalhados e explicativos<br />
            ✓ Compatível com unidades internacionais
        </p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta calculadora de IMC é uma ferramenta informativa baseada nos padrões da Organização Mundial da Saúde (OMS). Os resultados são estimativas e não substituem a avaliação profissional. Para uma análise completa do seu estado nutricional e saúde, consulte médicos, nutricionistas ou profissionais de saúde qualificados.</p>)
    }
]

export default function BmiPage() {
    const breadcrumbs = [
        {
            name: 'Calculadoras',
            href: '/calculadoras',
            current: false
        },
        {
            name: 'Calculadora de IMC',
            href: '/calculadoras/imc',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Calculadora de IMC Online"
                title="Calculadora de IMC Profissional"
                description="Calcule seu Índice de Massa Corporal (IMC) com precisão usando nossa ferramenta gratuita baseada nos padrões da OMS. Obtenha resultados instantâneos e recomendações personalizadas para sua saúde."
                breadcrumbs={breadcrumbs}
            />
            <BmiCalculator />
            <InfoSection items={infoItems} />

            {/* Schema.org structured data for SEO */}
            <Script id="schema-imc" type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "MedicalCalculator",
                    "name": "Calculadora de IMC Online",
                    "description": "Ferramenta gratuita para calcular o Índice de Massa Corporal (IMC) com base nos padrões da OMS",
                    "url": "https://tools.thetrinityweb.com.br/calculadoras/imc",
                    "medicineSystem": "http://schema.org/WesternConventional",
                    "relevantSpecialty": "http://schema.org/Nutrition",
                    "healthCondition": {
                        "@type": "MedicalCondition",
                        "name": "Avaliação do Estado Nutricional",
                        "description": "Cálculo do IMC para avaliação do peso em relação à altura"
                    },
                    "study": {
                        "@type": "MedicalStudy",
                        "studySubject": {
                            "@type": "MedicalEntity",
                            "name": "Índice de Massa Corporal",
                            "description": "Medida que relaciona peso e altura para avaliar o estado nutricional"
                        }
                    },
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "BRL"
                    }
                })
            }} />
        </>
    )
}