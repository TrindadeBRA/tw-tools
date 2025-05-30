import { Metadata } from "next";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import CreditCardGeneratorClient from "@/components/layout/generator/CreditCardGenerator";

export const metadata: Metadata = {
    title: "Gerador de Cartão de Crédito Online Grátis | Gere Números Válidos - TW Tools",
    description: "Gere números de cartão de crédito válidos gratuitamente para testes e desenvolvimento. Ferramenta online que cria números seguindo o algoritmo de Luhn. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Gerador de Cartão de Crédito",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online gera números de cartão de crédito válidos, seguindo rigorosamente o algoritmo de Luhn. Cada número gerado passa por todas as validações matemáticas necessárias, incluindo a verificação do dígito verificador.
            </p>
        )
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Desenvolvimento de software e sistemas<br />
                ✓ Testes de cadastro e validação<br />
                ✓ Prototipagem de aplicações<br />
                ✓ Testes de integração com gateways de pagamento<br />
                ✓ Validação de formulários
            </p>
        )
    },
    {
        title: "Diferenciais do Gerador",
        type: "features" as const,
        content: (
            <p>
                ✓ Validação pelo algoritmo de Luhn<br />
                ✓ Suporte a múltiplas bandeiras<br />
                ✓ Opção de formatação automática<br />
                ✓ Interface simples e intuitiva
            </p>
        )
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (
            <p>
                Esta ferramenta foi desenvolvida exclusivamente para fins de teste e desenvolvimento. A utilização dos números gerados para fins fraudulentos ou ilegais é expressamente proibida e de total responsabilidade do usuário.
            </p>
        )
    }
]

export default function CreditCardGenerator() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'Cartão de Crédito',
            href: '/geradores/cartao-de-credito',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Gerador de Cartão de Crédito Online"
                title="Gerador de Números de Cartão de Crédito Válidos"
                description="Ferramenta gratuita para gerar números de cartão de crédito válidos online. Crie números com ou sem pontuação, seguindo o algoritmo de Luhn. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
                breadcrumbs={breadcrumbs}
            />
            <CreditCardGeneratorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 