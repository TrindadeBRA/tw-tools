'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import InputText from '@/components/ui/InputText'
import InputSelect from '@/components/ui/InputSelect'
import InputRadio from '@/components/ui/InputRadio'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'
import { currencyMask, numberMask } from '@/data/masks'

// Limite máximo de dígitos que a função de conversão pode processar
const MAX_DIGITS = 15;

const formSchema = z.object({
  unit: z.object({
    id: z.string(),
    title: z.string()
  }),
  letterCase: z.string(),
  value: z.string().min(1, 'Por favor, digite um valor')
    .refine(val => {
      // Remove tudo que não for dígito
      const digits = val.replace(/[^\d]/g, '');
      return digits.length <= MAX_DIGITS;
    }, `O valor não pode exceder ${MAX_DIGITS} dígitos`)
})

type FormData = z.infer<typeof formSchema>

// Função otimizada para converter número para extenso em português
const numeroParaExtenso = (numero: number, isCurrency: boolean): string => {
  if (numero === 0) return isCurrency ? 'zero reais' : 'zero';
  
  const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  const especiais = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const dezenas = ['', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
  
  // Função para converter números de 1 a 999
  const converterGrupo = (n: number): string => {
    if (n === 0) return '';
    if (n === 100) return 'cem';
    
    let resultado = '';
    
    // Centenas
    if (n >= 100) {
      resultado += centenas[Math.floor(n / 100)] + ' ';
      n %= 100;
      if (n !== 0) resultado += 'e ';
    }
    
    // Dezenas e unidades
    if (n >= 10 && n < 20) {
      resultado += especiais[n - 10];
    } else {
      if (n >= 20) {
        resultado += dezenas[Math.floor(n / 10)];
        n %= 10;
        if (n !== 0) resultado += ' e ';
      }
      
      if (n > 0 && n < 10) {
        resultado += unidades[n];
      }
    }
    
    return resultado.trim();
  };
  
  // Nomes dos grupos de números
  const grupos = ['', 'mil', 'milhão', 'bilhão', 'trilhão'];
  const gruposPlural = ['', 'mil', 'milhões', 'bilhões', 'trilhões'];
  
  // Preparação
  let resultado = '';
  const partes = numero.toFixed(2).split('.');
  const parteInteira = parseInt(partes[0]);
  const centavos = parseInt(partes[1]);
  
  // Converte a parte inteira
  if (parteInteira === 0) {
    resultado = 'zero';
  } else {
    // Divide em grupos de três dígitos
    const numStr = parteInteira.toString();
    const gruposDeTres: string[] = [];
    
    for (let i = numStr.length; i > 0; i -= 3) {
      const inicio = Math.max(0, i - 3);
      gruposDeTres.unshift(numStr.substring(inicio, i));
    }
    
    // Processa cada grupo
    gruposDeTres.forEach((grupo, index) => {
      const valor = parseInt(grupo);
      if (valor !== 0) {
        const posicao = gruposDeTres.length - 1 - index;
        
        // Adiciona separador se necessário
        if (resultado !== '') {
          resultado += ' e ';
        }
        
        // Adiciona o valor do grupo
        resultado += converterGrupo(valor);
        
        // Adiciona o nome do grupo (mil, milhão, etc.)
        if (posicao > 0) {
          resultado += ' ' + (valor === 1 ? grupos[posicao] : gruposPlural[posicao]);
        }
      }
    });
  }
  
  // Adiciona os reais para valores monetários
  if (isCurrency) {
    resultado += parteInteira === 1 ? ' real' : ' reais';
  }
  
  // Adiciona os centavos para valores monetários
  if (isCurrency && centavos > 0) {
    const textoCentavos = converterGrupo(centavos);
    resultado += ' e ' + textoCentavos + (centavos === 1 ? ' centavo' : ' centavos');
  }
  
  return resultado;
};

// Formatar texto conforme o caso selecionado
const formatarTexto = (texto: string, caso: string): string => {
  switch (caso) {
    case 'uppercase':
      return texto.toUpperCase();
    case 'firstupper':
      return texto.charAt(0).toUpperCase() + texto.slice(1);
    case 'lowercase':
    default:
      return texto.toLowerCase();
  }
};

export default function NumberInWords() {
  const router = useRouter();
  // Armazenar valor exibido no input
  const [inputValue, setInputValue] = useState('');
  // Armazenar valor bruto para processamento
  const [rawValue, setRawValue] = useState('');
  
  const unitOptions = [
    { id: 'currency', title: 'Monetária (Reais)' },
    { id: 'number', title: 'Numérica (Número Simples)' }
  ];
  
  const letterCaseOptions = [
    { id: 'lowercase', title: 'minúsculas' },
    { id: 'uppercase', title: 'MAIÚSCULAS' },
    { id: 'firstupper', title: 'Primeira Maiúscula' }
  ];
  
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unit: unitOptions[0],
      letterCase: 'lowercase',
      value: '',
    },
  });

  const selectedUnit = watch('unit');
  
  // Aplicar máscara quando o valor ou tipo de unidade mudar
  useEffect(() => {
    if (!rawValue) return;
    
    try {
      // Aplicar a máscara apropriada de acordo com o tipo de unidade
      if (selectedUnit.id === 'currency') {
        // Para valores monetários
        setInputValue(currencyMask(rawValue));
        
        // Definir o valor no formulário (apenas números, convertidos para reais)
        const numericValue = rawValue.replace(/[^\d]/g, '');
        if (numericValue) {
          const formattedValue = (parseInt(numericValue, 10) / 100).toString();
          setValue('value', formattedValue);
        }
      } else {
        // Para números simples
        
        // Verificar se tem separador decimal
        const hasDecimal = rawValue.includes(',') || rawValue.includes('.');
        
        // Limpar o valor para processamento
        let cleanValue = rawValue;
        
        // Remover pontos de milhares existentes
        cleanValue = cleanValue.replace(/\./g, '');
        
        // Substituir vírgula por ponto para o cálculo
        cleanValue = cleanValue.replace(/,/g, '.');
        
        // Remover caracteres inválidos
        cleanValue = cleanValue.replace(/[^\d.]/g, '');
        
        // Aplicar a máscara numérica
        const formattedValue = numberMask(rawValue);
        setInputValue(formattedValue);
        
        // Definir o valor no formulário (com ponto decimal para cálculos)
        setValue('value', cleanValue);
      }
    } catch (error) {
      console.error('Erro ao aplicar máscara:', error);
    }
  }, [selectedUnit, rawValue, setValue]);
  
  // Função para lidar com a mudança de valor no input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoValor = e.target.value;
    
    // Armazenar o valor bruto (sem formatação)
    setRawValue(novoValor);
    
    // O useEffect acima vai aplicar a máscara apropriada
  };

  const processNumber = (data: FormData) => {
    const { unit, letterCase, value } = data;
    
    try {
      // Converter para número
      const valorNumerico = parseFloat(value) || 0;
      
      // Verificar limite
      if (valorNumerico.toString().replace('.', '').length > MAX_DIGITS) {
        throw new Error(`Valor excede o limite de ${MAX_DIGITS} dígitos`);
      }
      
      // Formatar para exibição
      const valorFormatado = unit.id === 'currency' 
        ? valorNumerico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        : valorNumerico.toLocaleString('pt-BR');
      
      // Converter para extenso
      const isCurrency = unit.id === 'currency';
      const extenso = numeroParaExtenso(valorNumerico, isCurrency);
      
      // Aplicar formatação de texto
      const textoFormatado = formatarTexto(extenso, letterCase);
      
      // Navegar para resultado
      router.push(`/geradores/numero-por-extenso/resultado?value=${encodeURIComponent(value)}&formattedValue=${encodeURIComponent(valorFormatado)}&unit=${encodeURIComponent(unit.id)}&letterCase=${encodeURIComponent(letterCase)}&resultado=${encodeURIComponent(textoFormatado)}`);
    } catch (error) {
      console.error('Erro ao processar número:', error);
      router.push(`/geradores/numero-por-extenso/resultado?error=true`);
    }
  };

  const clearForm = () => {
    setValue('unit', unitOptions[0]);
    setValue('letterCase', 'lowercase');
    setValue('value', '');
    setInputValue('');
    setRawValue('');
  };

  return (
    <FormPage
      title="Conversor de Número por Extenso"
      description="Digite um número ou valor monetário para convertê-lo em texto por extenso."
    >
      <form onSubmit={handleSubmit(processNumber)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Unit type selection */}
            <div className="sm:col-span-3">
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Qual a unidade?"
                    options={unitOptions}
                    defaultValue={unitOptions[0]}
                    onChange={(value) => {
                      field.onChange(value);
                      // Reaplica a máscara quando muda o tipo de unidade
                      if (rawValue) {
                        setTimeout(() => {
                          if (value.id === 'currency') {
                            setInputValue(currencyMask(rawValue));
                          } else {
                            setInputValue(numberMask(rawValue));
                          }
                        }, 0);
                      }
                    }}
                    error={errors.unit?.message}
                  />
                )}
              />
            </div>
            
            {/* Letter case selection */}
            <div className="sm:col-span-3">
              <Controller
                name="letterCase"
                control={control}
                render={({ field }) => (
                  <InputRadio
                    label="Tipo de Letra"
                    name="letterCase"
                    options={letterCaseOptions}
                    defaultOption="lowercase"
                    onChange={(value) => field.onChange(value)}
                    error={errors.letterCase?.message}
                  />
                )}
              />
            </div>
            
            {/* Value input with mask */}
            <div className="sm:col-span-full">
              <InputText
                label="Digite o valor"
                placeholder={selectedUnit.id === 'currency' ? "Ex: R$ 1.250,75" : "Ex: 1250,75"}
                value={inputValue}
                onChange={handleInputChange}
                maxLength={selectedUnit.id === 'currency' ? 20 : 18}
                error={errors.value?.message}
              />
              {selectedUnit.id === 'currency' && 
                <p className="mt-1 text-xs text-gray-500">
                  Digite o valor em reais. Ex: 1250,75 para R$ 1.250,75
                </p>
              }
              {selectedUnit.id === 'number' && 
                <p className="mt-1 text-xs text-gray-500">
                  Digite apenas números. Use vírgula ou ponto para decimais. Ex: 1250,75
                </p>
              }
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Converter
          </Button>
        </div>
      </form>
    </FormPage>
  );
} 