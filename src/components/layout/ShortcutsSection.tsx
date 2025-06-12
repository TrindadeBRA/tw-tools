'use client'

import { ArrowRightIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { RouteGroup, SubNavItem } from "@/types/routes"

function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

interface ShortcutsSectionProps {
  routes: RouteGroup
  hideDescription?: boolean
}

export default function ShortcutsSection({ routes, hideDescription = false }: ShortcutsSectionProps) {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">{routes.name}</h2>
      {!hideDescription && <p className="text-sm text-gray-500">Confira nossas ferramentas desta seção.</p>}
      <ul role="list" className="mt-6 grid grid-cols-1 gap-6 border-t border-b border-gray-200 py-6 sm:grid-cols-3">
        {routes.children?.filter((item: SubNavItem) => !item.shortcutHidden).map((item: SubNavItem, itemIdx: number) => (
          <li key={itemIdx} className="flow-root">
            <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-main-500 hover:bg-gray-50">
              <div
                className={classNames('flex size-16 shrink-0 items-center justify-center rounded-lg bg-main-950')}
              >
                <routes.icon aria-hidden={true} className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={item.href} className="focus:outline-hidden flex items-center gap-2">
                    <span aria-hidden={true} className="absolute inset-0" />
                    <span className="font-bold">{item.name}</span>
                    <span aria-hidden={true}><ArrowRightIcon className="size-4" /></span>
                  </Link>
                </h3>
                {item.description && (
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
