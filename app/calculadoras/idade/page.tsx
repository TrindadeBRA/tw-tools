import { Metadata } from "next";
import AgeCalculator from "@/components/layout/calculator/AgeCalculator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Calculadora de Idade | TW Tools",
    description: "Calcule sua idade exata em anos, meses e dias a partir da sua data de nascimento. Ferramenta gratuita e online.",
};

const infoItems = [
    {
        title: "Sobre a Calculadora de Idade",
        type: "info" as const,
        content: (<p>Nossa calculadora de idade é uma ferramenta precisa que permite calcular sua idade exata em anos, meses e dias. Basta inserir sua data de nascimento e obter instantaneamente sua idade completa.</p>)
    },
    {
        title: "Como Usar",
        type: "usage" as const,
        content: (<p>✓ Digite sua data de nascimento no formato AAAA-MM-DD<br />✓ Clique em "Calcular Idade"<br />✓ Veja sua idade em anos, meses e dias</p>)
    },
    {
        title: "Recursos da Calculadora",
        type: "features" as const,
        content: (<p>✓ Cálculo preciso em anos, meses e dias<br />✓ Validação de data de nascimento<br />✓ Resultado instantâneo<br />✓ Interface simples e intuitiva</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta calculadora é fornecida apenas para fins informativos. Os resultados são aproximados e podem variar dependendo do fuso horário e outros fatores.</p>)
    }
]

export default function AgeCalculatorPage() {
    const breadcrumbs = [
        {
            name: 'Calculadoras',
            href: '/calculadoras',
            current: false
        },
        {
            name: 'Calculadora de Idade',
            href: '/calculadoras/idade',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Calculadora"
                title="Calculadora de Idade"
                description="Calcule sua idade exata em anos, meses e dias a partir da sua data de nascimento."
                breadcrumbs={breadcrumbs}
            />
            <AgeCalculator />
            <InfoSection items={infoItems} />
        </>
    )
} 