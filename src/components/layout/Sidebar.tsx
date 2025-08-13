'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon,
  LightBulbIcon,
  UsersIcon,
  XMarkIcon,
  ArrowsRightLeftIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  CalculatorIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import AdBanner from '../integration/AdBanner'
import Image from 'next/image'

type SubNavItem = {
  name: string
  href: string
  current?: boolean
  shortcutHidden?: boolean
}

type NavItem = {
  name: string
  href?: string
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  current: boolean
  children?: SubNavItem[]
}


export const geradoresRoutes = {
  name: 'Geradores',
  icon: UsersIcon,
  current: false,
  children: [
    { name: 'Gerador de Placas', href: '/geradores/placa' },
    { name: 'Gerador de CPF', href: '/geradores/cpf' },
    { name: 'Gerador de CNPJ', href: '/geradores/cnpj' },
    { name: 'Gerador de CNH', href: '/geradores/cnh' },
    { name: 'Gerador de RG', href: '/geradores/rg' },
    { name: 'Gerador de Cartão de Crédito', href: '/geradores/cartao-de-credito' },
    { name: 'Gerador de CEP', href: '/geradores/cep' },
    { name: 'Gerador de QR Code', href: '/geradores/qrcode' },
    { name: 'Gerador de Senha', href: '/geradores/senha' },
    { name: 'Gerador de Telefone', href: '/geradores/telefone' },
    { name: 'Gerador de Imagem', href: '/geradores/imagem' },
    { name: 'Link do WhatsApp', href: '/geradores/whatsapp' },
    { name: 'Todos os Geradores', href: '/geradores', shortcutHidden: true },
  ],
}

export const validadoresRoutes = {
  name: 'Validadores',
  icon: ShieldCheckIcon,
  current: false,
  children: [
    { name: 'Validador de CPF', href: '/validadores/cpf' },
    { name: 'Validador de CNPJ', href: '/validadores/cnpj' },
    { name: 'Validador de RG', href: '/validadores/rg' },
    { name: 'Validador de CNH', href: '/validadores/cnh' },
    { name: 'Validador de PIS/PASEP/NIT', href: '/validadores/pis' },
    { name: 'Contador de Texto', href: '/validadores/contador-de-texto' },
    { name: 'Todos os Validadores', href: '/validadores', shortcutHidden: true },
  ],
}

export const conversoresRoutes = {
  name: 'Conversões',
  icon: ArrowsRightLeftIcon,
  current: false,
  children: [
    { name: 'Armazenamento Digital', href: '/conversores/armazenamento' },
    { name: 'Número por Extenso', href: '/conversores/numero-por-extenso' },
    { name: 'Números Romanos', href: '/conversores/numeros-romanos' },
    { name: 'Salário CLT/PJ', href: '/conversores/salario-clt-pj' },
    { name: 'Temperatura', href: '/conversores/temperatura' },
    { name: 'Todos os Conversores', href: '/conversores', shortcutHidden: true },
  ],
}

export const arquivosRoutes = {
  name: 'Arquivos Testes',
  icon: DocumentTextIcon,
  current: false,
  children: [
    { name: 'Arquivos .PDF', href: '/arquivos-testes/pdf' },
    { name: 'Arquivos .DOCX', href: '/arquivos-testes/docx' },
    { name: 'Arquivos .XLSX', href: '/arquivos-testes/xlsx' },
    { name: 'Arquivos .CSV', href: '/arquivos-testes/csv' },
    { name: 'Arquivos .JSON', href: '/arquivos-testes/json' },
    { name: 'Arquivos .TXT', href: '/arquivos-testes/txt' },
    { name: 'Arquivos .ZIP', href: '/arquivos-testes/zip' },
    { name: 'Arquivos .RAR', href: '/arquivos-testes/rar' },
    { name: 'Arquivos .7Z', href: '/arquivos-testes/7z' },
    { name: 'Todos os Arquivos', href: '/arquivos-testes', shortcutHidden: true },
  ],
}

export const calculadorasRoutes = {
  name: 'Calculadoras',
  icon: CalculatorIcon,
  current: false,
  children: [
    { name: 'Calculadora de IMC', href: '/calculadoras/imc' },
    { name: 'Calculadora de Idade', href: '/calculadoras/idade' },
    { name: 'Calculadora de Horas', href: '/calculadoras/horas' },
    { name: 'Calculadora de Porcentagem', href: '/calculadoras/porcentagem' },
    { name: 'Calculadora de Combustível', href: '/calculadoras/combustivel' },
    { name: 'Comparador de Preço', href: '/calculadoras/comparador-preco' },
    { name: 'Calculadora de Regra de Três', href: '/calculadoras/regra-de-tres' },
    { name: 'Rescisão CLT', href: '/calculadoras/rescisao-clt' },
    { name: 'Todos as Calculadoras', href: '/calculadoras', shortcutHidden: true },
  ],
}

export const countTools = arquivosRoutes.children.length + calculadorasRoutes.children.length + conversoresRoutes.children.length + geradoresRoutes.children.length + validadoresRoutes.children.length;


