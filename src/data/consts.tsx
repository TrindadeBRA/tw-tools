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

export const cepRanges: { [key: string]: { start: number; end: number } } = {
    SP: { start: 1000, end: 19999 },
    RJ: { start: 20000, end: 28999 },
    ES: { start: 29000, end: 29999 },
    MG: { start: 30000, end: 39999 },
    BA: { start: 40000, end: 48999 },
    SE: { start: 49000, end: 49999 },
    PE: { start: 50000, end: 56999 },
    AL: { start: 57000, end: 57999 },
    PB: { start: 58000, end: 58999 },
    RN: { start: 59000, end: 59999 },
    CE: { start: 60000, end: 63999 },
    PI: { start: 64000, end: 64999 },
    MA: { start: 65000, end: 65999 },
    PA: { start: 66000, end: 68899 },
    AP: { start: 68900, end: 68999 },
    AM: { start: 69000, end: 69299 },
    RR: { start: 69300, end: 69399 },
    AC: { start: 69900, end: 69999 },
    DF: { start: 70000, end: 72799 },
    GO: { start: 72800, end: 76799 },
    TO: { start: 77000, end: 77999 },
    MT: { start: 78000, end: 78899 },
    RO: { start: 78900, end: 78999 },
    MS: { start: 79000, end: 79999 },
    PR: { start: 80000, end: 87999 },
    SC: { start: 88000, end: 89999 },
    RS: { start: 90000, end: 99999 },
  }