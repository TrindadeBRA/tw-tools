import { Metadata } from "next";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "TW Tools - Ferramentas Online Gratuitas",
  description: 'Somos uma plataforma de ferramentas online para você criar, validar e gerar dados de forma rápida e fácil.',
};


export default function Home() {
  return (
    <>
      <Header
        miniTitle="TW Tools"
        title="Ferramentas Online Gratuitas"
        description="Coleção de ferramentas online gratuitas para desenvolvedores e testadores. Geradores de dados, validadores, formatadores e muito mais."
      />
    </>
  );
}
