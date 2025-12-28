import { Metadata } from "next";
import Header from "@/components/layout/Header";
import InfoSection from "@/components/layout/template/InfoSection";
import {
  PuzzlePieceIcon,
  ArrowDownTrayIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  CommandLineIcon,
  ShieldCheckIcon,
  SparklesIcon,
  BoltIcon
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
        <div className="relative overflow-hidden rounded-3xl border border-main-100 bg-gradient-to-br from-main-50 via-white to-main-100 shadow-xl">
          <div className="absolute -left-10 -top-16 h-48 w-48 rounded-full bg-main-100 blur-3xl" aria-hidden />
          <div className="absolute -right-12 bottom-0 h-52 w-52 rounded-full bg-main-200/60 blur-3xl" aria-hidden />

          <div className="relative grid gap-10 lg:grid-cols-3 items-stretch px-8 py-12 md:px-12 lg:px-16">
            <div className="lg:col-span-2 flex flex-col justify-center text-center lg:text-left space-y-6">
              <div className="inline-flex items-center justify-center lg:justify-start gap-3 rounded-full bg-white shadow-sm px-4 py-2 text-sm font-semibold text-main-800 ring-1 ring-main-100">
                <PuzzlePieceIcon className="h-5 w-5 text-main-600" />
                TrinityForm disponível nas lojas oficiais
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Instale e use em segundos</h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto lg:mx-0">
                  Fluxo visual refinado, botões destacados e destaque para o que importa: um clique direito para preencher CPF, email, telefone e nome em qualquer formulário.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="https://chromewebstore.google.com/detail/trinityform/bhoeijmhignchgoclonfnooogiebijao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between gap-3 rounded-xl bg-white px-6 py-4 text-left shadow-lg ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-xl w-full sm:w-auto"
                >
                  <div className="flex items-center gap-3">
                    <img src="/assets/icons/chromewebstore.jpg" alt="Chrome Web Store" className="h-10 w-10 rounded" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">Instalar via</p>
                      <p className="text-base font-semibold text-gray-900">Chrome Web Store</p>
                    </div>
                  </div>
                  <ArrowDownTrayIcon className="h-5 w-5 text-gray-400 group-hover:text-main-600" />
                </a>

                <a
                  href="https://addons.mozilla.org/pt-BR/firefox/addon/trinityform/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between gap-3 rounded-xl bg-white px-6 py-4 text-left shadow-lg ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-xl w-full sm:w-auto"
                >
                  <div className="flex items-center gap-3">
                    <img src="/assets/icons/addons-mozilla.png" alt="Firefox Add-ons" className="h-10 w-10 rounded" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">Instalar via</p>
                      <p className="text-base font-semibold text-gray-900">Firefox Add-ons</p>
                    </div>
                  </div>
                  <ArrowDownTrayIcon className="h-5 w-5 text-gray-400 group-hover:text-main-600" />
                </a>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-sm text-main-800">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow ring-1 ring-main-100">
                  <ShieldCheckIcon className="h-4 w-4 text-main-600" /> Publicada e verificada
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow ring-1 ring-main-100">
                  <SparklesIcon className="h-4 w-4 text-main-600" /> Interface aprimorada
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow ring-1 ring-main-100">
                  <BoltIcon className="h-4 w-4 text-main-600" /> Instalação rápida
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-full rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-main-100 backdrop-blur">
                <div className="flex items-center gap-3 text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-main-100 text-main-700">
                    <PuzzlePieceIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Menu de contexto pronto</p>
                    <p className="text-sm text-gray-600">Clique direito e escolha o dado em vez de preencher manualmente.</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="rounded-xl bg-main-50 px-3 py-3 text-center font-semibold text-main-800">CPF válido</div>
                  <div className="rounded-xl bg-main-50 px-3 py-3 text-center font-semibold text-main-800">Email realista</div>
                  <div className="rounded-xl bg-main-50 px-3 py-3 text-center font-semibold text-main-800">Telefone com DDD</div>
                  <div className="rounded-xl bg-main-50 px-3 py-3 text-center font-semibold text-main-800">Nomes brasileiros</div>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-main-600 to-main-500 p-[1px] shadow-xl">
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">Pronta para times</p>
                    <p className="text-base font-semibold text-gray-900">Acelere QA, homologação e demos</p>
                  </div>
                  <span className="rounded-full bg-main-50 px-3 py-2 text-sm font-semibold text-main-700">1 clique</span>
                </div>
              </div>
            </div>
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
          {["Instale a extensão", "Acesse um formulário", "Clique direito", "Selecione a opção"].map((title, idx) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-main-500 via-main-400 to-main-600" aria-hidden />
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-main-100 text-main-700 font-bold text-xl mb-4">
                {idx + 1}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">
                {idx === 0 && "Baixe e instale pela Chrome Web Store ou Firefox Add-ons"}
                {idx === 1 && "Abra qualquer página com campos de texto ou formulários"}
                {idx === 2 && "Clique com botão direito em um campo editável"}
                {idx === 3 && "Escolha CPF, Email, Telefone ou Nome no menu"}
              </p>
            </div>
          ))}
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

