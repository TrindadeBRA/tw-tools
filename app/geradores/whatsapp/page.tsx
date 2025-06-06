import { Metadata } from "next";
import WhatsAppGenerator from "@/components/layout/generator/WhatsAppGenerator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Gerador de Link do WhatsApp | TW Tools",
    description: "Gere links para iniciar conversas no WhatsApp com facilidade. Basta inserir o número de telefone e uma mensagem opcional.",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>O Gerador de Link do WhatsApp é uma ferramenta que permite criar links diretos para iniciar conversas no WhatsApp. Basta inserir o número de telefone e, opcionalmente, uma mensagem pré-definida.</p>)
    },
    {
        title: "Como Usar",
        type: "usage" as const,
        content: (<p>✓ Digite o número de telefone com DDD<br />✓ Adicione uma mensagem opcional<br />✓ Clique em "Gerar Link"<br />✓ Copie o link gerado e compartilhe</p>)
    },
    {
        title: "Diferenciais",
        type: "features" as const,
        content: (<p>✓ Formatação automática do número<br />✓ Suporte a mensagens pré-definidas<br />✓ Geração instantânea de links<br />✓ Compatível com todos os dispositivos</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta é apenas para facilitar a criação de links do WhatsApp. O uso deve ser feito de acordo com os termos de serviço do WhatsApp e respeitando a privacidade dos usuários.</p>)
    }
]

export default function WhatsAppPage() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'Link do WhatsApp',
            href: '/geradores/whatsapp',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Gerador"
                title="Link do WhatsApp"
                description="Gere links para iniciar conversas no WhatsApp com facilidade. Basta inserir o número de telefone e uma mensagem opcional."
                breadcrumbs={breadcrumbs}
            />
            <WhatsAppGenerator />
            <InfoSection items={infoItems} />
        </>
    )
} 