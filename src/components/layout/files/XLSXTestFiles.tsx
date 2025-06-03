'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'

const xlsxFiles = [
    {
        id: 'sample1',
        name: 'XLSX de Exemplo 1',
        description: 'XLSX simples com dados de exemplo',
        size: '0.10 MB',
        path: '/download/xlsx/file01.xlsx'
    },
    // {
    //     id: 'sample2',
    //     name: 'PDF de Exemplo 2',
    //     description: 'PDF com formulários interativos',
    //     size: '2.5 MB',
    //     path: '/download/file02.pdf'
    // }
]

export default function XLSXTestFiles() {
    const router = useRouter()

    const handleDownload = (file: typeof xlsxFiles[0]) => {
        router.push(`/arquivos-testes/xlsx/download`)
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
                    {xlsxFiles.map((file) => (
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