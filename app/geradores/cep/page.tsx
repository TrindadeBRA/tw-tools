import { Metadata } from "next";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import CEPGeneratorClient from "@/components/layout/generator/cep";

export const metadata: Metadata = {
    title: "Gerador de CEP Online Grátis | Gere CEPs Válidos - TW Tools",
    description: "Gere CEPs válidos gratuitamente para testes. Ferramenta online que cria CEPs seguindo o padrão dos Correios. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Gerador de CEP",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online gera CEPs válidos para diferentes estados e cidades do Brasil, seguindo o padrão dos Correios. Cada CEP gerado pode incluir formatação opcional, perfeito para testes de sistemas que utilizam endereços.
            </p>
        )
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Desenvolvimento de e-commerce<br />
                ✓ Testes de sistemas de logística<br />
                ✓ Prototipagem de aplicações<br />
                ✓ Testes de integração com APIs de endereço<br />
                ✓ Validação de formulários de endereço
            </p>
        )
    },
    {
        title: "Diferenciais do Gerador",
        type: "features" as const,
        content: (
            <p>
                ✓ Suporte a estados brasileiros<br />
                ✓ Geração por cidade<br />
                ✓ Opção de formatação<br />
                ✓ Interface simples e intuitiva
            </p>
        )
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (
            <p>
                Esta ferramenta foi desenvolvida exclusivamente para fins de teste e desenvolvimento. A utilização dos CEPs gerados para fins fraudulentos ou ilegais é expressamente proibida e de total responsabilidade do usuário.
            </p>
        )
    }
]

export default function CEPGenerator() {
    return (
        <>
            <Header
                miniTitle="Gerador de CEP Online"
                title="Gerador de CEP Válido Grátis"
                description="Ferramenta gratuita para gerar CEPs válidos para testes. Crie CEPs com base em estados e cidades, com opção de formatação. Ideal para testes de software e desenvolvimento de sistemas."
            />
            <CEPGeneratorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 