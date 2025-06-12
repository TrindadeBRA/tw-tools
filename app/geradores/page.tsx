import Header from "@/components/layout/Header";
import ShortcutsSection from "@/components/layout/ShortcutsSection";
import { geradoresRoutes } from "@/components/layout/Sidebar";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Geradores de Dados | TW Tools",
    description: "Crie dados aleatórios e personalizados com nossos geradores de dados. Gere CPF, CNPJ, RG, CNH, CEP, senhas e muito mais.",
};

export default function Geradores() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: true
        }
    ];

    return (
        <div>
            <Header
                miniTitle="Geradores de Dados"
                title="Crie dados aleatórios e personalizados com nossos geradores de dados."
                description="Gere CPF, CNPJ, RG, CNH, CEP, senhas e muito mais."
                breadcrumbs={breadcrumbs}
            />
            <ShortcutsSection routes={geradoresRoutes} />

            {/* Schema.org structured data for SEO */}
            <Script id="schema-geradores" type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Geradores de Dados Online",
                    "description": "Ferramentas gratuitas para gerar dados aleatórios e personalizados como CPF, CNPJ, RG, CNH, CEP, senhas e mais",
                    "url": "https://tools.thetrinityweb.com.br/geradores",
                    "hasPart": geradoresRoutes.map(route => ({
                        "@type": "WebPage",
                        "name": route.name,
                        "description": route.description,
                        "url": `https://tools.thetrinityweb.com.br${route.href}`
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
