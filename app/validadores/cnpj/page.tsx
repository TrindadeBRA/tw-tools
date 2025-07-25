import { Metadata } from "next";
import CNPJValidatorClient from "../../../src/components/layout/validator/CnpjValidator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Validador de CNPJ Online Grátis | Verifique CNPJ Válido - TW Tools",
    description: "Valide CNPJ gratuitamente online. Ferramenta que verifica se um número de CNPJ é válido seguindo as regras da Receita Federal. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Validador de CNPJ",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online valida números de CNPJ, seguindo rigorosamente as regras estabelecidas pela Receita Federal do Brasil. A validação inclui verificação dos dígitos verificadores e do dígito regional.
            </p>
        )
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Validação de formulários<br />
                ✓ Desenvolvimento de software e sistemas<br />
                ✓ Testes de cadastro<br />
                ✓ Integração com sistemas governamentais<br />
                ✓ Verificação de dados
            </p>
        )
    },
    {
        title: "Diferenciais do Validador",
        type: "features" as const,
        content: (
            <p>
                ✓ Validação matemática completa<br />
                ✓ Verificação do dígito regional<br />
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
                Esta ferramenta foi desenvolvida exclusivamente para fins de validação e desenvolvimento. A utilização para fins fraudulentos ou ilegais é expressamente proibida e de total responsabilidade do usuário.
            </p>
        )
    }
]

export default function CNPJValidator() {
    const breadcrumbs = [
        {
            name: 'Validadores',
            href: '/validadores',
            current: false
        },
        {
            name: 'CNPJ',
            href: '/validadores/cnpj',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Validador de CNPJ Online"
                title="Validador de CNPJ Válido Grátis"
                description="Ferramenta gratuita para validar CNPJ online. Verifique se um número de CNPJ é válido, seguindo todas as regras da Receita Federal. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
                breadcrumbs={breadcrumbs}
            />
            <CNPJValidatorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 