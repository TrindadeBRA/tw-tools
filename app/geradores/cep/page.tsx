import { Metadata } from "next";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import CEPGeneratorClient from "@/components/layout/generator/CepGenerator";

export const metadata: Metadata = {
    title: "Gerador de CEP Online Grátis | Gere CEPs Válidos por Estado - TW Tools",
    description: "Gere CEPs válidos gratuitamente por estado para testes e desenvolvimento. Ferramenta online que cria CEPs seguindo as regras dos Correios. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Gerador de CEP",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online gera CEPs válidos por estado, seguindo rigorosamente as regras estabelecidas pelos Correios. Cada CEP gerado passa por todas as validações necessárias, garantindo que seja um CEP válido para o estado selecionado.
            </p>
        )
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Desenvolvimento de software e sistemas<br />
                ✓ Testes de cadastro e validação<br />
                ✓ Prototipagem de aplicações<br />
                ✓ Testes de integração com APIs de CEP<br />
                ✓ Validação de formulários por estado
            </p>
        )
    },
    {
        title: "Diferenciais do Gerador",
        type: "features" as const,
        content: (
            <p>
                ✓ Geração por estado<br />
                ✓ Validação completa<br />
                ✓ Opção de formatação automática<br />
                ✓ Interface simples e intuitiva
            </p>
        )
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (
            <p>
                Esta ferramenta foi desenvolvida exclusivamente para fins de teste e desenvolvimento. A utilização dos CEPs gerados para fins fraudulentos ou ilegais é expressamente proibida e de total responsabilidade do usuário.
            </p>
        )
    }
]

export default function CEPGenerator() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'CEP',
            href: '/geradores/cep',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Gerador de CEP Online"
                title="Gerador de CEP Válido Grátis"
                description="Ferramenta gratuita para gerar CEP válido online por estado. Crie CEPs com ou sem pontuação, seguindo todas as regras dos Correios. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
                breadcrumbs={breadcrumbs}
            />
            <CEPGeneratorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 