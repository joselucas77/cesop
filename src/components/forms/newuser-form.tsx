"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type NewUserFormData, signupSchema } from "@/schemas/signupSchema";
import type { StateOption } from "@/types/IBGE";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchAddressByCep } from "@/services/viaCep";
import {
  normalizeCepNumber,
  normalizePhoneNumber,
  normalizeCpfNumber,
  clearCPF,
} from "@/utils/format";
import { fetchStateData } from "@/services/ibge";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Departments, Secretary } from "@prisma/client";
import { AccessType, Sex, UserType } from "@/types/prisma";

export function AddNewUser() {
  const [states, setStates] = useState<StateOption[]>([]);
  const [secretaries, setSecretaries] = useState<Secretary[]>([]);
  const [departments, setDepartments] = useState<Departments[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const form = useForm<NewUserFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      birthdate: "",
      sex: "" as Sex,
      cpf: "",
      rg: "",
      cadSus: "",
      electoralCard: "",
      nis: "",
      phone: "",
      email: "",
      postalCode: "",
      state: "",
      city: "",
      district: "",
      street: "",
      houseNumber: "",
      zone: "",
      complement: "",
      userType: "" as UserType,
      accessType: "" as AccessType,
      secretary: "",
      department: "",
      password: "@seuCPF25",
      confirmPassword: "@seuCPF25",
    },
  });

  const phoneValue = form.watch("phone");
  const cpfValue = form.watch("cpf");
  const userTypeValue = form.watch("userType");
  const cepValue = form.watch("postalCode");
  const secretaryValue = form.watch("secretary");

  const handleFetchAddress = async (cep: string) => {
    const addressData = await fetchAddressByCep(cep);
    if (addressData) {
      form.setValue("street", addressData.logradouro || "");
      form.setValue("district", addressData.bairro || "");
      form.setValue("city", addressData.localidade || "");
      form.setValue("state", addressData.estado || "");
    }
  };

  useEffect(() => {
    const fetchSecretaries = async () => {
      try {
        const response = await fetch("/api/secretaries");
        const secretariesData = await response.json();
        setSecretaries(secretariesData);
      } catch (error) {
        console.error("Error fetching secretaries:", error);
      }
    };
    fetchSecretaries();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      if (secretaryValue) {
        try {
          const selectedSecretary = secretaries.find(
            (s) => s.name === secretaryValue
          );
          if (selectedSecretary) {
            const response = await fetch(
              `/api/departments/${selectedSecretary.id}`
            );
            const departmentsData = await response.json();
            setDepartments(departmentsData);
          }
        } catch (error) {
          console.error("Error fetching departments:", error);
        }
      } else {
        setDepartments([]);
      }
    };
    fetchDepartments();
  }, [secretaryValue, secretaries]);

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

  const onSubmit = async (data: NewUserFormData) => {
    setError("");
    setLoading(true);
    data.password = clearCPF(cpfValue);

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
          setOpen(false);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error(responseData.message);
        }
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError("Erro ao criar usuário " + error);
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Adicionar Usuário</Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>Cadastrar Usuário</SheetTitle>
          <SheetDescription>
            Preencha todos os dados aqui. Clique em salvar quando terminar.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-5 py-4">
            <ScrollArea className="w-full h-[38rem] sm:h-[30rem] pr-4">
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Dados Pessoais
                  </h4>
                </div>

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

                <div className="flex items-center justify-center py-4">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Endereço
                  </h4>
                </div>

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
                <FormField
                  name="houseNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número da Residência *</FormLabel>
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

                <div className="flex items-center justify-center">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Tipo da Conta
                  </h4>
                </div>

                <FormField
                  name="userType"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Usuário *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione aqui" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CITIZEN">Cidadão</SelectItem>
                            <SelectItem value="CITYHALL">Prefeitura</SelectItem>
                            <SelectItem value="CENTRAL">Central</SelectItem>
                            <SelectItem value="MANAGER">Gestor</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {userTypeValue === "CITYHALL" && (
                  <div className="space-y-2">
                    <FormField
                      name="secretary"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Secretaria *</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                form.setValue("department", "");
                              }}
                              value={field.value || ""}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione aqui" />
                              </SelectTrigger>
                              <SelectContent>
                                {secretaries.map((secretary) => (
                                  <SelectItem
                                    value={secretary.name}
                                    key={secretary.id}>
                                    {secretary.name}
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
                      name="department"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Departamento *</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || ""}
                              disabled={!secretaryValue}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione aqui" />
                              </SelectTrigger>
                              <SelectContent>
                                {departments.map((department) => (
                                  <SelectItem
                                    value={department.name}
                                    key={department.id}>
                                    {department.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                <FormField
                  name="accessType"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Acesso *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione aqui" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="READ_ONLY">
                              Visualizador
                            </SelectItem>
                            <SelectItem value="DATA_ENTRY">
                              Operador de Dados
                            </SelectItem>
                            <SelectItem value="READ_WRITE">
                              Edição e Consulta
                            </SelectItem>
                            <SelectItem value="ADMIN">
                              Controle Total
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            {form.formState.errors &&
              Object.keys(form.formState.errors).length > 0 && (
                <div className="text-red-500 text-sm">
                  Por favor, corrija os erros no formulário antes de enviar.
                  {Object.keys(form.formState.errors)}
                </div>
              )}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Aguarde
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </form>
        </Form>
        <SheetFooter>
          <SheetDescription>
            A senha deste usuário será seu próprio CPF (apenas números)
          </SheetDescription>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
