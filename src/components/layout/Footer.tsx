import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-white">
            <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/">
                            <Image
                                alt="Trinity Web Tools"
                                src="/assets/tw-tools-logo.webp"
                                width={150}
                                height={150}
                                className="h-12 w-auto"
                            />
                        </Link>
                    </div>
                </div>
                <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 flex flex-row gap-4 justify-between">
                    <p className="text-sm/6 text-gray-600">&copy; {new Date().getFullYear()} Trinity Web Tools. Todos os direitos reservados.</p>
                    <p className="text-sm/6 text-gray-600">Desenvolvido por <Link href="https://thetrinityweb.com.br" target="_blank" className="text-main-500 hover:text-main-600 font-bold">Trinity Web</Link>.</p>
                </div>
            </div>
        </footer>
    )
}
