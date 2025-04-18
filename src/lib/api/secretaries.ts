export const getSecretaries = async () => {
  try {
    const response = await fetch("/api/secretaries", {
      cache: "no-cache",
    });
    if (!response.ok) throw new Error("Erro ao buscar os dados");

    const secretaries = await response.json();
    return secretaries;
  } catch (error) {
    console.error("Erro ao buscar as secretarias:", error);
    return [];
  }
};

export const getSecretaryById = async (id: number) => {
  try {
    const response = await fetch(`/api/secretaries/${id}`, {
      cache: "no-cache",
    });
    if (!response.ok) throw new Error("Erro ao buscar os dados");

    const secretary = await response.json();
    return secretary;
  } catch (error) {
    console.error("Erro ao buscar a secretaria:", error);
    return null;
  }
};
