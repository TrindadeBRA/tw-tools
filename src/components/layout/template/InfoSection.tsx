'use client'

import React from 'react'
import {
  InformationCircleIcon,
  CheckCircleIcon,
  SparklesIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline'
import AdBanner from '@/components/integration/AdBanner'

interface InfoItem {
  title: string
  content: React.ReactNode
  type?: 'info' | 'features' | 'usage' | 'legal'
}

interface InfoSectionProps {
  items: InfoItem[]
}

const getIcon = (type?: string) => {
  switch (type) {
    case 'info':
      return <InformationCircleIcon className="h-6 w-6 text-gray-600" />
    case 'features':
      return <SparklesIcon className="h-6 w-6 text-gray-600" />
    case 'usage':
      return <CheckCircleIcon className="h-6 w-6 text-gray-600" />
    case 'legal':
      return <ShieldExclamationIcon className="h-6 w-6 text-gray-600" />
    default:
      return <InformationCircleIcon className="h-6 w-6 text-gray-600" />
  }
}

export default function InfoSection({ items }: InfoSectionProps) {
  return (
    <section className="mx-auto py-8">
      <div className='max-w-[1200px] mx-auto block mb-8'>
        <AdBanner
          data-ad-slot="8607120857"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
      <div className="mx-auto">
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-gray-100 bg-white p-6 transition-all duration-200 hover:border-gray-200 hover:shadow-sm"
            >
              <div className="flex gap-4">
                <div className="mt-1 shrink-0">
                  {getIcon(item.type)}
                </div>
                <div>
                  <h3 className="mb-2 font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <div className="text-sm leading-relaxed text-gray-600">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 