'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'

const zipFiles = [
    {
        id: 'sample1',
        name: 'ZIP de Exemplo 1',
        description: 'Arquivo ZIP simples',
        size: '183 B',
        fileName: 'file01.zip',
        base64:
            'UEsDBAoAAAAAAJatDVuTybcREQAAABEAAAAIABwAdGVzdC50eHRVVAkAA0sHnWhLB51odXgLAAEEAAAAAAQAAAAAQXJxdWl2byBkZSB0ZXN0ZQpQSwECHgMKAAAAAACWrQ1bk8m3EREAAAARAAAACAAYAAAAAAABAAAApIEAAAAAdGVzdC50eHRVVAUAA0sHnWh1eAsAAQQAAAAABAAAAABQSwUGAAAAAAEAAQBOAAAAUwAAAAAA'
    },
]

export default function ZIPTestFiles() {
    const router = useRouter()

    const handleDownload = (file: typeof zipFiles[0]) => {
        router.push(`/arquivos-testes/zip/download`)
        setTimeout(() => {
            const link = document.createElement('a')
            link.href = `data:application/zip;base64,${file.base64}`
            link.download = file.fileName
            link.click()
        }, 100)
    }

    return (
        <FormPage
            title="Arquivos ZIP Disponíveis"
            description="Selecione um arquivo para download"
        >
            <div className="px-4 py-6 sm:p-8">
                <div className="grid grid-cols-1 gap-6">
                    {zipFiles.map((file) => (
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
