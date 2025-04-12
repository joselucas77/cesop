"use client";

import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { requestSchema, RequestFormData } from "@/schemas/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fetchAddressByCep } from "@/services/viaCep";
import { normalizeCepNumber } from "@/utils/format";
import { StateOption } from "@/types/IBGE";
import { verifySession } from "@/lib/auth";
import { getUserById } from "@/lib/api/users";
import { Services, Users } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { fetchStateData } from "@/services/ibge";
import { SetService } from "@/components/forms/inputs/popover-service";

export default function NovaRquesicao() {
  const router = useRouter();
  const [userData, setUserData] = useState<Users>({} as Users);
  const [selectedService, setSelectedService] = useState<Services | null>(null);
  const [states, setStates] = useState<StateOption[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isNewAddress, setIsNewAddress] = useState(false);
  const form = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      service: "",
      postalCode: "",
      state: "",
      city: "",
      street: "",
      houseNumber: "",
      district: "",
      zone: "",
      complement: "",
      message: "",
      file: "",
      status: "PENDING",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { userId } = await verifySession();
      const user = await getUserById(userId);
      setUserData(user);
    };
    fetchUser();
  }, []);

  const cepValue = form.watch("postalCode");

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
    if (!isNewAddress) {
      form.setValue("postalCode", userData.postalCode || "");
      form.setValue("state", userData.state || "");
      form.setValue("city", userData.city || "");
      form.setValue("street", userData.street || "");
      form.setValue("houseNumber", userData.houseNumber || "");
      form.setValue("district", userData.district || "");
    }
  }, [userData, form, isNewAddress]);

  useEffect(() => {
    if (selectedService) {
      form.setValue("service", selectedService.name);
    }
  }, [selectedService, form]);

  const onSubmit = async (data: RequestFormData) => {
    if (!selectedService) {
      toast.error("Por favor, selecione um serviço");
      return;
    }

    setIsPending(true);

    const requestData = {
      applicantId: userData.id,
      ...data,
      service: selectedService.name,
    };

    try {
      const response = await fetch("/api/requests", {
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
          router.push("/portal/cidadao/requisicoes");
        } else {
          toast.error(responseData.message);
        }
      } else {
        const errorData = await response.json();
        setError(
          typeof errorData.message === "string"
            ? errorData.message
            : "Erro ao processar a requisição"
        );
      }
    } catch (error) {
      console.error("Erro:", error);
      setError("Erro ao enviar formulário");
      toast.error("Erro ao enviar formulário");
    } finally {
      setIsPending(false);
      form.reset();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Nova Solicitação
        </h1>
      </div>
      <div className="max-w-screen-md mx-auto w-full py-4 inner-shadow shadow-gray-50 rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea
              className={`w-full ${
                isNewAddress ? "h-[29rem] pr-4" : "h-full space-y-2"
              }`}>
              <div className="flex flex-col md:flex-row md:gap-6 mb-2 justify-between">
                <div className="w-full space-y-2 pb-4">
                  <SetService
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                  />
                  {form.formState.errors.service && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.service.message}
                    </p>
                  )}
                </div>
                <div className="w-full space-y-2 pb-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Switch
                      id="airplane-mode"
                      checked={isNewAddress}
                      onCheckedChange={() => setIsNewAddress(!isNewAddress)}
                    />
                    <Label htmlFor="airplane-mode">Novo endereço</Label>
                  </div>
                </div>
              </div>
              {isNewAddress && (
                <div className="pb-4">
                  <div className="grid md:grid-cols-2 md:gap-6 mb-2">
                    <FormField
                      name="postalCode"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <Input
                              id="postalCode"
                              placeholder="00000-000"
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
                          <FormLabel>Lagradouro(Rua)</FormLabel>
                          <FormControl>
                            <Input
                              id="street"
                              placeholder="Lagradouro"
                              {...field}
                            />
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
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input
                              id="houseNumber"
                              placeholder="Número da casa"
                              {...field}
                            />
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
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input
                              id="district"
                              placeholder="Seu bairro"
                              {...field}
                            />
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
                          <FormLabel>Estado</FormLabel>
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
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input placeholder="Sua cidade" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              <FormField
                name="message"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel>
                      Escreva os detalhes ou informações adicionais aqui.
                    </FormLabel>
                    <FormControl>
                      <Textarea id="message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="file"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="my-4">
                    <FormLabel>Arquivo</FormLabel>
                    <FormControl>
                      <Input
                        id="file"
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        multiple={false}
                        disabled
                        {...field}
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ScrollArea>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Aguarde
                </>
              ) : (
                "Enviar"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
