'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { CalculatorIcon, ChevronRightIcon, CurrencyDollarIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon,
  CheckCircleIcon,
  LightBulbIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

type SubNavItem = {
  name: string
  href: string
  current?: boolean
}

type NavItem = {
  name: string
  href?: string
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  current: boolean
  children?: SubNavItem[]
}

export const navigation: NavItem[] = [
  { name: 'Descubra', href: '/', icon: LightBulbIcon, current: false },
  {
    name: 'Geradores',
    icon: UsersIcon,
    current: false,
    children: [
      { name: 'Gerador de CPF', href: '/geradores/cpf' },
      { name: 'Gerador de CNPJ', href: '/geradores/cnpj' },
      { name: 'Gerador de RG', href: '/geradores/rg' },
    ],
  },
  // {
  //   name: 'Validadores',
  //   icon: CheckCircleIcon,
  //   current: false,
  //   children: [
  //     { name: 'Validador de CPF', href: '#' },
  //     { name: 'Validador de CNPJ', href: '#' },
  //     { name: 'Validador de CEP', href: '#' },
  //   ],
  // },
  // { name: 'Calculadoras', href: '#', icon: CalculatorIcon, current: false },
  // { name: 'Conversores', icon: CurrencyDollarIcon, current: false, children: [
  //   { name: 'Conversor de Moedas', href: '#' },
  //   { name: 'Conversor de Temperatura', href: '#' },
  //   { name: 'Conversor de Unidades', href: '#' },
  // ]},
]
const shortcuts = [
  { id: 1, name: 'Gerador de CPF', href: '/geradores/cpf', initial: 'G', current: false },
  { id: 2, name: 'Gerador de CNPJ', href: '/geradores/cnpj', initial: 'G', current: false },
  { id: 3, name: 'Gerador de RG', href: '/geradores/rg', initial: 'G', current: false },
  // { id: 3, name: 'Conversor de Moedas', href: '/conversor/moedas', initial: 'W', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Function to check if a nav item or its children are current
  const isCurrentPath = (item: NavItem | SubNavItem) => {
    if (item.href === pathname) return true
    if ('children' in item && item.children) {
      return item.children.some(child => child.href === pathname)
    }
    return false
  }

  // Update navigation items with current state
  const currentNavigation = navigation.map(item => ({
    ...item,
    current: isCurrentPath(item),
    children: item.children?.map(child => ({
      ...child,
      current: child.href === pathname
    }))
  }))

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
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                <div className="flex h-16 shrink-0 items-center">
                  <Link href="/">
                    <img
                      alt="Your Company"
                      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=main&shade=600"
                      className="h-8 w-auto"
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
                              <a
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-50 text-main-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-main-600',
                                  'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                )}
                              >
                                <item.icon
                                  aria-hidden={true}
                                  className={classNames(
                                    item.current ? 'text-main-600' : 'text-gray-400 group-hover:text-main-600',
                                    'size-6 shrink-0',
                                  )}
                                />
                                {item.name}
                              </a>
                            ) : (
                              <Disclosure as="div" defaultOpen={item.current}>
                                <DisclosureButton
                                  className={classNames(
                                    item.current ? 'bg-gray-50 text-main-600' : 'text-gray-700 hover:bg-gray-50 hover:text-main-600',
                                    'group flex w-full items-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                  )}
                                >
                                  <item.icon
                                    aria-hidden={true}
                                    className={classNames(
                                      item.current ? 'text-main-600' : 'text-gray-400 group-hover:text-main-600',
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
                                      <DisclosureButton
                                        as="a"
                                        href={subItem.href}
                                        className={classNames(
                                          subItem.current ? 'bg-gray-50 text-main-600' : 'text-gray-700 hover:bg-gray-50 hover:text-main-600',
                                          'block rounded-md py-2 pr-2 pl-9 text-sm/6',
                                        )}
                                      >
                                        {subItem.name}
                                      </DisclosureButton>
                                    </li>
                                  ))}
                                </DisclosurePanel>
                              </Disclosure>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs/6 font-semibold text-gray-400">Atalhos</div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {shortcuts.map((shortcut) => (
                          <li key={shortcut.name}>
                            <a
                              href={shortcut.href}
                              className={classNames(
                                shortcut.current
                                  ? 'bg-gray-50 text-main-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-main-600',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <span
                                className={classNames(
                                  shortcut.current
                                    ? 'border-main-600 text-main-600'
                                    : 'border-gray-200 text-gray-400 group-hover:border-main-600 group-hover:text-main-600',
                                  'flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                                )}
                              >
                                {shortcut.initial}
                              </span>
                              <span className="truncate">{shortcut.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
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
            <div className="flex h-16 shrink-0 items-center">
              <Link href="/">
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=main&shade=600"
                  className="h-8 w-auto"
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
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-50 text-main-600'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-main-600',
                              'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                            )}
                          >
                            <item.icon
                              aria-hidden={true}
                              className={classNames(
                                item.current ? 'text-main-600' : 'text-gray-400 group-hover:text-main-600',
                                'size-6 shrink-0',
                              )}
                            />
                            {item.name}
                          </a>
                        ) : (
                          <Disclosure as="div" defaultOpen={item.current}>
                            <DisclosureButton
                              className={classNames(
                                item.current ? 'bg-gray-50 text-main-600' : 'text-gray-700 hover:bg-gray-50 hover:text-main-600',
                                'group flex w-full items-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <item.icon
                                aria-hidden={true}
                                className={classNames(
                                  item.current ? 'text-main-600' : 'text-gray-400 group-hover:text-main-600',
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
                                  <DisclosureButton
                                    as="a"
                                    href={subItem.href}
                                    className={classNames(
                                      subItem.current ? 'bg-gray-50 text-main-600' : 'text-gray-700 hover:bg-gray-50 hover:text-main-600',
                                      'block rounded-md py-2 pr-2 pl-9 text-sm/6',
                                    )}
                                  >
                                    {subItem.name}
                                  </DisclosureButton>
                                </li>
                              ))}
                            </DisclosurePanel>
                          </Disclosure>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs/6 font-semibold text-gray-400">Atalhos</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {shortcuts.map((shortcut) => (
                      <li key={shortcut.name}>
                        <a
                          href={shortcut.href}
                          className={classNames(
                            shortcut.current
                              ? 'bg-gray-50 text-main-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-main-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )}
                        >
                          <span
                            className={classNames(
                              shortcut.current
                                ? 'border-main-600 text-main-600'
                                : 'border-gray-200 text-gray-400 group-hover:border-main-600 group-hover:text-main-600',
                              'flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                            )}
                          >
                            {shortcut.initial}
                          </span>
                          <span className="truncate">{shortcut.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-xs sm:px-6 lg:hidden">
          <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1 text-sm/6 font-semibold text-gray-900">Dashboard</div>
        </div>

        {/* Your content */}
      </div>
    </>
  )
}


