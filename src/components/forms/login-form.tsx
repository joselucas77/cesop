"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { normalizeCpfNumber } from "@/utils/format";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCitizen, setIsCitizen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: "",
      password: "",
    },
  });

  const cpfValue = form.watch("cpf");

  useEffect(() => {
    if (pathname === "/login/cidadao") {
      setIsCitizen(true);
    } else {
      setIsCitizen(false);
    }
  }, [pathname]);

  useEffect(() => {
    form.setValue("cpf", normalizeCpfNumber(cpfValue));
  }, [cpfValue, form]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data: LoginFormData) => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.success) {
          const userRole = responseData?.role;

          if (isCitizen) {
            if (userRole) {
              return router.push("/portal/cidadao");
            } else {
              setError("Usuário não identificado");
            }
          } else {
            switch (userRole) {
              case "CITYHALL":
                return router.push("/portal/prefeitura");
              case "CENTRAL":
                return router.push("/portal/central");
              case "MANAGER":
                return router.push("/portal/gestor");
              default:
                setError("Usuário não identificado");
            }
          }
        } else {
          setError(responseData.message);
        }
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input placeholder="000.000.000-00" maxLength={14} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Aguarde
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
