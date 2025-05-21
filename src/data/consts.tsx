import { Option } from "@/components/ui/InputSelect"

export const stateOptions: Option[] = [
    { id: 'SP', title: 'São Paulo' },
    { id: 'RJ', title: 'Rio de Janeiro' },
    { id: 'MG', title: 'Minas Gerais' },
    { id: 'RS', title: 'Rio Grande do Sul' },
    { id: 'BA', title: 'Bahia' },
    { id: 'PR', title: 'Paraná' },
    { id: 'PE', title: 'Pernambuco' },
    { id: 'CE', title: 'Ceará' },
    { id: 'PA', title: 'Pará' },
    { id: 'MA', title: 'Maranhão' },
    { id: 'SC', title: 'Santa Catarina' },
    { id: 'GO', title: 'Goiás' },
    { id: 'PB', title: 'Paraíba' },
    { id: 'ES', title: 'Espírito Santo' },
    { id: 'AM', title: 'Amazonas' },
    { id: 'RN', title: 'Rio Grande do Norte' },
    { id: 'AL', title: 'Alagoas' },
    { id: 'PI', title: 'Piauí' },
    { id: 'MT', title: 'Mato Grosso' },
    { id: 'DF', title: 'Distrito Federal' },
    { id: 'MS', title: 'Mato Grosso do Sul' },
    { id: 'SE', title: 'Sergipe' },
    { id: 'RO', title: 'Rondônia' },
    { id: 'TO', title: 'Tocantins' },
    { id: 'AC', title: 'Acre' },
    { id: 'AP', title: 'Amapá' },
    { id: 'RR', title: 'Roraima' }
]

export const booleanOptions = [
    { id: 'true', title: 'Sim' },
    { id: 'false', title: 'Não' }
]

export const creditCardBrandOptions: Option[] = [
    { id: 'visa', title: 'Visa', description: 'Números começam com 4' },
    { id: 'mastercard', title: 'Mastercard', description: 'Números começam com 51-55' },
    { id: 'amex', title: 'American Express', description: 'Números começam com 34 ou 37' },
    { id: 'discover', title: 'Discover', description: 'Números começam com 6011' },
    { id: 'diners', title: 'Diners Club', description: 'Números começam com 300-305, 36 ou 38' },
    { id: 'jcb', title: 'JCB', description: 'Números começam com 35' },
    { id: 'hipercard', title: 'Hipercard', description: 'Números começam com 606282' },
    { id: 'elo', title: 'Elo', description: 'Números começam com 636368, 438935, 504175' }
]