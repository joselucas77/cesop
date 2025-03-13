import { z } from "zod";
import { validaCPF } from "@/utils/cpf";

export const recoverAccessSchema = z.object({
  cpf: z
    .string()
    .min(11, { message: "Campo obrigatório." })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "CPF deve seguir o seguinte formato: 000.000.000-00",
    })
    .refine(validaCPF, {
      message: "CPF inválido",
    }),
  email: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .email("Email inválido"),
});

export type RecoverAccessFormData = z.infer<typeof recoverAccessSchema>;
