import Header from "@/components/layout/Header";
import ShortcutsSection from "@/components/layout/ShortcutsSection";
import { calculadorasRoutes } from "@/components/layout/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Calculadoras Online | TW Tools",
    description: "Calculadoras online para cálculos matemáticos, financeiros, de datas e muito mais.",
};

export default function Validadores() {
    
    const breadcrumbs = [
        {
            name: 'Calculadoras',
            href: '/calculadoras',
            current: true
        }
    ];

    return (
        <div>
            <Header
                miniTitle="Calculadoras Online"
                title="Calculadoras online para cálculos matemáticos, financeiros, de datas e muito mais."
                description="Calculadoras online para cálculos matemáticos, financeiros, de datas e muito mais."
                breadcrumbs={breadcrumbs}
            />
            <ShortcutsSection routes={calculadorasRoutes} />
        </div>
    )
}
