import { Metadata } from "next";
import PricePerUnitCalculator from "@/components/layout/calculator/PricePerUnitCalculator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Comparador de Preço por ml/g | TW Tools",
    description: "Compare produtos diferentes e descubra qual tem o melhor custo-benefício baseado no preço por unidade (ml ou g).",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>O Comparador de Preço por ml/g é uma ferramenta que ajuda você a identificar qual produto oferece o melhor custo-benefício baseado no preço por unidade de medida (ml ou g).</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Compare produtos similares com diferentes tamanhos<br />✓ Identifique o melhor custo-benefício<br />✓ Compare produtos em diferentes unidades (ml ou g)<br />✓ Adicione quantos produtos quiser para comparação</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ Cálculo automático do preço por unidade<br />✓ Suporte para múltiplos produtos<br />✓ Comparação entre diferentes unidades (ml/g)<br />✓ Identificação do melhor e pior custo-benefício<br />✓ Cálculo de economia percentual</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta é fornecida apenas para fins informativos. Os resultados são baseados nos dados fornecidos e podem variar dependendo de fatores como qualidade do produto, marca, disponibilidade e outros aspectos não considerados no cálculo.</p>)
    }
]

export default function ComparadorPrecoPage() {
    const breadcrumbs = [
        {
            name: 'Calculadoras',
            href: '/calculadoras',
            current: false
        },
        {
            name: 'Comparador de Preço',
            href: '/calculadoras/comparador-preco',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Calculadora"
                title="Comparador de Preço por ml/g"
                description="Compare produtos diferentes e descubra qual tem o melhor custo-benefício baseado no preço por unidade (ml ou g)."
                breadcrumbs={breadcrumbs}
            />
            <PricePerUnitCalculator />
            <InfoSection items={infoItems} />
        </>
    )
} 