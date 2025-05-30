import { Metadata } from "next";
import CNHGeneratorClient from "../../../src/components/layout/generator/CnhGenerator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Gerador de CNH Online Grátis | Gere CNHs Válidas - TW Tools",
    description: "Gere CNH gratuitamente online. Ferramenta que gera números de CNH válidos seguindo as regras do DENATRAN. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Gerador de CNH",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online gera números de CNH válidos, seguindo rigorosamente as regras estabelecidas pelo DENATRAN. A geração inclui dígitos verificadores e estado emissor válidos.
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
                ✓ Integração com sistemas do DENATRAN<br />
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

export default function CNHGenerator() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'CNH',
            href: '/geradores/cnh',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Gerador de CNH Online"
                title="Gerador de CNH Válida Grátis"
                description="Ferramenta gratuita para gerar CNH online. Gere números de CNH válidos, seguindo todas as regras do DENATRAN. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
                breadcrumbs={breadcrumbs}
            />
            <CNHGeneratorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 