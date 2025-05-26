import { Metadata } from "next";
import NumberInWords from "@/components/layout/generator/NumberInWords";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Conversor de Números por Extenso em Português | Valores em Reais | TW Tools",
    description: "Ferramenta gratuita para converter números em palavras por extenso em português. Escreva valores em reais ou números simples. Ideal para documentos oficiais, contratos, cheques e textos formais.",
    keywords: "número por extenso, converter número para texto, escrever valores por extenso, valor por extenso em reais, número em português por extenso, gerador de texto por extenso",
    alternates: {
        canonical: "https://tools.thetrinityweb.com.br/conversores/numero-por-extenso",
    },
    openGraph: {
        title: "Conversor de Número por Extenso Online e Gratuito",
        description: "Converta qualquer número ou valor monetário para texto por extenso em português. Ideal para documentos, contratos e cheques.",
        url: "https://tools.thetrinityweb.com.br/conversores/numero-por-extenso",
        siteName: "TW Tools",
        type: "website",
    },
};

const infoItems = [
    {
        title: "Sobre a Ferramenta de Número por Extenso",
        type: "info" as const,
        content: (<p>Nossa ferramenta <strong>gratuita de Número por Extenso</strong> converte qualquer valor numérico para sua forma escrita por extenso em português do Brasil. Perfeita para documentos oficiais, contratos, cheques e situações que exigem valores escritos por extenso. Compatível com <strong>valores monetários em reais (R$)</strong> e <strong>números simples</strong> de até 15 dígitos.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ <strong>Documentos legais e contratos</strong> que exigem valores por extenso<br />✓ <strong>Cheques e documentos financeiros</strong> com valores em reais<br />✓ <strong>Material educativo e acadêmico</strong> que necessitam de números escritos<br />✓ <strong>Documentos oficiais e cartoriais</strong> com exigência legal<br />✓ <strong>Propostas comerciais e orçamentos</strong> para melhor apresentação</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ <strong>Conversão para valores monetários em reais (R$)</strong> com centavos<br />✓ <strong>Conversão para números simples</strong> até trilhões<br />✓ <strong>Opções de formatação</strong> de texto (maiúsculas, minúsculas, primeira maiúscula)<br />✓ <strong>Processamento rápido e seguro</strong> sem envio para servidores<br />✓ <strong>Atualização em tempo real</strong> para conferência imediata<br />✓ <strong>Totalmente gratuito</strong> e sem limite de uso</p>)
    },
    {
        title: "Como Usar a Ferramenta",
        type: "usage" as const,
        content: (<p>1. Selecione o tipo de unidade (<strong>Monetária para reais</strong> ou <strong>Numérica para números simples</strong>)<br />2. Escolha o formato de texto desejado (<strong>minúsculas, MAIÚSCULAS ou Primeira maiúscula</strong>)<br />3. Digite o valor numérico que deseja converter<br />4. Clique em <strong>Converter</strong> para obter o resultado<br />5. Copie o texto gerado para usar em seus documentos</p>)
    },
    {
        title: "Exemplos de Conversão",
        type: "info" as const,
        content: (<p><strong>R$ 1.250,75</strong> → mil duzentos e cinquenta reais e setenta e cinco centavos<br /><strong>42.968</strong> → quarenta e dois mil novecentos e sessenta e oito<br /><strong>R$ 1.000.000,00</strong> → um milhão de reais<br /><strong>3,5</strong> → três vírgula cinco</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta é fornecida gratuitamente e sem garantias. Recomendamos sempre verificar os resultados para uso em documentos oficiais. A responsabilidade pelo uso correto do texto gerado é do usuário.</p>)
    }
]

export default function NumeroPorExtensoPage() {
    return (
        <>
            <Header
                miniTitle="Conversor Online Gratuito"
                title="Número por Extenso em Português"
                description="Ferramenta gratuita para escrever números por extenso em português. Digite o número ou valor em reais e convertemos automaticamente para texto por extenso, ideal para documentos oficiais, contratos e cheques."
            />
            <NumberInWords />
            <InfoSection items={infoItems} />
            
            {/* Schema.org structured data for SEO */}
            <Script id="schema-numero-extenso" type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Conversor de Números por Extenso",
                    "description": "Ferramenta online gratuita para converter números e valores monetários em texto por extenso em português do Brasil.",
                    "url": "https://tools.thetrinityweb.com.br/conversores/numero-por-extenso",
                    "applicationCategory": "Ferramenta de Texto",
                    "operatingSystem": "Web",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "BRL"
                    },
                    "featureList": [
                        "Conversão de números para texto em português",
                        "Conversão de valores monetários em reais",
                        "Diferentes formatos de texto (maiúsculas, minúsculas)",
                        "Processamento rápido e seguro"
                    ]
                })
            }} />
        </>
    )
} 