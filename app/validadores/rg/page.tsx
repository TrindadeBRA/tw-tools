import { Metadata } from "next";
import RGValidatorClient from "../../../src/components/layout/validator/RgValidator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Validador de RG Online Grátis | Verifique RG Válido - TW Tools",
    description: "Valide RG online gratuitamente. Ferramenta que verifica se um RG é válido seguindo as regras dos órgãos emissores. Ideal para validação de documentos e desenvolvimento.",
};

const infoItems = [
    {
        title: "Sobre o Validador de RG",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online valida números de RG de acordo com as regras estabelecidas pelos órgãos emissores. A validação inclui a verificação do dígito verificador e todas as regras matemáticas necessárias para garantir que o RG é válido.
            </p>
        )
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Validação de documentos pessoais<br />
                ✓ Desenvolvimento de software e sistemas<br />
                ✓ Testes de cadastro e validação<br />
                ✓ Verificação de RG em formulários<br />
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
                ✓ Aceita RG com ou sem pontuação<br />
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

export default function RGValidator() {
    return (
        <>
            <Header
                miniTitle="Validador de RG Online"
                title="Validador de RG Grátis"
                description="Ferramenta gratuita para validar RG online. Verifique se um RG é válido de acordo com as regras dos órgãos emissores. Ideal para validação de documentos, desenvolvimento de sistemas e verificação de cadastros."
            />
            <RGValidatorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 