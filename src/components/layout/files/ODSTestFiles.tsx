'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'

const odsFiles = [
    {
        id: 'sample1',
        name: 'ODS de Exemplo 1',
        description: 'ODS simples com dados de exemplo',
        size: '0.01 MB',
        path: '/download/ods/file01.ods'
    },
]

export default function ODSTestFiles() {
    const router = useRouter()

    const handleDownload = (file: typeof odsFiles[0]) => {
        router.push(`/arquivos-testes/ods/download`)
        setTimeout(() => {
            window.open(file.path, '_blank')
        }, 100)
    }

    return (
        <FormPage
            title="Arquivos ODS Disponíveis"
            description="Selecione um arquivo para download"
        >
            <div className="px-4 py-6 sm:p-8">
                <div className="grid grid-cols-1 gap-6">
                    {odsFiles.map((file) => (
                        <div
                            key={file.id}
                            className="flex items-center justify-between p-4 border-main-900 border rounded-lg hover:bg-gray-50"
                        >
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{file.name}</h3>
                                <p className="mt-1 text-sm text-gray-500">{file.description}</p>
                                <p className="mt-1 text-sm text-gray-500">Tamanho: {file.size}</p>
                            </div>

                            <Button
                                onClick={() => handleDownload(file)}
                            >
                                Download
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </FormPage>
    )
}
