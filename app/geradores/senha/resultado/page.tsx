import { Metadata } from "next";
import { Suspense } from "react";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import ResultClient from '@/components/layout/result/ResultClient';
import Script from "next/script";

export const metadata: Metadata = {
    title: "Senhas Seguras Geradas | Resultado do Gerador de Senha - TW Tools",
    description: "Visualize e copie suas senhas seguras geradas. Senhas únicas e aleatórias criadas com critérios profissionais de segurança.",
    keywords: "senha gerada, resultado gerador de senha, senha segura, senha forte, senha aleatória",
    alternates: {
        canonical: "https://tools.thetrinityweb.com.br/geradores/senha/resultado",
    },
    openGraph: {
        title: "Senhas Seguras Geradas | Gerador de Senha",
        description: "Suas senhas seguras foram geradas com sucesso. Copie e armazene em local seguro.",
        url: "https://tools.thetrinityweb.com.br/geradores/senha/resultado",
        siteName: "TW Tools",
        type: "website",
    },
};

const infoItems = [
    {
        title: "Sobre este Resultado",
        type: "info" as const,
        content: (<p>Suas senhas foram geradas utilizando algoritmos criptográficos de última geração, garantindo aleatoriedade verdadeira e máxima segurança. Cada senha é única e atende aos mais rigorosos padrões de segurança da informação.</p>)
    },
    {
        title: "Como Utilizar",
        type: "usage" as const,
        content: (<p>
            ✓ Copie a senha usando o botão seguro ao lado<br />
            ✓ Armazene em um gerenciador de senhas profissional<br />
            ✓ Use conexões seguras (HTTPS) ao cadastrar<br />
            ✓ Evite salvar em arquivos de texto ou e-mails<br />
            ✓ Nunca compartilhe por mensagens não criptografadas
        </p>)
    },
    {
        title: "Próximos Passos",
        type: "features" as const,
        content: (<p>
            ✓ Substitua senhas antigas por estas mais seguras<br />
            ✓ Configure autenticação de dois fatores (2FA/MFA)<br />
            ✓ Estabeleça uma política de troca periódica<br />
            ✓ Monitore vazamentos de dados com HaveIBeenPwned<br />
            ✓ Mantenha seu gerenciador de senhas atualizado
        </p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Todas as senhas são geradas localmente em seu navegador utilizando criptografia forte. Não armazenamos, transmitimos ou registramos as senhas geradas. Recomendamos o uso de um gerenciador de senhas profissional com criptografia de ponta a ponta para máxima segurança.</p>)
    }
]

export default function ResultadoPage() {
    const breadcrumbs = [
        {
            name: 'Geradores',
            href: '/geradores',
            current: false
        },
        {
            name: 'Senha',
            href: '/geradores/senha',
            current: false
        },
        {
            name: 'Resultado',
            href: '/geradores/senha/resultado',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Resultado da Geração"
                title="Senhas Seguras Geradas com Sucesso"
                description="Suas senhas foram geradas seguindo os mais altos padrões de segurança. Utilize o botão de cópia para cada senha e armazene-as em um gerenciador de senhas profissional."
                breadcrumbs={breadcrumbs}
            />
            <Suspense fallback={<LoadingResult />}>
                <ResultClient 
                    title="Senhas Criptograficamente Seguras"
                    description="Suas senhas foram geradas com algoritmos criptográficos avançados e estão prontas para uso profissional."
                    notFoundTitle="Geração de Senhas Indisponível"
                    notFoundDescription="Não foi possível completar a geração das senhas. Por favor, retorne e tente novamente com diferentes critérios."
                    notFoundMessage="A geração de senhas não foi concluída. Clique abaixo para tentar novamente."
                    infoTitle="Informações de Segurança"
                    infoMessage="Cada senha foi gerada com entropia criptográfica, garantindo aleatoriedade verdadeira e proteção contra ataques de força bruta."
                    resultLabel="Senha Criptográfica"
                    backPath="/geradores/senha"
                    buttonText="Gerar Novas Senhas Seguras"
                    multipleParams={{
                        enabled: true,
                        params: Array.from({ length: 20 }, (_, i) => ({
                            name: `senha${i}`,
                            label: `Senha Segura ${i + 1}`
                        }))
                    }}
                />
            </Suspense>
            <InfoSection items={infoItems} />

            {/* Schema.org structured data for SEO */}
            <Script id="schema-senha-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "Resultado do Gerador de Senha",
                    "description": "Página de resultado do gerador de senhas seguras, exibindo as senhas geradas com critérios profissionais de segurança.",
                    "url": "https://tools.thetrinityweb.com.br/geradores/senha/resultado",
                    "mainEntity": {
                        "@type": "SoftwareApplication",
                        "name": "Gerador de Senha - Resultado",
                        "applicationCategory": "SecurityTool",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "BRL"
                        },
                        "featureList": [
                            "Geração criptográfica de senhas",
                            "Cópia segura para área de transferência",
                            "Múltiplas senhas por geração",
                            "Interface profissional responsiva",
                            "Processamento local seguro"
                        ]
                    }
                })
            }} />
        </>
    );
} 