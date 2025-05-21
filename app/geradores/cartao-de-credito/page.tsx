import { Metadata } from "next";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import CreditCardGeneratorClient from "@/components/layout/generator/creditcard";

export const metadata: Metadata = {
    title: "Gerador de Cartão de Crédito Online Grátis | Gere Cartões Válidos - TW Tools",
    description: "Gere números de cartão de crédito válidos gratuitamente para testes. Ferramenta online que cria números de cartão seguindo o algoritmo Luhn e regras das bandeiras. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Gerador de Cartão",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online gera números de cartão de crédito válidos para diferentes bandeiras, seguindo rigorosamente o algoritmo Luhn e as regras específicas de cada bandeira. Cada cartão gerado inclui número, data de validade e código de segurança (CVV), perfeito para testes de sistemas de pagamento.
            </p>
        )
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Desenvolvimento de e-commerce<br />
                ✓ Testes de gateway de pagamento<br />
                ✓ Prototipagem de aplicações<br />
                ✓ Testes de integração com APIs de pagamento<br />
                ✓ Validação de formulários de cartão
            </p>
        )
    },
    {
        title: "Diferenciais do Gerador",
        type: "features" as const,
        content: (
            <p>
                ✓ Suporte a múltiplas bandeiras<br />
                ✓ Validação pelo algoritmo Luhn<br />
                ✓ Geração de data e CVV<br />
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
    return (
        <>
            <Header
                miniTitle="Gerador de Cartão de Crédito Online"
                title="Gerador de Cartão de Crédito Válido Grátis"
                description="Ferramenta gratuita para gerar cartões de crédito válidos para testes. Crie números de cartão com data de validade e CVV, seguindo as regras de cada bandeira. Ideal para testes de software e desenvolvimento de sistemas de pagamento."
            />
            <CreditCardGeneratorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 