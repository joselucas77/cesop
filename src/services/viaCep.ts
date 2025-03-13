"use client";
import { toast } from "sonner";

export async function fetchAddressByCep(cep: string) {
  if (!cep || cep.length < 8) {
    toast.error("CEP inválido", {
      description: "Por favor, insira um CEP válido com 8 dígitos.",
    });
    return null;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (!data.erro) {
      return data;
    } else {
      toast.error("CEP não encontrado", {
        description: "Não foi possível encontrar o endereço.",
      });
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    toast.error("Erro", {
      description: "Ocorreu um erro ao buscar o CEP.",
    });
    return null;
  }
}
