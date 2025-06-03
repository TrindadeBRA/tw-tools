import { Metadata } from "next";
import Hero from "@/components/layout/Hero";
import ShortcutsSection from "@/components/layout/ShortcutsSection";
import { arquivosRoutes, calculadorasRoutes, conversoresRoutes, geradoresRoutes, validadoresRoutes } from "@/components/layout/Sidebar";

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
    </>
  );
}
