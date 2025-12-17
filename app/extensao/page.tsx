import { Metadata } from "next";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import { 
  PuzzlePieceIcon, 
  ArrowDownTrayIcon, 
  ComputerDesktopIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  CommandLineIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TrinityForm - Extensão para Preencher Formulários | TW Tools",
  description: "Extensão gratuita para Chrome e Firefox que adiciona opções no menu de contexto para inserir dados de teste (CPF, Email, Telefone, Nome) em formulários durante o desenvolvimento.",
};

const infoItems = [
  {
    title: "Sobre a Extensão",
    type: "info" as const,
    content: (
      <p>
        A TrinityForm é uma extensão multi-navegador que adiciona opções no menu de contexto (botão direito) 
        para inserir dados de teste em campos de formulário durante o desenvolvimento. Compatível com Firefox, 
        Chrome, Edge, Opera e Brave.
      </p>
    )
  },
  {
    title: "Funcionalidades",
    type: "features" as const,
    content: (
      <p>
        ✓ Gera CPFs válidos com dígitos verificadores corretos<br />
        ✓ Cria emails aleatórios com formatos realistas<br />
        ✓ Gera telefones com DDD válidos do Brasil<br />
        ✓ Cria nomes brasileiros realistas<br />
        ✓ Compatível com React, Vue e outros frameworks
      </p>
    )
  },
  {
    title: "Uso Recomendado",
    type: "usage" as const,
    content: (
      <p>
        ✓ Desenvolvimento e teste de formulários<br />
        ✓ Testes de integração e QA<br />
        ✓ Preenchimento rápido de campos<br />
        ✓ Validação de formulários<br />
        ✓ Demonstrações e protótipos
      </p>
    )
  },
  {
    title: "Aviso Legal",
    type: "legal" as const,
    content: (
      <p>
        Esta extensão foi desenvolvida exclusivamente para fins de teste e desenvolvimento. 
        Os dados gerados são fictícios e não devem ser utilizados para fins reais ou fraudulentos. 
        O uso indevido é de total responsabilidade do usuário.
      </p>
    )
  }
];

