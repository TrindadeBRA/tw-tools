import { Metadata } from "next";
import CPFValidatorClient from "../../../src/components/layout/validator/CpfValidator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Validador de CPF Online Grátis | Verifique CPF Válido - TW Tools",
    description: "Valide CPF gratuitamente online. Ferramenta que verifica se um número de CPF é válido seguindo as regras da Receita Federal. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Validador de CPF",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online valida números de CPF, seguindo rigorosamente as regras estabelecidas pela Receita Federal do Brasil. A validação inclui verificação dos dígitos verificadores e do dígito regional.
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

export default function CPFValidator() {
    const breadcrumbs = [
        {
            name: 'Validadores',
            href: '/validadores',
            current: false
        },
        {
            name: 'CPF',
            href: '/validadores/cpf',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Validador de CPF Online"
                title="Validador de CPF Válido Grátis"
                description="Ferramenta gratuita para validar CPF online. Verifique se um número de CPF é válido, seguindo todas as regras da Receita Federal. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
                breadcrumbs={breadcrumbs}
            />
            <CPFValidatorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 