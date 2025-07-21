'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import FormPage from '../template/FormPage'
import Button from '@/components/ui/Button'
import CopyResult from '@/components/ui/CopyResult'

interface RescissionData {
  tipoRescisao: string;
  salario: string;
  dataAdmissao: string;
  dataRescisao: string;
  saldoSalario: string;
  avisoPreVio: string;
  decimoTerceiro: string;
  feriasProporcionais: string;
  feriasVencidas: string;
  multaFgts: string;
  descontoInss: string;
  descontoIrpf: string;
  totalVencimentos: string;
  totalDescontos: string;
  valorTotal: string;
}

const formatCurrency = (value: string) => {
  if (!value || value === '0' || value === 'R$ 0,00') return 'R$ 0,00';
  // Se já está formatado, retorna como está
  if (value.includes('R$')) return value;
  // Senão, formata como currency
  const numValue = parseFloat(value.replace(/[^\d,-]/g, '').replace(',', '.'));
  if (isNaN(numValue)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numValue);
};

const formatDate = (dateString: string) => {
  // As datas já chegam formatadas do calculadora, apenas retorna como está
  if (!dateString) return '-';
  return dateString;
};

const getRescissionTypeDisplay = (type: string) => {
  const types: { [key: string]: string } = {
    'demissao-sem-justa-causa': 'Demissão sem Justa Causa',
    'pedido-demissao': 'Pedido de Demissão',
    'demissao-justa-causa': 'Demissão por Justa Causa',
    'rescisao-indireta': 'Rescisão Indireta',
    'comum-acordo': 'Demissão Consensual (Comum Acordo)',
    'termino-contrato': 'Término de Contrato de Experiência'
  };
  return types[type] || type;
};

