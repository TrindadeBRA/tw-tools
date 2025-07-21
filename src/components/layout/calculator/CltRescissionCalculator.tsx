'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import InputSelect from '@/components/ui/InputSelect'
import InputCheckbox from '@/components/ui/InputCheckbox'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'
import { currencyMask } from '@/data/masks'

// Valores atualizados para 2025
const SALARIO_MINIMO_2025 = 1518.00;

// Tabela INSS 2025 - Alíquotas progressivas
const TABELA_INSS_2025 = [
  { faixaAte: 1518.00, aliquota: 7.5 },
  { faixaAte: 2531.29, aliquota: 9.0 },
  { faixaAte: 3797.94, aliquota: 12.0 },
  { faixaAte: 7507.49, aliquota: 14.0 }
];

// Tabela IRPF 2025 - Faixas de tributação
const TABELA_IRPF_2025 = [
  { faixaAte: 2259.20, aliquota: 0, deducao: 0 },
  { faixaAte: 2826.65, aliquota: 7.5, deducao: 169.44 },
  { faixaAte: 3751.05, aliquota: 15.0, deducao: 381.44 },
  { faixaAte: 4664.68, aliquota: 22.5, deducao: 662.77 },
  { faixaAte: Infinity, aliquota: 27.5, deducao: 896.00 }
];

// Defina o schema com Zod
const rescissionSchema = z.object({
  tipoRescisao: z.object({
    id: z.string(),
    title: z.string()
  }),
  salario: z.string().min(1, 'Salário é obrigatório'),
  dataAdmissao: z.string().min(1, 'Data de admissão é obrigatória'),
  dataRescisao: z.string().min(1, 'Data de rescisão é obrigatória'),
  diasTrabalhados: z.string().min(1, 'Dias trabalhados é obrigatório'),
  saldoFgts: z.string().min(1, 'Saldo do FGTS é obrigatório'),
  temFeriasVencidas: z.boolean(),
  diasFeriasVencidas: z.string().optional(),
  avisoTrabalhado: z.boolean()
}).refine((data) => {
  if (data.temFeriasVencidas && !data.diasFeriasVencidas) {
    return false;
  }
  return true;
}, {
  message: "Se possui férias vencidas, informe quantos dias"
});

type RescissionData = z.infer<typeof rescissionSchema>

