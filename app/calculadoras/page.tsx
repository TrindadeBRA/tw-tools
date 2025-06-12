import Header from "@/components/layout/Header";
import ShortcutsSection from "@/components/layout/ShortcutsSection";
import { calculadorasRoutes } from "@/components/layout/Sidebar";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Calculadoras Online Gratuitas | Cálculos Precisos e Rápidos - TW Tools",
    description: "Ferramentas gratuitas para cálculos matemáticos, financeiros, IMC, combustível, horas e muito mais. Resultados precisos e instantâneos para suas necessidades diárias.",
    keywords: "calculadora online, calculadora grátis, cálculos matemáticos, cálculos financeiros, calculadora imc, calculadora combustível",
    alternates: {
        canonical: "https://tools.thetrinityweb.com.br/calculadoras",
    },
    openGraph: {
        title: "Calculadoras Online Gratuitas | TW Tools",
        description: "Ferramentas precisas para cálculos matemáticos, financeiros e mais. Resultados instantâneos e confiáveis.",
        url: "https://tools.thetrinityweb.com.br/calculadoras",
        siteName: "TW Tools",
        type: "website",
    },
};

export default function Calculadoras() {
    const breadcrumbs = [
        {
            name: 'Calculadoras',
            href: '/calculadoras',
            current: true
        }
    ];

    return (
        <div>
            <Header
                miniTitle="Calculadoras Online"
                title="Calculadoras Online Gratuitas e Precisas"
                description="Realize cálculos matemáticos, financeiros, IMC, combustível, horas e muito mais com nossas ferramentas profissionais. Resultados precisos e instantâneos para suas necessidades pessoais e profissionais."
                breadcrumbs={breadcrumbs}
            />
            <ShortcutsSection routes={calculadorasRoutes} />

            {/* Schema.org structured data for SEO */}
            <Script id="schema-calculadoras" type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Calculadoras Online Gratuitas",
                    "description": "Conjunto de ferramentas gratuitas para cálculos matemáticos, financeiros, IMC, combustível e mais",
                    "url": "https://tools.thetrinityweb.com.br/calculadoras",
                    "hasPart": calculadorasRoutes.map(route => ({
                        "@type": "WebApplication",
                        "name": route.name,
                        "description": route.description,
                        "url": `https://tools.thetrinityweb.com.br${route.href}`,
                        "applicationCategory": "CalculatorApplication",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "BRL"
                        }
                    })),
                    "offers": {
                        "@type": "AggregateOffer",
                        "priceCurrency": "BRL",
                        "price": "0",
                        "availability": "https://schema.org/InStock"
                    }
                })
            }} />
        </div>
    )
}
