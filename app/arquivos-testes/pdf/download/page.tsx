import { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import LoadingResult from "@/components/layout/LoadingResult";
import DownloadClient from "@/components/layout/files/DownloadClient";

export const metadata: Metadata = {
    title: "Download Concluído | Arquivos .PDF para Teste - TW Tools",
    description: "Confirmação de download de arquivo .PDF de teste",
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
            name: '.PDF',
            href: '/arquivos-testes/pdf',
            current: false
        },
        {
            name: 'Download',
            href: '/arquivos-testes/pdf/download',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Download Concluído"
                title="Arquivo .PDF Baixado com Sucesso"
                description="Seu arquivo .PDF de teste foi baixado com sucesso"
                breadcrumbs={breadcrumbs}
            />
            <Suspense fallback={<LoadingResult />}>
                <DownloadClient
                    title="Download Concluído"
                    description="O arquivo foi baixado com sucesso"
                    notFoundTitle="Arquivo Não Encontrado"
                    notFoundDescription="Não foi possível encontrar o arquivo solicitado"
                    notFoundMessage="Verifique se o arquivo existe e tente novamente"
                    infoTitle="Informações Importantes"
                    infoMessage="Verifique sua pasta de downloads para encontrar o arquivo"
                    backPath="/arquivos-testes/pdf"
                    buttonText="Voltar para Lista de Arquivos"
                />
            </Suspense>
            <InfoSection items={infoItems} />
        </>
    );
} 