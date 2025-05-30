import { Metadata } from "next";
import CNPJGeneratorClient from "../../../src/components/layout/generator/CnpjGenerator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Gerador de CNPJ Online Grátis | Gere CNPJs Válidos - TW Tools",
    description: "Gere CNPJ gratuitamente online. Ferramenta que gera números de CNPJ válidos seguindo as regras da Receita Federal. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Gerador de CNPJ",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online gera números de CNPJ válidos, seguindo rigorosamente as regras estabelecidas pela Receita Federal do Brasil. A geração inclui dígitos verificadores e dígito regional válidos.
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

export default function CNPJGenerator() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'CNPJ',
            href: '/geradores/cnpj',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Gerador de CNPJ Online"
                title="Gerador de CNPJ Válido Grátis"
                description="Ferramenta gratuita para gerar CNPJ online. Gere números de CNPJ válidos, seguindo todas as regras da Receita Federal. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
                breadcrumbs={breadcrumbs}
            />
            <CNPJGeneratorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 