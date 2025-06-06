import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Resultado | Link do WhatsApp - TW Tools",
    description: "Link do WhatsApp gerado com sucesso. Copie e compartilhe para iniciar uma conversa.",
};

const infoItems = [
    {
        title: "Sobre o Link Gerado",
        type: "info" as const,
        content: (<p>O link gerado permite iniciar uma conversa no WhatsApp diretamente. Ao clicar no link, o WhatsApp Web ou o aplicativo será aberto com a conversa pronta para iniciar.</p>)
    },
    {
        title: "Como Usar o Link",
        type: "usage" as const,
        content: (<p>✓ Copie o link gerado<br />✓ Cole em qualquer lugar (mensagem, email, site)<br />✓ Ao clicar, o WhatsApp será aberto<br />✓ A mensagem pré-definida (se houver) já estará pronta</p>)
    },
    {
        title: "Dicas",
        type: "features" as const,
        content: (<p>✓ Teste o link antes de compartilhar<br />✓ Verifique se o número está correto<br />✓ Use mensagens curtas e objetivas<br />✓ Respeite a privacidade dos usuários</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>O uso deste link deve ser feito de acordo com os termos de serviço do WhatsApp. Não utilize para spam ou mensagens indesejadas.</p>)
    }
]

export default function ResultadoPage() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'Link do WhatsApp',
            href: '/geradores/whatsapp',
            current: false
        },
        {
            name: 'Resultado',
            href: '/geradores/whatsapp/resultado',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Resultado"
                title="Link do WhatsApp Gerado"
                description="Seu link do WhatsApp foi gerado com sucesso. Copie e compartilhe para iniciar uma conversa."
                breadcrumbs={breadcrumbs}
            />
            <Suspense fallback={<LoadingResult />}>
                <ResultClient
                    title="Link do WhatsApp"
                    description="Copie o link abaixo para iniciar uma conversa no WhatsApp"
                    notFoundTitle="Link Não Gerado"
                    notFoundDescription="Não foi possível gerar o link do WhatsApp."
                    notFoundMessage="Verifique se o número de telefone está correto e tente novamente."
                    infoTitle="Informações Importantes"
                    infoMessage="O link gerado abrirá o WhatsApp Web ou o aplicativo do WhatsApp."
                    resultLabel="Link do WhatsApp"
                    backPath="/geradores/whatsapp"
                    buttonText="Gerar Novo Link"
                    multipleParams={{ 
                        enabled: true, 
                        params: [
                            { name: "url", label: "Link do WhatsApp" }
                        ]
                    }}
                />
            </Suspense>
            <InfoSection items={infoItems} />
            
            <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Gerador de Link do WhatsApp",
                    "applicationCategory": "UtilityApplication",
                    "operatingSystem": "Web",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "BRL"
                    },
                    "mainEntity": {
                        "@type": "Thing",
                        "name": "Link do WhatsApp",
                        "description": "Link gerado para iniciar conversas no WhatsApp"
                    }
                })
            }} />
        </>
    );
} 