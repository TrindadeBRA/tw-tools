import { Metadata } from "next";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import DOCXTestFiles from "@/components/layout/files/DOCXTestFiles";

export const metadata: Metadata = {
    title: "Arquivos .DOCX para Teste | TW Tools",
    description: "Baixe arquivos .DOCX de teste para suas necessidades de desenvolvimento e testes",
};

const infoItems = [
    {
        title: "Sobre os Arquivos",
        type: "info" as const,
        content: (<p>Esta seção oferece uma variedade de arquivos DOCX para teste, úteis para desenvolvimento e validação de sistemas.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Testes de upload de arquivos<br />✓ Validação de processamento de DOCX<br />✓ Testes de integração<br />✓ Verificação de compatibilidade</p>)
    },
    {
        title: "Diferenciais",
        type: "features" as const,
        content: (<p>✓ Arquivos de diferentes tamanhos<br />✓ DOCXs com diferentes características<br />✓ Formatos padronizados<br />✓ Arquivos otimizados para teste</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Estes arquivos são fornecidos apenas para fins de teste. Não utilize em ambientes de produção ou para fins comerciais.</p>)
    }
]

export default function DOCXTestFilesPage() {
    const breadcrumbs = [
        {
            name: 'Arquivos de Teste',
            href: '/arquivos-testes',
            current: false
        },
        {
            name: '.DOCX',
            href: '/arquivos-testes/docx',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Arquivos de Teste"
                title="Arquivos .DOCX para Teste"
                description="Baixe arquivos .DOCX de teste para suas necessidades de desenvolvimento e testes"
                breadcrumbs={breadcrumbs}
            />
            <DOCXTestFiles />
            <InfoSection items={infoItems} />
        </>
    )
} 