import { Metadata } from "next";
import RGGeneratorClient from "../../../src/components/layout/generator/RgGenerator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Gerador de RG Online Grátis | Gere RGs Válidos - TW Tools",
    description: "Gere RG gratuitamente online. Ferramenta que gera números de RG válidos seguindo as regras de cada estado. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Gerador de RG",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online gera números de RG válidos, seguindo rigorosamente as regras estabelecidas por cada estado brasileiro. A geração inclui dígitos verificadores e estado emissor válidos.
            </p>
        )
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Testes de software<br />
                ✓ Desenvolvimento de sistemas<br />
                ✓ Testes de cadastro<br />
                ✓ Integração com sistemas governamentais<br />
                ✓ Validação de formulários
            </p>
        )
    },
    {
        title: "Diferenciais do Gerador",
        type: "features" as const,
        content: (
            <p>
                ✓ Geração por estado<br />
                ✓ Validação matemática completa<br />
                ✓ Suporte a diferentes formatos<br />
                ✓ Interface simples e intuitiva
            </p>
        )
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (
            <p>
                Esta ferramenta foi desenvolvida exclusivamente para fins de teste e desenvolvimento. A utilização para fins fraudulentos ou ilegais é expressamente proibida e de total responsabilidade do usuário.
            </p>
        )
    }
]

export default function RGGenerator() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'RG',
            href: '/geradores/rg',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Gerador de RG Online"
                title="Gerador de RG Válido Grátis"
                description="Ferramenta gratuita para gerar RG online. Gere números de RG válidos, seguindo todas as regras do estado emissor. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
                breadcrumbs={breadcrumbs}
            />
            <RGGeneratorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 