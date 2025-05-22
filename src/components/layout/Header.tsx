'use client'

import AdBanner from "../integration/AdBanner"

type HeaderProps = {
  miniTitle: string
  title: string
  description: string
}

export default function Header({ miniTitle, title, description }: HeaderProps) {
  return (
    <div className="mb-8">
      <div className="mx-auto">
        <div className="mx-auto lg:mx-0">
          <p className="text-base font-semibold text-main-900">{miniTitle}</p>
          <h2 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900">{title}</h2>
          <p className="mt-8 text-base font-medium text-pretty text-gray-600">
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
