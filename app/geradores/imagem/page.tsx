import { Metadata } from "next";
import ImageGenerator from "@/components/layout/generator/ImageGenerator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Gerador de Imagem com Texto | Crie Imagens Personalizadas Online - TW Tools",
    description: "Crie imagens personalizadas com texto online. Escolha cores, tamanhos e gere imagens para redes sociais, thumbnails e apresentações. Ferramenta gratuita e fácil de usar.",
    keywords: "gerador de imagem, criador de imagem com texto, gerador de thumbnail, imagem personalizada, gerador de imagem online, criar imagem com texto, gerador de imagem para redes sociais",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>O Gerador de Imagem é uma ferramenta online gratuita que permite criar imagens personalizadas com texto de forma rápida e profissional. Com opções de personalização de cores e tamanhos, você pode criar imagens perfeitas para diversos fins, desde thumbnails para vídeos até posts para redes sociais. Nossa ferramenta é intuitiva e não requer conhecimentos técnicos, permitindo que qualquer pessoa crie imagens de qualidade em segundos.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Criação de thumbnails profissionais para vídeos do YouTube<br />✓ Imagens otimizadas para posts em redes sociais (Instagram, Facebook, Twitter)<br />✓ Logos temporários para projetos e apresentações<br />✓ Imagens para slides e apresentações corporativas<br />✓ Banners simples para blogs e sites<br />✓ Cards de informação para infográficos</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ Interface intuitiva e amigável para todos os usuários<br />✓ Múltiplas opções de cores para personalização<br />✓ Diferentes tamanhos de imagem para diversos usos<br />✓ Download instantâneo em formato PNG de alta qualidade<br />✓ Geração rápida e sem necessidade de registro<br />✓ Compatível com todos os dispositivos e navegadores<br />✓ Sem marca d'água nas imagens geradas</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta é fornecida apenas para fins educacionais e de demonstração. As imagens geradas são de uso livre para fins pessoais e comerciais, mas recomendamos verificar os direitos de uso do texto inserido. Ao utilizar esta ferramenta, você concorda em não gerar conteúdo ofensivo, ilegal ou que viole direitos autorais. A ferramenta não se responsabiliza pelo uso indevido das imagens geradas.</p>)
    }
]

export default function ImageGeneratorPage() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'Gerador de Imagem',
            href: '/geradores/imagem',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Gerador de Imagem"
                title="Crie Imagens Personalizadas com Texto"
                description="Gere imagens profissionais com texto personalizado em segundos. Escolha entre diferentes cores, tamanhos e crie imagens perfeitas para redes sociais, thumbnails e apresentações. Ferramenta gratuita, online e fácil de usar."
                breadcrumbs={breadcrumbs}
            />
            <ImageGenerator />
            <InfoSection items={infoItems} />
        </>
    )
} 