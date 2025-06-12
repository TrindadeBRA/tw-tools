'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormPage from '../template/FormPage'
import Button from '@/components/ui/Button'

interface JSONFile {
    id: string
    name: string
    description: string
    size: string
    path: string
}

const jsonFiles: JSONFile[] = [
    {
        id: 'file01',
        name: 'JSON de Exemplo 1',
        description: 'Estrutura complexa de pedido e-commerce com múltiplos itens, pagamento e envio',
        size: '2.1 KB',
        path: '/download/json/file01.json'
    },
    {
        id: 'file02',
        name: 'JSON de Exemplo 2',
        description: 'Post de rede social com mídia, engajamento e metadados',
        size: '1.8 KB',
        path: '/download/json/file02.json'
    },
    {
        id: 'file03',
        name: 'JSON de Exemplo 3',
        description: 'Previsão do tempo detalhada com condições atuais e previsão diária',
        size: '2.5 KB',
        path: '/download/json/file03.json'
    }
]

export default function JSONTestFiles() {
    const router = useRouter()
    const [selectedFile, setSelectedFile] = useState<JSONFile | null>(null)

    const handleDownload = (file: JSONFile) => {
        setSelectedFile(file)
        // Trigger download
        const link = document.createElement('a')
        link.href = file.path
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        // Redirect to download page
        router.push('/arquivos-testes/json/download')
    }

    return (
        <FormPage
            title="Arquivos JSON Disponíveis"
            description="Selecione um arquivo para download"
        >
            <div className="px-4 py-6 sm:p-8">
                <div className="grid grid-cols-1 gap-6">
                    {jsonFiles.map((file) => (
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