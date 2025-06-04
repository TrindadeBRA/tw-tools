'use client'

import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Banner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const bannerState = localStorage.getItem('bannerState')
    if (bannerState) {
      const { timestamp } = JSON.parse(bannerState)
      const now = new Date().getTime()
      const hoursPassed = (now - timestamp) / (1000 * 60 * 60)
      
      if (hoursPassed < 24) {
        setIsVisible(false)
      } else {
        localStorage.removeItem('bannerState')
        setIsVisible(true)
      }
    } else {
      setIsVisible(true)
    }
    setIsLoading(false)
    setIsMounted(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('bannerState', JSON.stringify({
      timestamp: new Date().getTime()
    }))
  }

  if (isLoading || !isVisible) return null

  return (
    <div 
      className={`flex items-center gap-x-6 bg-main-600 hover:bg-main-800 transition-all duration-500 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 ${
        isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <p className="text-sm/6 text-white flex items-center gap-3">
        <Link
          href="https://thetrinityweb.com.br/?utm_source=tools&utm_medium=banner&utm_campaign=web_development"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 hover:text-white/90 transition-colors"
        >
          <Image
            src="/assets/tw-logo-white.png"
            alt="The Trinity Web"
            width={24}
            height={24}
            className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse"
          />
          <span className="font-medium">Procura ajuda para desenvolver alguma solução/aplicação web?</span>
          <span className="flex items-center gap-1 text-white/90 group-hover:text-white font-semibold group-hover:font-bold group-hover:animate-pulse">
            Fale com a gente
            <ArrowRightIcon className="size-4 transition-transform group-hover:animate-pulse" aria-hidden="true" />
          </span>
        </Link>
      </p>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-2 p-2 focus-visible:-outline-offset-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          onClick={handleClose}
        >
          <span className="sr-only">Fechar</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-white" />
        </button>
      </div>
    </div>
  )
}
