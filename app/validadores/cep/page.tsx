import { Metadata } from "next";
import CEPValidatorClient from "../../../src/components/layout/validator/CepValidator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Validador de CEP Online Grátis | Verifique CEP Válido - TW Tools",
    description: "Valide CEP gratuitamente online. Ferramenta que verifica se um número de CEP é válido seguindo as regras dos Correios. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Validador de CEP",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online valida números de CEP, seguindo rigorosamente as regras estabelecidas pelos Correios. A validação inclui verificação do formato e do estado correspondente.
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
                ✓ Integração com APIs de endereço<br />
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
                ✓ Verificação do formato<br />
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

export default function CEPValidator() {
    const breadcrumbs = [
        {
            name: 'Validadores',
            href: '/validadores',
            current: false
        },
        {
            name: 'CEP',
            href: '/validadores/cep',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Validador de CEP Online"
                title="Validador de CEP Válido Grátis"
                description="Ferramenta gratuita para validar CEP online. Verifique se um número de CEP é válido, seguindo todas as regras dos Correios. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
                breadcrumbs={breadcrumbs}
            />
            <CEPValidatorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 