# Prompt para Criação de Ferramentas TW Tools

Este prompt serve como um guia completo para a criação de novas ferramentas para o site TW Tools, seguindo o padrão de geradores e validadores com páginas de resultado.

## Instrução

Preciso que você crie uma nova ferramenta completa para o site TW Tools, seguindo o padrão de gerador/validador com página de resultado. A ferramenta deve ser: XXXXXX

## Estrutura de Arquivos Necessária

Para cada nova ferramenta, você precisa criar:

1. **Página principal**:
   - `app/[tipo-de-ferramenta]/[nome-da-ferramenta]/page.tsx`
   
2. **Página de resultado**:
   - `app/[tipo-de-ferramenta]/[nome-da-ferramenta]/resultado/page.tsx`
   - `app/[tipo-de-ferramenta]/[nome-da-ferramenta]/resultado/layout.tsx`
   
3. **Componente da ferramenta**:
   - `src/components/layout/[tipo]/[nome-componente].tsx`

## Detalhamento dos Componentes

### 1. Página Principal (`page.tsx`)

A página principal deve conter:
- Metadados SEO (title, description)
- Um objeto `infoItems` com informações sobre a ferramenta
- Componentes: Header, Componente da Ferramenta, InfoSection

```tsx
import { Metadata } from "next";
import SeuComponente from "../../../src/components/layout/[tipo]/[nome-componente]";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
    title: "Título da Página | TW Tools",
    description: "Descrição detalhada para SEO",
};

const infoItems = [
    {
        title: "Sobre a Ferramenta",
        type: "info" as const,
        content: (<p>Descrição da ferramenta...</p>)
    },
    {
        title: "Uso Recomendado",
        type: "usage" as const,
        content: (<p>✓ Uso 1<br />✓ Uso 2<br />...</p>)
    },
    {
        title: "Diferenciais da Ferramenta",
        type: "features" as const,
        content: (<p>✓ Característica 1<br />✓ Característica 2<br />...</p>)
    },
    {
        title: "Aviso Legal",
        type: "legal" as const,
        content: (<p>Informações legais sobre o uso...</p>)
    }
]

export default function NomeDaPagina() {
    return (
        <>
            <Header
                miniTitle="Mini Título"
                title="Título Principal"
                description="Descrição completa da ferramenta..."
            />
            <SeuComponente />
            <InfoSection items={infoItems} />
        </>
    )
}
```

### 2. Componente da Ferramenta (`[nome-componente].tsx`)

O componente deve:
- Usar React Hook Form com Zod para validação
- Implementar redirecionamento para a página de resultado
- Usar EXCLUSIVAMENTE os componentes de UI do projeto (InputText, InputSelect, InputCheckbox, InputRadio, Button)
- Incluir botões de ação (limpar e gerar/validar)

```tsx
'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import InputSelect from '@/components/ui/InputSelect'
import InputCheckbox from '@/components/ui/InputCheckbox'
import InputRadio from '@/components/ui/InputRadio'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

// Defina o schema com Zod
const seuSchema = z.object({
  campo1: z.string().min(1, 'Campo obrigatório'),
  // Para InputSelect, deve validar um objeto com id e title
  campoSelect: z.object({
    id: z.string(),
    title: z.string()
  }),
  // Outros campos conforme necessário
  campoRadio: z.string()
})

type SuaData = z.infer<typeof seuSchema>

export default function SeuComponente() {
  const router = useRouter()
  
  // Defina as opções para componentes de seleção
  const selectOptions = [
    { id: 'opcao1', title: 'Opção 1' },
    { id: 'opcao2', title: 'Opção 2' }
  ]
  
  const radioOptions = [
    { id: 'radio1', title: 'Radio 1' },
    { id: 'radio2', title: 'Radio 2' }
  ]
  
  const {
    register,
    handleSubmit,
    setValue,
    control, // Necessário para componentes controlados como InputSelect
    formState: { errors },
  } = useForm<SuaData>({
    resolver: zodResolver(seuSchema),
    defaultValues: {
      campo1: '',
      campoSelect: selectOptions[0],
      campoRadio: 'radio1'
      // Outros valores padrão...
    },
  })

  const suaFuncaoPrincipal = (data: SuaData) => {
    // Lógica de processamento
    
    // Redirecionar para a página de resultado com TODOS os parâmetros relevantes
    router.push(`/[tipo-de-ferramenta]/[nome-da-ferramenta]/resultado?param1=${encodeURIComponent(valor1)}&param2=${encodeURIComponent(valor2)}&param3=${encodeURIComponent(valor3)}`)
  }

  const clearForm = () => {
    setValue('campo1', '')
    setValue('campoSelect', selectOptions[0])
    setValue('campoRadio', 'radio1')
    // Limpar outros campos...
  }

  return (
    <FormPage
      title="Título do Formulário"
      description="Descrição do formulário..."
    >
      <form onSubmit={handleSubmit(suaFuncaoPrincipal)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Campo de texto simples */}
            <div className="sm:col-span-3">
              <InputText
                label="Label do Campo"
                placeholder="Placeholder"
                {...register('campo1')}
                error={errors.campo1?.message}
              />
            </div>
            
            {/* Campo de seleção - requer Controller do react-hook-form */}
            <div className="sm:col-span-3">
              <Controller
                name="campoSelect"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Campo Select"
                    options={selectOptions}
                    defaultValue={selectOptions[0]}
                    onChange={(value) => field.onChange(value)}
                    error={errors.campoSelect?.message}
                  />
                )}
              />
            </div>
            
            {/* Campo Radio - também requer Controller */}
            <div className="col-span-full">
              <Controller
                name="campoRadio"
                control={control}
                render={({ field }) => (
                  <InputRadio
                    label="Campo Radio"
                    name="campoRadio"
                    options={radioOptions}
                    defaultOption="radio1"
                    error={errors.campoRadio?.message}
                  />
                )}
              />
            </div>
            
            {/* Outros tipos de campos conforme necessário */}
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Botão de Ação Principal
          </Button>
        </div>
      </form>
    </FormPage>
  )
}
```

