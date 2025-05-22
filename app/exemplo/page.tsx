import { Metadata } from "next";
import ExemploGerador from "../../src/components/layout/exemplo/exemplo";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Exemplo de Gerador | Ferramenta Online Gratuita - TW Tools",
    description: "Exemplo de ferramenta de geração online. Esta é uma página de demonstração que mostra a estrutura de um gerador completo.",
};

const infoItems = [
    {
        title: "Sobre esta Ferramenta",
        type: "info" as const,
        content: (
            <p>
                Esta é uma página de exemplo que demonstra a estrutura completa de um gerador. Aqui você pode incluir informações sobre como a ferramenta funciona e qual sua finalidade.
            </p>
        )
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Exemplo de uso 1<br />
                ✓ Exemplo de uso 2<br />
                ✓ Exemplo de uso 3<br />
                ✓ Exemplo de uso 4
            </p>
        )
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (
            <p>
                ✓ Característica 1<br />
                ✓ Característica 2<br />
                ✓ Característica 3<br />
                ✓ Característica 4
            </p>
        )
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (
            <p>
                Esta ferramenta foi desenvolvida exclusivamente para fins de demonstração. Em uma implementação real, incluiria informações sobre uso adequado e limitações de responsabilidade.
            </p>
        )
    }
]

export default function ExemploPage() {
    return (
        <>
            <Header
                miniTitle="Exemplo de Ferramenta"
                title="Demonstração de Gerador"
                description="Esta é uma página de exemplo que demonstra a estrutura de um gerador completo. Aqui você pode incluir uma descrição detalhada da ferramenta e seus benefícios para o usuário."
            />
            <ExemploGerador />
            <InfoSection items={infoItems} />
        </>
    )
} 