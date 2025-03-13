import { z } from "zod";
import { validaCPF } from "@/utils/cpf";

export const loginSchema = z.object({
  cpf: z
    .string()
    .min(11)
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "Use o formato 000.000.000-00",
    })
    .refine(validaCPF, {
      message: "CPF inválido",
    }),
  password: z.string().min(6, {
    message: "A Senha precisa ter pelo menos 6 caracteres.",
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
