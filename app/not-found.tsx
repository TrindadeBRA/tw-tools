import { ArrowRightIcon } from "@heroicons/react/20/solid"
import Link from "next/link"


export const metadata = {
    title: 'TW Tools - Página não encontrada',
    description: 'Desculpe, não foi possível encontrar a página que você está procurando.',
  }

export default function Page() {
    return (
        <>
            <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-main-600">404</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                        Página não encontrada
                    </h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                        Desculpe, não foi possível encontrar a página que você está procurando.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/"
                            className="flex items-center gap-x-2 rounded-md bg-main text-main-600 px-4 py-2.5 font-bold font-inter"
                        >
                            Voltar para a página inicial <ArrowRightIcon className="size-4" />
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}