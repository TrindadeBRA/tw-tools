import { Metadata } from "next";
import PhoneNumberGenerator from "@/components/layout/generator/PhoneNumberGenerator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Gerador de Número de Telefone | TW Tools",
    description: "Gere números de telefone válidos para diferentes países com formatação correta. Suporte para diversos formatos internacionais.",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>O Gerador de Número de Telefone é uma ferramenta que permite criar números de telefone válidos para diferentes países, seguindo os formatos e padrões internacionais. Ideal para testes e desenvolvimento de software.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Testes de formulários<br />✓ Desenvolvimento de software<br />✓ Validação de sistemas<br />✓ Testes de integração</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ Suporte a múltiplos países<br />✓ Formatação automática<br />✓ Números válidos e realistas<br />✓ Interface intuitiva</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta gera números de telefone fictícios apenas para fins de teste e desenvolvimento. Não utilize os números gerados para fins maliciosos ou fraudulentos.</p>)
    }
]

export default function PhoneNumberPage() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'Número de Telefone',
            href: '/geradores/telefone',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Gerador"
                title="Gerador de Número de Telefone"
                description="Gere números de telefone válidos para diferentes países com formatação correta. Suporte para diversos formatos internacionais."
                breadcrumbs={breadcrumbs}
            />
            <PhoneNumberGenerator />
            <InfoSection items={infoItems} />
        </>
    )
} 