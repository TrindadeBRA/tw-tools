import { Metadata } from "next";
import RGValidatorClient from "../../../src/components/layout/validator/RgValidator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Validador de RG Online Grátis | Verifique RG Válido - TW Tools",
    description: "Valide RG gratuitamente online. Ferramenta que verifica se um número de RG é válido seguindo as regras de cada estado. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Validador de RG",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online valida números de RG, seguindo rigorosamente as regras estabelecidas por cada estado brasileiro. A validação inclui verificação dos dígitos verificadores e do estado emissor.
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
                ✓ Validação por estado<br />
                ✓ Verificação do dígito verificador<br />
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

export default function RGValidator() {
    const breadcrumbs = [
        {
            name: 'Validadores',
            href: '/validadores',
            current: false
        },
        {
            name: 'RG',
            href: '/validadores/rg',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Validador de RG Online"
                title="Validador de RG Válido Grátis"
                description="Ferramenta gratuita para validar RG online. Verifique se um número de RG é válido, seguindo todas as regras do estado emissor. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
                breadcrumbs={breadcrumbs}
            />
            <RGValidatorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 