'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'

const rarFiles = [
    {
        id: 'sample1',
        name: 'RAR de Exemplo 1',
        description: 'Arquivo RAR simples',
        size: '95 B',
        fileName: 'file01.rar',
        base64:
            'UmFyIRoHAQAzkrXlCgEFBgAFAQGAgAB9UAQXKgIDC5EABJEApIMCk8m3EYAAAQx0bXAvdGVzdC50eHQKAxNLB51oKpjsHEFycXVpdm8gZGUgdGVzdGUKHXdWUQMFBAA='
    },
]

export default function RARTestFiles() {
    const router = useRouter()

    const handleDownload = (file: typeof rarFiles[0]) => {
        router.push(`/arquivos-testes/rar/download`)
        setTimeout(() => {
            const link = document.createElement('a')
            link.href = `data:application/vnd.rar;base64,${file.base64}`
            link.download = file.fileName
            link.click()
        }, 100)
    }

    return (
        <FormPage
            title="Arquivos RAR Disponíveis"
            description="Selecione um arquivo para download"
        >
            <div className="px-4 py-6 sm:p-8">
                <div className="grid grid-cols-1 gap-6">
                    {rarFiles.map((file) => (
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
