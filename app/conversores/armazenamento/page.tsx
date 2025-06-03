import { Metadata } from "next";
import StorageConverter from "@/components/layout/converter/StorageConverter";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Conversor de Armazenamento Digital Online | Bits, Bytes, KB, MB, GB, TB | TW Tools",
    description: "Ferramenta gratuita para converter unidades de armazenamento digital entre bits, bytes, kilobytes, megabytes, gigabytes e terabytes. Conversão instantânea e precisa para uso em computação e tecnologia.",
    keywords: "conversor de armazenamento, bits para bytes, bytes para kilobytes, megabytes para gigabytes, conversão de armazenamento online, calculadora de armazenamento digital",
    alternates: {
        canonical: "https://tools.thetrinityweb.com.br/conversores/armazenamento",
    },
    openGraph: {
        title: "Conversor de Armazenamento Digital Online e Gratuito",
        description: "Converta facilmente entre diferentes unidades de armazenamento digital com precisão e rapidez.",
        url: "https://tools.thetrinityweb.com.br/conversores/armazenamento",
        siteName: "TW Tools",
        type: "website",
    },
};

const infoItems = [
    {
        title: "Sobre o Conversor de Armazenamento Digital",
        type: "info" as const,
        content: (<p>Nossa <strong>ferramenta gratuita de conversão de armazenamento digital</strong> permite converter valores entre bits (b), bytes (B), kilobytes (KB), megabytes (MB), gigabytes (GB) e terabytes (TB) de forma instantânea. Perfeita para profissionais de TI, estudantes de computação e qualquer pessoa que precise converter unidades de armazenamento com <strong>precisão e rapidez</strong>.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ <strong>Desenvolvimento de software</strong> e programação<br />✓ <strong>Administração de sistemas</strong> e redes<br />✓ <strong>Planejamento de armazenamento</strong> de dados<br />✓ <strong>Educação em computação</strong> e tecnologia<br />✓ <strong>Comparação de capacidades</strong> de dispositivos de armazenamento</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ <strong>Conversão instantânea</strong> entre todas as unidades de armazenamento<br />✓ <strong>Cálculos precisos</strong> com até 6 casas decimais<br />✓ <strong>Interface intuitiva</strong> e fácil de usar<br />✓ <strong>Processamento local</strong> sem envio de dados para servidores<br />✓ <strong>Resultados completos</strong> mostrando todas as conversões de uma vez<br />✓ <strong>Totalmente gratuito</strong> e sem limite de uso</p>)
    },
    {
        title: "Como Usar o Conversor",
        type: "usage" as const,
        content: (<p>1. Digite o valor que deseja converter<br />2. Selecione a unidade de origem (bit, byte, KB, MB, GB ou TB)<br />3. Selecione a unidade de destino<br />4. Clique em <strong>Converter</strong> para obter os resultados<br />5. Visualize os valores convertidos para todas as unidades<br />6. Copie os resultados com um clique</p>)
    },
    {
        title: "Unidades de Armazenamento",
        type: "info" as const,
        content: (<p><strong>Bit (b):</strong> Unidade básica de informação digital<br /><strong>Byte (B):</strong> 8 bits<br /><strong>Kilobyte (KB):</strong> 1.024 bytes<br /><strong>Megabyte (MB):</strong> 1.024 kilobytes<br /><strong>Gigabyte (GB):</strong> 1.024 megabytes<br /><strong>Terabyte (TB):</strong> 1.024 gigabytes</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta é fornecida gratuitamente e sem garantias. As conversões são calculadas com base em padrões binários (base 2) para unidades de armazenamento, onde 1 KB = 1.024 bytes. Para aplicações críticas, recomendamos sempre verificar os resultados.</p>)
    }
]

export default function ArmazenamentoPage() {
    const breadcrumbs = [
        {
            name: 'Conversores',
            href: '/conversores',
            current: false
        },
        {
            name: 'Armazenamento Digital',
            href: '/conversores/armazenamento',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Conversor Online Gratuito"
                title="Conversor de Armazenamento Digital"
                description="Ferramenta gratuita para converter unidades de armazenamento digital entre bits, bytes, kilobytes, megabytes, gigabytes e terabytes. Conversão instantânea e precisa para uso em computação e tecnologia."
                breadcrumbs={breadcrumbs}
            />
            <StorageConverter />
            <InfoSection items={infoItems} />
            
            {/* Schema.org structured data for SEO */}
            <Script id="schema-armazenamento" type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Conversor de Armazenamento Digital",
                    "description": "Ferramenta online gratuita para converter unidades de armazenamento digital entre bits, bytes, kilobytes, megabytes, gigabytes e terabytes.",
                    "url": "https://tools.thetrinityweb.com.br/conversores/armazenamento",
                    "applicationCategory": "Ferramenta de Conversão",
                    "operatingSystem": "Web",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "BRL"
                    },
                    "featureList": [
                        "Conversão entre bits, bytes, KB, MB, GB e TB",
                        "Cálculos precisos com até 6 casas decimais",
                        "Interface intuitiva e simples de usar",
                        "Processamento local sem envio de dados"
                    ]
                })
            }} />
        </>
    )
} 