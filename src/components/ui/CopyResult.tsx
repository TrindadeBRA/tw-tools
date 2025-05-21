'use client'

import { useState } from 'react'
import { Square2StackIcon, CheckIcon } from '@heroicons/react/24/outline'
import Button from './Button'

interface CopyResultProps {
  label: string
  value: string
}

export default function CopyResult({ label, value }: CopyResultProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="col-span-full rounded-md bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-gray-900">{label}</p>
        <Button
          type="button"
          variant="copy"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Square2StackIcon className="h-4 w-4" />
              <span>Copiar</span>
            </>
          )}
        </Button>
      </div>
      <p className="mt-1 font-mono text-lg">{value}</p>
    </div>
  )
}