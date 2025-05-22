'use client'

import { Suspense, useState, useEffect } from "react";
import ResultClient from "@/components/layout/result/ResultClient";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import { useSearchParams } from 'next/navigation';

const infoItems = [
  {
      title: "Sobre este Resultado",
      type: "info" as const,
      content: (<p>As senhas geradas seguem os critérios de segurança que você selecionou. Cada senha é única e foi criada usando algoritmos criptográficos seguros.</p>)
  },
  {
      title: "Como Utilizar",
      type: "usage" as const,
      content: (<p>✓ Copie a senha clicando no botão ao lado<br />✓ Armazene em um gerenciador de senhas seguro<br />✓ Não compartilhe suas senhas por meios não seguros<br />✓ Crie senhas diferentes para cada serviço</p>)
  },
  {
      title: "Próximos Passos",
      type: "features" as const,
      content: (<p>✓ Altere suas senhas antigas por estas mais seguras<br />✓ Ative autenticação de dois fatores quando disponível<br />✓ Mude suas senhas periodicamente<br />✓ Verifique se suas contas foram comprometidas em vazamentos</p>)
  },
  {
      title: "Aviso Legal",
      type: "legal" as const,
      content: (<p>As senhas geradas são criadas localmente em seu navegador e não são armazenadas em nossos servidores. Recomendamos utilizar um gerenciador de senhas para armazenar suas credenciais com segurança.</p>)
  }
]

export default function ResultadoPage() {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<Array<{name: string, label: string}>>([]);
  
  useEffect(() => {
    // Verificar a quantidade de senhas geradas
    const quantidade = searchParams.get('quantidade');
    const tamanho = searchParams.get('tamanho');
    
    if (quantidade) {
      const numSenhas = parseInt(quantidade);
      // Criar array com os parâmetros corretos baseados na quantidade
      setParams(
        Array.from({ length: numSenhas }, (_, i) => ({ 
          name: `senha${i}`, 
          label: `Senha ${i+1}${tamanho ? ` (${tamanho} caracteres)` : ''}` 
        }))
      );
    }
  }, [searchParams]);

  return (
    <>
      <Header
        miniTitle="Resultado"
        title="Senhas Geradas"
        description="Suas senhas foram geradas de acordo com os critérios selecionados. Copie e utilize-as para aumentar a segurança de suas contas."
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient
          title="Suas Senhas Seguras"
          description="Abaixo estão as senhas geradas. Clique no botão ao lado para copiar."
          notFoundTitle="Erro ao Gerar Senhas"
          notFoundDescription="Não foi possível gerar as senhas com os parâmetros fornecidos."
          notFoundMessage="Verifique os parâmetros e tente novamente."
          infoTitle="Informações de Segurança"
          infoMessage="Utilize senhas fortes e diferentes para cada serviço. Considere usar um gerenciador de senhas."
          resultLabel="Senha"
          backPath="/geradores/senha"
          buttonText="Gerar Novas Senhas"
          multipleParams={{
            enabled: true,
            params: params
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
    </>
  );
} 