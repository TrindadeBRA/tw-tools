import Header from "@/components/layout/Header";
import ShortcutsSection from "@/components/layout/ShortcutsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Conversores de Dados | TW Tools",
    description: "Converta dados entre diferentes formatos com nossos conversores online. Converta temperatura, números por extenso e muito mais.",
};

export default function Conversores() {
    const breadcrumbs = [
        {
            name: 'Conversores',
            href: '/conversores',
            current: true
        }
    ];

    return (
        <div>
            <Header
                miniTitle="Conversores de Dados"
                title="Converta dados entre diferentes formatos com nossos conversores online."
                description="Converta temperatura, números por extenso e muito mais."
                breadcrumbs={breadcrumbs}
            />
            <ShortcutsSection />
        </div>
    )
}
