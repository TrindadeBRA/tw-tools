import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true },
]

export default function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="flex mb-6">
      <ol role="list" className="flex items-center space-x-4 ">
        <li>
          <div>
            <a href="#" className="text-main-700 hover:text-main-700">
              <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon aria-hidden="true" className="size-5 shrink-0 text-main-700" />
              <a
                href={page.href}
                aria-current={page.current ? 'page' : undefined}
                className="ml-4 text-sm font-bold text-main-700 hover:text-main-700"
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
