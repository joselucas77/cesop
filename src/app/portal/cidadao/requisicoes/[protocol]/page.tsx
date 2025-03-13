"use client";

import { use, useEffect, useState } from "react";
import { formatDate } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { StatusBadge } from "@/components/tables/badge-status";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { getRequest } from "@/lib/api/requests";
import { Requests } from "@prisma/client";
import LoadingAnimation from "@/app/loading";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// const Commentes = [
//   {
//     date: new Date("2024-05-20"),
//     author: "João Técnico",
//     content: "Inspeção inicial realizada. Aguardando aprovação do orçamento.",
//   },
//   {
//     date: new Date("2024-06-01"),
//     author: "Ana Fiscal",
//     content: "Orçamento aprovado. Início das obras previsto para 15/06/2024.",
//   },
// ] as const;

export default function RequestDetailsPage({
  params,
}: {
  params: Promise<{ protocol: string }>;
}) {
  const { protocol } = use(params);
  const decodedProtocolo = decodeURIComponent(protocol);
  const [request, setRequest] = useState<Requests>();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRequest(decodedProtocolo);
        setRequest(data);
      } catch (error) {
        console.error("Error fetching request:", error);
        toast.error("Erro ao carregar os dados da requisição");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [decodedProtocolo, loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", { message, file });
    toast.success("Mensagem enviada com sucesso!");
    setMessage("");
    setFile(null);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (!request) {
    return <p>Dados não encontrados para o protocolo: {protocol}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center mt-12 lg:mt-0">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Detalhes da Requisição
        </h1>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{request.service}</CardTitle>
                <CardDescription>Protocolo: {request.protocol}</CardDescription>
              </div>
              <StatusBadge status={request.status} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
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
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Prioridade:</span>
                  <span>Média</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Departamento:</span>
                  <span>{request.department}</span>
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

        {/* <Card>
          <CardHeader>
            <CardTitle>Linha do Tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
              {Commentes.map((comment, index) => (
                <li key={index} className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <Avatar className="w-9 h-9">
                      <AvatarFallback>
                        {comment.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </span>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                    <div className="items-center justify-between mb-3 sm:flex">
                      <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                        {formatDate(comment.date, "dd/MM/yyyy") ?? "N/A"}
                      </time>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                        {comment.author}
                      </div>
                    </div>
                    <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                      {comment.content}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card> */}

        <Card>
          <CardHeader>
            <CardTitle>Enviar Mensagem</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-400 mb-1">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem aqui"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-400 mb-1">
                  Anexar Arquivo
                </label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </div>
              <Button type="submit">Enviar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
