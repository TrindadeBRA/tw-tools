import { Metadata } from "next";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import PisGenerator from "@/components/layout/generator/PisGenerator";

export const metadata: Metadata = {
    title: "Gerador de PIS/PASEP/NIT | TW Tools",
    description: "Gere números de PIS/PASEP/NIT válidos de forma rápida e segura. Crie números PIS/PASEP/NIT válidos com nossa ferramenta gratuita.",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>O Gerador de PIS/PASEP/NIT é uma ferramenta gratuita que permite criar números válidos de PIS (Programa de Integração Social), PASEP (Programa de Formação do Patrimônio do Servidor Público) e NIT (Número de Identificação do Trabalhador) para fins de teste e desenvolvimento.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Testes de sistemas e aplicações<br />✓ Desenvolvimento de software<br />✓ Simulações e protótipos<br />✓ Estudos e pesquisas</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ Geração instantânea<br />✓ Números 100% válidos<br />✓ Formatação automática<br />✓ Interface intuitiva e responsiva</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta é apenas para fins de teste e desenvolvimento. Não utilize os números gerados para fins fraudulentos ou ilegais. Para uso oficial, consulte os órgãos competentes.</p>)
    }
]

export default function PisGeneratorPage() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'PIS/PASEP/NIT',
            href: '/geradores/pis',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Gerador"
                title="Gerador de PIS/PASEP/NIT"
                description="Gere números de PIS/PASEP/NIT válidos para testes e desenvolvimento."
                breadcrumbs={breadcrumbs}
            />
            <PisGenerator />
            <InfoSection items={infoItems} />
        </>
    )
} 