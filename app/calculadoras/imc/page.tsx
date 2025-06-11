import { Metadata } from "next";
import BmiCalculator from "@/components/layout/calculator/BmiCalculator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Calculadora de IMC (Índice de Massa Corporal) | TW Tools",
    description: "Calcule seu Índice de Massa Corporal (IMC) de forma rápida e precisa. Descubra se seu peso está dentro da faixa considerada saudável pela OMS.",
};

const infoItems = [
    {
        title: "Sobre a Calculadora",
        type: "info" as const,
        content: (<p>A Calculadora de IMC (Índice de Massa Corporal) é uma ferramenta que ajuda a determinar se uma pessoa está com peso adequado em relação à sua altura. O cálculo é feito dividindo o peso (em quilogramas) pelo quadrado da altura (em metros).</p>)
    },
    {
        title: "Como Interpretar o IMC",
        type: "usage" as const,
        content: (<p>
            ✓ Abaixo de 18,5: Abaixo do peso<br />
            ✓ 18,5 a 24,9: Peso normal<br />
            ✓ 25,0 a 29,9: Sobrepeso<br />
            ✓ 30,0 a 34,9: Obesidade Grau I<br />
            ✓ 35,0 a 39,9: Obesidade Grau II<br />
            ✓ Acima de 40,0: Obesidade Grau III
        </p>)
    },
    {
        title: "Diferenciais da Calculadora",
        type: "features" as const,
        content: (<p>
            ✓ Cálculo instantâneo e preciso<br />
            ✓ Classificação automática do resultado<br />
            ✓ Interface intuitiva e fácil de usar<br />
            ✓ Baseada nos padrões da OMS
        </p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Esta calculadora fornece uma estimativa geral e não deve substituir a avaliação profissional. Consulte sempre um profissional de saúde para uma avaliação completa do seu estado nutricional.</p>)
    }
]

export default function BmiPage() {
    const breadcrumbs = [
        {
            name: 'Calculadoras',
            href: '/calculadoras',
            current: false
        },
        {
            name: 'Calculadora de IMC',
            href: '/calculadoras/imc',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Calculadora de IMC"
                title="Calculadora de Índice de Massa Corporal"
                description="Calcule seu IMC de forma rápida e precisa. O Índice de Massa Corporal é uma medida internacional usada para calcular se uma pessoa está no peso ideal."
                breadcrumbs={breadcrumbs}
            />
            <BmiCalculator />
            <InfoSection items={infoItems} />
        </>
    )
}