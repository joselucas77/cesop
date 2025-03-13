export const validaCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  const cpfLimpo = cpf.replace(/\D/g, "");

  // Verifica se o CPF tem 11 caracteres ou é uma sequência repetida
  if (!cpfLimpo || cpfLimpo.length !== 11 || isSequencia(cpfLimpo))
    return false;

  // Extrai os 9 primeiros dígitos e calcula os dois dígitos verificadores
  const cpfParcial = cpfLimpo.slice(0, -2);
  const digito1 = criaDigito(cpfParcial);
  const digito2 = criaDigito(cpfParcial + digito1);

  // Valida o CPF completo
  const novoCpf = cpfParcial + digito1 + digito2;
  return novoCpf === cpfLimpo;
};

// Função para criar um dígito verificador
const criaDigito = (cpfParcial: string): string => {
  const cpfArray = Array.from(cpfParcial);
  let regressivo = cpfArray.length + 1;

  const total = cpfArray.reduce((ac, val) => {
    ac += regressivo * Number(val);
    regressivo--;
    return ac;
  }, 0);

  const digito = 11 - (total % 11);
  return digito > 9 ? "0" : String(digito);
};

// Função para verificar se o CPF é uma sequência repetida
const isSequencia = (cpf: string): boolean => {
  const sequencia = cpf[0].repeat(cpf.length);
  return sequencia === cpf;
};
