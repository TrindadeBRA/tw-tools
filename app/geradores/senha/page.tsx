import { Metadata } from "next";
import PasswordGeneratorClient from "../../../src/components/layout/generator/PasswordGenerator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Gerador de Senha Online Grátis | Crie Senhas Fortes e Seguras - TW Tools",
    description: "Gere senhas fortes e seguras gratuitamente para seus serviços. Ferramenta online que cria senhas com letras, números e caracteres especiais. Ideal para desenvolvedores e usuários.",
};

const infoItems = [
    {
        title: "Sobre o Gerador de Senha",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online gera senhas fortes e seguras, permitindo personalização de comprimento e tipos de caracteres. Cada senha gerada é única e aleatória, garantindo máxima segurança para seus serviços.
            </p>
        )
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Criação de contas em serviços online<br />
                ✓ Desenvolvimento de software e sistemas<br />
                ✓ Testes de cadastro e validação<br />
                ✓ Prototipagem de aplicações<br />
                ✓ Gerenciamento de senhas
            </p>
        )
    },
    {
        title: "Diferenciais do Gerador",
        type: "features" as const,
        content: (
            <p>
                ✓ Personalização de comprimento<br />
                ✓ Opções de caracteres especiais<br />
                ✓ Geração de senhas únicas<br />
                ✓ Interface simples e intuitiva
            </p>
        )
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (
            <p>
                Esta ferramenta foi desenvolvida para ajudar na criação de senhas seguras. Recomendamos o uso de um gerenciador de senhas para armazenar suas senhas de forma segura.
            </p>
        )
    }
]

export default function PasswordGenerator() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'Senha',
            href: '/geradores/senha',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Gerador de Senha Online"
                title="Gerador de Senha Forte e Segura"
                description="Ferramenta gratuita para gerar senhas fortes e seguras online. Crie senhas com letras, números e caracteres especiais. Ideal para criar contas em serviços online e desenvolvimento de sistemas."
                breadcrumbs={breadcrumbs}
            />
            <PasswordGeneratorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 