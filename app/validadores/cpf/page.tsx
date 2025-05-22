import { Metadata } from "next";
import CPFValidatorClient from "../../../src/components/layout/validator/CpfValidator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Validador de CPF Online Grátis | Verifique CPF Válido - TW Tools",
    description: "Valide CPF online gratuitamente. Ferramenta que verifica se um CPF é válido seguindo as regras da Receita Federal. Ideal para validação de documentos e desenvolvimento.",
};

const infoItems = [
    {
        title: "Sobre o Validador de CPF",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online valida números de CPF de acordo com as regras estabelecidas pela Receita Federal do Brasil. A validação inclui a verificação dos dígitos verificadores e todas as regras matemáticas necessárias para garantir que o CPF é válido.
            </p>
        )
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Validação de documentos<br />
                ✓ Desenvolvimento de software e sistemas<br />
                ✓ Testes de cadastro e validação<br />
                ✓ Verificação de CPF em formulários<br />
                ✓ Conferência de documentação
            </p>
        )
    },
    {
        title: "Diferenciais do Validador",
        type: "features" as const,
        content: (
            <p>
                ✓ Validação matemática completa<br />
                ✓ Aceita CPF com ou sem pontuação<br />
                ✓ Resultado instantâneo<br />
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
    return (
        <>
            <Header
                miniTitle="Validador de CPF Online"
                title="Validador de CPF Grátis"
                description="Ferramenta gratuita para validar CPF online. Verifique se um CPF é válido de acordo com as regras da Receita Federal. Ideal para validação de documentos, desenvolvimento de sistemas e verificação de cadastros."
            />
            <CPFValidatorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 