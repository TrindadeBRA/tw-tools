import { Metadata } from "next";
import FuelCalculator from "@/components/layout/calculator/FuelCalculator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Calculadora de Combustível | TW Tools",
    description: "Compare os preços do álcool e da gasolina para descobrir qual vale mais a pena abastecer.",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>Esta calculadora compara os preços do álcool e da gasolina para determinar qual combustível é mais vantajoso financeiramente. A regra geral é que o álcool vale a pena quando custa até 70% do valor da gasolina, considerando a diferença de rendimento entre os combustíveis.</p>)
    },
    {
        title: "Como Usar",
        type: "usage" as const,
        content: (<p>✓ Digite o preço do álcool por litro<br />✓ Digite o preço da gasolina por litro<br />✓ Clique em "Calcular" para ver o resultado</p>)
    },
    {
        title: "Diferenciais",
        type: "features" as const,
        content: (<p>✓ Cálculo preciso baseado na proporção de 70%<br />✓ Considera a diferença de rendimento entre os combustíveis<br />✓ Resultado claro e objetivo</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta calculadora fornece uma estimativa baseada em médias gerais. O consumo real pode variar dependendo do modelo do veículo, condições de uso e outros fatores. Consulte o manual do seu veículo para informações específicas sobre o consumo de combustível.</p>)
    }
]

export default function CombustivelPage() {
    const breadcrumbs = [
        {
            name: 'Calculadoras',
            href: '/calculadoras',
            current: false
        },
        {
            name: 'Combustível',
            href: '/calculadoras/combustivel',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Calculadora"
                title="Calculadora de Combustível"
                description="Compare os preços do álcool e da gasolina para descobrir qual vale mais a pena abastecer."
                breadcrumbs={breadcrumbs}
            />
            <FuelCalculator />
            <InfoSection items={infoItems} />
        </>
    )
} 