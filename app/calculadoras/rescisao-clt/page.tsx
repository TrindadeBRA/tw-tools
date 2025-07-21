import { Metadata } from "next";
import CltRescissionCalculator from "../../../src/components/layout/calculator/CltRescissionCalculator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Calculadora de Rescisão CLT 2025 - Valores Atualizados | TW Tools",
    description: "Calcule sua rescisão trabalhista CLT com os dados mais atualizados de 2025. Salário mínimo R$ 1.518, FGTS, aviso prévio, férias e 13º salário. Ferramenta completa e gratuita.",
};

const infoItems = [
    {
        title: "Sobre a Calculadora de Rescisão CLT",
        type: "info" as const,
        content: (
            <p>
                Nossa calculadora de rescisão CLT está atualizada com os valores de 2025, incluindo o novo salário mínimo de R$ 1.518,00 e as tabelas atualizadas do INSS e IRPF. 
                Calcule automaticamente todas as verbas rescisórias: saldo de salário, aviso prévio, 13º salário proporcional, férias, multa do FGTS e descontos obrigatórios.
            </p>
        )
    },
    {
        title: "Tipos de Rescisão Suportados",
        type: "usage" as const,
        content: (
            <p>
                ✓ Demissão sem justa causa<br />
                ✓ Pedido de demissão<br />
                ✓ Demissão por justa causa<br />
                ✓ Rescisão indireta<br />
                ✓ Demissão consensual (comum acordo)<br />
                ✓ Término de contrato de experiência
            </p>
        )
    },
    {
        title: "Valores e Tabelas Atualizadas 2025",
        type: "features" as const,
        content: (
            <p>
                ✓ Salário mínimo: R$ 1.518,00<br />
                ✓ Tabela INSS 2025 atualizada<br />
                ✓ Tabela IRPF 2025 atualizada<br />
                ✓ Aviso prévio proporcional (Lei 12.506/2011)<br />
                ✓ Cálculo automático de descontos<br />
                ✓ Multa do FGTS conforme tipo de rescisão
            </p>
        )
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (
            <p>
                Esta calculadora é uma ferramenta de auxílio para estimativa de valores. Os resultados são baseados na legislação vigente, mas podem haver particularidades específicas do seu caso. 
                Para cálculos oficiais, consulte sempre um contador ou advogado trabalhista. A ferramenta não substitui orientação profissional especializada.
            </p>
        )
    }
]

export default function RescisaoCltPage() {
    const breadcrumbs = [
        {
            name: 'Calculadoras',
            href: '/calculadoras',
            current: false
        },
        {
            name: 'Rescisão CLT',
            href: '/calculadoras/rescisao-clt',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Calculadora Trabalhista"
                title="Calculadora de Rescisão CLT 2025"
                description="Calcule sua rescisão trabalhista com os valores mais atualizados de 2025. Salário mínimo R$ 1.518, tabelas INSS e IRPF atualizadas. Ferramenta completa para todos os tipos de demissão CLT."
                breadcrumbs={breadcrumbs}
            />
            <CltRescissionCalculator />
            <InfoSection items={infoItems} />
        </>
    )
}