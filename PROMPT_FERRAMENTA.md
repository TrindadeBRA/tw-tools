# Prompt para Criação de Ferramentas TW Tools com Otimização SEO Completa

Este prompt serve como um guia completo para a criação de novas ferramentas para o site TW Tools, seguindo o padrão de geradores e validadores com páginas de resultado, incluindo otimizações avançadas de SEO e implementação de dados estruturados JSON-LD.

## Instrução

Preciso que você crie uma nova ferramenta completa para o site TW Tools, seguindo o padrão de gerador/validador com página de resultado. A ferramenta deve ser: XXXXXX

**IMPORTANTE**: Todas as páginas devem ser otimizadas para SEO com:
- Metadados completos e específicos
- Dados estruturados JSON-LD
- URLs semânticas
- Breadcrumbs estruturados
- Conteúdo otimizado para palavras-chave relevantes

## Estrutura de Arquivos Necessária

Para cada nova ferramenta, você precisa criar:

1. **Página principal**:
   - `app/[tipo-de-ferramenta]/[nome-da-ferramenta]/page.tsx`
   
2. **Página de resultado**:
   - `app/[tipo-de-ferramenta]/[nome-da-ferramenta]/resultado/page.tsx`
   - `app/[tipo-de-ferramenta]/[nome-da-ferramenta]/resultado/layout.tsx`
   
3. **Componente da ferramenta**:
   - `src/components/layout/[type]/[ComponentName].tsx` (IMPORTANTE: Use nomes em inglês para componentes)

## Detalhamento dos Componentes

### 1. Página Principal (`page.tsx`) - COM OTIMIZAÇÃO SEO COMPLETA

A página principal deve conter:
- Metadados SEO otimizados com palavras-chave relevantes
- Dados estruturados JSON-LD para SoftwareApplication
- Open Graph e Twitter Cards
- Canonical URL
- Um objeto `infoItems` com informações sobre a ferramenta
- Componentes: Header, Componente da Ferramenta, InfoSection