export default function RescissionResultDisplay() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<RescissionData | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'true') {
      setHasError(true);
      return;
    }

    // Coletar todos os parâmetros
    const rescissionData: Partial<RescissionData> = {};
    const requiredParams = ['valorTotal', 'totalVencimentos', 'totalDescontos'];
    let hasRequiredData = false;

    // Verificar se temos os dados essenciais
    for (const param of requiredParams) {
      const value = searchParams.get(param);
      if (value) {
        hasRequiredData = true;
        break;
      }
    }

    if (hasRequiredData) {
      // Coletar todos os parâmetros disponíveis
      const allParams: (keyof RescissionData)[] = [
        'tipoRescisao', 'salario', 'dataAdmissao', 'dataRescisao',
        'saldoSalario', 'avisoPreVio', 'decimoTerceiro', 'feriasProporcionais',
        'feriasVencidas', 'multaFgts', 'descontoInss', 'descontoIrpf',
        'totalVencimentos', 'totalDescontos', 'valorTotal'
      ];

      allParams.forEach(param => {
        const value = searchParams.get(param);
        if (value) {
          rescissionData[param] = value;
        }
      });

      setData(rescissionData as RescissionData);
    }
  }, [searchParams]);

  const handleCalculateNew = () => {
    router.push('/calculadoras/rescisao-clt');
  };

  if (hasError || !data) {
    return (
      <FormPage
        title="Resultado Não Encontrado"
        description={hasError ? "Ocorreu um erro ao processar o cálculo da rescisão." : "Não foi possível encontrar um resultado de cálculo."}
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <p className="text-center text-gray-600">
                {hasError ? "Verifique se os dados informados são válidos e tente novamente." : "Verifique os dados e refaça o cálculo."}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" onClick={handleCalculateNew}>
            Calcular Nova Rescisão
          </Button>
        </div>
      </FormPage>
    );
  }

  return (
    <FormPage
      title="Resultado da Rescisão CLT"
      description="Confira abaixo o cálculo detalhado da sua rescisão trabalhista com todos os valores atualizados para 2025."
    >
      <div className="px-4 py-6 sm:p-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8">
          
          {/* Resultado Principal - Destaque */}
          {data.valorTotal && (
            <div className="col-span-full">
              <div className="bg-[var(--color-main-50)] border-2 border-[var(--color-main-200)] rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-[var(--color-main-900)] mb-2">Valor Líquido a Receber</h3>
                <div className="text-3xl font-bold text-[var(--color-main-700)]">
                  {formatCurrency(data.valorTotal)}
                </div>
              </div>
            </div>
          )}

          {/* Informações Básicas */}
          <div className="col-span-full">
            <h4 className="text-base font-semibold text-gray-900 mb-4">Informações da Rescisão</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {data.tipoRescisao && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo de Rescisão:</span>
                  <span className="font-medium text-gray-900">{getRescissionTypeDisplay(data.tipoRescisao)}</span>
                </div>
              )}
              {data.salario && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Salário Bruto:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(data.salario)}</span>
                </div>
              )}
              {data.dataAdmissao && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Data de Admissão:</span>
                  <span className="font-medium text-gray-900">{formatDate(data.dataAdmissao)}</span>
                </div>
              )}
              {data.dataRescisao && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Data de Rescisão:</span>
                  <span className="font-medium text-gray-900">{formatDate(data.dataRescisao)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Resumo Financeiro */}
          <div className="col-span-full">
            <h4 className="text-base font-semibold text-gray-900 mb-4">Resumo Financeiro</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {data.totalVencimentos && (
                <div className="flex justify-between">
                  <span className="text-gray-700">Total de Vencimentos:</span>
                  <span className="font-bold text-gray-900">{formatCurrency(data.totalVencimentos)}</span>
                </div>
              )}
              {data.totalDescontos && (
                <div className="flex justify-between">
                  <span className="text-gray-700">Total de Descontos:</span>
                  <span className="font-bold text-gray-900">- {formatCurrency(data.totalDescontos)}</span>
                </div>
              )}
              <hr className="border-gray-200" />
              {data.valorTotal && (
                <div className="flex justify-between text-lg">
                  <span className="text-[var(--color-main-700)] font-semibold">Valor Líquido:</span>
                  <span className="font-bold text-[var(--color-main-800)]">{formatCurrency(data.valorTotal)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Detalhes dos Vencimentos - Expansível */}
          {(data.saldoSalario || data.avisoPreVio || data.decimoTerceiro || data.feriasProporcionais || data.feriasVencidas || data.multaFgts) && (
            <div className="col-span-full">
              <details className="group">
                <summary className="cursor-pointer list-none">
                  <h4 className="text-base font-semibold text-gray-900 mb-4 group-open:mb-4 flex items-center">
                    <span>Detalhes dos Vencimentos</span>
                    <svg className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </h4>
                </summary>
                <div className="bg-[var(--color-main-50)] rounded-lg p-4 space-y-2">
                  {data.saldoSalario && parseFloat(data.saldoSalario.replace(/[^\d,-]/g, '').replace(',', '.')) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[var(--color-main-700)]">Saldo de Salário:</span>
                      <span className="font-medium text-[var(--color-main-900)]">{formatCurrency(data.saldoSalario)}</span>
                    </div>
                  )}
                  {data.avisoPreVio && parseFloat(data.avisoPreVio.replace(/[^\d,-]/g, '').replace(',', '.')) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[var(--color-main-700)]">Aviso Prévio:</span>
                      <span className="font-medium text-[var(--color-main-900)]">{formatCurrency(data.avisoPreVio)}</span>
                    </div>
                  )}
                  {data.decimoTerceiro && parseFloat(data.decimoTerceiro.replace(/[^\d,-]/g, '').replace(',', '.')) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[var(--color-main-700)]">13º Salário Proporcional:</span>
                      <span className="font-medium text-[var(--color-main-900)]">{formatCurrency(data.decimoTerceiro)}</span>
                    </div>
                  )}
                  {data.feriasProporcionais && parseFloat(data.feriasProporcionais.replace(/[^\d,-]/g, '').replace(',', '.')) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[var(--color-main-700)]">Férias Proporcionais + 1/3:</span>
                      <span className="font-medium text-[var(--color-main-900)]">{formatCurrency(data.feriasProporcionais)}</span>
                    </div>
                  )}
                  {data.feriasVencidas && parseFloat(data.feriasVencidas.replace(/[^\d,-]/g, '').replace(',', '.')) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[var(--color-main-700)]">Férias Vencidas + 1/3:</span>
                      <span className="font-medium text-[var(--color-main-900)]">{formatCurrency(data.feriasVencidas)}</span>
                    </div>
                  )}
                  {data.multaFgts && parseFloat(data.multaFgts.replace(/[^\d,-]/g, '').replace(',', '.')) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[var(--color-main-700)]">Multa do FGTS (40%):</span>
                      <span className="font-medium text-[var(--color-main-900)]">{formatCurrency(data.multaFgts)}</span>
                    </div>
                  )}
                </div>
              </details>
            </div>
          )}

          {/* Detalhes dos Descontos - Expansível */}
          {(data.descontoInss || data.descontoIrpf) && (
            <div className="col-span-full">
              <details className="group">
                <summary className="cursor-pointer list-none">
                  <h4 className="text-base font-semibold text-gray-900 mb-4 group-open:mb-4 flex items-center">
                    <span>Detalhes dos Descontos</span>
                    <svg className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </h4>
                </summary>
                <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                  {data.descontoInss && parseFloat(data.descontoInss.replace(/[^\d,-]/g, '').replace(',', '.')) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Desconto INSS:</span>
                      <span className="font-medium text-gray-900">- {formatCurrency(data.descontoInss)}</span>
                    </div>
                  )}
                  {data.descontoIrpf && parseFloat(data.descontoIrpf.replace(/[^\d,-]/g, '').replace(',', '.')) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Desconto IRPF:</span>
                      <span className="font-medium text-gray-900">- {formatCurrency(data.descontoIrpf)}</span>
                    </div>
                  )}
                </div>
              </details>
            </div>
          )}

          {/* Campo de cópia do resultado principal */}
          {data.valorTotal && (
            <div className="col-span-full">
              <CopyResult
                label="Resultado Final para Compartilhar"
                value={`Cálculo de Rescisão CLT - Valor Líquido: ${formatCurrency(data.valorTotal)} (Vencimentos: ${formatCurrency(data.totalVencimentos || '0')} - Descontos: ${formatCurrency(data.totalDescontos || '0')})`}
              />
            </div>
          )}

          {/* Aviso importante */}
          <div className="col-span-full">
            <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
              <h3 className="text-sm text-amber-800 font-bold">⚠️ Informações Importantes</h3>
              <div className="mt-2 text-sm text-amber-800">
                <p>Este cálculo é uma estimativa baseada na legislação vigente. Para cálculos oficiais, consulte um contador ou advogado trabalhista especializado.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <Button type="button" onClick={handleCalculateNew}>
          Calcular Nova Rescisão
        </Button>
      </div>
    </FormPage>
  );
} 