import { Metadata } from "next";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import SevenZTestFiles from "@/components/layout/files/SevenZTestFiles";

export const metadata: Metadata = {
    title: "Arquivos .7Z para Teste | TW Tools",
    description: "Baixe arquivos .7Z de teste para suas necessidades de desenvolvimento e testes",
};

const infoItems = [
    {
        title: "Sobre os Arquivos",
        type: "info" as const,
        content: (<p>Esta seção oferece uma variedade de arquivos 7Z para teste, úteis para desenvolvimento e validação de sistemas.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Testes de upload de arquivos<br />✓ Validação de processamento de 7Z<br />✓ Testes de integração<br />✓ Verificação de compatibilidade</p>)
    },
    {
        title: "Diferenciais",
        type: "features" as const,
        content: (<p>✓ Arquivos de diferentes tamanhos<br />✓ Formatos padronizados<br />✓ Arquivos otimizados para teste</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Estes arquivos são fornecidos apenas para fins de teste. Não utilize em ambientes de produção ou para fins comerciais.</p>)
    }
]

export default function SevenZTestFilesPage() {
    const breadcrumbs = [
        {
            name: 'Arquivos de Teste',
            href: '/arquivos-testes',
            current: false
        },
        {
            name: '.7Z',
            href: '/arquivos-testes/7z',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Arquivos de Teste"
                title="Arquivos .7Z para Teste"
                description="Baixe arquivos .7Z de teste para suas necessidades de desenvolvimento e testes"
                breadcrumbs={breadcrumbs}
            />
            <SevenZTestFiles />
            <InfoSection items={infoItems} />
        </>
    )
}
