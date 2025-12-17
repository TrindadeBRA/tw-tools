'use client'

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ExtensionSection() {
  return (
    <section className="mb-16 mx-auto sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-main-700 via-main-600 to-main-500 shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>

        <div className="relative px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Coluna esquerda - Texto e Botões */}
            <div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
                TrinityForm Extension
              </h2>

              <p className="mt-6 text-xl text-main-200">
                Extensão para navegador que adiciona opções no menu de contexto para inserir dados de teste (CPF, Email, Telefone, Nome) em formulários durante o desenvolvimento. Compatível com Chrome, Firefox, Edge, Opera e Brave.
              </p>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 mt-10">
                <Link
                  href="/extensao"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 hover:border-main-500 group w-full sm:w-auto"
                >
                  <span className="text-base font-bold text-gray-900 group-hover:text-main-700">Saiba mais</span>
                  <span aria-hidden="true" className="text-xl text-gray-900 group-hover:text-main-700">→</span>
                </Link>

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
            </div>

            {/* Coluna direita - Imagem */}
            <div className="mt-10 lg:mt-0">
              <div className="relative">
                <a href="/extensao" rel="noopener noreferrer">
                  <img
                    src="/assets/icons/form.png"
                    alt="TrinityForm Extension em ação - Menu de contexto mostrando opções de preenchimento"
                    className="w-[500px] h-auto rounded-xl shadow-2xl mx-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

