'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'

const pptxFiles = [
    {
        id: 'sample1',
        name: 'PPTX de Exemplo 1',
        description: 'PPTX simples com slides de exemplo',
        size: '0.01 MB',
        path: '/download/pptx/file01.pptx'
    },
]

export default function PPTXTestFiles() {
    const router = useRouter()

    const handleDownload = (file: typeof pptxFiles[0]) => {
        router.push(`/arquivos-testes/pptx/download`)
        setTimeout(() => {
            window.open(file.path, '_blank')
        }, 100)
    }

    return (
        <FormPage
            title="Arquivos PPTX Disponíveis"
            description="Selecione um arquivo para download"
        >
            <div className="px-4 py-6 sm:p-8">
                <div className="grid grid-cols-1 gap-6">
                    {pptxFiles.map((file) => (
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
