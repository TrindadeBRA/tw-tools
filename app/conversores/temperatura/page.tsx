import { Metadata } from "next";
import TemperatureConverter from "@/components/layout/converter/TemperatureConverter";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Conversor de Temperatura Online | Celsius, Fahrenheit, Kelvin | TW Tools",
    description: "Ferramenta gratuita para converter temperaturas entre Celsius, Fahrenheit e Kelvin com precisão. Conversão instantânea para trabalhos científicos, culinária e uso diário.",
    keywords: "conversor de temperatura, celsius para fahrenheit, fahrenheit para celsius, kelvin, conversão de temperatura online, calculadora de temperatura",
    alternates: {
        canonical: "https://tools.thetrinityweb.com.br/conversores/temperatura",
    },
    openGraph: {
        title: "Conversor de Temperatura Online e Gratuito",
        description: "Converta facilmente entre Celsius, Fahrenheit e Kelvin com precisão e rapidez.",
        url: "https://tools.thetrinityweb.com.br/conversores/temperatura",
        siteName: "TW Tools",
        type: "website",
    },
};

const infoItems = [
    {
        title: "Sobre o Conversor de Temperatura",
        type: "info" as const,
        content: (<p>Nossa <strong>ferramenta gratuita de conversão de temperatura</strong> permite converter valores entre as escalas Celsius (°C), Fahrenheit (°F) e Kelvin (K) de forma instantânea. Perfeita para estudantes, profissionais, cozinheiros e qualquer pessoa que precise converter temperaturas com <strong>precisão e rapidez</strong>.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ <strong>Trabalhos acadêmicos e científicos</strong> que exigem conversões precisas<br />✓ <strong>Receitas culinárias</strong> com temperaturas em diferentes unidades<br />✓ <strong>Viagens internacionais</strong> para entender previsões meteorológicas<br />✓ <strong>Configuração de equipamentos</strong> com diferentes escalas de temperatura<br />✓ <strong>Educação e ensino</strong> de física e química</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ <strong>Conversão instantânea</strong> entre as três principais escalas de temperatura<br />✓ <strong>Cálculos precisos</strong> com até 4 casas decimais<br />✓ <strong>Interface intuitiva</strong> e fácil de usar<br />✓ <strong>Processamento local</strong> sem envio de dados para servidores<br />✓ <strong>Resultados completos</strong> mostrando todas as conversões de uma vez<br />✓ <strong>Totalmente gratuito</strong> e sem limite de uso</p>)
    },
    {
        title: "Como Usar o Conversor",
        type: "usage" as const,
        content: (<p>1. Digite o valor da temperatura que deseja converter<br />2. Selecione a unidade de origem (Celsius, Fahrenheit ou Kelvin)<br />3. Clique em <strong>Converter</strong> para obter os resultados<br />4. Visualize os valores convertidos para todas as unidades<br />5. Copie os resultados com um clique</p>)
    },
    {
        title: "Fórmulas de Conversão",
        type: "info" as const,
        content: (<p><strong>Celsius para Fahrenheit:</strong> °F = (°C × 9/5) + 32<br /><strong>Celsius para Kelvin:</strong> K = °C + 273.15<br /><strong>Fahrenheit para Celsius:</strong> °C = (°F - 32) × 5/9<br /><strong>Fahrenheit para Kelvin:</strong> K = (°F - 32) × 5/9 + 273.15<br /><strong>Kelvin para Celsius:</strong> °C = K - 273.15<br /><strong>Kelvin para Fahrenheit:</strong> °F = (K - 273.15) × 9/5 + 32</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta é fornecida gratuitamente e sem garantias. As conversões são calculadas com base em fórmulas matemáticas padrão, mas recomendamos sempre verificar os resultados para aplicações críticas ou científicas.</p>)
    }
]

export default function TemperaturaPage() {
    return (
        <>
            <Header
                miniTitle="Conversor Online Gratuito"
                title="Conversor de Temperatura"
                description="Ferramenta gratuita para converter valores de temperatura entre Celsius, Fahrenheit e Kelvin. Conversão instantânea e precisa para uso em estudos, trabalhos científicos, receitas e mais."
            />
            <TemperatureConverter />
            <InfoSection items={infoItems} />
            
            {/* Schema.org structured data for SEO */}
            <Script id="schema-temperatura" type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Conversor de Temperatura",
                    "description": "Ferramenta online gratuita para converter temperaturas entre Celsius, Fahrenheit e Kelvin.",
                    "url": "https://tools.thetrinityweb.com.br/conversores/temperatura",
                    "applicationCategory": "Ferramenta de Conversão",
                    "operatingSystem": "Web",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "BRL"
                    },
                    "featureList": [
                        "Conversão entre Celsius, Fahrenheit e Kelvin",
                        "Cálculos precisos com até 4 casas decimais",
                        "Interface intuitiva e simples de usar",
                        "Processamento local sem envio de dados"
                    ]
                })
            }} />
        </>
    )
} 