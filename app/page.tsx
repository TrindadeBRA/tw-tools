import { Metadata } from "next";
import Hero from "@/components/layout/Hero";
import ShortcutsSection from "@/components/layout/ShortcutsSection";
import { arquivosRoutes, calculadorasRoutes, conversoresRoutes, geradoresRoutes, validadoresRoutes } from "@/components/layout/Sidebar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "TW Tools - Ferramentas Online Gratuitas",
  description: 'Somos uma plataforma de ferramentas online para você criar, validar e gerar dados de forma rápida e fácil.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <div className="flex flex-col gap-y-4">
        <ShortcutsSection routes={arquivosRoutes} hideDescription={true} />
        <ShortcutsSection routes={calculadorasRoutes} hideDescription={true} />
        <ShortcutsSection routes={conversoresRoutes} hideDescription={true} />
        <ShortcutsSection routes={geradoresRoutes} hideDescription={true} />
        <ShortcutsSection routes={validadoresRoutes} hideDescription={true} />
      </div>

      {/* Schema.org structured data for SEO */}
      <Script id="schema-homepage" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "TW Tools",
          "description": "Plataforma de ferramentas online gratuitas para criar, validar e gerar dados",
          "url": "https://tools.thetrinityweb.com.br",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://tools.thetrinityweb.com.br/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "BRL",
            "price": "0",
            "availability": "https://schema.org/InStock"
          }
        })
      }} />
    </>
  );
}
