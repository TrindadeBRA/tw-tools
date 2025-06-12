import { Metadata } from "next";
import { Suspense } from "react";
import ImageResultClient from "@/components/layout/result/ImageResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Sua Imagem Gerada | Download e Compartilhamento - TW Tools",
    description: "Visualize, baixe e compartilhe sua imagem personalizada. Imagem gerada em alta qualidade, pronta para uso em redes sociais, apresentações e mais. Download instantâneo e gratuito.",
    keywords: "baixar imagem gerada, compartilhar imagem, download imagem personalizada, imagem para redes sociais, thumbnail personalizado, imagem com texto",
};

const infoItems = [
    {
        title: "Sobre este Resultado",
        type: "info" as const,
        content: (<p>Sua imagem foi gerada com sucesso e está pronta para uso! Você pode baixá-la diretamente em seu dispositivo ou copiar o link para compartilhar em qualquer lugar. A imagem foi gerada em alta qualidade e está otimizada para uso em diferentes plataformas. Use-a em suas redes sociais, apresentações, blogs ou qualquer outro projeto que precise de uma imagem personalizada com texto.</p>)
    },
    {
        title: "Como Utilizar",
        type: "usage" as const,
        content: (<p>✓ Clique em 'Baixar Imagem' para salvar a imagem em seu dispositivo<br />✓ Use o botão 'Copiar Link' para compartilhar a imagem em qualquer lugar<br />✓ Compartilhe diretamente nas redes sociais (Instagram, Facebook, Twitter)<br />✓ Use a imagem em apresentações do PowerPoint ou Google Slides<br />✓ Adicione a imagem em seus documentos e projetos<br />✓ Utilize como thumbnail em seus vídeos do YouTube</p>)
    },
    {
        title: "Próximos Passos",
        type: "features" as const,
        content: (<p>✓ Edite a imagem em um editor de imagens se precisar de ajustes adicionais<br />✓ Otimize a imagem para web se for usá-la em um site (compressão)<br />✓ Verifique se o texto está legível no tamanho escolhido<br />✓ Mantenha uma cópia de backup da imagem<br />✓ Considere gerar diferentes versões para diferentes plataformas<br />✓ Verifique as dimensões antes de usar em plataformas específicas</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>As imagens geradas são de uso livre para fins pessoais e comerciais. No entanto, recomendamos verificar os direitos de uso do texto inserido. Esta ferramenta é fornecida apenas para fins educacionais e de demonstração. Ao utilizar a imagem gerada, você concorda em não usá-la para fins ilegais ou ofensivos. A ferramenta não se responsabiliza pelo uso indevido das imagens geradas.</p>)
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
            name: 'Gerador de Imagem',
            href: '/geradores/imagem',
            current: false
        },
        {
            name: 'Resultado',
            href: '/geradores/imagem/resultado',
            current: true
        }
    ];

    // Verificar se há erro na requisição - MÉTODO SEGURO PARA SSR
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const hasError = searchParams.get('error') === 'true';
    
    // Extrair valores para uso no Schema.org
    const imageData = searchParams.get('image') || '';
    const text = searchParams.get('text') || '';
    const color = searchParams.get('color') || '';
    const size = searchParams.get('size') || '';
    
    return (
        <>
            <Header
                miniTitle="Resultado"
                title="Sua Imagem Personalizada"
                description="Sua imagem foi gerada com sucesso! Baixe ou compartilhe sua criação em alta qualidade, pronta para uso em redes sociais, apresentações e mais."
                breadcrumbs={breadcrumbs}
            />
            <Suspense fallback={<LoadingResult />}>
                <ImageResultClient
                    title="Sua Imagem Personalizada"
                    description="A imagem foi gerada com sucesso! Você pode baixá-la ou compartilhar o link para usar em qualquer lugar."
                    notFoundTitle="Imagem Não Gerada"
                    notFoundDescription={hasError ? "Ocorreu um erro ao gerar sua imagem." : "Não foi possível gerar a imagem."}
                    notFoundMessage={hasError ? "Verifique se os dados informados são válidos e tente novamente." : "Verifique os dados e tente novamente."}
                    infoTitle="Informações da Imagem"
                    infoMessage="Detalhes sobre a imagem gerada:"
                    resultLabel="Link da Imagem"
                    backPath="/geradores/imagem"
                    buttonText="Gerar Nova Imagem"
                    multipleParams={{ 
                        enabled: true, 
                        params: [
                            { name: "image", label: "Imagem" },
                            { name: "text", label: "Texto" },
                            { name: "color", label: "Cor" },
                            { name: "size", label: "Tamanho" }
                        ]
                    }}
                />
            </Suspense>
            <InfoSection items={infoItems} />
            
            {/* Schema.org structured data for SEO - apenas quando houver resultado */}
            {!hasError && imageData && (
                <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Gerador de Imagem - Resultado",
                        "applicationCategory": "UtilityApplication",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "BRL"
                        },
                        "mainEntity": {
                            "@type": "ImageObject",
                            "contentUrl": imageData,
                            "description": `Imagem personalizada gerada com texto "${text}" em ${color}, tamanho ${size}`,
                            "name": "Imagem Personalizada com Texto",
                            "encodingFormat": "image/png"
                        }
                    })
                }} />
            )}
        </>
    );
} 