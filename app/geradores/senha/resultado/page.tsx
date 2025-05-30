import { Suspense } from "react";
import LoadingResult from "@/components/layout/LoadingResult";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import ResultClient from '@/components/layout/result/ResultClient';

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
        title="Senha Segura Gerada"
        description="Confira a senha segura gerada com base nas suas configurações. Utilize esta senha para proteger suas contas e informações."
        breadcrumbs={breadcrumbs}
      />
      <Suspense fallback={<LoadingResult />}>
        <ResultClient 
          title="Senhas Seguras Geradas"
          description="As senhas geradas seguem os critérios de segurança selecionados e estão prontas para serem utilizadas."
          notFoundTitle="Senhas Não Encontradas"
          notFoundDescription="Não foi possível encontrar as senhas geradas. Por favor, tente gerar novas senhas."
          notFoundMessage="Nenhuma senha foi encontrada. Clique abaixo para gerar novas senhas."
          infoTitle="Informações Importantes"
          infoMessage="Estas senhas foram geradas de forma segura e aleatória. Recomendamos utilizar senhas únicas para cada serviço."
          resultLabel="Senha Gerada"
          backPath="/geradores/senha"
          buttonText="Gerar Novas Senhas"
          multipleParams={{
            enabled: true,
            params: Array.from({ length: 20 }, (_, i) => ({
              name: `senha${i}`,
              label: `Senha ${i + 1}`
            }))
          }}
        />
      </Suspense>
      <InfoSection items={infoItems} />
    </>
  );
} 