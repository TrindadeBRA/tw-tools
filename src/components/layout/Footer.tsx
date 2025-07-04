"use client"

import Image from "next/image"
import Link from "next/link"
import { geradoresRoutes, validadoresRoutes, conversoresRoutes, arquivosRoutes, calculadorasRoutes } from "./Sidebar"

export default function Footer() {
    return (
        <footer className="bg-white">
            <div className="mx-auto px-6 pt-16 pb-8 lg:px-8 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                    <div className="space-y-8">
                        <Link href="/">
                            <Image
                                alt="Trinity Web Tools"
                                src="/assets/tw-tools-logo.webp"
                                width={150}
                                height={150}
                                className="h-12 w-auto object-contain"
                            />
                        </Link>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-gray-900">{geradoresRoutes.name}</h3>
                        <ul role="list" className="mt-2 space-y-4">
                            {geradoresRoutes.children?.map((item) => (
                                <li key={item.name} className="mb-0">
                                    <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-main-500">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-gray-900">{validadoresRoutes.name}</h3>
                        <ul role="list" className="mt-2 space-y-4">
                            {validadoresRoutes.children?.map((item) => (
                                <li key={item.name} className="mb-0">
                                    <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-main-500">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-gray-900">{conversoresRoutes.name}</h3>
                        <ul role="list" className="mt-2 space-y-4">
                            {conversoresRoutes.children?.map((item) => (
                                <li key={item.name} className="mb-0">
                                    <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-main-500">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-gray-900">{arquivosRoutes.name}</h3>
                        <ul role="list" className="mt-2 space-y-4">
                            {arquivosRoutes.children?.map((item) => (
                                <li key={item.name} className="mb-0">
                                    <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-main-500">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-gray-900">{calculadorasRoutes.name}</h3>
                        <ul role="list" className="mt-2 space-y-4">
                            {calculadorasRoutes.children?.map((item) => (
                                <li key={item.name} className="mb-0">
                                    <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-main-500">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <p className="text-sm/6 text-gray-600 text-center md:text-left"><b>&copy; {new Date().getFullYear()} Trinity Web Tools</b>. Todos os direitos reservados.</p>
                    <p className="text-sm/6 text-gray-600">Desenvolvido por <Link href="https://thetrinityweb.com.br" target="_blank" className="text-main-500 hover:text-main-600 font-bold">Trinity Web</Link>.</p>
                </div>
            </div>
        </footer>
    )
}
