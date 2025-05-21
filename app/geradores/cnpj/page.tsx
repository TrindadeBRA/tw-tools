import { Metadata } from "next";
import CNPJGeneratorClient from "../../../src/components/layout/generator/cnpj";
import Header from "@/components/layout/template/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Gerador de CNPJ Online Grátis | Gere CNPJ Válido - TW Tools",
    description: "Gere CNPJ válido gratuitamente para testes e desenvolvimento. Ferramenta online que cria números de CNPJ seguindo as regras da Receita Federal. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Gerador de CNPJ",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online gera números de CNPJ válidos, seguindo rigorosamente as regras estabelecidas pela Receita Federal do Brasil. Cada CNPJ gerado possui 14 dígitos e passa por todas as validações matemáticas necessárias.
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
                ✓ Testes de integração
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

export default function CNPJGenerator() {
    return (
        <>
            <Header
                miniTitle="Gerador de CNPJ Online"
                title="Gerador de CNPJ Válido Grátis"
                description="Ferramenta gratuita para gerar CNPJ válido online. Crie números de CNPJ com ou sem pontuação, seguindo todas as regras da Receita Federal. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
            />
            <CNPJGeneratorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 