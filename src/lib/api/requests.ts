import { Requests } from "@prisma/client";

export const getRequest = async (protocol: string): Promise<Requests> => {
  const encodedProtocolo = encodeURIComponent(protocol);
  const response = await fetch(`/api/requests/${encodedProtocolo}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar usuário");
  }
  const data: Requests = await response.json();
  return data;
};

export const getRequestByUserId = async (id: number): Promise<Requests[]> => {
  try {
    const response = await fetch("/api/requests", {
      cache: "no-cache",
    });
    if (!response.ok) throw new Error("Erro ao buscar os dados");

    const allRequests: Requests[] = await response.json();
    return allRequests.filter(
      (request: Requests) => request.applicantId === id
    );
  } catch (error) {
    console.error("Erro ao buscar as requisições:", error);
    return [];
  }
};

export const getRequestByDepartament = async (
  departament: string
): Promise<Requests[]> => {
  try {
    const response = await fetch("/api/requests", {
      cache: "no-cache",
    });
    if (!response.ok) throw new Error("Erro ao buscar os dados");

    const allRequests: Requests[] = await response.json();
    return allRequests.filter(
      (request: Requests) => request.department === departament
    );
  } catch (error) {
    console.error("Erro ao buscar as requisições:", error);
    return [];
  }
};
