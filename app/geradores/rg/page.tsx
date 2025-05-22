import { Metadata } from "next";
import RGGeneratorClient from "../../../src/components/layout/generator/RgGenerator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Gerador de RG Online Grátis | Gere RG Válido por Estado - TW Tools",
    description: "Gere RG válido gratuitamente por estado para testes e desenvolvimento. Ferramenta online que cria números de RG seguindo as regras dos órgãos emissores. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Gerador de RG",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online gera números de RG válidos por estado, seguindo rigorosamente as regras estabelecidas pelos órgãos emissores de cada estado brasileiro. Cada RG gerado passa por todas as validações necessárias, garantindo a conformidade com os padrões estaduais de emissão.
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
                ✓ Testes de integração com sistemas estaduais<br />
                ✓ Validação de formulários por estado
            </p>
        )
    },
    {
        title: "Diferenciais do Gerador",
        type: "features" as const,
        content: (
            <p>
                ✓ Geração específica por estado<br />
                ✓ Validação completa dos dígitos<br />
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

export default function RGGenerator() {
    return (
        <>
            <Header
                miniTitle="Gerador de RG Online"
                title="Gerador de RG Válido Grátis"
                description="Ferramenta gratuita para gerar RG válido online por estado. Crie números de RG com ou sem pontuação, seguindo todas as regras dos órgãos emissores. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
            />
            <RGGeneratorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 