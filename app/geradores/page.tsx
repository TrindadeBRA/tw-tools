import Header from "@/components/layout/Header";
import ShortcutsSection from "@/components/layout/ShortcutsSection";
import { geradoresRoutes } from "@/components/layout/Sidebar";
import { Metadata } from "next";
import Script from "next/script";
import { RouteGroup, SubNavItem } from "@/types/routes";

export const metadata: Metadata = {
    title: "Geradores de Dados | TW Tools",
    description: "Crie dados aleatórios e personalizados com nossos geradores de dados. Gere CPF, CNPJ, RG, CNH, CEP, senhas e muito mais.",
    keywords: "gerador de dados, gerador online, criar dados, dados aleatórios, gerador cpf, gerador cnpj",
    alternates: {
        canonical: "https://tools.thetrinityweb.com.br/geradores",
    },
    openGraph: {
        title: "Geradores de Dados Online | TW Tools",
        description: "Crie dados personalizados com nossos geradores. CPF, CNPJ, RG, CNH e mais.",
        url: "https://tools.thetrinityweb.com.br/geradores",
        siteName: "TW Tools",
        type: "website",
    },
};

export default function Geradores() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: true
        }
    ];

    // Filter out items with shortcutHidden flag
    const visibleRoutes = {
        ...geradoresRoutes,
        children: geradoresRoutes.children.filter((route: SubNavItem) => !route.shortcutHidden)
    } as RouteGroup;

    return (
        <div>
            <Header
                miniTitle="Geradores Online"
                title="Geradores de Dados Gratuitos e Precisos"
                description="Crie dados aleatórios e personalizados com nossas ferramentas profissionais. Gere CPF, CNPJ, RG, CNH, CEP, senhas e muito mais."
                breadcrumbs={breadcrumbs}
            />
            <ShortcutsSection routes={visibleRoutes} />

            {/* Schema.org structured data for SEO */}
            <Script id="schema-geradores" type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Geradores de Dados Online",
                    "description": "Ferramentas gratuitas para gerar dados aleatórios e personalizados como CPF, CNPJ, RG, CNH, CEP, senhas e mais",
                    "url": "https://tools.thetrinityweb.com.br/geradores",
                    "hasPart": visibleRoutes.children.map(route => ({
                        "@type": "WebApplication",
                        "name": route.name,
                        "description": route.description || `Gerador de ${route.name.replace('Gerador de ', '')}`,
                        "url": `https://tools.thetrinityweb.com.br${route.href}`,
                        "applicationCategory": "GeneratorApplication",
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
