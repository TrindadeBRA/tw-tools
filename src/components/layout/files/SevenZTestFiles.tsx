'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'

const sevenZFiles = [
    {
        id: 'sample1',
        name: '7Z de Exemplo 1',
        description: 'Arquivo 7Z simples',
        size: '143 B',
        fileName: 'file01.7z',
        base64:
            'N3q8ryccAARkNSg0FQAAAAAAAABaAAAAAAAAACZ1ZJABABBBcnF1aXZvIGRlIHRlc3RlCgABBAYAQkVAAcLAQABISEBAAwRAAgKAZPJtxEAAAUBGQwAAAAAAAAAAAAAAAAREwB0AGUAcwB0AC4AdAB4AHQAAAAZABQKAQBCI9p6mwzcARUGAQAggKSBAAA='
    },
]

export default function SevenZTestFiles() {
    const router = useRouter()

    const handleDownload = (file: typeof sevenZFiles[0]) => {
        router.push(`/arquivos-testes/7z/download`)
        setTimeout(() => {
            const link = document.createElement('a')
            link.href = `data:application/x-7z-compressed;base64,${file.base64}`
            link.download = file.fileName
            link.click()
        }, 100)
    }

    return (
        <FormPage
            title="Arquivos 7Z Disponíveis"
            description="Selecione um arquivo para download"
        >
            <div className="px-4 py-6 sm:p-8">
                <div className="grid grid-cols-1 gap-6">
                    {sevenZFiles.map((file) => (
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
