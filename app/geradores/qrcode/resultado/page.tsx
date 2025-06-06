import { Metadata } from "next";
import { Suspense } from "react";
import QRCodeResult from "@/components/layout/result/QRCodeResult";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resultado do QR Code | TW Tools",
  description: "Visualize e baixe seu QR Code gerado",
};

const infoItems = [
    {
        title: "Sobre este Resultado",
        type: "info" as const,
        content: (<p>O QR Code gerado pode ser escaneado por qualquer aplicativo de leitura de QR Code. O código contém o texto que você inseriu e pode ser usado para compartilhar informações rapidamente.</p>)
    },
    {
        title: "Como Utilizar",
        type: "usage" as const,
        content: (<p>✓ Escaneie o QR Code com seu smartphone<br />✓ Baixe a imagem para uso posterior<br />✓ Compartilhe o link desta página<br />✓ Teste o QR Code antes de usar</p>)
    },
    {
        title: "Próximos Passos",
        type: "features" as const,
        content: (<p>✓ Teste o QR Code com seu smartphone<br />✓ Baixe a imagem em alta qualidade<br />✓ Compartilhe com outras pessoas<br />✓ Gere um novo QR Code se necessário</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>O QR Code gerado é de sua responsabilidade. Certifique-se de que o conteúdo é apropriado e não viola direitos autorais ou leis locais.</p>)
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
      name: 'Gerador de QR Code',
      href: '/geradores/qrcode',
      current: false
    },
    {
      name: 'Resultado',
      href: '/geradores/qrcode/resultado',
      current: true
    }
  ];

  return (
    <>
      <Header
        miniTitle="Resultado"
        title="Seu QR Code"
        description="Visualize e baixe seu QR Code gerado"
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <QRCodeResult />
      </Suspense>
      <InfoSection items={infoItems} />
      
      <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Gerador de QR Code - Resultado",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
          },
          "mainEntity": {
            "@type": "Thing",
            "name": "QR Code Gerado",
            "description": "QR Code gerado a partir do texto fornecido"
          }
        })
      }} />
    </>
  );
} 