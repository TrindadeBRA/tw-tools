import { Metadata } from "next";
import LicensePlateGenerator from "@/components/layout/generator/LicensePlateGenerator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Gerador de Placas | TW Tools",
    description: "Gere placas de veículos no padrão Mercosul (ABC1D23) ou padrão antigo (ABC1234) com estado brasileiro.",
};

const infoItems = [
    {
        title: "Sobre o Gerador de Placas",
        type: "info" as const,
        content: (<p>Este gerador permite criar placas de veículos em dois formatos: o novo padrão Mercosul (ABC1D23) e o padrão antigo brasileiro (ABC1234). Você pode escolher o estado brasileiro para a placa gerada.</p>)
    },
    {
        title: "Como Usar",
        type: "usage" as const,
        content: (<p>✓ Selecione o formato desejado (Mercosul ou Antigo)<br />✓ Escolha o estado brasileiro<br />✓ Clique em "Gerar Placa"<br />✓ Copie a placa gerada</p>)
    },
    {
        title: "Formatos Disponíveis",
        type: "features" as const,
        content: (<p>✓ Padrão Mercosul: ABC1D23 (3 letras, 1 número, 1 letra, 2 números)<br />✓ Padrão Antigo: ABC1234 (3 letras, 4 números)<br />✓ Estado brasileiro (UF) ao final</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Este gerador é apenas para fins educacionais e de teste. As placas geradas são aleatórias e não representam placas reais. Não use para fins ilegais ou para tentar clonar placas de veículos.</p>)
    }
]

export default function PlacaPage() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'Gerador de Placas',
            href: '/geradores/placa',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Gerador"
                title="Gerador de Placas"
                description="Gere placas de veículos no padrão Mercosul ou padrão antigo com estado brasileiro"
                breadcrumbs={breadcrumbs}
            />
            <LicensePlateGenerator />
            <InfoSection items={infoItems} />
        </>
    )
} 