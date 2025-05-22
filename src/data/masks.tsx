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