```tsx
import { Metadata } from "next";
import SeuComponente from "../../../src/components/layout/[tipo]/[nome-componente]";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

// SEO OTIMIZADO: Metadados completos com palavras-chave
export const metadata: Metadata = {
    title: "Título Principal da Ferramenta - Palavra-chave Secundária | TW Tools",
    description: "Descrição otimizada para SEO com palavras-chave principais e secundárias. Ferramenta gratuita online para [funcionalidade específica]. Rápido, seguro e fácil de usar.",
    keywords: ["palavra-chave-1", "palavra-chave-2", "ferramenta online", "gerador", "validador", "conversor"],
    authors: [{ name: "TW Tools" }],
    creator: "TW Tools",
    publisher: "TW Tools",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: 'https://twtools.com.br/[tipo-de-ferramenta]/[nome-da-ferramenta]',
        title: "Título Principal da Ferramenta - Palavra-chave Secundária | TW Tools",
        description: "Descrição otimizada para SEO com palavras-chave principais e secundárias. Ferramenta gratuita online para [funcionalidade específica].",
        siteName: 'TW Tools',
        images: [
            {
                url: '/images/og-image-ferramenta.jpg',
                width: 1200,
                height: 630,
                alt: 'Nome da Ferramenta - TW Tools',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Título Principal da Ferramenta - TW Tools",
        description: "Descrição otimizada para SEO com palavras-chave principais e secundárias.",
        images: ['/images/og-image-ferramenta.jpg'],
        creator: '@twtools',
    },
    alternates: {
        canonical: 'https://twtools.com.br/[tipo-de-ferramenta]/[nome-da-ferramenta]',
    },
    category: 'technology',
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (
            <div>
                <p>Descrição detalhada da ferramenta com <strong>palavras-chave relevantes</strong> naturalmente integradas no texto. Explique como a ferramenta funciona e seus benefícios principais.</p>
                <p>Esta ferramenta online gratuita permite que você [funcionalidade específica] de forma rápida e segura, sem necessidade de cadastro ou instalação de software.</p>
            </div>
        )
    },
    {
        title: "Casos de Uso Recomendados",
        type: "usage" as const,
        content: (
            <div>
                <p>✓ <strong>Profissionais de TI</strong>: Para validação e geração de dados técnicos</p>
                <p>✓ <strong>Desenvolvedores</strong>: Integração em projetos e aplicações</p>
                <p>✓ <strong>Estudantes</strong>: Aprendizado e validação de conceitos</p>
                <p>✓ <strong>Empresas</strong>: Automatização de processos de validação</p>
            </div>
        )
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (
            <div>
                <p>✓ <strong>100% Gratuita</strong>: Sem custos ou limitações de uso</p>
                <p>✓ <strong>Processamento Local</strong>: Seus dados não são enviados para servidores</p>
                <p>✓ <strong>Interface Intuitiva</strong>: Fácil de usar, sem necessidade de conhecimento técnico</p>
                <p>✓ <strong>Resultados Instantâneos</strong>: Processamento rápido e eficiente</p>
                <p>✓ <strong>Compatível com Mobile</strong>: Funciona perfeitamente em dispositivos móveis</p>
            </div>
        )
    },
    {
        title: "Privacidade e Segurança",
        type: "legal" as const,
        content: (
            <div>
                <p>Garantimos total privacidade no uso desta ferramenta. Todos os dados são processados localmente em seu navegador, sem envio para nossos servidores.</p>
                <p>Não coletamos, armazenamos ou compartilhamos as informações inseridas na ferramenta. Sua privacidade é nossa prioridade.</p>
            </div>
        )
    }
]

export default function NomeDaPagina() {
    // Breadcrumbs estruturados para SEO
    const breadcrumbs = [
        {
            name: 'Nome da Categoria', // Ex: 'Geradores', 'Validadores', 'Conversores'
            href: '/nome-da-categoria',
            current: false
        },
        {
            name: 'Nome da Ferramenta',
            href: '/nome-da-categoria/nome-da-ferramenta',
            current: true
        }
    ];

    return (
        <>
            <Header
                miniTitle="Mini Título Otimizado"
                title="Título Principal com Palavras-chave"
                description="Descrição completa otimizada para SEO, incluindo palavras-chave relevantes e benefícios da ferramenta. Explique claramente o que a ferramenta faz e como ela pode ajudar o usuário."
                breadcrumbs={breadcrumbs}
            />
            <SeuComponente />
            <InfoSection items={infoItems} />
            
            {/* JSON-LD para SoftwareApplication - SEO AVANÇADO */}
            <Script id="schema-ferramenta" type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Nome da Ferramenta",
                    "description": "Descrição detalhada da ferramenta para dados estruturados",
                    "url": "https://twtools.com.br/[tipo-de-ferramenta]/[nome-da-ferramenta]",
                    "applicationCategory": "UtilityApplication",
                    "operatingSystem": "Web",
                    "permissions": "browser",
                    "isAccessibleForFree": true,
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "BRL",
                        "availability": "https://schema.org/InStock"
                    },
                    "creator": {
                        "@type": "Organization",
                        "name": "TW Tools",
                        "url": "https://twtools.com.br"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "TW Tools",
                        "url": "https://twtools.com.br"
                    },
                    "inLanguage": "pt-BR",
                    "browserRequirements": "Requer JavaScript. Compatível com todos os navegadores modernos.",
                    "softwareVersion": "1.0",
                    "featureList": [
                        "Processamento local dos dados",
                        "Interface responsiva",
                        "Gratuito e sem limitações",
                        "Não requer cadastro"
                    ],
                    "screenshot": "https://twtools.com.br/images/screenshot-ferramenta.jpg"
                })
            }} />
            
            {/* JSON-LD para BreadcrumbList - SEO AVANÇADO */}
            <Script id="schema-breadcrumbs" type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "TW Tools",
                            "item": "https://twtools.com.br"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Nome da Categoria",
                            "item": "https://twtools.com.br/nome-da-categoria"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": "Nome da Ferramenta",
                            "item": "https://twtools.com.br/nome-da-categoria/nome-da-ferramenta"
                        }
                    ]
                })
            }} />
            
            {/* JSON-LD para WebPage - SEO AVANÇADO */}
            <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "Título Principal da Ferramenta",
                    "description": "Descrição otimizada para SEO",
                    "url": "https://twtools.com.br/[tipo-de-ferramenta]/[nome-da-ferramenta]",
                    "inLanguage": "pt-BR",
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": "TW Tools",
                        "url": "https://twtools.com.br"
                    },
                    "about": {
                        "@type": "Thing",
                        "name": "Funcionalidade Principal",
                        "description": "Descrição da funcionalidade principal da ferramenta"
                    },
                    "primaryImageOfPage": {
                        "@type": "ImageObject",
                        "url": "https://twtools.com.br/images/ferramenta-preview.jpg"
                    },
                    "dateModified": new Date().toISOString(),
                    "datePublished": new Date().toISOString()
                })
            }} />
        </>
    )
}
```

