import { IBGEStateData, StateOption } from "@/types/IBGE";

export async function fetchStateData(): Promise<StateOption[]> {
  const response = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
  );
  const data: IBGEStateData[] = await response.json();

  // Map the states to the desired format
  const options: StateOption[] = data.map((state) => ({
    value: state.sigla,
    label: state.nome,
  }));

  return options;
}
