import { Metadata } from "next";
import RuleOfThree from "@/components/layout/calculator/RuleOfThreeCalculator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Calculadora de Regra de Três | TW Tools",
    description: "Calcule proporções usando a regra de três simples. Ferramenta gratuita e online para resolver problemas de proporção.",
};

const infoItems = [
    {
        title: "Sobre a Calculadora",
        type: "info" as const,
        content: (<p>A Calculadora de Regra de Três é uma ferramenta que permite resolver problemas de proporção de forma rápida e precisa. A regra de três é um método matemático que permite encontrar um valor desconhecido em uma proporção, conhecendo outros três valores.</p>)
    },
    {
        title: "Como Usar",
        type: "usage" as const,
        content: (<p>✓ Digite o primeiro valor da proporção<br />✓ Digite o segundo valor da proporção<br />✓ Digite o terceiro valor da proporção<br />✓ Clique em "Calcular" para obter o resultado</p>)
    },
    {
        title: "Diferenciais",
        type: "features" as const,
        content: (<p>✓ Cálculo instantâneo<br />✓ Suporte a números decimais<br />✓ Resultado formatado com duas casas decimais<br />✓ Expressão matemática detalhada</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta calculadora é fornecida apenas para fins educacionais e de referência. Os resultados devem ser verificados em casos de uso crítico.</p>)
    }
]

export default function RegraDeTresPage() {
    const breadcrumbs = [
        {
            name: 'Calculadoras',
            href: '/calculadoras',
            current: false
        },
        {
            name: 'Regra de Três',
            href: '/calculadoras/regra-de-tres',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Calculadora"
                title="Calculadora de Regra de Três"
                description="Calcule proporções usando a regra de três simples. Insira três valores e descubra o quarto valor proporcional."
                breadcrumbs={breadcrumbs}
            />
            <RuleOfThree />
            <InfoSection items={infoItems} />
        </>
    )
} 