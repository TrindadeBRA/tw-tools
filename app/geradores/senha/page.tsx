import { Metadata } from "next";
import PasswordGeneratorClient from "../../../src/components/layout/generator/PasswordGenerator";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Gerador de Senha Online Grátis | Crie Senhas Fortes e Seguras - TW Tools",
    description: "Gere senhas fortes, seguras e personalizáveis gratuitamente. Ferramenta online profissional para criar senhas com letras, números e caracteres especiais. Ideal para contas, sistemas e desenvolvimento.",
    keywords: "gerador de senha, senha forte, senha segura, criar senha, gerador de senha online, senha aleatória, senha complexa",
    alternates: {
        canonical: "https://tools.thetrinityweb.com.br/geradores/senha",
    },
    openGraph: {
        title: "Gerador de Senha Online Grátis | Senhas Fortes e Seguras",
        description: "Crie senhas seguras e personalizáveis com nossa ferramenta profissional. Ideal para contas, sistemas e desenvolvimento.",
        url: "https://tools.thetrinityweb.com.br/geradores/senha",
        siteName: "TW Tools",
        type: "website",
    },
};

const infoItems = [
    {
        title: "Sobre o Gerador de Senha",
        type: "info" as const,
        content: (
            <p>
                Nosso gerador de senha profissional utiliza algoritmos avançados de criptografia para criar senhas verdadeiramente aleatórias e seguras. Com opções flexíveis de personalização, você pode gerar senhas que atendam aos requisitos específicos de qualquer sistema ou serviço, garantindo máxima proteção para suas contas e aplicações.
            </p>
        )
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (
            <p>
                ✓ Contas em redes sociais e serviços online<br />
                ✓ Sistemas bancários e financeiros<br />
                ✓ Desenvolvimento de aplicações web e mobile<br />
                ✓ Ambientes corporativos e empresariais<br />
                ✓ Testes de segurança e penetração<br />
                ✓ Gerenciamento de senhas profissional
            </p>
        )
    },
    {
        title: "Diferenciais do Gerador",
        type: "features" as const,
        content: (
            <p>
                ✓ Algoritmo de geração verdadeiramente aleatório<br />
                ✓ Personalização avançada de caracteres<br />
                ✓ Verificação de força da senha em tempo real<br />
                ✓ Interface profissional e responsiva<br />
                ✓ Processamento local para máxima segurança<br />
                ✓ Compatível com padrões de segurança modernos
            </p>
        )
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (
            <p>
                Esta ferramenta foi desenvolvida seguindo as melhores práticas de segurança da informação. Recomendamos o uso de um gerenciador de senhas profissional para armazenar suas senhas de forma segura e criptografada. Não armazenamos nenhuma senha gerada em nossos servidores.
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
                title="Gerador Profissional de Senhas Fortes"
                description="Crie senhas seguras e personalizáveis com nossa ferramenta gratuita. Gere senhas complexas com letras, números e caracteres especiais para máxima proteção. Ideal para contas pessoais, sistemas empresariais e desenvolvimento de software."
                breadcrumbs={breadcrumbs}
            />
            <PasswordGeneratorClient />
            <InfoSection items={infoItems} />

            {/* Schema.org structured data for SEO */}
            <Script id="schema-senha" type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Gerador de Senha Online",
                    "description": "Ferramenta profissional para gerar senhas fortes, seguras e personalizáveis. Ideal para contas, sistemas e desenvolvimento.",
                    "url": "https://tools.thetrinityweb.com.br/geradores/senha",
                    "applicationCategory": "SecurityTool",
                    "operatingSystem": "Web",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "BRL"
                    },
                    "featureList": [
                        "Geração de senhas verdadeiramente aleatórias",
                        "Personalização avançada de caracteres",
                        "Verificação de força em tempo real",
                        "Processamento local seguro",
                        "Interface profissional responsiva",
                        "Compatibilidade com padrões modernos"
                    ]
                })
            }} />
        </>
    )
} 