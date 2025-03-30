export const normalizePhoneNumber = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};

export const normalizeCpfNumber = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const normalizeCepNumber = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};

export const clearCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, "");
};

export const getFirstName = (fullName: string): string => {
  if (!fullName) return "";
  return fullName.trim().split(" ")[0];
};

export const normalizeUserType = (userType: string): string => {
  if (!userType) return "";
  switch (userType) {
    case "MANAGER":
      return "Administrador";
    case "CITIZEN":
      return "Cidadão";
    case "CITYHALL":
      return "Prefeitura";
    case "CENTRAL":
      return "Central";
    default:
      return userType;
  }
};

export const normalizeSex = (sex: string): string => {
  if (!sex) return "";
  switch (sex) {
    case "MASCULINO":
      return "Masculino";
    case "FEMININO":
      return "Feminino";
    case "OUTRO":
      return "Outro";
    default:
      return sex;
  }
};

export const normalizeAccessLevel = (accessLevel: string): string => {
  if (!accessLevel) return "";
  switch (accessLevel) {
    case "READ_ONLY":
      return "Visualizador";
    case "DATA_ENTRY":
      return "Operador de Dados";
    case "READ_WRITE":
      return "Edição e Consulta";
    case "ADMIN":
      return "Controle Total";
    default:
      return accessLevel;
  }
};

export const formatAvatarName = (name: string | undefined): string => {
  if (!name) return "";

  const nameParts = name.split(" ");
  if (nameParts.length >= 2) {
    return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
  }
  return nameParts[0][0].toUpperCase();
};
