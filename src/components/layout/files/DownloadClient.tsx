'use client'

import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'

interface DownloadClientProps {
    title: string
    description: string
    infoTitle: string
    infoMessage: string
    backPath: string
    buttonText: string
}

export default function DownloadClient({
    title,
    description,
    infoTitle,
    infoMessage,
    backPath,
    buttonText
}: DownloadClientProps) {
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