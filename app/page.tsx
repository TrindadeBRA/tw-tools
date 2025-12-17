import { Metadata } from "next";
import Hero from "@/components/layout/Hero";
import ShortcutsSection from "@/components/layout/ShortcutsSection";
import ExtensionSection from "@/components/layout/ExtensionSection";
import { arquivosRoutes, calculadorasRoutes, conversoresRoutes, countTools, geradoresRoutes, validadoresRoutes } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "TW Tools - Ferramentas Online Gratuitas",
  description: 'Somos uma plataforma de ferramentas online para você criar, validar e gerar dados de forma rápida e fácil.',
};


export default function Home() {
  return (
    <>
      <Hero />
      <ExtensionSection />
      <div className="flex flex-col gap-y-4">
        <h2 className="text-xl font-bold mb-4 text-gray-900">{countTools} ferramentas gratuitas para impulsionar seu trabalho!</h2>
        <ShortcutsSection routes={arquivosRoutes} hideDescription={true} />
        <ShortcutsSection routes={calculadorasRoutes} hideDescription={true} />
        <ShortcutsSection routes={conversoresRoutes} hideDescription={true} />
        <ShortcutsSection routes={geradoresRoutes} hideDescription={true} />
        <ShortcutsSection routes={validadoresRoutes} hideDescription={true} />
      </div>
    </>
  );
}
