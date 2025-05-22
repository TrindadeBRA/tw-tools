import { Metadata } from "next";
import CNPJValidatorClient from "../../../src/components/layout/validator/CnpjValidator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Validador de CNPJ Online Grátis | Verifique CNPJ Válido - TW Tools",
    description: "Valide CNPJ online gratuitamente. Ferramenta que verifica se um CNPJ é válido seguindo as regras da Receita Federal. Ideal para validação de documentos e desenvolvimento.",
};

const infoItems = [
    {
        title: "Sobre o Validador de CNPJ",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online valida números de CNPJ de acordo com as regras estabelecidas pela Receita Federal do Brasil. A validação inclui a verificação dos dígitos verificadores e todas as regras matemáticas necessárias para garantir que o CNPJ é válido.
            </p>
        )
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Validação de documentos empresariais<br />
                ✓ Desenvolvimento de software e sistemas<br />
                ✓ Testes de cadastro e validação<br />
                ✓ Verificação de CNPJ em formulários<br />
                ✓ Conferência de documentação fiscal
            </p>
        )
    },
    {
        title: "Diferenciais do Validador",
        type: "features" as const,
        content: (
            <p>
                ✓ Validação matemática completa<br />
                ✓ Aceita CNPJ com ou sem pontuação<br />
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

export default function CNPJValidator() {
    return (
        <>
            <Header
                miniTitle="Validador de CNPJ Online"
                title="Validador de CNPJ Grátis"
                description="Ferramenta gratuita para validar CNPJ online. Verifique se um CNPJ é válido de acordo com as regras da Receita Federal. Ideal para validação de documentos, desenvolvimento de sistemas e verificação de cadastros."
            />
            <CNPJValidatorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 