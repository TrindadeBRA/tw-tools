import { Metadata } from "next";
import PercentageCalculator from "@/components/layout/calculator/PercentageCalculator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Calculadora de Porcentagem | TW Tools",
    description: "Calcule porcentagens de diferentes formas: valor percentual, porcentagem de um valor, aumento ou diminuição percentual.",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>Esta calculadora permite realizar diferentes tipos de cálculos envolvendo porcentagens, incluindo cálculo de valor percentual, determinação de porcentagem entre valores, e cálculo de aumento ou diminuição percentual.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Calcular quanto é X% de um valor<br />✓ Descobrir qual a porcentagem que um valor representa de outro<br />✓ Calcular o aumento percentual entre dois valores<br />✓ Calcular a diminuição percentual entre dois valores</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ Interface intuitiva e fácil de usar<br />✓ Suporte a diferentes tipos de cálculos percentuais<br />✓ Formatação automática de valores monetários<br />✓ Resultados precisos com duas casas decimais</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta é fornecida apenas para fins educacionais e informativos. Os resultados são aproximados e podem variar dependendo do contexto específico de uso.</p>)
    }
]

export default function PorcentagemPage() {
    const breadcrumbs = [
        {
            name: 'Calculadoras',
            href: '/calculadoras',
            current: false
        },
        {
            name: 'Porcentagem',
            href: '/calculadoras/porcentagem',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Calculadora"
                title="Calculadora de Porcentagem"
                description="Calcule porcentagens de diferentes formas: valor percentual, porcentagem de um valor, aumento ou diminuição percentual."
                breadcrumbs={breadcrumbs}
            />
            <PercentageCalculator />
            <InfoSection items={infoItems} />
        </>
    )
} 