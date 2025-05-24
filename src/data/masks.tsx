export const cpfMask = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove tudo o que não é dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o sexto e o sétimo dígitos
      .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca um hífen entre o nono e o décimo dígitos
      .replace(/(-\d{2})\d+?$/, '$1') // Impede que sejam digitados mais de 11 dígitos
  }

export const cnpjMask = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{2})(\d)/, '$1.$2') // Coloca um ponto entre o segundo e o terceiro dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o quinto e o sexto dígitos
    .replace(/(\d{3})(\d)/, '$1/$2') // Coloca uma barra entre o oitavo e o nono dígitos
    .replace(/(\d{4})(\d{1,2})/, '$1-$2') // Coloca um hífen depois do décimo segundo dígito
    .replace(/(-\d{2})\d+?$/, '$1') // Impede que sejam digitados mais de 14 dígitos
}

export const rgMask = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{2})(\d)/, '$1.$2') // Coloca um ponto entre o segundo e o terceiro dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o quinto e o sexto dígitos
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca um hífen depois do nono dígito
    .replace(/(-\d{1})\d+?$/, '$1') // Impede que sejam digitados mais de 9 dígitos
}

export const currencyMask = (value: string) => {
  const cleanValue = value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/^0+/, ''); // Remove zeros à esquerda
  
  // Limita a 15 dígitos (trilhões)
  let limitedValue = cleanValue.substring(0, 15);
  
  // Se não tiver valor, retorna vazio
  if (limitedValue === '') return '';
  
  // Converte para centavos (divide por 100)
  const cents = parseInt(limitedValue, 10) / 100;
  
  // Formata como moeda brasileira
  return cents.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const numberMask = (value: string) => {
  // Se estiver vazio, retorna vazio
  if (!value || value === '') return '';
  
  // Preserva a vírgula ou ponto original para saber onde fica o decimal
  const hasComma = value.includes(',');
  const hasDot = value.includes('.');
  
  // Remove qualquer formatação existente (pontos de milhar)
  let cleanValue = value.replace(/\./g, '');
  
  // Agora preserva apenas dígitos, vírgula e ponto
  cleanValue = cleanValue.replace(/[^\d,.]/g, '');
  
  // Se não tiver vírgula ou ponto, é um número inteiro
  if (!hasComma && !hasDot) {
    // Converte para número inteiro (sem dividir por 100)
    const intValue = parseInt(cleanValue, 10);
    if (isNaN(intValue)) return '';
    
    // Formata com separadores de milhar
    return intValue.toLocaleString('pt-BR');
  }
  
  // Se tiver vírgula ou ponto, processa como número decimal
  
  // Normaliza para usar ponto como separador decimal para processamento
  cleanValue = cleanValue.replace(/,/g, '.');
  
  // Garante que só há um separador decimal
  const parts = cleanValue.split('.');
  if (parts.length > 2) {
    cleanValue = parts[0] + '.' + parts.slice(1).join('');
  }
  
  // Limita a 15 dígitos antes do ponto decimal
  if (parts[0].length > 15) {
    parts[0] = parts[0].substring(0, 15);
    cleanValue = parts.length > 1 ? parts[0] + '.' + parts[1] : parts[0];
  }
  
  // Limita a 2 casas decimais
  if (parts.length > 1 && parts[1].length > 2) {
    parts[1] = parts[1].substring(0, 2);
    cleanValue = parts[0] + '.' + parts[1];
  }
  
  try {
    // Converte para número
    const num = parseFloat(cleanValue || '0');
    
    // Formata com separador de milhares e vírgula decimal (padrão brasileiro)
    const formatted = num.toLocaleString('pt-BR', {
      minimumFractionDigits: parts.length > 1 ? 2 : 0,
      maximumFractionDigits: 2
    });
    
    // Se o usuário acabou de adicionar um separador decimal no final, mantém-no
    if ((hasComma || hasDot) && parts[1] === '') {
      return formatted + ',';
    }
    
    return formatted;
  } catch (error) {
    // Se algo der errado, retorna o valor limpo
    console.error('Erro ao formatar número:', error);
    return cleanValue.replace('.', ',');
  }
}