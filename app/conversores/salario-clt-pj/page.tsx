import { Metadata } from "next";
import SalaryCltPjConverter from "../../../src/components/layout/converter/SalaryCltPjConverter";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Conversor de Salário CLT para PJ | TW Tools",
    description: "Converta salário CLT para PJ e vice-versa. Calcule valores líquidos, impostos e benefícios para tomar a melhor decisão profissional.",
};

const infoItems = [
    {
        title: "Sobre o Conversor de Salário CLT/PJ",
        type: "info" as const,
        content: (<p>Esta ferramenta converte valores entre regime CLT (Consolidação das Leis do Trabalho) e PJ (Pessoa Jurídica), considerando impostos, benefícios, contribuições e todos os custos envolvidos em cada modalidade de contratação.</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Profissionais avaliando propostas de trabalho<br />✓ Empresas calculando custo de contratação<br />✓ Consultores definindo valor de prestação de serviços<br />✓ Freelancers precificando projetos<br />✓ Transição entre regimes de contratação</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ Cálculo completo de impostos e contribuições<br />✓ Considera 13º salário, férias e FGTS para CLT<br />✓ Inclui todos os impostos PJ (IRPJ, CSLL, PIS, COFINS, ISS)<br />✓ Simulação bidirecional (CLT→PJ e PJ→CLT)<br />✓ Valores líquidos e equivalentes detalhados</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Os cálculos são baseados na legislação vigente e servem como estimativa. Para decisões definitivas, consulte sempre um contador ou advogado trabalhista, pois valores podem variar conforme benefícios específicos, acordos coletivos e mudanças na legislação.</p>)
    }
]

export default function SalarioCltPjPage() {
    // Definir breadcrumbs para navegação
    const breadcrumbs = [
        {
            name: 'Conversores',
            href: '/conversores',
            current: false
        },
        {
            name: 'Salário CLT/PJ',
            href: '/conversores/salario-clt-pj',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Conversor"
                title="Conversor de Salário CLT para PJ"
                description="Converta valores entre regime CLT e Pessoa Jurídica, considerando impostos, benefícios e todos os custos envolvidos para fazer a melhor escolha profissional."
                breadcrumbs={breadcrumbs}
            />
            <SalaryCltPjConverter />
            <InfoSection items={infoItems} />
        </>
    )
}