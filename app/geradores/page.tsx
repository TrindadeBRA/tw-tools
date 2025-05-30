import Header from "@/components/layout/Header";
import ShortcutsSection from "@/components/layout/ShortcutsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Geradores de Dados | TW Tools",
    description: "Crie dados aleatórios e personalizados com nossos geradores de dados. Gere CPF, CNPJ, RG, CNH, CEP, senhas e muito mais.",
};


export default function Geradores() {
    return (
        <div>
            <Header
                miniTitle="Geradores de Dados"
                title="Crie dados aleatórios e personalizados com nossos geradores de dados."
                description="Gere CPF, CNPJ, RG, CNH, CEP, senhas e muito mais."
            />
            <ShortcutsSection />
        </div>
    )
}
