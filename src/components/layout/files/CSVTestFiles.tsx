'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'

const csvFiles = [
    {
        id: 'sample1',
        name: 'CSV de Exemplo 1',
        description: 'CSV simples com dados de exemplo',
        size: '0.10 MB',
        path: '/download/csv/file01.csv'
    },
]

export default function XLSXTestFiles() {
    const router = useRouter()

    const handleDownload = (file: typeof csvFiles[0]) => {
        router.push(`/arquivos-testes/csv/download`)
        setTimeout(() => {
            window.open(file.path, '_blank')
        }, 100)
    }
    
    return (
        <FormPage
            title="Arquivos XLSX Disponíveis"
            description="Selecione um arquivo para download"
        >
            <div className="px-4 py-6 sm:p-8">
                <div className="grid grid-cols-1 gap-6">
                    {csvFiles.map((file) => (
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