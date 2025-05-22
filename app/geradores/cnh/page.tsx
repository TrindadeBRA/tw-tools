import { Metadata } from "next";
import CnhGenerator from "../../../src/components/layout/generator/CnhGenerator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Gerador de CNH | TW Tools",
    description: "Gere números de CNH válidos para testes e desenvolvimento de sistemas. Ferramenta online gratuita.",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>O Gerador de CNH é uma ferramenta que cria números de Carteira Nacional de Habilitação válidos para fins de teste. Os números gerados seguem o mesmo formato e algoritmo de validação das CNHs reais brasileiras.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Testes de sistemas que utilizam dados de CNH<br />✓ Desenvolvimento de software<br />✓ Validação de sistemas de verificação<br />✓ Preenchimento de ambientes de homologação</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ Gera CNHs válidos com algoritmo atualizado<br />✓ Permite customização de categoria e UF<br />✓ Ferramenta gratuita e online<br />✓ Não armazena dados pessoais</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta é destinada exclusivamente para fins de teste e desenvolvimento de software. O uso dos números gerados para fins fraudulentos, como criação de documentos falsos ou tentativa de se passar por outra pessoa, é ilegal e pode resultar em processos criminais. Os usuários são os únicos responsáveis pelo uso adequado desta ferramenta.</p>)
    }
]

export default function CnhPage() {
    return (
        <>
            <Header
                miniTitle="Gerador de Documentos"
                title="Gerador de CNH"
                description="Gere números de CNH (Carteira Nacional de Habilitação) válidos para testes e desenvolvimento de sistemas."
            />
            <CnhGenerator />
            <InfoSection items={infoItems} />
        </>
    )
} 