### 2. Componente da Ferramenta (`[ComponentName].tsx`) - SEM ALTERAÇÕES

IMPORTANTE: Os nomes de componentes e pastas em src/components devem SEMPRE estar em inglês para manter o padrão do projeto.

[O código do componente permanece o mesmo do prompt original]

### 3. Página de Resultado (`resultado/page.tsx`) - COM OTIMIZAÇÃO SEO COMPLETA

#### PADRÃO CRÍTICO: Esta página NÃO deve realizar processamentos, apenas exibir resultados

A página de resultado deve ter SEO otimizado com dados dinâmicos baseados nos parâmetros:

```tsx
import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import Script from "next/script";

// SEO DINÂMICO: Metadados que se adaptam ao resultado
export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }): Promise<Metadata> {
  const resultadoPrincipal = typeof searchParams.resultadoFormatado === 'string' ? searchParams.resultadoFormatado : '';
  const hasError = searchParams.error === 'true';
  
  if (hasError) {
    return {
      title: "Erro no Processamento | Nome da Ferramenta - TW Tools",
      description: "Ocorreu um erro ao processar sua solicitação. Verifique os dados e tente novamente.",
      robots: { index: false, follow: true }
    };
  }

  return {
    title: `Resultado: ${resultadoPrincipal ? resultadoPrincipal.substring(0, 50) + '...' : 'Processado'} | Nome da Ferramenta - TW Tools`,
    description: `Resultado gerado pela ferramenta: ${resultadoPrincipal}. Ferramenta gratuita online para processamento de dados com resultados instantâneos.`,
    keywords: ["resultado", "processamento", "ferramenta online", "palavra-chave-específica"],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: 'https://twtools.com.br/[tipo-de-ferramenta]/[nome-da-ferramenta]/resultado',
      title: `Resultado: ${resultadoPrincipal} | TW Tools`,
      description: `Resultado gerado pela ferramenta: ${resultadoPrincipal}`,
      siteName: 'TW Tools',
    },
    alternates: {
      canonical: 'https://twtools.com.br/[tipo-de-ferramenta]/[nome-da-ferramenta]/resultado',
    },
  };
}

const infoItems = [
    {
        title: "Sobre este Resultado",
        type: "info" as const,
        content: (
            <div>
                <p>Este resultado foi gerado utilizando nossa ferramenta avançada de processamento. Todos os cálculos são realizados localmente em seu navegador, garantindo <strong>total privacidade</strong> dos seus dados.</p>
                <p>O resultado apresentado é baseado nos parâmetros fornecidos e segue os padrões técnicos mais atualizados da área.</p>
            </div>
        )
    },
    {
        title: "Como Utilizar este Resultado",
        type: "usage" as const,
        content: (
            <div>
                <p>✓ <strong>Copiar</strong>: Use o botão de copiar para transferir o resultado</p>
                <p>✓ <strong>Compartilhar</strong>: Salve o link desta página para referência futura</p>
                <p>✓ <strong>Integrar</strong>: Utilize o resultado em seus projetos ou aplicações</p>
                <p>✓ <strong>Validar</strong>: Confirme se o resultado atende às suas necessidades</p>
            </div>
        )
    },
    {
        title: "Próximos Passos Recomendados",
        type: "features" as const,
        content: (
            <div>
                <p>✓ <strong>Verificar Resultado</strong>: Confirme se o resultado está correto</p>
                <p>✓ <strong>Testar Implementação</strong>: Teste o resultado em seu ambiente</p>
                <p>✓ <strong>Documentar</strong>: Mantenha registro dos resultados importantes</p>
                <p>✓ <strong>Gerar Novos Resultados</strong>: Experimente com diferentes parâmetros</p>
            </div>
        )
    },
    {
        title: "Considerações Importantes",
        type: "legal" as const,
        content: (
            <div>
                <p>Os resultados gerados por esta ferramenta são baseados nos dados fornecidos pelo usuário. Recomendamos sempre validar os resultados em seu contexto específico de uso.</p>
                <p>Esta ferramenta é fornecida gratuitamente e sem garantias. O usuário é responsável pela validação e uso adequado dos resultados.</p>
            </div>
        )
    }
]

export default function ResultadoPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Breadcrumbs estruturados para SEO
  const breadcrumbs = [
    {
      name: 'Nome da Categoria',
      href: '/nome-da-categoria',
      current: false
    },
    {
      name: 'Nome da Ferramenta',
      href: '/nome-da-categoria/nome-da-ferramenta',
      current: false
    },
    {
      name: 'Resultado',
      href: '/nome-da-categoria/nome-da-ferramenta/resultado',
      current: true
    }
  ];

  // Extrair valores dos parâmetros de forma segura
  const hasError = searchParams.error === 'true';
  const resultadoPrincipal = typeof searchParams.resultadoFormatado === 'string' ? searchParams.resultadoFormatado : '';
  const valorOriginal = typeof searchParams.valorOriginal === 'string' ? searchParams.valorOriginal : '';
  
  return (
    <>
      <Header
        miniTitle="Resultado Gerado"
        title={hasError ? "Erro no Processamento" : "Resultado da Ferramenta"}
        description={hasError ? 
          "Ocorreu um erro ao processar sua solicitação. Verifique os dados informados e tente novamente." : 
          "Resultado gerado com sucesso. Confira abaixo os dados processados pela ferramenta."
        }
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Resultado Processado"
          description="Confira abaixo o resultado gerado pela ferramenta:"
          notFoundTitle="Resultado Não Encontrado"
          notFoundDescription={hasError ? "Ocorreu um erro ao processar sua solicitação." : "Não foi possível encontrar um resultado."}
          notFoundMessage={hasError ? "Verifique se os dados informados são válidos e tente novamente." : "Verifique os dados e tente novamente."}
          infoTitle="Informações do Resultado"
          infoMessage="Este resultado foi gerado com base nos parâmetros fornecidos. Todos os dados são processados localmente para garantir sua privacidade."
          resultLabel="Resultado Final"
          backPath="/[tipo-de-ferramenta]/[nome-da-ferramenta]"
          buttonText="Gerar Novo Resultado"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "valorOriginal", label: "Valor Original" },
              { name: "resultado1", label: "Resultado Processado 1" },
              { name: "resultado2", label: "Resultado Processado 2" },
              { name: "resultadoFormatado", label: "Resultado Final" },
              // Certifique-se de incluir TODOS os parâmetros que foram enviados na URL
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
      
      {/* JSON-LD para resultado específico - SEO AVANÇADO */}
      {!hasError && resultadoPrincipal && (
        <>
          <Script id="schema-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Nome da Ferramenta - Resultado",
              "description": "Resultado gerado pela ferramenta de processamento online",
              "url": "https://twtools.com.br/[tipo-de-ferramenta]/[nome-da-ferramenta]/resultado",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web",
              "isAccessibleForFree": true,
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "BRL",
                "availability": "https://schema.org/InStock"
              },
              "creator": {
                "@type": "Organization",
                "name": "TW Tools",
                "url": "https://twtools.com.br"
              },
              "mainEntity": {
                "@type": "CreativeWork",
                "name": "Resultado do Processamento",
                "description": `Resultado gerado: ${resultadoPrincipal}`,
                "creator": {
                  "@type": "Organization",
                  "name": "TW Tools"
                },
                "dateCreated": new Date().toISOString(),
                "inLanguage": "pt-BR"
              }
            })
          }} />
          
          <Script id="schema-breadcrumbs-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "TW Tools",
                  "item": "https://twtools.com.br"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Nome da Categoria",
                  "item": "https://twtools.com.br/nome-da-categoria"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Nome da Ferramenta",
                  "item": "https://twtools.com.br/nome-da-categoria/nome-da-ferramenta"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Resultado",
                  "item": "https://twtools.com.br/nome-da-categoria/nome-da-ferramenta/resultado"
                }
              ]
            })
          }} />
          
          <Script id="schema-webpage-resultado" type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": `Resultado: ${resultadoPrincipal}`,
              "description": "Página de resultado da ferramenta de processamento",
              "url": "https://twtools.com.br/[tipo-de-ferramenta]/[nome-da-ferramenta]/resultado",
              "inLanguage": "pt-BR",
              "isPartOf": {
                "@type": "WebSite",
                "name": "TW Tools",
                "url": "https://twtools.com.br"
              },
              "about": {
                "@type": "Thing",
                "name": "Resultado do Processamento",
                "description": `Resultado processado: ${resultadoPrincipal}`
              },
              "dateModified": new Date().toISOString(),
              "datePublished": new Date().toISOString(),
              "mainEntity": {
                "@type": "DigitalDocument",
                "name": "Resultado Processado",
                "text": resultadoPrincipal,
                "encodingFormat": "text/plain"
              }
            })
          }} />
        </>
      )}
    </>
  );
}
```

