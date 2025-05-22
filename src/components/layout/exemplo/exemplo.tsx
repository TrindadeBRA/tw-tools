'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import InputText from '@/components/ui/InputText'
import InputSelect from '@/components/ui/InputSelect'
import InputCheckbox from '@/components/ui/InputCheckbox'
import InputRadio from '@/components/ui/InputRadio'
import Button from '@/components/ui/Button'
import FormPage from '../template/FormPage'
import { useRouter } from 'next/navigation'

const exemploSchema = z.object({
  quantidade: z.string().min(1, 'Quantidade obrigatória'),
  tipo: z.object({
    id: z.string(),
    title: z.string()
  }),
  formato: z.string()
})

type ExemploData = z.infer<typeof exemploSchema>

export default function ExemploGerador() {
  const router = useRouter()
  const [opcoesSelecionadas, setOpcoesSelecionadas] = useState<string[]>([])
  
  const tipoOptions = [
    { id: 'padrao', title: 'Padrão' },
    { id: 'basico', title: 'Básico' },
    { id: 'premium', title: 'Premium' },
    { id: 'avancado', title: 'Avançado', description: 'Inclui recursos extras' }
  ]
  
  const opcoesCheckbox = [
    { id: 'opcao1', title: 'Opção 1', description: 'Descrição da opção 1' },
    { id: 'opcao2', title: 'Opção 2', description: 'Descrição da opção 2' }
  ]
  
  const formatoOptions = [
    { id: 'numerico', title: 'Numérico' },
    { id: 'alfanumerico', title: 'Alfanumérico' }
  ]
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ExemploData>({
    resolver: zodResolver(exemploSchema),
    defaultValues: {
      quantidade: '1',
      tipo: tipoOptions[0],
      formato: 'numerico'
    },
  })

  // Manipular alterações nos checkboxes
  useEffect(() => {
    const handleCheckboxChange = () => {
      const checkedOptions = opcoesCheckbox
        .map(option => ({ id: option.id, checked: document.getElementById(option.id) instanceof HTMLInputElement && (document.getElementById(option.id) as HTMLInputElement).checked }))
        .filter(option => option.checked)
        .map(option => option.id);
      
      setOpcoesSelecionadas(checkedOptions);
    };

    // Adicionar event listeners a cada checkbox
    opcoesCheckbox.forEach(option => {
      const checkbox = document.getElementById(option.id);
      if (checkbox) {
        checkbox.addEventListener('change', handleCheckboxChange);
      }
    });

    // Cleanup
    return () => {
      opcoesCheckbox.forEach(option => {
        const checkbox = document.getElementById(option.id);
        if (checkbox) {
          checkbox.removeEventListener('change', handleCheckboxChange);
        }
      });
    };
  }, []);

  const gerarExemplo = (data: ExemploData) => {
    // Simular geração de dados
    const resultado = `EX${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`
    const tipoFormatado = data.tipo.title.toUpperCase()
    
    // Preparar parâmetros de opções selecionadas
    const opcoesParam = opcoesSelecionadas.length > 0 
      ? opcoesSelecionadas.join(',') 
      : 'Nenhuma';
    
    // Redirecionar para a página de resultado com todos os dados do formulário
    router.push(`/exemplo/resultado?valor=${encodeURIComponent(resultado)}&tipo=${encodeURIComponent(tipoFormatado)}&quantidade=${encodeURIComponent(data.quantidade)}&formato=${encodeURIComponent(data.formato)}&opcoes=${encodeURIComponent(opcoesParam)}`)
  }

  const clearForm = () => {
    setValue('quantidade', '1')
    setValue('tipo', tipoOptions[0])
    setValue('formato', 'numerico')
    
    // Limpar os checkboxes
    opcoesCheckbox.forEach(option => {
      const checkbox = document.getElementById(option.id) as HTMLInputElement;
      if (checkbox) checkbox.checked = false;
    });
    setOpcoesSelecionadas([]);
  }

  return (
    <FormPage
      title="Como Usar o Gerador de Exemplo"
      description="Esta é uma demonstração de como usar um gerador. Selecione as opções abaixo e clique no botão para gerar um exemplo."
    >
      <form onSubmit={handleSubmit(gerarExemplo)}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputText
                label="Quantidade"
                placeholder="1"
                {...register('quantidade')}
                error={errors.quantidade?.message}
              />
            </div>
            
            <div className="sm:col-span-3">
              <Controller
                name="tipo"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="Tipo"
                    options={tipoOptions}
                    defaultValue={tipoOptions[0]}
                    onChange={(value) => field.onChange(value)}
                    error={errors.tipo?.message}
                  />
                )}
              />
            </div>
            
            {/* Opções Adicionais e Formato na mesma linha */}
            <div className="sm:col-span-3">
              <InputCheckbox
                label="Opções Adicionais"
                description="Selecione as opções desejadas"
                options={opcoesCheckbox}
                defaultChecked={[]}
              />
            </div>
            
            <div className="sm:col-span-3">
              <Controller
                name="formato"
                control={control}
                render={({ field }) => (
                  <InputRadio
                    label="Formato"
                    name="formato"
                    options={formatoOptions}
                    defaultOption="numerico"
                    error={errors.formato?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="secondary" onClick={clearForm}>
            Limpar
          </Button>
          <Button type="submit">
            Gerar Exemplo
          </Button>
        </div>
      </form>
    </FormPage>
  )
} 