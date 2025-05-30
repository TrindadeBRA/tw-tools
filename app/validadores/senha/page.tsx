import { Metadata } from "next";
import PasswordValidatorClient from "../../../src/components/layout/validator/PasswordValidator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Validador de Senha Online Grátis | Verifique Senha Forte - TW Tools",
    description: "Valide senha gratuitamente online. Ferramenta que verifica se uma senha é forte e segura. Ideal para desenvolvedores e testadores.",
};

const infoItems = [
    {
        title: "Sobre o Validador de Senha",
        type: "info" as const,
        content: (
            <p>
                Nossa ferramenta online valida senhas, verificando sua força e segurança. A validação inclui verificação de comprimento, complexidade e uso de caracteres especiais.
            </p>
        )
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Validação de formulários<br />
                ✓ Desenvolvimento de software e sistemas<br />
                ✓ Testes de cadastro<br />
                ✓ Implementação de políticas de senha<br />
                ✓ Verificação de segurança
            </p>
        )
    },
    {
        title: "Diferenciais do Validador",
        type: "features" as const,
        content: (
            <p>
                ✓ Verificação de força da senha<br />
                ✓ Análise de complexidade<br />
                ✓ Sugestões de melhoria<br />
                ✓ Interface simples e intuitiva
            </p>
        )
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (
            <p>
                Esta ferramenta foi desenvolvida exclusivamente para fins de validação e desenvolvimento. A utilização para fins fraudulentos ou ilegais é expressamente proibida e de total responsabilidade do usuário.
            </p>
        )
    }
]

export default function PasswordValidator() {
    const breadcrumbs = [
        {
            name: 'Validadores',
            href: '/validadores',
            current: false
        },
        {
            name: 'Senha',
            href: '/validadores/senha',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Validador de Senha Online"
                title="Validador de Senha Forte Grátis"
                description="Ferramenta gratuita para validar senha online. Verifique se uma senha é forte e segura, seguindo as melhores práticas de segurança. Ideal para testes de software, desenvolvimento de sistemas e validação de cadastros."
                breadcrumbs={breadcrumbs}
            />
            <PasswordValidatorClient />
            <InfoSection items={infoItems} />
        </>
    )
} 