export default function ExtensionPage() {
  const breadcrumbs = [
    {
      name: 'Início',
      href: '/',
      current: false
    },
    {
      name: 'TrinityForm Extension',
      href: '/extensao',
      current: true
    }
  ];

  return (
    <>
      <Header
        miniTitle="Extensão para Navegador"
        title="TrinityForm Extension"
        description="Extensão gratuita para Chrome e Firefox que facilita o preenchimento de formulários com dados de teste durante o desenvolvimento. Gere CPF, email, telefone e nomes brasileiros com apenas um clique direito."
        breadcrumbs={breadcrumbs}
      />

      {/* Hero Section com Download */}
      <div className="mb-12">
        <div className="bg-gradient-to-br from-main-50 to-main-100 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-b via-main-600 to-main-700 mb-6">
              <PuzzlePieceIcon className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Disponível nas Lojas Oficiais
            </h2>
            
            <p className="text-lg text-gray-700 mb-8">
              Instale a extensão diretamente das lojas oficiais e comece a usar agora mesmo!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://chromewebstore.google.com/detail/trinityform/bhoeijmhignchgoclonfnooogiebijao"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 hover:border-main-500 group w-full sm:w-auto"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src="/assets/icons/chromewebstore.jpg" 
                    alt="Chrome Web Store"
                    className="w-8 h-8 rounded"
                  />
                  <div className="text-left">
                    <div className="text-xs text-gray-600 font-medium">Baixar na</div>
                    <div className="text-base font-bold text-gray-900">Chrome Web Store</div>
                  </div>
                </div>
                <ArrowDownTrayIcon className="h-5 w-5 text-gray-400 group-hover:text-main-600 transition-colors" />
              </a>
              
              <a
                href="https://addons.mozilla.org/pt-BR/firefox/addon/trinityform/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 hover:border-main-500 group w-full sm:w-auto"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src="/assets/icons/addons-mozilla.png" 
                    alt="Firefox Add-ons"
                    className="w-8 h-8 rounded"
                  />
                  <div className="text-left">
                    <div className="text-xs text-gray-600 font-medium">Baixar na</div>
                    <div className="text-base font-bold text-gray-900">Firefox Add-ons</div>
                  </div>
                </div>
                <ArrowDownTrayIcon className="h-5 w-5 text-gray-400 group-hover:text-main-600 transition-colors" />
              </a>
            </div>
            
            <p className="mt-6 text-sm text-gray-600">
              💙 Se puder, deixe uma avaliação para dar aquela força! 🙏
            </p>
          </div>
        </div>
      </div>

      {/* Demonstração Visual */}
      <div className="mb-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Veja a extensão em ação</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Clique com o botão direito em qualquer campo de formulário e selecione uma das opções para preencher automaticamente
          </p>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 inline-block">
            <img 
              src="/assets/icons/form.png" 
              alt="TrinityForm Extension - Menu de contexto com opções de preenchimento automático"
              className="rounded-xl shadow-2xl max-w-full h-auto mx-auto"
              style={{ maxWidth: '600px' }}
            />
          </div>
        </div>
      </div>

      {/* Como Usar */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Como usar</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-main-500 transition-colors">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-main-100 text-main-700 font-bold text-xl mb-4">
              1
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Instale a extensão</h3>
            <p className="text-sm text-gray-600">
              Baixe e instale pela Chrome Web Store ou Firefox Add-ons
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-main-500 transition-colors">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-main-100 text-main-700 font-bold text-xl mb-4">
              2
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Acesse um formulário</h3>
            <p className="text-sm text-gray-600">
              Abra qualquer página com campos de texto ou formulários
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-main-500 transition-colors">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-main-100 text-main-700 font-bold text-xl mb-4">
              3
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Clique direito</h3>
            <p className="text-sm text-gray-600">
              Clique com botão direito em um campo editável
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-main-500 transition-colors">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-main-100 text-main-700 font-bold text-xl mb-4">
              4
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Selecione a opção</h3>
            <p className="text-sm text-gray-600">
              Escolha CPF, Email, Telefone ou Nome no menu
            </p>
          </div>
        </div>
      </div>

      {/* Recursos Detalhados */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recursos detalhados</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">CPF Válido</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Gera CPFs válidos com dígitos verificadores corretos, seguindo o algoritmo da Receita Federal.
                </p>
                <p className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                  Formato: 12345678901 (apenas números)
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Realista</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Gera emails aleatórios com formatos realistas usando vários domínios populares.
                </p>
                <p className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                  Exemplo: usuario1234@gmail.com
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Telefone com DDD</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Gera telefones celulares com DDDs válidos de diferentes estados do Brasil.
                </p>
                <p className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                  Formato: (11) 98765-4321
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Nome Brasileiro</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Gera nomes brasileiros realistas com primeiro nome e sobrenome(s).
                </p>
                <p className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                  Exemplo: Maria Silva Santos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compatibilidade */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Compatibilidade</h2>
        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <ComputerDesktopIcon className="h-8 w-8 text-main-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Navegadores</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Google Chrome</li>
                  <li>✓ Mozilla Firefox</li>
                  <li>✓ Microsoft Edge</li>
                  <li>✓ Opera</li>
                  <li>✓ Brave</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <GlobeAltIcon className="h-8 w-8 text-main-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Campos Suportados</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Input text</li>
                  <li>✓ Textarea</li>
                  <li>✓ Campos editáveis</li>
                  <li>✓ ContentEditable</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <CommandLineIcon className="h-8 w-8 text-main-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Frameworks</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ React</li>
                  <li>✓ Vue.js</li>
                  <li>✓ Angular</li>
                  <li>✓ HTML puro</li>
                  <li>✓ Todos os sites</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <InfoSection items={infoItems} />
    </>
  );
}

