export const requirements = [
  { re: /[A-Z]/, label: "Pelo menos uma letra maiúscula" },
  { re: /[a-z]/, label: "Pelo menos uma letra minúscula" },
  { re: /[0-9]/, label: "Pelo menos um número" },
  { re: /[@$!%*?&]/, label: "Pelo menos um caractere especial (@$!%*?&)" },
  { re: /.{6,}/, label: "No mínimo 6 caracteres" },
];

export const checkPasswordStrength = (password: string) => {
  return requirements.reduce((acc, requirement) => {
    return acc + (requirement.re.test(password) ? 1 : 0);
  }, 0);
};

export const getStrengthLabel = (strength: number) => {
  if (strength <= 2) return "Fraca";
  if (strength <= 4) return "Média";
  return "Forte";
};

export const getStrengthColor = (strength: number) => {
  if (strength <= 2) return "bg-red-500";
  if (strength <= 4) return "bg-yellow-500";
  return "bg-green-500";
};