### 3. Página de Resultado (`resultado/page.tsx`)

A página de resultado deve:
- Ter metadados SEO específicos para a página de resultado
- Incluir `infoItems` relevantes para o resultado
- Conter o componente ResultClient configurado para os parâmetros específicos
- **IMPORTANTE**: Garantir que todos os parâmetros enviados na URL sejam exibidos no resultado

```tsx
import { Metadata } from "next";
import { Suspense } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";

export const metadata: Metadata = {
  title: "Resultado | Título da Ferramenta - TW Tools",
  description: "Descrição do resultado para SEO",
};

const infoItems = [
  {
      title: "Sobre este Resultado",
      type: "info" as const,
      content: (<p>Informações sobre o resultado...</p>)
  },
  {
      title: "Como Utilizar",
      type: "usage" as const,
      content: (<p>✓ Uso do resultado 1<br />✓ Uso do resultado 2<br />...</p>)
  },
  {
      title: "Próximos Passos",
      type: "features" as const,
      content: (<p>✓ Próximo passo 1<br />✓ Próximo passo 2<br />...</p>)
  },
  {
      title: "Aviso Legal",
      type: "legal" as const,
      content: (<p>Informações legais sobre o resultado...</p>)
  }
]

export default function ResultadoPage() {
  return (
    <>
      <Header
        miniTitle="Resultado"
        title="Título do Resultado"
        description="Descrição do resultado gerado..."
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Título do Resultado"
          description="Descrição do resultado..."
          notFoundTitle="Resultado Não Encontrado"
          notFoundDescription="Descrição para quando não há resultado..."
          notFoundMessage="Mensagem quando não há resultado..."
          infoTitle="Informações Importantes"
          infoMessage="Mensagem importante sobre o resultado..."
          resultLabel="Label do Resultado"
          backPath="/[tipo-de-ferramenta]/[nome-da-ferramenta]"
          buttonText="Texto do Botão de Voltar"
          multipleParams={{ 
            enabled: true, 
            params: [
              { name: "param1", label: "Label do Param 1" },
              { name: "param2", label: "Label do Param 2" },
              { name: "param3", label: "Label do Param 3" },
              // Certifique-se de incluir TODOS os parâmetros que foram enviados na URL
            ]
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
    </>
  );
}
```

### 4. Layout da Página de Resultado (`resultado/layout.tsx`)

Layout simples para a página de resultado:

```tsx
export default function ResultadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

## Componentes de UI Disponíveis

Para a criação de formulários, utilize APENAS os seguintes componentes de UI do projeto:

1. **InputText** - Para campos de texto simples
2. **InputSelect** - Para menus de seleção dropdown (requer uso de Controller)
3. **InputCheckbox** - Para caixas de seleção múltipla
4. **InputRadio** - Para opções de seleção única (requer uso de Controller)
5. **Button** - Para botões de ação
6. **CopyResult** - Usado na página de resultado para mostrar valores copiáveis

Não utilize elementos HTML nativos como `<select>`, `<input>`, `<button>` diretamente. Em vez disso, sempre use os componentes de UI do projeto para manter a consistência visual.

## Personalização

Para cada ferramenta, você deve personalizar:

1. **Nomes e caminhos**:
   - Nome da ferramenta no URL
   - Nome dos componentes
   - Caminhos de importação

2. **Conteúdo**:
   - Títulos e descrições
   - Campos do formulário específicos
   - Lógica de processamento
   - Parâmetros de resultado

3. **SEO**:
   - Metadados title e description
   - Textos de header e informações

4. **Validação**:
   - Esquema Zod apropriado para a ferramenta
   - Mensagens de erro personalizadas

## Exemplo Completo

Você pode ver um exemplo completo de implementação na pasta:
- `app/exemplo/` (página principal)
- `app/exemplo/resultado/` (página de resultado)
- `src/components/layout/exemplo/exemplo.tsx` (componente)

## IMPORTANTE: Garantir a Correspondência de Parâmetros

Certifique-se de que TODOS os parâmetros enviados no formulário estejam configurados para serem exibidos na página de resultado. 

Por exemplo, se o seu formulário envia os parâmetros `valor`, `tipo`, `quantidade` e `formato` na URL, você DEVE incluir todos eles no array de `params` do componente ResultClient: 