export const navigation: NavItem[] = [
  { name: 'Descubra', href: '/', icon: LightBulbIcon, current: false },
  arquivosRoutes,
  calculadorasRoutes,
  conversoresRoutes,
  geradoresRoutes,
  validadoresRoutes,
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const [currentNavigation, setCurrentNavigation] = useState<NavItem[]>([])

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  useEffect(() => {
    const isCurrentPath = (item: NavItem | SubNavItem) => {
      if (!('children' in item)) {
        return pathname === item.href
      }
      
      const exactMatch = pathname === item.href
      const childActive = item.children?.some(child => 
        !child.shortcutHidden && (
          pathname.startsWith(child.href + '/') || 
          pathname === child.href
        )
      )
      
      return exactMatch || childActive
    }

    const updatedNavigation = navigation.map(item => ({
      ...item,
      current: isCurrentPath(item),
      children: item.children?.map(child => ({
        ...child,
        current: child.shortcutHidden 
          ? pathname === child.href 
          : pathname.startsWith(child.href + '/') || pathname === child.href
      }))
    }))

    setCurrentNavigation(updatedNavigation as NavItem[])
  }, [pathname, navigation])

  return (
    <>
      <div>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5 cursor-pointer">
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                <div className="flex h-16 shrink-0 items-center mt-6">
                  <Link href="/">
                    <Image
                      alt="Trinity Web Tools"
                      src="/assets/tw-tools-logo.webp"
                      width={100}
                      height={100}
                      className="h-12 w-auto"
                    />
                  </Link>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {currentNavigation.map((item) => (
                          <li key={item.name}>
                            {!item.children ? (
                              <Link
                                href={item.href || ''}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-50 text-main-900'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-main-900',
                                  'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer',
                                )}
                              >
                                <item.icon
                                  aria-hidden={true}
                                  className={classNames(
                                    item.current ? 'text-main-900' : 'text-gray-400 group-hover:text-main-900',
                                    'size-6 shrink-0',
                                  )}
                                />
                                {item.name}
                              </Link>
                            ) : (
                              <Disclosure as="div" defaultOpen={item.current || item.children?.some(child => child.current)}>
                                <DisclosureButton
                                  className={classNames(
                                    item.current ? 'bg-gray-50 text-main-900' : 'text-gray-700 hover:bg-gray-50 hover:text-main-900',
                                    'group flex w-full items-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer',
                                  )}
                                >
                                  <item.icon
                                    aria-hidden={true}
                                    className={classNames(
                                      item.current ? 'text-main-900' : 'text-gray-400 group-hover:text-main-900',
                                      'size-6 shrink-0',
                                    )}
                                  />
                                  {item.name}
                                  <ChevronRightIcon
                                    aria-hidden="true"
                                    className="ml-auto size-5 shrink-0 text-gray-400 group-data-open:rotate-90 group-data-open:text-gray-500"
                                  />
                                </DisclosureButton>
                                <DisclosurePanel as="ul" className="mt-1 px-2">
                                  {item.children.map((subItem) => (
                                    <li key={subItem.name}>
                                      <Link
                                        href={subItem.href || ''}
                                        className={classNames(
                                          subItem.current ? 'bg-gray-50 text-main-900' : 'text-gray-700 hover:bg-gray-50 hover:text-main-900',
                                          'block rounded-md py-2 pr-2 pl-9 text-sm/6 cursor-pointer',
                                        )}
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </DisclosurePanel>
                              </Disclosure>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className='mt-8'>
                      <div className='!size-[235px] mx-auto'>
                        <AdBanner
                          data-ad-slot="1248114394"
                          data-ad-format="auto"
                          data-full-width-responsive="true"
                        />
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center mt-6">
              <Link href="/">
                <Image
                  alt="Trinity Web Tools"
                  src="/assets/tw-tools-logo.webp"
                  width={100}
                  height={100}
                  className="h-14 w-auto"
                />
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {currentNavigation.map((item) => (
                      <li key={item.name}>
                        {!item.children ? (
                          <Link
                            href={item.href || ''}
                            className={classNames(
                              item.current
                                ? 'bg-gray-50 text-main-900'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-main-900',
                              'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer',
                            )}
                          >
                            <item.icon
                              aria-hidden={true}
                              className={classNames(
                                item.current ? 'text-main-900' : 'text-gray-400 group-hover:text-main-900',
                                'size-6 shrink-0',
                              )}
                            />
                            {item.name}
                          </Link>
                        ) : (
                          <Disclosure as="div" defaultOpen={item.current || item.children?.some(child => child.current)}>
                            <DisclosureButton
                              className={classNames(
                                item.current ? 'bg-gray-50 text-main-900' : 'text-gray-700 hover:bg-gray-50 hover:text-main-900',
                                'group flex w-full items-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer',
                              )}
                            >
                              <item.icon
                                aria-hidden={true}
                                className={classNames(
                                  item.current ? 'text-main-900' : 'text-gray-400 group-hover:text-main-900',
                                  'size-6 shrink-0',
                                )}
                              />
                              {item.name}
                              <ChevronRightIcon
                                aria-hidden="true"
                                className="ml-auto size-5 shrink-0 text-gray-400 group-data-open:rotate-90 group-data-open:text-gray-500"
                              />
                            </DisclosureButton>
                            <DisclosurePanel as="ul" className="mt-1 px-2">
                              {item.children.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href || ''}
                                    className={classNames(
                                      subItem.current ? 'bg-gray-50 text-main-900' : 'text-gray-700 hover:bg-gray-50 hover:text-main-900',
                                      'block rounded-md py-2 pr-2 pl-9 text-sm/6 cursor-pointer',
                                    )}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </DisclosurePanel>
                          </Disclosure>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
                <li className='mt-8'>
                  <div className='!size-[235px] mx-auto'>
                    <AdBanner
                      data-ad-slot="1248114394"
                      data-ad-format="auto"
                      data-full-width-responsive="true"
                    />
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-xs sm:px-6 lg:hidden">
          <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden cursor-pointer">
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1 text-sm/6 font-semibold text-gray-900">
            <Link href="/">
              <Image
                alt="Trinity Web Tools"
                src="/assets/tw-tools-logo.webp"
                width={100}
                height={100}
                className="h-8 w-auto ml-auto"
              />
            </Link>
          </div>
        </div>

        {/* Your content */}
      </div>
    </>
  )
}


