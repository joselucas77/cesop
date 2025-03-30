"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { StatusBadge } from "@/components/tables/badge-status";
import { Input } from "@/components/ui/input";
import { getRequest } from "@/lib/api/requests";
import { Requests, Users } from "@prisma/client";
import LoadingAnimation from "@/app/loading";
import { CalendarIcon, Loader2, MapPinIcon } from "lucide-react";
import { formatDate } from "date-fns";
import { Separator } from "@radix-ui/react-separator";
import { HoverCardUserDetails } from "@/components/profile/hover-card-user-details";
import { getUserById } from "@/lib/api/users";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  RequestResponseFormData,
  requestResponseSchema,
} from "@/schemas/request";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/auth-context";

export default function DetalhesSolicitacao({
  params,
}: {
  params: Promise<{ protocol: string }>;
}) {
  const { protocol } = use(params);
  const decodeProtocolo = decodeURIComponent(protocol);
  const { userId, userData } = useAuth();
  const [request, setRequest] = useState<Requests>();
  const [user, setUser] = useState<Users>();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const form = useForm<RequestResponseFormData>({
    resolver: zodResolver(requestResponseSchema),
    defaultValues: {
      status: status || "",
      message: "",
      file: "",
    },
  });

  useEffect(() => {
    form.reset({
      status: status || "",
    });
  }, [status, form]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRequest(decodeProtocolo);
        const userID = data.applicantId.toString();
        const user = await getUserById(userID);
        if (!user) {
          throw new Error("User not found");
        }
        setRequest(data);
        setStatus(data.status);
        setUser(user);
      } catch (error) {
        console.error("Error fetching request:", error);
        toast.error("Erro ao carregar os dados da requisição");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [decodeProtocolo]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("userId", userId);
        console.log("user", userData);
      } catch (error) {
        console.error("Erro ao buscar as requisições:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId, userData]);

  const onSubmit = async (data: RequestResponseFormData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          responsible: userData?.name,
          department: request?.department,
          secretary: request?.secretary,
          protocol: decodeProtocolo,
          status: data.status,
          message: data.message,
          file: data.file,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar a resposta");
      }

      const result = await response.json();
      if (result.success) {
        toast.success("Resposta enviada com sucesso!");
      } else {
        toast.error(result.message || "Erro ao enviar a resposta");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Erro ao enviar a resposta");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (!request) {
    return <p>Dados não encontrados para o protocolo: {protocol}</p>;
  }

  if (!user) {
    return <p>Usuário não encontrado.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Detalhes da Solicitação
        </h1>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{request.service}</CardTitle>
                <CardDescription>Protocolo: {request.protocol}</CardDescription>
                <CardDescription>
                  Departamento: {request.department}
                </CardDescription>
              </div>
              <StatusBadge status={request.status} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <HoverCardUserDetails user={user} />
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <span>
                    Solicitado em:{" "}
                    {formatDate(request.createdAt, "dd/MM/yyyy") ?? "N/A"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {request.street}, {request.houseNumber} - {request.district}
                  </span>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div>
              <h3 className="font-semibold mb-2">Descrição</h3>
              <p>{request.message}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enviar Mensagem</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4">
                <FormField
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormLabel className="sr-only">Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IN_PROGRESS">
                              Em andamento
                            </SelectItem>
                            <SelectItem value="APPROVED">Deferido</SelectItem>
                            <SelectItem value="REJECTED">Indeferido</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="message"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="my-2">
                      <FormLabel>Motivo da Resposta</FormLabel>
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
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
