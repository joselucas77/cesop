"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchAddressByCep } from "@/services/viaCep";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { StateOption } from "@/types/IBGE";
import { signupSchema, SignupFormData } from "@/schemas/signupSchema";
import {
  normalizeCpfNumber,
  normalizePhoneNumber,
  normalizeCepNumber,
} from "@/utils/format";
import { fetchStateData } from "@/services/ibge";
import { AccessType, Sex, UserType } from "@/types/prisma";
import { PasswordStrengthIndicator } from "./password-form";

export function SignupForm() {
  const router = useRouter();
  const [states, setStates] = useState<StateOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      birthdate: "",
      sex: "" as Sex,
      electoralCard: "",
      cpf: "",
      rg: "",
      cadSus: "",
      nis: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      postalCode: "",
      state: "",
      city: "",
      district: "",
      street: "",
      houseNumber: "",
      zone: "",
      complement: "",
      userType: "CITIZEN" as UserType,
      accessType: "READ_WRITE" as AccessType,
    },
  });

  const phoneValue = form.watch("phone");
  const cpfValue = form.watch("cpf");
  const password = form.watch("password");
  const cepValue = form.watch("postalCode");

  const handleFetchAddress = async (cep: string) => {
    const addressData = await fetchAddressByCep(cep);
    if (addressData) {
      form.setValue("street", addressData.logradouro || "");
      form.setValue("district", addressData.bairro || "");
      form.setValue("city", addressData.localidade || "");
      form.setValue("state", addressData.estado || "");
      form.setValue("zone", addressData.zona || "");
    }
  };

  useEffect(() => {
    async function loadStates() {
      const stateOptions = await fetchStateData();
      setStates(stateOptions);
    }
    loadStates();
  }, []);

  useEffect(() => {
    form.setValue("postalCode", normalizeCepNumber(cepValue));
  }, [cepValue, form]);

  useEffect(() => {
    form.setValue("phone", normalizePhoneNumber(phoneValue));
  }, [phoneValue, form]);

  useEffect(() => {
    form.setValue("cpf", normalizeCpfNumber(cpfValue));
  }, [cpfValue, form]);

  const onSubmit = async (data: SignupFormData) => {
    setError("");
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...dataToSend } = data;

    const requestData = {
      ...dataToSend,
      rg: data.rg === "" ? null : data.rg,
      nis: data.nis === "" ? null : data.nis,
      cadSus: data.cadSus === "" ? null : data.cadSus,
      email: data.email === "" ? null : data.email,
      postalCode: data.postalCode === "" ? null : data.postalCode,
      zone: data.zone === "" ? null : data.zone,
      complement: data.complement === "" ? null : data.complement,
      secretary: data.secretary === "" ? null : data.secretary,
      department: data.department === "" ? null : data.department,
    };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.success) {
          toast.success(responseData.message);
          router.push("/login/cidadao");
        } else {
          toast.error(responseData.message);
        }
      } else {
        const data = await response.json();
        setError(data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro:", error);
      setError("Erro ao cadastrar: " + (error.message || "Erro desconhecido"));
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ScrollArea className="w-full h-[25rem] pr-4">
          <div className="flex items-center justify-center">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Dados Pessoais
            </h4>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6 my-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo *</FormLabel>
                  <FormControl>
                    <Input id="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="birthdate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento *</FormLabel>
                  <FormControl>
                    <Input
                      id="birthdate"
                      type="date"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6 my-2">
            <FormField
              name="sex"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione aqui" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MASCULINO">Masculino</SelectItem>
                        <SelectItem value="FEMININO">Feminino</SelectItem>
                        <SelectItem value="OUTRO">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="electoralCard"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo de leitor *</FormLabel>
                  <FormControl>
                    <Input id="electoralCard" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6 mb-2">
            <FormField
              name="cpf"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF *</FormLabel>
                  <FormControl>
                    <Input id="cpf" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="rg"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RG</FormLabel>
                  <FormControl>
                    <Input id="rg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6 mb-2">
            <FormField
              name="nis"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIS/PIS/PASEP</FormLabel>
                  <FormControl>
                    <Input id="nis" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="cadSus"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CadSus</FormLabel>
                  <FormControl>
                    <Input id="cadSus" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6 mb-2">
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone *</FormLabel>
                  <FormControl>
                    <Input id="phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-center py-4">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Endereço
            </h4>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6 mb-2">
            <FormField
              name="postalCode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP *</FormLabel>
                  <FormControl>
                    <Input
                      id="postalCode"
                      className="block flex-1 min-w-0 w-full"
                      {...field}
                      onBlur={(e) => handleFetchAddress(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="street"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lagradouro *</FormLabel>
                  <FormControl>
                    <Input id="street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6 mb-2">
            <FormField
              name="houseNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número *</FormLabel>
                  <FormControl>
                    <Input id="houseNumber" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="district"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro *</FormLabel>
                  <FormControl>
                    <Input id="district" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6 mb-2">
            <FormField
              name="zone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zona</FormLabel>
                  <FormControl>
                    <Input id="zone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="complement"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input id="complement" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6 mb-2">
            <FormField
              name="state"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione aqui" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state, index) => (
                          <SelectItem key={index} value={state.label}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col justify-center items-center py-4">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Seu Acesso
            </h4>
          </div>

          <div className="space-y-2 mb-2">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha *</FormLabel>
                  <FormControl>
                    <Input id="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PasswordStrengthIndicator password={password} />

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha *</FormLabel>
                  <FormControl>
                    <Input id="confirmPassword" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Aguarde
            </>
          ) : (
            "Criar Conta"
          )}
        </Button>
      </form>
    </Form>
  );
}
