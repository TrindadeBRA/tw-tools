import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

type BreadcrumbItem = {
  name: string
  href: string
  current?: boolean
}

type BreadcrumbsProps = {
  items?: BreadcrumbItem[]
}

export default function Breadcrumbs({ items = [] }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex mb-4 sm:mb-6">
      <ol role="list" className="flex items-center space-x-2 sm:space-x-4">
        <li>
          <div>
            <Link href="/" className="text-main-700 hover:text-main-700">
              <HomeIcon aria-hidden="true" className="size-4 sm:size-5 shrink-0" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {items.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon aria-hidden="true" className="size-4 sm:size-5 shrink-0 text-main-700" />
              <Link
                href={page.href}
                aria-current={page.current ? 'page' : undefined}
                className="ml-2 sm:ml-4 text-xs sm:text-sm font-bold text-main-700 hover:text-main-700"
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
