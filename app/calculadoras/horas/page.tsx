import { Metadata } from "next";
import TimeCalculator from "@/components/layout/calculator/TimeCalculator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Calculadora de Horas | TW Tools",
    description: "Calcule somas e subtrações de horários facilmente com nossa calculadora de horas online.",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>Nossa calculadora de horas permite somar e subtrair horários de forma rápida e precisa. Ideal para cálculos de jornada de trabalho, horas extras e planejamento de atividades.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Cálculo de horas trabalhadas<br />✓ Planejamento de atividades<br />✓ Controle de horas extras<br />✓ Cálculos de jornada de trabalho</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ Formato 24 horas<br />✓ Suporte a soma e subtração<br />✓ Resultado formatado automaticamente<br />✓ Interface intuitiva</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta é fornecida apenas para fins informativos e não deve ser usada como base única para decisões importantes. Sempre consulte um profissional qualificado para cálculos críticos.</p>)
    }
]

export default function CalculadoraHorasPage() {
    const breadcrumbs = [
        {
            name: 'Calculadoras',
            href: '/calculadoras',
            current: false
        },
        {
            name: 'Calculadora de Horas',
            href: '/calculadoras/horas',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Calculadora"
                title="Calculadora de Horas"
                description="Calcule somas e subtrações de horários facilmente com nossa calculadora de horas online."
                breadcrumbs={breadcrumbs}
            />
            <TimeCalculator />
            <InfoSection items={infoItems} />
        </>
    )
} 