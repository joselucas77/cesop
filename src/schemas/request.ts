import { z } from "zod";

export const requestSchema = z.object({
  service: z.string().min(1, "Serviço é obrigatório"),
  postalCode: z.optional(
    z
      .string()
      .min(8, { message: "CEP é obrigatório" })
      .regex(/^\d{5}\-\d{3}$/, {
        message: "Use o formato 00000-000",
      })
  ),
  state: z.optional(z.string().min(1, { message: "Estado é obrigatório" })),
  city: z.optional(z.string().min(1, { message: "Cidade é obrigatória" })),
  district: z.optional(z.string().min(1, { message: "Bairro é obrigatório" })),
  street: z.optional(z.string().min(1, { message: "Rua é obrigatória" })),
  houseNumber: z.optional(
    z.string().min(1, { message: "Número é obrigatório" })
  ),
  zone: z.optional(z.string()),
  complement: z.optional(z.string()),
  message: z.string().min(1, { message: "Mensagem é obrigatória" }),
  file: z.optional(z.string()),
  status: z.string(),
});

export type RequestFormData = z.infer<typeof requestSchema>;
