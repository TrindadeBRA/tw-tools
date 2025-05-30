import { Metadata } from "next";
import CreditCardValidatorClient from "../../../src/components/layout/validator/CreditCardValidator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Validador de Cartão de Crédito Online Grátis | Verifique Cartão Válido - TW Tools",
    description: "Valide cartão de crédito gratuitamente online. Ferramenta que verifica se um número de cartão é válido seguindo o algoritmo de Luhn. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Validador de Cartão de Crédito",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online valida números de cartão de crédito, seguindo rigorosamente o algoritmo de Luhn. A validação inclui verificação dos dígitos verificadores e identificação da bandeira do cartão.
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
                ✓ Integração com gateways de pagamento<br />
                ✓ Verificação de dados
            </p>
        )
    },
    {
        title: "Diferenciais do Validador",
        type: "features" as const,
        content: (
            <p>
                ✓ Validação pelo algoritmo de Luhn<br />
                ✓ Identificação da bandeira do cartão<br />
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

export default function CreditCardValidator() {
    const breadcrumbs = [
        {
            name: 'Validadores',
            href: '/validadores',
            current: false
        },
        {
            name: 'Cartão de Crédito',
            href: '/validadores/cartao-de-credito',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Validador de Cartão de Crédito Online"
                title="Validador de Cartão de Crédito Válido Grátis"
                description="Ferramenta gratuita para validar cartão de crédito online. Verifique se um número de cartão é válido, seguindo o algoritmo de Luhn. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
                breadcrumbs={breadcrumbs}
            />
            <CreditCardValidatorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 