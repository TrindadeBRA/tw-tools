import { Metadata } from "next";
import RomanNumeralConverter from "@/components/layout/converter/RomanNumeralConverter";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Conversor de Números Romanos | TW Tools",
    description: "Converta facilmente números entre algarismos romanos e decimais. Suporte para números de 1 a 3999.",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>O Conversor de Números Romanos é uma ferramenta que permite converter números entre o sistema decimal e o sistema de numeração romana. Ideal para estudantes, professores e profissionais que precisam trabalhar com números romanos.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Converta números decimais para romanos (1-3999)<br />✓ Converta números romanos para decimais<br />✓ Use para trabalhos acadêmicos e documentos<br />✓ Ideal para referências históricas</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ Conversão bidirecional (decimal ↔ romano)<br />✓ Validação automática de números romanos<br />✓ Suporte para números de 1 a 3999<br />✓ Interface intuitiva e fácil de usar</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta é fornecida apenas para fins educacionais e de referência. Os resultados devem ser verificados em casos de uso crítico.</p>)
    }
]

export default function RomanNumeralPage() {
    const breadcrumbs = [
        {
            name: 'Conversores',
            href: '/conversores',
            current: false
        },
        {
            name: 'Números Romanos',
            href: '/conversores/numeros-romanos',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Conversor"
                title="Conversor de Números Romanos"
                description="Converta facilmente números entre algarismos romanos e decimais. Suporte para números de 1 a 3999."
                breadcrumbs={breadcrumbs}
            />
            <RomanNumeralConverter />
            <InfoSection items={infoItems} />
        </>
    )
} 