import { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import DownloadClient from "@/components/layout/files/DownloadClient";
import LoadingResult from "@/components/layout/LoadingResult";

export const metadata: Metadata = {
    title: "Download Concluído | Arquivos .DOCX para Teste - TW Tools",
    description: "Confirmação de download de arquivo .DOCX de teste",
};

const infoItems = [
    {
        title: "Sobre o Download",
        type: "info" as const,
        content: (<p>O download do arquivo foi iniciado com sucesso. Verifique sua pasta de downloads.</p>)
    },
    {
        title: "Próximos Passos",
        type: "usage" as const,
        content: (<p>✓ Verifique se o arquivo foi baixado corretamente<br />✓ Teste o arquivo em seu ambiente<br />✓ Verifique a integridade do arquivo</p>)
    },
    {
        title: "Dicas de Uso",
        type: "features" as const,
        content: (<p>✓ Mantenha os arquivos em uma pasta de teste separada<br />✓ Não use em ambientes de produção<br />✓ Faça backup antes de testar</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Estes arquivos são fornecidos apenas para fins de teste. Não utilize em ambientes de produção ou para fins comerciais.</p>)
    }
]

export default function DownloadPage() {
    const breadcrumbs = [
        {
            name: 'Arquivos de Teste',
            href: '/arquivos-testes',
            current: false
        },
        {
            name: '.DOCX',
            href: '/arquivos-testes/docx',
            current: false
        },
        {
            name: 'Download',
            href: '/arquivos-testes/docx/download',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Download Concluído"
                title="Arquivo .DOCX Baixado com Sucesso"
                description="Seu arquivo .DOCX de teste foi baixado com sucesso"
                breadcrumbs={breadcrumbs}
            />
            <Suspense fallback={<LoadingResult />}>
                <DownloadClient
                    title="Download Concluído"
                    description="O arquivo foi baixado com sucesso"
                    infoTitle="Informações Importantes"
                    infoMessage="Verifique sua pasta de downloads para encontrar o arquivo"
                    backPath="/arquivos-testes"
                    buttonText="Voltar para Lista de Arquivos"
                />
            </Suspense>
            <InfoSection items={infoItems} />
        </>
    );
} 