import { z } from "zod";

export const updatePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  newPassword: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      {
        message:
          "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial",
      }
    ),
});

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