### 4. Layout da Página de Resultado (`resultado/layout.tsx`) - SEM ALTERAÇÕES

[O código do layout permanece o mesmo do prompt original]

## Checklist de Otimização SEO

Para cada ferramenta criada, verifique se implementou:

### ✅ Metadados Básicos
- [ ] Title otimizado com palavras-chave (máximo 60 caracteres)
- [ ] Description atrativa e informativa (máximo 160 caracteres)
- [ ] Keywords relevantes
- [ ] Canonical URLs
- [ ] Meta robots configurado

### ✅ Open Graph e Twitter Cards
- [ ] og:title, og:description, og:image
- [ ] og:type, og:url, og:site_name
- [ ] twitter:card, twitter:title, twitter:description
- [ ] Imagens otimizadas (1200x630px para OG)

### ✅ Dados Estruturados JSON-LD
- [ ] Schema.org SoftwareApplication na página principal
- [ ] Schema.org BreadcrumbList em todas as páginas
- [ ] Schema.org WebPage em todas as páginas
- [ ] Schema.org específico para resultados na página de resultado

### ✅ Conteúdo Otimizado
- [ ] Títulos H1, H2, H3 com palavras-chave
- [ ] Texto otimizado nos infoItems
- [ ] Palavras-chave naturalmente integradas
- [ ] Breadcrumbs estruturados
- [ ] URLs semânticas e limpas

