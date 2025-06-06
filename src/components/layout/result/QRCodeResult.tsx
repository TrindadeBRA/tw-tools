'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import CopyResult from '@/components/ui/CopyResult'
import FormPage from '@/components/layout/template/FormPage'
import Button from '@/components/ui/Button'
import { useSearchParams, useRouter } from 'next/navigation'

export default function QRCodeResult() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [decodedText, setDecodedText] = useState<string>('')
  const text = searchParams.get('text')

  useEffect(() => {
    if (!text) return

    try {
      // Decode the base64 text
      const decoded = decodeURIComponent(atob(text))
      setDecodedText(decoded)

      // Generate QR Code
      QRCode.toDataURL(decoded, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      }).then(url => {
        setQrCodeUrl(url)
      })
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }, [text])

  const handleGenerateNew = () => {
    router.push('/geradores/qrcode')
  }

  if (!text || !qrCodeUrl) {
    return (
      <FormPage
        title="QR Code Não Gerado"
        description="Não foi possível gerar o QR Code"
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <p className="text-center text-gray-600">
                Verifique se o texto inserido é válido e tente novamente
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" onClick={handleGenerateNew}>
            Gerar Novo QR Code
          </Button>
        </div>
      </FormPage>
    )
  }

  return (
    <FormPage
      title="QR Code Gerado"
      description="Seu QR Code foi gerado com sucesso"
    >
      <div className="px-4 py-6 sm:p-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8">
          <div className="col-span-full">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
              </div>
              <a
                href={qrCodeUrl}
                download="qrcode.png"
                className="inline-flex items-center rounded-md bg-[var(--color-main-600)] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-main-500)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-main-600)]"
              >
                Baixar QR Code
              </a>
            </div>
          </div>

          <div className="col-span-full">
            <CopyResult
              label="Texto Original"
              value={decodedText}
            />
          </div>

          <div className="col-span-full">
            <div className="bg-[var(--color-main-50)] p-4 rounded-md border border-[var(--color-main-100)]">
              <h3 className="text-sm text-[var(--color-main-800)] font-bold">Informações do QR Code</h3>
              <div className="mt-2 text-sm text-[var(--color-main-800)]">
                <p>O QR Code pode ser escaneado por qualquer aplicativo de leitura de QR Code</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <Button type="button" onClick={handleGenerateNew}>
          Gerar Novo QR Code
        </Button>
      </div>
    </FormPage>
  )
} 