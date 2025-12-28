'use client'

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ExtensionSection() {
  return (
    <section className="mb-16 mx-auto sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-main-900 via-main-700 to-main-500 shadow-2xl text-white">
        <div className="absolute inset-0 opacity-30 mix-blend-screen" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 0, transparent 25%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.15) 0, transparent 22%), radial-gradient(circle at 60% 70%, rgba(255,255,255,0.18) 0, transparent 30%)',
            }}
          />
        </div>

        <div className="relative px-6 py-14 sm:py-20 lg:px-12 lg:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Coluna esquerda - Texto e Botões */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-300 animate-pulse" aria-hidden />
                Extensão oficial para formulários
              </div>

              <div className="space-y-3">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">TrinityForm Extension</h2>
                <p className="text-lg text-main-100">
                  Preencha campos de CPF, email, telefone e nome com um clique direito. Ideal para acelerar testes, QA e
                  prototipação em qualquer stack frontend.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {["Chrome & Firefox", "Edge", "Opera", "Brave", "Menu de contexto"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-main-50 backdrop-blur"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
                <Link
                  href="/extensao"
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-white/15 px-6 py-4 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:-translate-y-0.5 hover:bg-white/25 hover:shadow-lg"
                >
                  <span>Ver detalhes e tutorial</span>
                  <span aria-hidden className="text-lg">→</span>
                </Link>

                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 w-full sm:w-auto">
                  <a
                    href="https://chromewebstore.google.com/detail/trinityform/bhoeijmhignchgoclonfnooogiebijao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-between gap-3 rounded-xl bg-white text-gray-900 px-5 py-4 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <img src="/assets/icons/chromewebstore.jpg" alt="Chrome Web Store" className="h-9 w-9 rounded" />
                      <div className="text-left">
                        <div className="text-[11px] uppercase tracking-wide text-gray-500">Instalar via</div>
                        <div className="text-base font-bold">Chrome Web Store</div>
                      </div>
                    </div>
                    <ArrowDownTrayIcon className="h-5 w-5 text-gray-400" />
                  </a>

                  <a
                    href="https://addons.mozilla.org/pt-BR/firefox/addon/trinityform/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-between gap-3 rounded-xl bg-white text-gray-900 px-5 py-4 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <img src="/assets/icons/addons-mozilla.png" alt="Firefox Add-ons" className="h-9 w-9 rounded" />
                      <div className="text-left">
                        <div className="text-[11px] uppercase tracking-wide text-gray-500">Instalar via</div>
                        <div className="text-base font-bold">Firefox Add-ons</div>
                      </div>
                    </div>
                    <ArrowDownTrayIcon className="h-5 w-5 text-gray-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Coluna direita - Imagem */}
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" aria-hidden />
                <div className="absolute -bottom-6 -right-10 h-40 w-40 rounded-full bg-main-200/20 blur-3xl" aria-hidden />
                <a href="/extensao" rel="noopener noreferrer" className="block group">
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-white/30 transition group-hover:-translate-y-1">
                    <img
                      src="/assets/icons/form.png"
                      alt="TrinityForm Extension em ação - Menu de contexto mostrando opções de preenchimento"
                      className="w-full max-w-xl h-auto mx-auto"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 text-[11px] font-semibold text-gray-900">
                      {["Plug-and-play", "Dados realistas", "Sem código"].map((pill) => (
                        <span key={pill} className="rounded-full bg-main-50 px-3 py-1 text-main-700 shadow">
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