### ✅ Performance e Acessibilidade
- [ ] Lazy loading para componentes pesados
- [ ] Alt text para imagens
- [ ] Aria labels apropriados
- [ ] Estrutura semântica HTML5

## Exemplos de Palavras-chave por Tipo de Ferramenta

### Geradores
- "gerador online", "criar automaticamente", "gerar grátis"
- "ferramenta de geração", "criar online", "gerador gratuito"

### Validadores
- "validar online", "verificar", "checagem gratuita"
- "validador online", "verificação automática", "testar grátis"

### Conversores
- "converter online", "transformar grátis", "conversão automática"
- "conversor online", "mudar formato", "converter gratuito"

## Estrutura de URLs Recomendada

```
https://twtools.com.br/
├── geradores/
│   ├── nome-da-ferramenta/
│   └── nome-da-ferramenta/resultado/
├── validadores/
│   ├── nome-da-ferramenta/
│   └── nome-da-ferramenta/resultado/
└── conversores/
    ├── nome-da-ferramenta/
    └── nome-da-ferramenta/resultado/
```

## Boas Práticas e Padrões Críticos

### 1. SEO Técnico
✅ **CORRETO**: Implementar metadados específicos para cada página
✅ **CORRETO**: Usar dados estruturados JSON-LD em todas as páginas
✅ **CORRETO**: Otimizar títulos e descrições com palavras-chave relevantes
❌ **ERRADO**: Usar metadados genéricos ou ausentes

### 2. Conteúdo
✅ **CORRETO**: Integrar palavras-chave naturalmente no texto
✅ **CORRETO**: Criar conteúdo útil e informativo nos infoItems
✅ **CORRETO**: Usar estrutura hierárquica de títulos
❌ **ERRADO**: Fazer keyword stuffing ou conteúdo irrelevante

### 3. Performance
✅ **CORRETO**: Implementar lazy loading e otimização de imagens
✅ **CORRETO**: Minimizar JavaScript e CSS desnecessários
✅ **CORRETO**: Usar Next.js Script component para JSON-LD
❌ **ERRADO**: Carregar recursos desnecessários na página

### 4. Dados Estruturados
✅ **CORRETO**: Implementar esquemas específicos para cada tipo de página
✅ **CORRETO**: Validar JSON-LD com a ferramenta do Google
✅ **CORRETO**: Incluir informações relevantes e precisas
❌ **ERRADO**: Usar dados estruturados genéricos ou incorretos

## Ferramentas de Validação Recomendadas

1. **Google Search Console**: Monitorar indexação e performance
2. **Google Rich Results Test**: Validar dados estruturados
3. **PageSpeed Insights**: Verificar performance e Core Web Vitals
4. **SEO Meta in 1 Click**: Extensão para verificar metadados
5. **Schema Markup Validator**: Validar JSON-LD

## IMPORTANTE: Implementação Obrigatória

Todas as ferramentas criadas DEVEM incluir:

1. **Metadados completos** em ambas as páginas (principal e resultado)
2. **Dados estruturados JSON-LD** específicos para cada página
3. **Conteúdo otimizado** com palavras-ch