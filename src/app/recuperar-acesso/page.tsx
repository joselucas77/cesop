"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  recoverAccessSchema,
  RecoverAccessFormData,
} from "@/schemas/recoverAccessSchema";
import { normalizeCpfNumber } from "@/utils/format";

export default function RecoverAccessPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<RecoverAccessFormData>({
    resolver: zodResolver(recoverAccessSchema),
    defaultValues: {
      cpf: "",
      email: "",
    },
  });

  const cpfValue = form.watch("cpf");

  useEffect(() => {
    form.setValue("cpf", normalizeCpfNumber(cpfValue));
  }, [cpfValue, form]);

  async function onSubmit(data: RecoverAccessFormData) {
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Email enviado com sucesso!");
      } else {
        toast.success("Erro ao enviar email");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      form.reset();
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-2xl">
          <CardTitle>Recuperar Acesso</CardTitle>
          <CardDescription>
            Preencha o formulário abaixo para recuperar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="000.000.000-00"
                        maxLength={14}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite seu email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Aguarde
                  </>
                ) : (
                  "Enviar"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center flex flex-col">
            <Button variant="link" onClick={() => window.history.back()}>
              Voltar para o login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
