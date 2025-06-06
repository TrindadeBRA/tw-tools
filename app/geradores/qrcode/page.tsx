import { Metadata } from "next";
import QRCodeGenerator from "@/components/layout/generator/QRCodeGenerator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Gerador de QR Code | TW Tools",
    description: "Gere QR Codes a partir de qualquer texto de forma rápida e fácil. Suporte para textos longos e caracteres especiais.",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>O Gerador de QR Code é uma ferramenta que permite criar códigos QR a partir de qualquer texto. QR Codes são códigos de barras bidimensionais que podem armazenar informações como URLs, textos, números de telefone e muito mais.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Compartilhar URLs de forma rápida<br />✓ Armazenar informações de contato<br />✓ Criar links para redes sociais<br />✓ Compartilhar textos curtos</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ Suporte a caracteres especiais<br />✓ Geração instantânea<br />✓ Interface simples e intuitiva<br />✓ Download do QR Code em alta qualidade</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta é fornecida apenas para fins informativos e educacionais. O usuário é responsável pelo conteúdo gerado e seu uso. Não nos responsabilizamos pelo uso indevido desta ferramenta.</p>)
    }
]

export default function QRCodePage() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'Gerador de QR Code',
            href: '/geradores/qrcode',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Gerador"
                title="Gerador de QR Code"
                description="Gere QR Codes a partir de qualquer texto de forma rápida e fácil"
                breadcrumbs={breadcrumbs}
            />
            <QRCodeGenerator />
            <InfoSection items={infoItems} />
        </>
    )
} 