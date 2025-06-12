import { Metadata } from "next";
import PisValidator from "../../../src/components/layout/validator/PisValidator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Validador de PIS/PASEP/NIT | TW Tools",
    description: "Valide números de PIS/PASEP/NIT de forma rápida e segura. Verifique a autenticidade do seu número PIS/PASEP/NIT com nossa ferramenta gratuita.",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>O Validador de PIS/PASEP/NIT é uma ferramenta gratuita que permite verificar a autenticidade de números de PIS (Programa de Integração Social), PASEP (Programa de Formação do Patrimônio do Servidor Público) e NIT (Número de Identificação do Trabalhador).</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Verificar números de PIS/PASEP/NIT antes de cadastros<br />✓ Validar documentos para processos administrativos<br />✓ Confirmar autenticidade de números PIS/PASEP/NIT</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ Validação em tempo real<br />✓ Suporte a diferentes formatos de entrada<br />✓ Resultado instantâneo<br />✓ Interface intuitiva e responsiva</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta ferramenta é apenas para fins de verificação e não garante a autenticidade oficial do documento. Para validação oficial, consulte os órgãos competentes.</p>)
    }
]

export default function PisValidatorPage() {
    const breadcrumbs = [
        {
            name: 'Validadores',
            href: '/validadores',
            current: false
        },
        {
            name: 'PIS/PASEP/NIT',
            href: '/validadores/pis',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Validador"
                title="Validador de PIS/PASEP/NIT"
                description="Verifique a autenticidade do seu número PIS/PASEP/NIT de forma rápida e segura."
                breadcrumbs={breadcrumbs}
            />
            <PisValidator />
            <InfoSection items={infoItems} />
        </>
    )
} 