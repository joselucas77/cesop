"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Lock, LogOut, Loader2, Headset } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdatePasswordFormData,
  updatePasswordSchema,
} from "@/schemas/updatePasswordSchema";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { PasswordStrengthIndicator } from "@/components/forms/password-form";

export function ProfileActions({ userDataId }: { userDataId: number }) {
  const phoneNumber = "+557998705277";
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const password = watch("newPassword");

  const onSubmit = async (data: UpdatePasswordFormData) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/users/${userDataId}`, {
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
          toast.success("Senha Alterada!", {
            duration: 50000,
            action: {
              label: "Atualizar",
              onClick: () => {
                window.location.reload();
              },
            },
          });
        } else {
          const errorMsg =
            typeof responseData.message === "string"
              ? responseData.message
              : "Erro ao alterar senha 1";
          toast.error(errorMsg);
          setError(errorMsg);
        }
      } else {
        const errorMsg =
          typeof responseData.message === "string"
            ? responseData.message
            : "Erro ao alterar senha 2";
        toast.error(errorMsg);
        setError(errorMsg);
      }
    } catch (error) {
      console.error("Erro completo:", error);
      const errorMsg = "Erro ao alterar senha. Tente novamente mais tarde.";
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações do Perfil</CardTitle>
        <CardDescription>
          Gerencie suas configurações e preferências
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <Lock className="w-4 h-4 mr-2" />
              Alterar Senha
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">Alterar Senha</DialogTitle>
              <DialogDescription>
                Altere sua senha para manter sua conta segura
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="oldPassword">Senha Atual</Label>
                <Controller
                  name="oldPassword"
                  control={control}
                  render={({ field }) => <Input id="oldPassword" {...field} />}
                />
                {errors.oldPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => <Input id="newPassword" {...field} />}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.newPassword.message}
                  </p>
                )}
                <PasswordStrengthIndicator password={password} />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2" />
                    <span>Carregando</span>
                  </>
                ) : (
                  "Salvar"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Headset className="w-4 h-4 mr-2" />
            <span>Central de Atendimento</span>
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full justify-start">
              <LogOut className="w-4 h-4 mr-2" />
              Sair da Conta
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação irá desconectar você da sua conta. Você precisará
                fazer login novamente para acessar seus dados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link href="/api/logout">Sair</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
