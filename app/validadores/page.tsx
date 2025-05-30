import Header from "@/components/layout/Header";
import ShortcutsSection from "@/components/layout/ShortcutsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Validadores de Dados | TW Tools",
    description: "Valide dados com nossos validadores online. Verifique CPF, CNPJ, RG, CNH e muito mais.",
};

export default function Validadores() {
    const breadcrumbs = [
        {
            name: 'Validadores',
            href: '/validadores',
            current: true
        }
    ];

    return (
        <div>
            <Header
                miniTitle="Validadores de Dados"
                title="Valide dados com nossos validadores online."
                description="Verifique CPF, CNPJ, RG, CNH e muito mais."
                breadcrumbs={breadcrumbs}
            />
            <ShortcutsSection />
        </div>
    )
}