export default function CltRescissionCalculator() {
  const router = useRouter()
  
  // Opções para tipo de rescisão
  const tiposRescisao = [
    { id: 'sem-justa-causa', title: 'Demissão sem justa causa' },
    { id: 'pedido-demissao', title: 'Pedido de demissão' },
    { id: 'justa-causa', title: 'Demissão por justa causa' },
    { id: 'rescisao-indireta', title: 'Rescisão indireta' },
    { id: 'comum-acordo', title: 'Demissão consensual (comum acordo)' },
    { id: 'fim-experiencia', title: 'Término de contrato de experiência' }
  ]
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<RescissionData>({
    resolver: zodResolver(rescissionSchema),
    defaultValues: {
      tipoRescisao: tiposRescisao[0],
      salario: '',
      dataAdmissao: '',
      dataRescisao: '',
      diasTrabalhados: '',
      saldoFgts: '',
      temFeriasVencidas: false,
      diasFeriasVencidas: '',
      avisoTrabalhado: false
    },
  })

  // Função para calcular INSS com alíquotas progressivas
  const calcularINSS = (salario: number): number => {
    let inss = 0;
    let salarioRestante = salario;
    let faixaAnterior = 0;

    for (const faixa of TABELA_INSS_2025) {
      const valorFaixa = Math.min(salarioRestante, faixa.faixaAte - faixaAnterior);
      if (valorFaixa <= 0) break;
      
      inss += valorFaixa * (faixa.aliquota / 100);
      salarioRestante -= valorFaixa;
      faixaAnterior = faixa.faixaAte;
      
      if (salarioRestante <= 0) break;
    }

    return Math.min(inss, TABELA_INSS_2025[TABELA_INSS_2025.length - 1].faixaAte * 0.14);
  }

  // Função para calcular IRPF
  const calcularIRPF = (baseCalculo: number): number => {
    for (const faixa of TABELA_IRPF_2025) {
      if (baseCalculo <= faixa.faixaAte) {
        const irpf = (baseCalculo * faixa.aliquota / 100) - faixa.deducao;
        return Math.max(irpf, 0);
      }
    }
    return 0;
  }

  // Função para calcular dias entre duas datas
  const calcularDiasEntreDatas = (dataInicio: string, dataFim: string): number => {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const diffTime = Math.abs(fim.getTime() - inicio.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Função para calcular anos de trabalho
  const calcularAnosTrabalho = (dataAdmissao: string, dataRescisao: string): number => {
    const admissao = new Date(dataAdmissao);
    const rescisao = new Date(dataRescisao);
    const diffTime = rescisao.getTime() - admissao.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
  }

  // Função para calcular meses trabalhados no ano
  const calcularMesesAno = (dataAdmissao: string, dataRescisao: string): number => {
    const admissao = new Date(dataAdmissao);
    const rescisao = new Date(dataRescisao);
    const anoRescisao = rescisao.getFullYear();
    
    let inicioAno = new Date(anoRescisao, 0, 1);
    if (admissao.getFullYear() === anoRescisao) {
      inicioAno = admissao;
    }
    
    const meses = (rescisao.getFullYear() - inicioAno.getFullYear()) * 12 + 
                  rescisao.getMonth() - inicioAno.getMonth();
    
    return Math.min(meses + 1, 12);
  }

  // Função principal de cálculo
  const calcularRescisao = (data: RescissionData) => {
    try {
      const salarioBruto = parseFloat(data.salario.replace(/[^\d,]/g, '').replace(',', '.'));
      const diasTrabalhados = parseInt(data.diasTrabalhados);
      const saldoFgts = parseFloat(data.saldoFgts.replace(/[^\d,]/g, '').replace(',', '.'));
      const diasFeriasVencidas = data.temFeriasVencidas ? parseInt(data.diasFeriasVencidas || '0') : 0;

      const anosTrabalho = calcularAnosTrabalho(data.dataAdmissao, data.dataRescisao);
      const mesesAno = calcularMesesAno(data.dataAdmissao, data.dataRescisao);

      // Cálculo do saldo de salário
      const saldoSalario = (salarioBruto / 30) * diasTrabalhados;

      // Cálculo do aviso prévio (Lei 12.506/2011)
      let avisoPreVio = 0;
      if (['sem-justa-causa', 'rescisao-indireta'].includes(data.tipoRescisao.id)) {
        const diasAvisoPreVio = Math.min(30 + (anosTrabalho * 3), 90);
        avisoPreVio = data.avisoTrabalhado ? 0 : (salarioBruto / 30) * diasAvisoPreVio;
      }

      // Cálculo do 13º salário proporcional
      let decimoTerceiro = 0;
      if (!['justa-causa'].includes(data.tipoRescisao.id)) {
        decimoTerceiro = (salarioBruto / 12) * mesesAno;
      }

      // Cálculo das férias proporcionais + 1/3
      let feriasProporcionais = 0;
      if (!['justa-causa'].includes(data.tipoRescisao.id)) {
        const valorFerias = (salarioBruto / 12) * mesesAno;
        feriasProporcionais = valorFerias + (valorFerias / 3);
      }

      // Cálculo das férias vencidas + 1/3
      let feriasVencidas = 0;
      if (data.temFeriasVencidas && diasFeriasVencidas > 0) {
        const valorFeriasVencidas = (salarioBruto / 30) * diasFeriasVencidas;
        feriasVencidas = valorFeriasVencidas + (valorFeriasVencidas / 3);
      }

      // Cálculo da multa do FGTS
      let multaFgts = 0;
      if (data.tipoRescisao.id === 'sem-justa-causa' || data.tipoRescisao.id === 'rescisao-indireta') {
        multaFgts = saldoFgts * 0.4; // 40%
      } else if (data.tipoRescisao.id === 'comum-acordo') {
        multaFgts = saldoFgts * 0.2; // 20%
      }

      // Cálculo dos descontos
      const baseCalculoInss = saldoSalario + avisoPreVio + decimoTerceiro;
      const descontoInss = calcularINSS(baseCalculoInss);
      const baseCalculoIrpf = baseCalculoInss - descontoInss;
      const descontoIrpf = calcularIRPF(baseCalculoIrpf);

      // Totais
      const totalVencimentos = saldoSalario + avisoPreVio + decimoTerceiro + feriasProporcionais + feriasVencidas + multaFgts;
      const totalDescontos = descontoInss + descontoIrpf;
      const valorTotal = totalVencimentos - totalDescontos;

      // Formatar valores para exibição
      const formatCurrency = (value: number) => 
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

      // Redirecionar para a página de resultado com TODOS os resultados pré-calculados
      const params = new URLSearchParams({
        tipoRescisao: data.tipoRescisao.title,
        salario: formatCurrency(salarioBruto),
        dataAdmissao: new Date(data.dataAdmissao).toLocaleDateString('pt-BR'),
        dataRescisao: new Date(data.dataRescisao).toLocaleDateString('pt-BR'),
        saldoSalario: formatCurrency(saldoSalario),
        avisoPreVio: formatCurrency(avisoPreVio),
        decimoTerceiro: formatCurrency(decimoTerceiro),
        feriasProporcionais: formatCurrency(feriasProporcionais),
        feriasVencidas: formatCurrency(feriasVencidas),
        multaFgts: formatCurrency(multaFgts),
        descontoInss: formatCurrency(descontoInss),
        descontoIrpf: formatCurrency(descontoIrpf),
        totalVencimentos: formatCurrency(totalVencimentos),
        totalDescontos: formatCurrency(totalDescontos),
        valorTotal: formatCurrency(valorTotal)
      });

      router.push(`/calculadoras/rescisao-clt/resultado?${params.toString()}`);
    } catch (error) {
      console.error('Erro ao calcular rescisão:', error);
      router.push(`/calculadoras/rescisao-clt/resultado?error=true`);
    }
  }

  const clearForm = () => {
    setValue('tipoRescisao', tiposRescisao[0]);
    setValue('salario', '');
    setValue('dataAdmissao', '');
    setValue('dataRescisao', '');
    setValue('diasTrabalhados', '');
    setValue('saldoFgts', '');
    setValue('temFeriasVencidas', false);
    setValue('diasFeriasVencidas', '');
    setValue('avisoTrabalhado', false);
  }

  return (
    <FormPage
      title="Calculadora de Rescisão CLT 2025"
      description="Calcule sua rescisão trabalhista com os valores mais atualizados. Salário mínimo R$ 1.518,00, tabelas INSS e IRPF 2025."
    >
      <form onSubmit={handleSubmit(calcularRescisao)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            {/* Tipo de Rescisão */}
            <div className="col-span-full">
              <Controller
                name="tipoRescisao"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Tipo de Rescisão"
                    options={tiposRescisao}
                    defaultValue={tiposRescisao[0]}
                    onChange={(value) => field.onChange(value)}
                    error={errors.tipoRescisao?.message}
                  />
                )}
              />
            </div>
            
            {/* Salário Bruto */}
            <div className="sm:col-span-3">
              <InputText
                label="Salário Bruto Mensal"
                placeholder="R$ 0,00"
                {...register('salario')}
                error={errors.salario?.message}
                onChange={(e) => {
                  const maskedValue = currencyMask(e.target.value);
                  setValue('salario', maskedValue);
                }}
              />
            </div>

            {/* Saldo do FGTS */}
            <div className="sm:col-span-3">
              <InputText
                label="Saldo do FGTS"
                placeholder="R$ 0,00"
                {...register('saldoFgts')}
                error={errors.saldoFgts?.message}
                onChange={(e) => {
                  const maskedValue = currencyMask(e.target.value);
                  setValue('saldoFgts', maskedValue);
                }}
              />
            </div>
            
            {/* Data de Admissão */}
            <div className="sm:col-span-3">
              <InputText
                label="Data de Admissão"
                type="date"
                {...register('dataAdmissao')}
                error={errors.dataAdmissao?.message}
              />
            </div>
            
            {/* Data de Rescisão */}
            <div className="sm:col-span-3">
              <InputText
                label="Data de Rescisão"
                type="date"
                {...register('dataRescisao')}
                error={errors.dataRescisao?.message}
              />
            </div>
            
            {/* Dias Trabalhados no Mês */}
            <div className="sm:col-span-3">
              <InputText
                label="Dias Trabalhados no Mês da Rescisão"
                placeholder="Ex: 15"
                type="number"
                min="1"
                max="31"
                {...register('diasTrabalhados')}
                error={errors.diasTrabalhados?.message}
              />
            </div>

            {/* Aviso Trabalhado */}
            <div className="sm:col-span-3 flex items-center pt-8">
              <InputCheckbox
                label="Aviso prévio será trabalhado"
                {...register('avisoTrabalhado')}
              />
            </div>
            
            {/* Férias Vencidas */}
            <div className="sm:col-span-3 flex items-center">
              <InputCheckbox
                label="Possui férias vencidas"
                {...register('temFeriasVencidas')}
              />
            </div>
            
            {/* Dias de Férias Vencidas */}
            <div className="sm:col-span-3">
              <InputText
                label="Dias de Férias Vencidas"
                placeholder="Ex: 30"
                type="number"
                min="1"
                max="30"
                {...register('diasFeriasVencidas')}
                error={errors.diasFeriasVencidas?.message}
                disabled={!register('temFeriasVencidas')}
              />
            </div>
            
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Calcular Rescisão
          </Button>
        </div>
      </form>
    </FormPage>
  )
}