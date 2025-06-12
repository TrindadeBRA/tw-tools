import { Metadata } from "next";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import JSONTestFiles from "@/components/layout/files/JSONTestFiles";

export const metadata: Metadata = {
    title: "Arquivos .JSON para Teste | TW Tools",
    description: "Baixe arquivos .JSON de teste para suas necessidades de desenvolvimento e testes",
};

const infoItems = [
    {
        title: "Sobre os Arquivos",
        type: "info" as const,
        content: (<p>Esta seção oferece uma variedade de arquivos JSON para teste, úteis para desenvolvimento e validação de sistemas.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Testes de API<br />✓ Validação de processamento de JSON<br />✓ Testes de integração<br />✓ Verificação de compatibilidade</p>)
    },
    {
        title: "Diferenciais",
        type: "features" as const,
        content: (<p>✓ Arquivos com diferentes estruturas<br />✓ JSONs com diferentes níveis de complexidade<br />✓ Formatos padronizados<br />✓ Arquivos otimizados para teste</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Estes arquivos são fornecidos apenas para fins de teste. Não utilize em ambientes de produção ou para fins comerciais.</p>)
    }
]

export default function JSONTestFilesPage() {
    const breadcrumbs = [
        {
            name: 'Arquivos de Teste',
            href: '/arquivos-testes',
            current: false
        },
        {
            name: '.JSON',
            href: '/arquivos-testes/json',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Arquivos de Teste"
                title="Arquivos .JSON para Teste"
                description="Baixe arquivos .JSON de teste para suas necessidades de desenvolvimento e testes"
                breadcrumbs={breadcrumbs}
            />
            <JSONTestFiles />
            <InfoSection items={infoItems} />
        </>
    )
} 