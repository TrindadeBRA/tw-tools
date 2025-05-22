import { Metadata } from "next";
import CPFGeneratorClient from "../../../src/components/layout/generator/CpfGenerator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Gerador de CPF Online Grátis | Gere CPF Válido por Estado - TW Tools",
    description: "Gere CPF válido gratuitamente por estado para testes e desenvolvimento. Ferramenta online que cria números de CPF seguindo as regras da Receita Federal. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Gerador de CPF",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online gera números de CPF válidos por estado, seguindo rigorosamente as regras estabelecidas pela Receita Federal do Brasil. Cada CPF gerado possui 11 dígitos e passa por todas as validações matemáticas necessárias, incluindo a verificação do dígito regional.
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
                ✓ Testes de integração com sistemas governamentais<br />
                ✓ Validação de formulários por estado
            </p>
        )
    },
    {
        title: "Diferenciais do Gerador",
        type: "features" as const,
        content: (
            <p>
                ✓ Geração por estado (dígito verificador regional)<br />
                ✓ Validação matemática completa<br />
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

export default function CPFGenerator() {
    return (
        <>
            <Header
                miniTitle="Gerador de CPF Online"
                title="Gerador de CPF Válido Grátis"
                description="Ferramenta gratuita para gerar CPF válido online por estado. Crie números de CPF com ou sem pontuação, seguindo todas as regras da Receita Federal. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
            />
            <CPFGeneratorClient />
            <InfoSection items={infoItems} />
        </>
    )
}