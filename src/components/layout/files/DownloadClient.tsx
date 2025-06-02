'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'

interface DownloadClientProps {
    title: string
    description: string
    notFoundTitle: string
    notFoundDescription: string
    notFoundMessage: string
    infoTitle: string
    infoMessage: string
    backPath: string
    buttonText: string
}

export default function DownloadClient({
    title,
    description,
    notFoundTitle,
    notFoundDescription,
    notFoundMessage,
    infoTitle,
    infoMessage,
    backPath,
    buttonText
}: DownloadClientProps) {
    const searchParams = useSearchParams()
    const fileId = searchParams.get('file')

    useEffect(() => {
        if (fileId) {
            // Aqui você pode adicionar lógica adicional após o download
            // Por exemplo, rastreamento de downloads, analytics, etc.
            // console.log(`Download iniciado para o arquivo: ${fileId}`)
        }
    }, [fileId])

    if (!fileId) {
        return (
            <FormPage
                title={notFoundTitle}
                description={notFoundDescription}
            >
                <div className="px-4 py-6 sm:p-8">
                    <div className="text-center">
                        <p className="text-gray-500 mb-6">{notFoundMessage}</p>
                        <Button
                            onClick={() => window.location.href = backPath}
                        >
                            {buttonText}
                        </Button>
                    </div>
                </div>
            </FormPage>
        )
    }

    return (
        <FormPage
            title={title}
            description={description}
        >
            <div className="px-4 py-6 sm:p-8">
                <div className="text-center">
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900">{infoTitle}</h3>
                        <p className="mt-2 text-sm text-gray-500">{infoMessage}</p>
                    </div>
                    <Button
                        onClick={() => window.location.href = backPath}
                    >
                        {buttonText}
                    </Button>
                </div>
            </div>
        </FormPage>
    )
} 