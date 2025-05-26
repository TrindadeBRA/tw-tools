import { Metadata } from "next";
import CnhValidator from "../../../src/components/layout/validator/CnhValidator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Validador de CNH | TW Tools",
    description: "Verifique se um número de CNH (Carteira Nacional de Habilitação) é válido de acordo com o algoritmo verificador. Ferramenta gratuita e online.",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>Esta ferramenta verifica se um número de CNH é válido de acordo com o algoritmo verificador. O sistema analisa os dígitos verificadores para confirmar a validade do documento.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Validação de dados cadastrais<br />✓ Verificação de documentos<br />✓ Teste de sistemas de documentação</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ Verificação rápida e confiável<br />✓ Formatação automática do número<br />✓ Explicação detalhada do resultado</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta deve ser usada apenas para fins de validação técnica. A veracidade ou autenticidade de documentos oficiais deve ser verificada junto aos órgãos competentes.</p>)
    }
]

export default function ValidadorCnh() {
    return (
        <>
            <Header
                miniTitle="Validador"
                title="Validador de CNH"
                description="Verifique se um número de CNH (Carteira Nacional de Habilitação) é válido de acordo com o algoritmo verificador."
            />
            <CnhValidator />
            <InfoSection items={infoItems} />
        </>
    )
} 