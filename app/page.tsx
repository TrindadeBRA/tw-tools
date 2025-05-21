import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TW Tools - Ferramentas Online Gratuitas",
  description: "Coleção de ferramentas online gratuitas para desenvolvedores e testadores. Geradores de dados, validadores, formatadores e muito mais.",
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
