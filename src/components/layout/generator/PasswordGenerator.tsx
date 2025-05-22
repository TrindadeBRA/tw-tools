'use client'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputText from '@/components/ui/InputText'
import InputSelect from '@/components/ui/InputSelect'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const passwordSchema = z.object({
  tamanho: z
    .string()
    .min(1, 'Campo obrigatório')
    .refine(
      (val) => {
        const num = parseInt(val);
        return !isNaN(num) && num > 0 && num <= 32;
      },
      { message: 'Tamanho deve ser entre 1 e 32' }
    ),
  incluirMaiusculas: z.boolean(),
  incluirMinusculas: z.boolean(),
  incluirNumeros: z.boolean(),
  incluirEspeciais: z.boolean(),
  quantidade: z.object({
    id: z.string(),
    title: z.string()
  })
})

type PasswordData = z.infer<typeof passwordSchema>

export default function PasswordGenerator() {
  const router = useRouter()
  
  // Estado para controlar o valor do campo de tamanho
  const [tamanhoSenha, setTamanhoSenha] = useState("12");
  
  const quantityOptions = [
    { id: '1', title: '1 senha' },
    { id: '5', title: '5 senhas' },
    { id: '10', title: '10 senhas' },
    { id: '15', title: '15 senhas' },
    { id: '20', title: '20 senhas' }
  ]

  const [checkboxes, setCheckboxes] = useState({
    incluirMaiusculas: true,
    incluirMinusculas: true,
    incluirNumeros: true,
    incluirEspeciais: false
  })
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      tamanho: tamanhoSenha,
      incluirMaiusculas: true,
      incluirMinusculas: true,
      incluirNumeros: true,
      incluirEspeciais: true,
      quantidade: quantityOptions[0]
    },
  })
  
  // Atualizar o formulário quando o tamanho mudar
  useEffect(() => {
    setValue('tamanho', tamanhoSenha);
  }, [tamanhoSenha, setValue]);

  // Manipulador para alternar estado dos checkboxes
  const toggleCheckbox = (name: keyof typeof checkboxes) => {
    // Verificar se esta é a última opção habilitada
    const currentValues = {...checkboxes}
    const isOnlyEnabled = Object.values(currentValues).filter(Boolean).length === 1 && currentValues[name] === true

    // Não permitir desmarcar se for a última opção habilitada
    if (isOnlyEnabled) return

    // Atualizar estado local
    const newValue = !checkboxes[name]
    setCheckboxes(prev => ({
      ...prev,
      [name]: newValue
    }))
    
    // Atualizar estado do formulário
    setValue(name as any, newValue)
  }

  const generatePasswords: SubmitHandler<PasswordData> = (data) => {
    // Usar o tamanho do estado
    const tamanho = parseInt(tamanhoSenha);
    const tamanhoFinal = isNaN(tamanho) || tamanho <= 0 || tamanho > 32 ? 12 : tamanho;
    
    // Garantir que a quantidade seja um número válido
    const quantidade = parseInt(data.quantidade.id);
    const quantidadeSenhas = isNaN(quantidade) ? 1 : quantidade;
    
    // Gerar senhas aleatórias
    const senhas = gerarSenhas(
      tamanhoFinal, 
      data.incluirMaiusculas, 
      data.incluirMinusculas, 
      data.incluirNumeros, 
      data.incluirEspeciais, 
      quantidadeSenhas
    );
    
    // Construir a URL com cada senha como um parâmetro separado
    let url = '/geradores/senha/resultado?';
    url += `quantidade=${encodeURIComponent(quantidadeSenhas)}&`;
    url += `tamanho=${encodeURIComponent(tamanhoFinal)}&`;
    
    senhas.forEach((senha, index) => {
      if (index > 0) url += '&';
      url += `senha${index}=${encodeURIComponent(senha)}`;
    });
    
    router.push(url);
  }

  // Função para gerar senhas aleatórias
  const gerarSenhas = (
    tamanho: number, 
    usarMaiusculas: boolean, 
    usarMinusculas: boolean, 
    usarNumeros: boolean, 
    usarEspeciais: boolean, 
    quantidade: number
  ): string[] => {
    const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const especiais = '!@#$%&*()-+.,;?^<>:';
    
    let caracteresDisponiveis = '';
    if (usarMaiusculas) caracteresDisponiveis += maiusculas;
    if (usarMinusculas) caracteresDisponiveis += minusculas;
    if (usarNumeros) caracteresDisponiveis += numeros;
    if (usarEspeciais) caracteresDisponiveis += especiais;
    
    // Se nenhuma opção foi selecionada, usar minúsculas como padrão
    if (caracteresDisponiveis.length === 0) {
      caracteresDisponiveis = minusculas;
    }
    
    const senhas: string[] = [];
    
    for (let i = 0; i < quantidade; i++) {
      let senha = '';
      for (let j = 0; j < tamanho; j++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresDisponiveis.length);
        senha += caracteresDisponiveis[indiceAleatorio];
      }
      senhas.push(senha);
    }
    
    return senhas;
  }

  const clearForm = () => {
    setTamanhoSenha("12")
    setValue('incluirMaiusculas', true)
    setValue('incluirMinusculas', true)
    setValue('incluirNumeros', true)
    setValue('incluirEspeciais', false)
    setValue('quantidade', quantityOptions[0])
    
    setCheckboxes({
      incluirMaiusculas: true,
      incluirMinusculas: true,
      incluirNumeros: true,
      incluirEspeciais: false
    })
  }

  return (
    <FormPage
      title="Configure sua Senha"
      description="Defina as características das senhas que deseja gerar"
    >
      <form onSubmit={handleSubmit(generatePasswords)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputText
                label="Tamanho da Senha"
                placeholder="Digite um número entre 1 e 32"
                type="number"
                min={1}
                max={32}
                id="tamanho"
                value={tamanhoSenha}
                onChange={(e) => setTamanhoSenha(e.target.value)}
                error={errors.tamanho?.message}
              />
              <p className="mt-1 text-sm text-gray-500">O tamanho máximo permitido é de 32 caracteres.</p>
            </div>
            
            <div className="sm:col-span-3">
              <Controller
                name="quantidade"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Quantidade de Senhas"
                    options={quantityOptions}
                    defaultValue={quantityOptions[0]}
                    onChange={(value) => field.onChange(value)}
                    error={errors.quantidade?.message}
                  />
                )}
              />
            </div>
            
            <div className="col-span-full">
              <p className="block text-sm font-semibold leading-6 text-gray-900 mb-2">Tipos de Caracteres</p>
              <div className="space-y-3">
                {/* Checkbox customizado com área clicável completa */}
                <div 
                  className="border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleCheckbox('incluirMaiusculas')}
                >
                  <div className="relative flex items-center gap-3 p-4">
                    <div className="min-w-0 flex-1 text-sm">
                      <span className="font-medium text-gray-900">
                        Incluir Letras Maiúsculas (A-Z)
                      </span>
                    </div>
                    <div className="flex h-6 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          type="checkbox"
                          checked={checkboxes.incluirMaiusculas}
                          readOnly
                          id="incluirMaiusculas"
                          {...register('incluirMaiusculas')}
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-main-600 checked:bg-main-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-600"
                          onClick={(e) => e.stopPropagation()}
                        />
                        {checkboxes.incluirMaiusculas && (
                          <svg
                            fill="none"
                            viewBox="0 0 14 14"
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleCheckbox('incluirMinusculas')}
                >
                  <div className="relative flex items-center gap-3 p-4">
                    <div className="min-w-0 flex-1 text-sm">
                      <span className="font-medium text-gray-900">
                        Incluir Letras Minúsculas (a-z)
                      </span>
                    </div>
                    <div className="flex h-6 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          type="checkbox"
                          checked={checkboxes.incluirMinusculas}
                          readOnly
                          id="incluirMinusculas"
                          {...register('incluirMinusculas')}
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-main-600 checked:bg-main-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-600"
                          onClick={(e) => e.stopPropagation()}
                        />
                        {checkboxes.incluirMinusculas && (
                          <svg
                            fill="none"
                            viewBox="0 0 14 14"
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleCheckbox('incluirNumeros')}
                >
                  <div className="relative flex items-center gap-3 p-4">
                    <div className="min-w-0 flex-1 text-sm">
                      <span className="font-medium text-gray-900">
                        Incluir Números (0-9)
                      </span>
                    </div>
                    <div className="flex h-6 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          type="checkbox"
                          checked={checkboxes.incluirNumeros}
                          readOnly
                          id="incluirNumeros"
                          {...register('incluirNumeros')}
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-main-600 checked:bg-main-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-600"
                          onClick={(e) => e.stopPropagation()}
                        />
                        {checkboxes.incluirNumeros && (
                          <svg
                            fill="none"
                            viewBox="0 0 14 14"
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleCheckbox('incluirEspeciais')}
                >
                  <div className="relative flex items-center gap-3 p-4">
                    <div className="min-w-0 flex-1 text-sm">
                      <span className="font-medium text-gray-900">
                        Incluir Caracteres Especiais (!@#$%&*()-+.,;?^&lt;&gt;:)
                      </span>
                    </div>
                    <div className="flex h-6 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          type="checkbox"
                          checked={checkboxes.incluirEspeciais}
                          readOnly
                          id="incluirEspeciais"
                          {...register('incluirEspeciais')}
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-main-600 checked:bg-main-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-600"
                          onClick={(e) => e.stopPropagation()}
                        />
                        {checkboxes.incluirEspeciais && (
                          <svg
                            fill="none"
                            viewBox="0 0 14 14"
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Gerar Senhas
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 