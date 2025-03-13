import { z } from "zod";
import { validaCPF } from "@/utils/cpf";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
    birthdate: z
      .string()
      .date()
      .refine((date) => new Date(date) <= new Date(), {
        message: "Data de nascimento não pode ser no futuro",
      })
      .refine(
        (val) => !isNaN(new Date(val).getTime()),
        "Data de nascimento inválida"
      ),
    sex: z.enum(["MASCULINO", "FEMININO", "OUTRO"], {
      message: "Por favor selecione um gênero",
    }),
    cpf: z
      .string()
      .min(11)
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
        message: "Use o formato 000.000.000-00",
      })
      .refine(validaCPF, {
        message: "CPF inválido",
      }),
    rg: z.optional(z.string()),
    electoralCard: z.string().min(12, { message: "Informe o seu Titulo" }),
    cadSus: z.optional(z.string()),
    nis: z.optional(z.string()),
    phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
      message: "Telefone inválido. Use o formato (DD) 00000-0000",
    }),
    email: z.optional(z.string()),
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        {
          message:
            "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial",
        }
      ),
    confirmPassword: z.string(),
    postalCode: z
      .string()
      .min(8, { message: "CEP é obrigatório" })
      .regex(/^\d{5}\-\d{3}$/, {
        message: "Use o formato 00000-000",
      }),
    state: z.string().min(1, { message: "Estado é obrigatório" }),
    city: z.string().min(1, { message: "Cidade é obrigatória" }),
    district: z.string().min(1, { message: "Bairro é obrigatório" }),
    street: z.string().min(1, { message: "Rua é obrigatória" }),
    houseNumber: z.string().min(1, { message: "Número é obrigatório" }),
    zone: z.string().optional(),
    complement: z.string().optional(),
    userType: z.enum(["CITIZEN", "CITYHALL", "MANAGER", "CENTRAL"], {
      message: "Tipo de usuário inválido",
    }),
    secretary: z.string().optional(),
    department: z.string().optional(),
    accessType: z.enum(["READ_ONLY", "DATA_ENTRY", "READ_WRITE", "ADMIN"], {
      message: "Tipo de acesso inválido",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const editProfileSchema = z.object({
  phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
    message: "Telefone inválido. Use o formato (DD) 00000-0000",
  }),
  email: z.optional(z.string()),
  postalCode: z
    .string()
    .min(8, { message: "CEP é obrigatório" })
    .regex(/^\d{5}\-\d{3}$/, {
      message: "Use o formato 00000-000",
    }),
  state: z.string().min(1, { message: "Estado é obrigatório" }),
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
  district: z.string().min(1, { message: "Bairro é obrigatório" }),
  street: z.string().min(1, { message: "Rua é obrigatória" }),
  houseNumber: z.string().min(1, { message: "Número é obrigatório" }),
  zone: z.string().optional(),
});

const baseSignupSchema = signupSchema._def.schema;

export const newUserSchema = baseSignupSchema.superRefine((data, ctx) => {
  if (data.userType === "CITYHALL" && !data.secretary && !data.department) {
    ctx.addIssue({
      path: ["secretary", "department"],
      message:
        "Secretaria e Departamento são obrigatórios quando o tipo de usuário for Prefeitura",
      code: z.ZodIssueCode.custom,
    });
  }
});

export const editAccessSchema = z.object({
  userType: z.enum(["CITIZEN", "CITYHALL", "MANAGER", "CENTRAL"], {
    message: "Tipo de usuário inválido",
  }),
  secretary: z.string().min(1, {
    message: "Secretaria é obrigatória",
  }),
  department: z.string().min(1, {
    message: "Departamento é obrigatório",
  }),
  accessType: z.enum(["READ_ONLY", "DATA_ENTRY", "READ_WRITE", "ADMIN"], {
    message: "Tipo de acesso inválido",
  }),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type NewUserFormData = z.infer<typeof newUserSchema>;
export type EditProfileFormData = z.infer<typeof editProfileSchema>;
export type EditAccessFormData = z.infer<typeof editAccessSchema>;
