import { Metadata } from "next";
import CNHValidatorClient from "../../../src/components/layout/validator/CnhValidator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Validador de CNH Online Grátis | Verifique CNH Válida - TW Tools",
    description: "Valide CNH gratuitamente online. Ferramenta que verifica se um número de CNH é válido seguindo as regras do DENATRAN. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Validador de CNH",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online valida números de CNH, seguindo rigorosamente as regras estabelecidas pelo DENATRAN. A validação inclui verificação dos dígitos verificadores e do estado emissor.
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
                ✓ Integração com sistemas do DENATRAN<br />
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
                ✓ Verificação do estado emissor<br />
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

export default function CNHValidator() {
    const breadcrumbs = [
        {
            name: 'Validadores',
            href: '/validadores',
            current: false
        },
        {
            name: 'CNH',
            href: '/validadores/cnh',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Validador de CNH Online"
                title="Validador de CNH Válida Grátis"
                description="Ferramenta gratuita para validar CNH online. Verifique se um número de CNH é válido, seguindo todas as regras do DENATRAN. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
                breadcrumbs={breadcrumbs}
            />
            <CNHValidatorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 