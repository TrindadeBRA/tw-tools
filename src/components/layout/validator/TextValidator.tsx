'use client'

import { useState, useEffect } from 'react'
import InputTextarea from '@/components/ui/InputTextarea'
import FormPage from '../template/FormPage'
import Button from '@/components/ui/Button'

interface TextStats {
  characters: number
  charactersWithoutSpaces: number
  words: number
  lines: number
  paragraphs: number
}

export default function TextValidator() {
  const [text, setText] = useState('')
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersWithoutSpaces: 0,
    words: 0,
    lines: 0,
    paragraphs: 0
  })

  const calculateStats = (inputText: string): TextStats => {
    // Caracteres com espaços
    const characters = inputText.length

    // Caracteres sem espaços
    const charactersWithoutSpaces = inputText.replace(/\s/g, '').length

    // Palavras (split por espaços e filtrar vazios)
    const words = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length

    // Linhas (split por quebras de linha)
    const lines = inputText === '' ? 0 : inputText.split('\n').length

    // Parágrafos (split por quebras de linha duplas e filtrar vazios)
    const paragraphs = inputText.trim() === '' ? 0 : inputText.split(/\n\s*\n/).filter(p => p.trim() !== '').length

    return {
      characters,
      charactersWithoutSpaces,
      words,
      lines,
      paragraphs
    }
  }

  useEffect(() => {
    const newStats = calculateStats(text)
    setStats(newStats)
  }, [text])

  const clearText = () => {
    setText('')
  }

  const loadSampleText = () => {
    const sampleText = 
`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dolor ut urna pharetra vulputate. Aliquam erat volutpat. Sed et lacus sollicitudin tortor aliquam finibus nec euismod ligula. Nulla quis neque velit. Nunc sollicitudin, libero pharetra consequat vestibulum, tellus mauris ultricies mauris, sed aliquet tortor eros non quam. Nulla placerat a tortor vitae pellentesque. Phasellus nec tincidunt urna, et congue lectus. In malesuada, felis id laoreet sollicitudin, magna dui pellentesque velit, quis fermentum massa massa sed est. In euismod pretium lacus quis bibendum. Fusce ornare arcu nec est eleifend sodales. Morbi finibus lacus non arcu lobortis fringilla. Pellentesque euismod ac ex in fermentum. Maecenas auctor purus non orci malesuada porta.

Phasellus mauris arcu, vestibulum a est mattis, auctor efficitur sapien. Vestibulum vitae vestibulum massa. Donec ornare eros eget lorem suscipit sollicitudin. Fusce et neque tempus, euismod erat non, euismod quam. Quisque malesuada libero et elit varius accumsan. Aliquam viverra elementum sem. Donec ante felis, consectetur et ante id, elementum tristique nisl. Pellentesque molestie ac lorem laoreet faucibus.

Donec ornare metus ut neque tempor, at lobortis sapien egestas. Ut non vestibulum elit. Nulla nec erat id nulla pellentesque lobortis. Suspendisse vel quam ac mi tincidunt viverra et efficitur neque. Sed porta, lorem tincidunt tempor feugiat, ligula urna faucibus lorem, pellentesque semper tellus orci et tortor. Nulla semper erat a laoreet finibus. Phasellus placerat tincidunt facilisis. Morbi iaculis interdum odio, id accumsan nisl sagittis sit amet.`
    setText(sampleText)
  }

  return (
    <FormPage
      title="Contador de Texto"
      description="Digite ou cole seu texto abaixo para ver as estatísticas em tempo real"
    >
      <div className="px-4 py-6 sm:p-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8">
          {/* Campo de texto */}
          <div className="col-span-full">
            <InputTextarea
              label="Texto para Análise"
              placeholder="Digite ou cole seu texto aqui..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              id="text-input"
            />
          </div>

          {/* Estatísticas em tempo real */}
          <div className="col-span-full">
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas do Texto</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-main-700">{stats.characters.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Caracteres (com espaços)</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-main-700">{stats.charactersWithoutSpaces.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Caracteres (sem espaços)</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-main-700">{stats.words.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Palavras</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-main-700">{stats.lines.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Linhas</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-main-700">{stats.paragraphs.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Parágrafos</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-main-700">
                    {stats.words > 0 ? Math.ceil(stats.words / 200) : 0}
                  </div>
                  <div className="text-sm text-gray-600">Tempo de leitura (min)</div>
                </div>
              </div>

              {/* Informações adicionais */}
              {text.length > 0 && (
                <div className="mt-4 p-4 bg-main-50 rounded-lg">
                  <h4 className="font-semibold text-main-900 mb-2">Informações Adicionais</h4>
                  <div className="text-sm text-main-800 space-y-1">
                    <p>• Média de caracteres por palavra: {stats.words > 0 ? (stats.charactersWithoutSpaces / stats.words).toFixed(1) : 0}</p>
                    <p>• Média de palavras por linha: {stats.lines > 0 ? (stats.words / stats.lines).toFixed(1) : 0}</p>
                    <p>• Densidade de texto: {stats.characters > 0 ? ((stats.charactersWithoutSpaces / stats.characters) * 100).toFixed(1) : 0}% (sem espaços)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <Button type="button" variant="secondary" onClick={loadSampleText}>
          Carregar Exemplo
        </Button>
        <Button type="button" variant="primary" onClick={clearText}>
          Limpar Texto
        </Button>
      </div>
    </FormPage>
  )
} 