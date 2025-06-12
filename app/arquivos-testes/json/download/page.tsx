import { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import LoadingResult from "@/components/layout/LoadingResult";
import DownloadClient from "@/components/layout/files/DownloadClient";

export const metadata: Metadata = {
    title: "Download Concluído | Arquivos .JSON para Teste - TW Tools",
    description: "Confirmação de download de arquivo .JSON de teste",
};

const infoItems = [
    {
        title: "Sobre o Download",
        type: "info" as const,
        content: (<p>O download do arquivo JSON foi iniciado com sucesso. Verifique sua pasta de downloads.</p>)
    },
    {
        title: "Próximos Passos",
        type: "usage" as const,
        content: (<p>✓ Verifique se o arquivo foi baixado corretamente<br />✓ Teste o arquivo em seu ambiente<br />✓ Valide a estrutura do JSON</p>)
    },
    {
        title: "Dicas de Uso",
        type: "features" as const,
        content: (<p>✓ Use para testar APIs e integrações<br />✓ Valide o parsing do JSON<br />✓ Teste diferentes estruturas de dados</p>)
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
            name: '.JSON',
            href: '/arquivos-testes/json',
            current: false
        },
        {
            name: 'Download',
            href: '/arquivos-testes/json/download',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Download Concluído"
                title="Arquivo .JSON Baixado com Sucesso"
                description="Seu arquivo .JSON de teste foi baixado com sucesso"
                breadcrumbs={breadcrumbs}
            />
            <Suspense fallback={<LoadingResult />}>
                <DownloadClient
                    title="Download Concluído"
                    description="O arquivo foi baixado com sucesso"
                    infoTitle="Informações Importantes"
                    infoMessage="Verifique sua pasta de downloads para encontrar o arquivo"
                    backPath="/arquivos-testes/json"
                    buttonText="Voltar para Lista de Arquivos"
                />
            </Suspense>
            <InfoSection items={infoItems} />
        </>
    );
} 