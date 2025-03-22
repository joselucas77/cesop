"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EditProfileFormData, editProfileSchema } from "@/schemas/signupSchema";
import { StateOption } from "@/types/IBGE";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { fetchAddressByCep } from "@/services/viaCep";
import { Loader2, Pencil } from "lucide-react";
import { Users } from "@prisma/client";
import { fetchStateData } from "@/services/ibge";
import { normalizeCepNumber, normalizePhoneNumber } from "@/utils/format";

export function EditProfile({ userData }: { userData: Users }) {
  const [states, setStates] = useState<StateOption[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    mode: "onChange",
    defaultValues: {
      phone: userData.phone || "",
      email: userData.email || "",
      postalCode: userData.postalCode || "",
      state: userData.state || "",
      city: userData.city || "",
      district: userData.district || "",
      street: userData.street || "",
      houseNumber: userData.houseNumber || "",
      zone: userData.zone || "",
    },
  });

  useEffect(() => {
    reset({
      phone: userData.phone || "",
      email: userData.email || "",
      postalCode: userData.postalCode || "",
      state: userData.state || "",
      city: userData.city || "",
      district: userData.district || "",
      street: userData.street || "",
      houseNumber: userData.houseNumber || "",
      zone: userData.zone || "",
    });
  }, [userData, reset]);

  const phoneValue = watch("phone");
  const cepValue = watch("postalCode");

  const handleFetchAddress = async (cep: string) => {
    const addressData = await fetchAddressByCep(cep);
    if (addressData) {
      setValue("street", addressData.logradouro || "");
      setValue("district", addressData.bairro || "");
      setValue("city", addressData.localidade || "");
      setValue("state", addressData.estado || "");
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
    setValue("postalCode", normalizeCepNumber(cepValue));
  }, [cepValue, setValue]);

  useEffect(() => {
    setValue("phone", normalizePhoneNumber(phoneValue));
  }, [phoneValue, setValue]);

  const onSubmit = async (data: EditProfileFormData) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/users/${userData.id.toString()}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        if (responseData.success) {
          setIsEditing(false);
          toast.success("Perfil atualizado com sucesso!", {
            duration: 50000,
            action: {
              label: "Atualizar",
              onClick: () => {
                window.location.reload();
              },
            },
          });
        } else {
          setError(responseData.error || "Erro ao atualizar perfil 1");
        }
      } else {
        setError(responseData.message || "Erro ao atualizar perfil 2");
      }
    } catch (error) {
      setError("Erro ao atualizar usuário");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isEditing} onOpenChange={setIsEditing}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}>
          {!isEditing && <Pencil className="w-4 h-4 mr-2" />}
          {isEditing ? "Cancelar" : "Editar "}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>Editar Perfil</SheetTitle>
          <SheetDescription>
            Preencha todos os dados aqui. Clique em salvar quando terminar.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <ScrollArea className="w-full h-[38rem] sm:h-[30rem] pr-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="phone"
                      placeholder="(DD) 00000-0000"
                      {...field}
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemplo@email.com"
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">CEP</Label>
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="postalCode"
                      placeholder="00000-000"
                      className="block flex-1 min-w-0 w-full"
                      {...field}
                      onBlur={(e) => handleFetchAddress(e.target.value)}
                    />
                  )}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 mb-2">
                <Label htmlFor="street">Endereço</Label>
                <Controller
                  name="street"
                  control={control}
                  render={({ field }) => (
                    <Input id="street" placeholder="Rua A" {...field} />
                  )}
                />
                {errors.street && (
                  <p className="text-red-500 text-sm">
                    {errors.street.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 mb-2">
                <Label htmlFor="houseNumber">Casa</Label>
                <Controller
                  name="houseNumber"
                  control={control}
                  render={({ field }) => (
                    <Input id="houseNumber" placeholder="100" {...field} />
                  )}
                />
                {errors.houseNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.houseNumber.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 mb-2">
                <Label htmlFor="district">Bairro</Label>
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <Input id="district" placeholder="Bairro A" {...field} />
                  )}
                />
                {errors.district && (
                  <p className="text-red-500 text-sm">
                    {errors.district.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 mb-2">
                <Label htmlFor="zone">Zona</Label>
                <Controller
                  name="zone"
                  control={control}
                  render={({ field }) => (
                    <Input id="zone" placeholder="Sul" {...field} />
                  )}
                />
                {errors.zone && (
                  <p className="text-red-500 text-sm">{errors.zone.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="uf">Estado</Label>
                <Controller
                  name="state"
                  control={control}
                  defaultValue={userData.state}
                  render={({ field: { onChange, value } }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione aqui">
                          {value || "Selecione aqui"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input id="city" placeholder="Cidade A" {...field} />
                  )}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
            </div>
          </ScrollArea>
          <div className="space-y-2">
            <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Carregando
              </>
            ) : (
              "Salvar"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
