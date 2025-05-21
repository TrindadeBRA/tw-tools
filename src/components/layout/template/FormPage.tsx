import { ReactNode } from 'react'

interface FormPageProps {
  title: string
  description: string
  children: ReactNode
}

export default function FormPage({ title, description, children }: FormPageProps) {
  return (
    <div className="divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base/7 font-semibold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            {description}
          </p>
        </div>

        <div className="bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          {children}
        </div>
      </div>
    </div>
  )
}