'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'
import { currencyMask } from '@/data/masks'
import { useState } from 'react'

// Schema for form validation
const fuelCalculatorSchema = z.object({
  alcoholPrice: z.string().min(1, 'Preço do álcool é obrigatório'),
  gasolinePrice: z.string().min(1, 'Preço da gasolina é obrigatório')
})

type FuelCalculatorData = z.infer<typeof fuelCalculatorSchema>

export default function FuelCalculator() {
  const router = useRouter()
  
  // Estados para armazenar os valores formatados
  const [alcoholPriceDisplay, setAlcoholPriceDisplay] = useState('')
  const [gasolinePriceDisplay, setGasolinePriceDisplay] = useState('')
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FuelCalculatorData>({
    resolver: zodResolver(fuelCalculatorSchema),
    defaultValues: {
      alcoholPrice: '',
      gasolinePrice: ''
    },
  })

  const calculateFuel = (data: FuelCalculatorData) => {
    try {
      // Converter valores monetários para números
      const alcoholPrice = Number(data.alcoholPrice.replace(/[^\d]/g, '')) / 100
      const gasolinePrice = Number(data.gasolinePrice.replace(/[^\d]/g, '')) / 100
      
      // Calcular a proporção
      const ratio = alcoholPrice / gasolinePrice
      
      // Determinar qual combustível vale mais a pena
      const betterFuel = ratio <= 0.7 ? 'álcool' : 'gasolina'
      const reason = ratio <= 0.7 
        ? `O álcool está ${((1 - ratio) * 100).toFixed(1)}% mais barato que a gasolina, o que compensa seu menor rendimento.`
        : `A gasolina está ${((ratio - 1) * 100).toFixed(1)}% mais cara que o álcool, mas seu maior rendimento compensa o custo.`
      
      // Formatar valores para exibição
      const formattedAlcoholPrice = currencyMask((alcoholPrice * 100).toString())
      const formattedGasolinePrice = currencyMask((gasolinePrice * 100).toString())
      
      // Redirecionar para a página de resultado com todos os valores calculados
      router.push(`/calculadoras/combustivel/resultado?alcoholPrice=${encodeURIComponent(formattedAlcoholPrice)}&gasolinePrice=${encodeURIComponent(formattedGasolinePrice)}&betterFuel=${encodeURIComponent(betterFuel)}&reason=${encodeURIComponent(reason)}`)
    } catch (error) {
      console.error('Erro ao calcular combustível:', error)
      router.push(`/calculadoras/combustivel/resultado?error=true`)
    }
  }

  const clearForm = () => {
    setValue('alcoholPrice', '')
    setValue('gasolinePrice', '')
    setAlcoholPriceDisplay('')
    setGasolinePriceDisplay('')
  }

  // Funções para lidar com as mudanças nos inputs
  const handleAlcoholPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = currencyMask(value)
    setAlcoholPriceDisplay(formatted)
    setValue('alcoholPrice', value)
  }

  const handleGasolinePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = currencyMask(value)
    setGasolinePriceDisplay(formatted)
    setValue('gasolinePrice', value)
  }

  return (
    <FormPage
      title="Calculadora de Combustível"
      description="Compare os preços do álcool e da gasolina para descobrir qual vale mais a pena abastecer."
    >
      <form onSubmit={handleSubmit(calculateFuel)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputText
                label="Preço do Álcool (R$/L)"
                placeholder="Ex: 3,50"
                value={alcoholPriceDisplay}
                onChange={handleAlcoholPriceChange}
                error={errors.alcoholPrice?.message}
              />
            </div>
            
            <div className="sm:col-span-3">
              <InputText
                label="Preço da Gasolina (R$/L)"
                placeholder="Ex: 5,00"
                value={gasolinePriceDisplay}
                onChange={handleGasolinePriceChange}
                error={errors.gasolinePrice?.message}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Calcular
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 