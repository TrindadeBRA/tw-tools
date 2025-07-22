'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import InputSelect from '@/components/ui/InputSelect'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

// Schema de validação
const salarySchema = z.object({
  valor: z.string().min(1, 'Valor é obrigatório'),
  tipoConversao: z.object({
    id: z.string(),
    title: z.string()
  }),
  regimePj: z.object({
    id: z.string(),
    title: z.string()
  })
})

type SalaryData = z.infer<typeof salarySchema>

export default function SalaryCltPjConverter() {
  const router = useRouter()
  
  // Opções de conversão
  const tipoConversaoOptions = [
    { id: 'clt-to-pj', title: 'CLT para PJ' },
    { id: 'pj-to-clt', title: 'PJ para CLT' }
  ]
  
  // Opções de regime PJ
  const regimePjOptions = [
    { id: 'simples', title: 'Simples Nacional' },
    { id: 'presumido', title: 'Lucro Presumido' },
    { id: 'real', title: 'Lucro Real' }
  ]
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<SalaryData>({
    resolver: zodResolver(salarySchema),
    defaultValues: {
      valor: '',
      tipoConversao: tipoConversaoOptions[0],
      regimePj: regimePjOptions[0]
    },
  })

  // Função para calcular INSS CLT
  const calcularInssClt = (salarioBruto: number): number => {
    if (salarioBruto <= 1320.00) return salarioBruto * 0.075
    if (salarioBruto <= 2571.29) return (1320.00 * 0.075) + ((salarioBruto - 1320.00) * 0.09)
    if (salarioBruto <= 3856.94) return (1320.00 * 0.075) + ((2571.29 - 1320.00) * 0.09) + ((salarioBruto - 2571.29) * 0.12)
    if (salarioBruto <= 7507.49) return (1320.00 * 0.075) + ((2571.29 - 1320.00) * 0.09) + ((3856.94 - 2571.29) * 0.12) + ((salarioBruto - 3856.94) * 0.14)
    return 876.97 // Teto do INSS 2024
  }

  // Função para calcular IRRF CLT
  const calcularIrrfClt = (salarioBruto: number, inss: number): number => {
    const baseCalculo = salarioBruto - inss - 189.59 // Dedução per capita
    if (baseCalculo <= 1903.98) return 0
    if (baseCalculo <= 2826.65) return (baseCalculo * 0.075) - 142.80
    if (baseCalculo <= 3751.05) return (baseCalculo * 0.15) - 354.80
    if (baseCalculo <= 4664.68) return (baseCalculo * 0.225) - 636.13
    return (baseCalculo * 0.275) - 869.36
  }

  // Função para calcular impostos PJ
  const calcularImpostosPj = (valorBruto: number, regime: string) => {
    let totalImpostos = 0
    let detalhes = {
      inss: 0,
      irpj: 0,
      csll: 0,
      pis: 0,
      cofins: 0,
      iss: 0
    }

    if (regime === 'simples') {
      // Simples Nacional - Anexo III (Serviços)
      const aliquota = valorBruto <= 180000 ? 0.06 : 
                      valorBruto <= 360000 ? 0.112 :
                      valorBruto <= 720000 ? 0.135 :
                      valorBruto <= 1800000 ? 0.16 :
                      valorBruto <= 3600000 ? 0.21 : 0.33
      totalImpostos = valorBruto * aliquota
      
      // INSS separado (11% sobre o salário mínimo)
      detalhes.inss = 1412.00 * 0.11 // Salário mínimo 2024
    } else if (regime === 'presumido') {
      // Lucro Presumido
      detalhes.irpj = (valorBruto * 0.32) * 0.15 // 32% da receita x 15%
      detalhes.csll = (valorBruto * 0.32) * 0.09 // 32% da receita x 9%
      detalhes.pis = valorBruto * 0.0065
      detalhes.cofins = valorBruto * 0.03
      detalhes.iss = valorBruto * 0.05 // ISS médio
      detalhes.inss = 1412.00 * 0.11
      
      totalImpostos = detalhes.irpj + detalhes.csll + detalhes.pis + detalhes.cofins + detalhes.iss + detalhes.inss
    } else {
      // Lucro Real
      detalhes.irpj = (valorBruto * 0.08) * 0.15 // 8% margem x 15%
      detalhes.csll = (valorBruto * 0.12) * 0.09 // 12% margem x 9%
      detalhes.pis = valorBruto * 0.0065
      detalhes.cofins = valorBruto * 0.03
      detalhes.iss = valorBruto * 0.05
      detalhes.inss = 1412.00 * 0.11
      
      totalImpostos = detalhes.irpj + detalhes.csll + detalhes.pis + detalhes.cofins + detalhes.iss + detalhes.inss
    }

    return { totalImpostos, detalhes }
  }

  // Função principal de conversão
  const converterSalario = (data: SalaryData) => {
    try {
      const valor = parseFloat(data.valor.replace(/[^\d,]/g, '').replace(',', '.'))
      
      if (isNaN(valor) || valor <= 0) {
        throw new Error('Valor inválido')
      }

      let resultados = {}

      if (data.tipoConversao.id === 'clt-to-pj') {
        // Conversão CLT para PJ
        const salarioBrutoClt = valor
        const inssClt = calcularInssClt(salarioBrutoClt)
        const irrfClt = Math.max(0, calcularIrrfClt(salarioBrutoClt, inssClt))
        const salarioLiquidoClt = salarioBrutoClt - inssClt - irrfClt
        
        // Benefícios CLT (13º + Férias + FGTS)
        const decimoTerceiro = salarioBrutoClt
        const ferias = salarioBrutoClt * 1.33 // Férias + 1/3
        const fgts = salarioBrutoClt * 0.08 * 12 // 8% ao mês
        const beneficiosClt = decimoTerceiro + ferias + fgts
        
        // Custo total anual CLT
        const custoAnualClt = (salarioBrutoClt * 12) + beneficiosClt
        
        // Valor PJ equivalente (mensal)
        const valorMensalPjBruto = custoAnualClt / 12
        const { totalImpostos: impostosPj } = calcularImpostosPj(valorMensalPjBruto, data.regimePj.id)
        const valorLiquidoPj = valorMensalPjBruto - impostosPj
        
        resultados = {
          valorOriginal: `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          tipoConversao: 'CLT → PJ',
          salarioBrutoClt: `R$ ${salarioBrutoClt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          salarioLiquidoClt: `R$ ${salarioLiquidoClt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          descontosClt: `R$ ${(inssClt + irrfClt).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          beneficiosClt: `R$ ${beneficiosClt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          valorBrutoPj: `R$ ${valorMensalPjBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          valorLiquidoPj: `R$ ${valorLiquidoPj.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          impostosPj: `R$ ${impostosPj.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          equivalenciaAnual: `R$ ${custoAnualClt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          diferenca: valorLiquidoPj > salarioLiquidoClt ? 
            `+R$ ${(valorLiquidoPj - salarioLiquidoClt).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (PJ maior)` :
            `-R$ ${(salarioLiquidoClt - valorLiquidoPj).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (CLT maior)`
        }
        
      } else {
        // Conversão PJ para CLT
        const valorBrutoPj = valor
        const { totalImpostos: impostosPj } = calcularImpostosPj(valorBrutoPj, data.regimePj.id)
        const valorLiquidoPj = valorBrutoPj - impostosPj
        
        // Calcular CLT equivalente
        const rendaAnualPj = (valorBrutoPj * 12) - (impostosPj * 12)
        
        // Estimativa de salário CLT que gere renda líquida similar
        let salarioBrutoCltEstimado = rendaAnualPj / 12
        
        // Ajustar considerando benefícios CLT
        const fatorBeneficios = 1.4 // Aproximadamente 40% de benefícios adicionais
        salarioBrutoCltEstimado = salarioBrutoCltEstimado / fatorBeneficios
        
        const inssClt = calcularInssClt(salarioBrutoCltEstimado)
        const irrfClt = Math.max(0, calcularIrrfClt(salarioBrutoCltEstimado, inssClt))
        const salarioLiquidoClt = salarioBrutoCltEstimado - inssClt - irrfClt
        
        // Benefícios CLT
        const decimoTerceiro = salarioBrutoCltEstimado
        const ferias = salarioBrutoCltEstimado * 1.33
        const fgts = salarioBrutoCltEstimado * 0.08 * 12
        const beneficiosClt = decimoTerceiro + ferias + fgts
        
        resultados = {
          valorOriginal: `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          tipoConversao: 'PJ → CLT',
          valorBrutoPj: `R$ ${valorBrutoPj.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          valorLiquidoPj: `R$ ${valorLiquidoPj.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          impostosPj: `R$ ${impostosPj.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          salarioBrutoClt: `R$ ${salarioBrutoCltEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          salarioLiquidoClt: `R$ ${salarioLiquidoClt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          descontosClt: `R$ ${(inssClt + irrfClt).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          beneficiosClt: `R$ ${beneficiosClt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          equivalenciaAnual: `PJ: R$ ${(valorBrutoPj * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} | CLT: R$ ${((salarioBrutoCltEstimado * 12) + beneficiosClt).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          diferenca: valorLiquidoPj > salarioLiquidoClt ? 
            `+R$ ${(valorLiquidoPj - salarioLiquidoClt).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (PJ maior)` :
            `-R$ ${(salarioLiquidoClt - valorLiquidoPj).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (CLT maior)`
        }
      }

      // Criar URL com todos os parâmetros
      const params = new URLSearchParams()
      Object.entries(resultados).forEach(([key, value]) => {
        params.append(key, value as string)
      })
      
      router.push(`/conversores/salario-clt-pj/resultado?${params.toString()}`)
      
    } catch (error) {
      console.error('Erro ao converter salário:', error)
      router.push('/conversores/salario-clt-pj/resultado?error=true')
    }
  }

  const clearForm = () => {
    setValue('valor', '')
    setValue('tipoConversao', tipoConversaoOptions[0])
    setValue('regimePj', regimePjOptions[0])
  }

  return (
    <FormPage
      title="Conversor de Salário CLT/PJ"
      description="Converta valores entre regime CLT e Pessoa Jurídica, considerando impostos, benefícios e todos os custos envolvidos."
    >
      <form onSubmit={handleSubmit(converterSalario)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div className="sm:col-span-3">
              <Controller
                name="tipoConversao"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Tipo de Conversão"
                    options={tipoConversaoOptions}
                    defaultValue={tipoConversaoOptions[0]}
                    onChange={(value) => field.onChange(value)}
                    error={errors.tipoConversao?.message}
                  />
                )}
              />
            </div>
            
            <div className="sm:col-span-3">
              <InputText
                label="Valor (R$)"
                placeholder="Ex: 5.000,00"
                {...register('valor')}
                error={errors.valor?.message}
                mask="currency"
              />
            </div>
            
            <div className="sm:col-span-6">
              <Controller
                name="regimePj"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Regime Tributário PJ"
                    options={regimePjOptions}
                    defaultValue={regimePjOptions[0]}
                    onChange={(value) => field.onChange(value)}
                    error={errors.regimePj?.message}
                  />
                )}
              />
            </div>
            
            <div className="col-span-full">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Informações sobre o cálculo:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>CLT:</strong> Inclui INSS, IRRF, 13º salário, férias + 1/3 e FGTS</li>
                  <li>• <strong>PJ Simples Nacional:</strong> Alíquota única + INSS sobre salário mínimo</li>
                  <li>• <strong>PJ Lucro Presumido:</strong> IRPJ, CSLL, PIS, COFINS, ISS e INSS</li>
                  <li>• <strong>PJ Lucro Real:</strong> Impostos sobre margem real + taxas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Converter Salário
          </Button>
        </div>
      </form>
    </FormPage>
  )
}