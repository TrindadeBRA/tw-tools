import { Suspense } from "react";
import { Metadata } from "next";
import PasswordGenerator from "@/components/layout/generator/PasswordGenerator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import LoadingResult from "@/components/layout/LoadingResult";

export const metadata: Metadata = {
    title: "Gerador de Senhas Seguras | TW Tools",
    description: "Crie senhas fortes e seguras com nosso gerador de senhas personalizado. Defina tamanho, caracteres e gere múltiplas senhas instantaneamente.",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>O Gerador de Senhas permite criar senhas seguras e personalizadas com controle total sobre o tamanho e tipos de caracteres incluídos. Ideal para aumentar a segurança de suas contas online.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Criar senhas fortes para contas importantes<br />✓ Renovar senhas periodicamente<br />✓ Gerar múltiplas opções para escolher a mais memorável<br />✓ Aumentar a segurança de suas contas online</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ Controle total sobre o tamanho da senha (até 32 caracteres)<br />✓ Opções flexíveis de caracteres (maiúsculas, minúsculas, números, símbolos)<br />✓ Geração de múltiplas senhas simultaneamente<br />✓ Interface intuitiva e fácil de usar</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>As senhas geradas por esta ferramenta são criadas localmente em seu navegador e não são armazenadas em nossos servidores. Recomendamos utilizar um gerenciador de senhas para armazenar suas credenciais com segurança.</p>)
    }
]

export default function GeradorSenhaPage() {
    return (
        <>
            <Header
                miniTitle="Segurança Digital"
                title="Gerador de Senhas Seguras"
                description="Crie senhas fortes e personalizadas definindo o tamanho, tipos de caracteres e quantidade. Gere rapidamente senhas seguras para proteger suas contas online."
            />
            <Suspense fallback={<LoadingResult />}>
                <PasswordGenerator />
            </Suspense>
            <InfoSection items={infoItems} />
        </>
    )
} 