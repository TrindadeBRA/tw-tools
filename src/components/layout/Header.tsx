'use client'

import AdBanner from "../integration/AdBanner"
import Breadcrumbs from "../ui/Breadcrumbs"

type BreadcrumbItem = {
  name: string
  href: string
  current?: boolean
}

type HeaderProps = {
  miniTitle: string
  title: string
  description: string
  breadcrumbs?: BreadcrumbItem[]
}

export default function Header({ miniTitle, title, description, breadcrumbs }: HeaderProps) {
  return (
    <div className="mb-8 border-b border-gray-200">
      <div className="mx-auto">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto lg:mx-0">
          {/* <p className="text-base font-semibold text-main-900">{miniTitle}</p> */}
          <h2 className="mt-2 text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">{title}</h2>
          <p className="mt-2 text-base font-medium text-pretty text-gray-600">
            {description}
          </p>
        </div>

        <div className='max-w-[1200px] mx-auto block my-8'>
          <AdBanner
            data-ad-slot="8794839021"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

      </div>
    </div>
  )
}
