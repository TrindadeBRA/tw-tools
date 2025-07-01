import { Metadata } from "next";
import TextValidator from "../../../src/components/layout/validator/TextValidator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Contador de Texto - Caracteres, Palavras e Linhas | TW Tools",
    description: "Contador de texto online gratuito. Conte caracteres, palavras, linhas e parágrafos em tempo real. Ferramenta útil para escritores, estudantes e profissionais.",
};

const infoItems = [
    {
        title: "Sobre o Contador de Texto",
        type: "info" as const,
        content: (
            <p>
                Esta ferramenta permite contar caracteres, palavras, linhas e parágrafos de qualquer texto em tempo real. 
                Útil para verificar limites de caracteres em redes sociais, ensaios acadêmicos, artigos ou qualquer 
                conteúdo que precise respeitar uma quantidade específica de caracteres ou palavras.
            </p>
        )
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Verificar limites de caracteres para redes sociais<br />
                ✓ Contar palavras em redações e artigos<br />
                ✓ Analisar densidade de texto em conteúdos<br />
                ✓ Estimar tempo de leitura de textos<br />
                ✓ Verificar extensão de descrições e resumos<br />
                ✓ Análise de conteúdo para SEO e marketing
            </p>
        )
    },
    {
        title: "Recursos da Ferramenta",
        type: "features" as const,
        content: (
            <p>
                ✓ Contagem em tempo real conforme você digita<br />
                ✓ Conta caracteres com e sem espaços<br />
                ✓ Contagem precisa de palavras e linhas<br />
                ✓ Identifica quantidade de parágrafos<br />
                ✓ Calcula tempo estimado de leitura<br />
                ✓ Análise de densidade e estatísticas do texto<br />
                ✓ Interface limpa e fácil de usar<br />
                ✓ Funciona completamente offline
            </p>
        )
    },
    {
        title: "Dicas de Uso",
        type: "legal" as const,
        content: (
            <p>
                • Digite ou cole seu texto diretamente no campo<br />
                • As estatísticas são atualizadas automaticamente<br />
                • Use "Carregar Exemplo" para testar a ferramenta<br />
                • A contagem de palavras considera espaços como separadores<br />
                • Parágrafos são identificados por quebras de linha duplas<br />
                • O tempo de leitura é baseado em 200 palavras por minuto
            </p>
        )
    }
]

export default function ContadorTextoPage() {
    // Definir breadcrumbs para navegação
    const breadcrumbs = [
        {
            name: 'Validadores',
            href: '/validadores',
            current: false
        },
        {
            name: 'Contador de Texto',
            href: '/validadores/contador-de-texto',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Validador"
                title="Contador de Texto"
                description="Conte caracteres, palavras, linhas e parágrafos de qualquer texto em tempo real. Ferramenta gratuita e precisa para análise de conteúdo textual."
                breadcrumbs={breadcrumbs}
            />
            <TextValidator />
            <InfoSection items={infoItems} />
        </>
    )
} 