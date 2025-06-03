import Header from "@/components/layout/Header";
import ShortcutsSection from "@/components/layout/ShortcutsSection";
import { arquivosRoutes } from "@/components/layout/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Arquivos de Teste | TW Tools",
    description: "Arquivos de teste para download. Arquivos PDF, DOCX e muito mais.",
};

export default function Validadores() {
    
    const breadcrumbs = [
        {
            name: 'Arquivos de Teste',
            href: '/arquivos-testes',
            current: true
        }
    ];

    return (
        <div>
            <Header
                miniTitle="Arquivos de Teste"
                title="Arquivos de teste para download."
                description="Arquivos PDF, DOCX e muito mais."
                breadcrumbs={breadcrumbs}
            />
            <ShortcutsSection routes={arquivosRoutes} />
        </div>
    )
}
