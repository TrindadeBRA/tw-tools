'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import InputSelect from '@/components/ui/InputSelect'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'
import { priceMask, quantityMask } from '@/data/masks'
import { useState, useMemo } from 'react'

// Definição das unidades e suas conversões
const unitGroups = {
  weight: {
    label: 'Peso',
    units: [
      { id: 'mg', title: 'mg', baseMultiplier: 0.001 },
      { id: 'g', title: 'g', baseMultiplier: 1 },
      { id: 'kg', title: 'kg', baseMultiplier: 1000 }
    ]
  },
  volume: {
    label: 'Volume',
    units: [
      { id: 'ml', title: 'ml', baseMultiplier: 1 },
      { id: 'l', title: 'L', baseMultiplier: 1000 },
      { id: 'oz', title: 'oz', baseMultiplier: 29.5735 }
    ]
  }
}

// Schema for form validation
const priceComparisonSchema = z.object({
  items: z.array(z.object({
    comparison: z.object({
      id: z.string(),
      title: z.string()
    }),
    price: z.string().min(1, 'Preço é obrigatório')
      .refine((val) => !isNaN(Number(val.replace(/[^\d]/g, ''))) && Number(val.replace(/[^\d]/g, '')) > 0, 'Preço deve ser maior que zero'),
    quantity: z.string().min(1, 'Quantidade é obrigatória')
      .refine((val) => !isNaN(Number(val.replace(/[^\d,.]/g, ''))) && Number(val.replace(/[^\d,.]/g, '')) > 0, 'Quantidade deve ser maior que zero'),
    unit: z.object({
      id: z.string(),
      title: z.string(),
      baseMultiplier: z.number()
    })
  })).min(2, 'Adicione pelo menos 2 produtos para comparação')
})

type PriceComparisonData = z.infer<typeof priceComparisonSchema>

