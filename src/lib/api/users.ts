import { Requests, Users } from "@prisma/client";

export type UserWithRequests = {
  id: number;
  name: string;
  phone: string;
  protocol: string;
  service: string;
  secretary: string;
  status: string;
};

export const getUserById = async (id: string): Promise<Users> => {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar usuário");
  }
  const data: Users = await response.json();
  return data;
};

export async function getUserByRequest(): Promise<UserWithRequests[]> {
  try {
    const response = await fetch("/api/requests", { cache: "no-cache" });
    if (!response.ok) throw new Error("Erro ao buscar as requisições");

    const requests: Requests[] = await response.json();
    if (!requests || requests.length === 0) return [];

    // Busca os dados dos usuários em paralelo
    const usersData = await Promise.all(
      requests.map(async (request) => {
        const userResponse = await fetch(`/api/users/${request.applicantId}`, {
          cache: "no-cache",
        });
        if (!userResponse.ok)
          throw new Error(`Erro ao buscar usuário ID: ${request.applicantId}`);

        const user = await userResponse.json();

        return {
          id: user.id,
          name: user.name,
          phone: user.phone,
          protocol: request.protocol,
          service: request.service,
          secretary: request.secretary,
          status: request.status,
        };
      })
    );

    // Remove valores nulos do array
    return usersData.filter((user) => user !== null) as UserWithRequests[];
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    return [];
  }
}
