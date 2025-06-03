export default function Hero() {
  return (
    <div className="mb-16">
      <main>
        <div>
          <div className="relative">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
            <div className="mx-auto sm:px-6 lg:px-8">
              <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
                <div className="absolute inset-0">
                  <img
                    alt="Ferramentas e utilitários online"
                    src="/assets/hero-bg.webp"
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-main-700 mix-blend-multiply" />
                </div>
                <div className="relative px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
                  <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="block text-white">Ferramentas online</span>
                    <span className="block text-main-200">para facilitar seu dia a dia</span>
                  </h1>
                  <p className="mx-auto mt-6 max-w-lg text-center text-xl text-main-200 sm:max-w-3xl">
                    Acesse nossa coleção de ferramentas gratuitas: calculadoras, conversores, validadores e geradores. 
                    Tudo em um só lugar para tornar suas tarefas mais simples e eficientes.
                  </p>
                  {/* <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                    <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                      <a
                        href="/calculadoras"
                        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-main-700 shadow-xs hover:bg-main-50 sm:px-8"
                      >
                        Explorar ferramentas
                      </a>
                      <a
                        href="/exemplo"
                        className="flex items-center justify-center rounded-md border border-transparent bg-main-500/60 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-main-500/70 sm:px-8"
                      >
                        Ver exemplos
                      </a>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