export default function PricePerUnitCalculator() {
  const router = useRouter()
  
  const comparisonOptions = [
    { id: 'maior', title: 'Maior' },
    { id: 'menor', title: 'Menor' }
  ]

  // Estados para armazenar os valores formatados
  const [priceDisplays, setPriceDisplays] = useState<string[]>(['', ''])
  const [quantityDisplays, setQuantityDisplays] = useState<string[]>(['', ''])

  // Criar lista completa de unidades
  const allUnits = useMemo(() => {
    return [
      ...unitGroups.weight.units,
      ...unitGroups.volume.units
    ]
  }, [])

  // Estado para controlar o grupo de unidades selecionado
  const [selectedUnitGroup, setSelectedUnitGroup] = useState<'weight' | 'volume' | null>(null)
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PriceComparisonData>({
    resolver: zodResolver(priceComparisonSchema),
    defaultValues: {
      items: [
        { comparison: comparisonOptions[0], price: '', quantity: '', unit: allUnits[0] },
        { comparison: comparisonOptions[0], price: '', quantity: '', unit: allUnits[0] }
      ]
    }
  })

  const items = watch('items')

  // Função para obter as unidades disponíveis para cada item
  const getAvailableUnits = (index: number) => {
    if (index === 0) {
      return allUnits
    }

    // Para os itens subsequentes, filtrar baseado na primeira unidade selecionada
    const firstUnit = items[0]?.unit
    if (!firstUnit) return allUnits

    // Determinar o grupo da primeira unidade
    const group = Object.entries(unitGroups).find(([_, groupData]) =>
      groupData.units.some(unit => unit.id === firstUnit.id)
    )

    if (!group) return allUnits
    return group[1].units
  }

  // Função para converter para a unidade base
  const convertToBase = (value: number, fromUnit: string) => {
    const unit = allUnits.find(u => u.id === fromUnit)
    if (!unit) return value
    return value * unit.baseMultiplier
  }

  const addItem = () => {
    setValue('items', [...items, { comparison: comparisonOptions[0], price: '', quantity: '', unit: allUnits[0] }])
    setPriceDisplays([...priceDisplays, ''])
    setQuantityDisplays([...quantityDisplays, ''])
  }

  const removeItem = (index: number) => {
    setValue('items', items.filter((_, i) => i !== index))
    setPriceDisplays(priceDisplays.filter((_, i) => i !== index))
    setQuantityDisplays(quantityDisplays.filter((_, i) => i !== index))
  }

  const calculateBestPrice = (data: PriceComparisonData) => {
    try {
      // Pegar a unidade do primeiro produto como referência
      const referenceUnit = data.items[0].unit

      const results = data.items.map(item => {
        // Remove formatação para cálculos
        const price = Number(item.price.replace(/[^\d]/g, '')) / 100
        const quantity = Number(item.quantity.replace(/[^\d,.]/g, '').replace(',', '.'))
        
        // Converter quantidade para a unidade base para comparação
        const baseQuantity = convertToBase(quantity, item.unit.id)
        
        // Converter para a unidade de referência
        const referenceQuantity = baseQuantity / referenceUnit.baseMultiplier
        const pricePerUnit = price / referenceQuantity
        
        return {
          comparison: item.comparison.title,
          price,
          quantity,
          unit: item.unit.id,
          pricePerUnit,
          referenceUnit: referenceUnit.id,
          displayPrice: price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          displayQuantity: quantity.toLocaleString('pt-BR', { minimumFractionDigits: 3 })
        }
      })

      // Sort by price per unit to find the best value
      const sortedResults = [...results].sort((a, b) => a.pricePerUnit - b.pricePerUnit)

      const bestValue = sortedResults[0]
      const worstValue = sortedResults[sortedResults.length - 1]
      const savings = ((worstValue.pricePerUnit - bestValue.pricePerUnit) / worstValue.pricePerUnit * 100)

      // Formatar os resultados para exibição
      const formattedResults = results.map(result => {
        const formattedPricePerUnit = result.pricePerUnit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4 })
        return `${result.comparison}: ${formattedPricePerUnit}/${result.referenceUnit} (${result.displayPrice} por ${result.displayQuantity} ${result.unit})`
      })

      // Criar mensagem comparativa
      const bestPricePerUnit = bestValue.pricePerUnit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4 })
      const worstPricePerUnit = worstValue.pricePerUnit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4 })
      
      const formattedBestValue = `O produto ${bestValue.comparison} é o melhor custo-benefício, ele sai por ${bestPricePerUnit}/${bestValue.referenceUnit}, enquanto o produto ${worstValue.comparison} sai ${worstPricePerUnit}/${worstValue.referenceUnit}`
      const formattedWorstValue = `${worstValue.comparison}: ${worstPricePerUnit}/${worstValue.referenceUnit} (${worstValue.displayPrice} por ${worstValue.displayQuantity} ${worstValue.unit})`
      const formattedSavings = `${savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}%`

      // Redirect to results page with all calculated data
      router.push(`/calculadoras/comparador-preco/resultado?` + 
        `bestValue=${encodeURIComponent(formattedBestValue)}&` +
        `savings=${encodeURIComponent(formattedSavings)}`)
    } catch (error) {
      console.error('Erro ao processar dados:', error)
      router.push(`/calculadoras/comparador-preco/resultado?error=true`)
    }
  }

  const clearForm = () => {
    setValue('items', [
      { comparison: comparisonOptions[0], price: '', quantity: '', unit: allUnits[0] },
      { comparison: comparisonOptions[0], price: '', quantity: '', unit: allUnits[0] }
    ])
    setPriceDisplays(['', ''])
    setQuantityDisplays(['', ''])
    setSelectedUnitGroup(null)
  }

  // Funções para lidar com as mudanças nos inputs
  const handlePriceChange = (index: number, value: string) => {
    const formatted = priceMask(value)
    const newPriceDisplays = [...priceDisplays]
    newPriceDisplays[index] = formatted
    setPriceDisplays(newPriceDisplays)
    setValue(`items.${index}.price`, value.replace(/[^\d]/g, ''))
  }

  const handleQuantityChange = (index: number, value: string) => {
    const formatted = quantityMask(value)
    const newQuantityDisplays = [...quantityDisplays]
    newQuantityDisplays[index] = formatted
    setQuantityDisplays(newQuantityDisplays)
    setValue(`items.${index}.quantity`, value.replace(/[^\d,.]/g, ''))
  }

  // Handler para mudança de unidade
  const handleUnitChange = (index: number, value: any) => {
    if (index === 0) {
      // Determinar o grupo da unidade selecionada
      const group = Object.entries(unitGroups).find(([_, groupData]) =>
        groupData.units.some(unit => unit.id === value.id)
      )
      
      if (group) {
        setSelectedUnitGroup(group[0] as 'weight' | 'volume')
        
        // Atualizar as unidades dos outros itens para o mesmo grupo
        items.forEach((_, idx) => {
          if (idx > 0) {
            setValue(`items.${idx}.unit`, group[1].units[0])
          }
        })
      }
    }
    setValue(`items.${index}.unit`, value)
  }

  return (
    <FormPage
      title="Comparador de Preço por ml/g"
      description="Compare produtos diferentes e descubra qual tem o melhor custo-benefício baseado no preço por unidade (ml ou g)."
    >
      <form onSubmit={handleSubmit(calculateBestPrice)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="space-y-6">
            {items.map((_, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  <div className="sm:col-span-1">
                    <Controller
                      name={`items.${index}.comparison`}
                      control={control}
                      render={({ field }) => (
                        <InputSelect
                          label="Tamanho"
                          options={comparisonOptions}
                          defaultValue={comparisonOptions[0]}
                          onChange={(value) => field.onChange(value)}
                          error={errors.items?.[index]?.comparison?.message}
                        />
                      )}
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <InputText
                      label="Preço (R$)"
                      placeholder="0,00"
                      value={priceDisplays[index]}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                      error={errors.items?.[index]?.price?.message}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <InputText
                      label="Quantidade"
                      placeholder="0"
                      value={quantityDisplays[index]}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                      error={errors.items?.[index]?.quantity?.message}
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <Controller
                      name={`items.${index}.unit`}
                      control={control}
                      render={({ field }) => (
                        <InputSelect
                          label="Unidade"
                          options={getAvailableUnits(index)}
                          defaultValue={allUnits[0]}
                          onChange={(value) => handleUnitChange(index, value)}
                          error={errors.items?.[index]?.unit?.message}
                        />
                      )}
                    />
                  </div>

                  {index > 1 && (
                    <div className="sm:col-span-6 flex justify-end">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => removeItem(index)}
                      >
                        Remover Produto
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-center">
              <Button
                type="button"
                variant="secondary"
                onClick={addItem}
              >
                Adicionar Produto
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Calcular Melhor Preço
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 