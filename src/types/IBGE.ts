export interface StateOption {
  value: string;
  label: string;
}

export interface CityOption {
  value: number;
  label: string;
}

export interface IBGEStateData {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}

// Define types for the options we're creating
export interface StateOption {
  value: string;
  label: string;
}
