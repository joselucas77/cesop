"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
// import { formatDate } from "date-fns";
import { StatusBadge } from "@/components/tables/badge-status";
import { Input } from "@/components/ui/input";
import { getRequest } from "@/lib/api/requests";
import { Requests } from "@prisma/client";
import LoadingAnimation from "@/app/loading";
// import { getUserById } from "@/lib/get-user-by-Id";

export default function DetalhesSolicitacao({
  params,
}: {
  params: Promise<{ protocol: string }>;
}) {
  const { protocol } = use(params);
  const decodeProtocolo = decodeURIComponent(protocol);
  const [request, setRequest] = useState<Requests>();
  // const [user, setUser] = useState<Users>();
  const [status, setStatus] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRequest(decodeProtocolo);
        console.log(data);
        // const userID = data.applicantId.toString();
        // const user = await getUserById(userID);
        console.log(data);
        setRequest(data);
        // setStatus(data.status);
        // setUser(user);
      } catch (error) {
        console.error("Error fetching request:", error);
        toast.error("Erro ao carregar os dados da requisição");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [decodeProtocolo]);

  const handleResponder = () => {
    console.log("Resposta enviada:", { status, mensagem });
    toast.success("Resposta enviada com sucesso!");
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (!request) {
    return <p>Dados não encontrados para o protocolo: {protocol}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Detalhes da Solicitação
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Informações da Solicitação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Protocolo:</strong> {request.protocol}
          </div>
          <div>
            <strong>Serviço:</strong> {request.service}
          </div>
          <div>
            <strong>Data:</strong>{" "}
            {/* {formatDate(request.createdAt, "dd/MM/yyyy") ?? "N/A"} */}
          </div>
          <div>
            <strong>Status:</strong> <StatusBadge status={request.state} />
          </div>
          <div>
            <strong>Departamento:</strong> {request.department}
          </div>
          <div>
            <strong>Descrição:</strong> {request.message}
          </div>
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader>
          <CardTitle>Informações do Cidadão</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Nome:</strong> {user.name}
          </div>
          <div>
            <strong>Email:</strong> {user?.email}
          </div>
          <div>
            <strong>Telefone:</strong> {user.phone}
          </div>
        </CardContent>
      </Card> */}
      <Card>
        <CardHeader>
          <CardTitle>Responder Solicitação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={status}
            onValueChange={(value: string) => setStatus(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="em_andamento">Em andamento</SelectItem>
              <SelectItem value="deferido">Deferido</SelectItem>
              <SelectItem value="indeferido">Indeferido</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Digite uma mensagem para o cidadão"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
          <Input
            id="file"
            type="file"
            value={file}
            onChange={(e) => setFile(e.target.value)}
            className="cursor-pointer"
          />
          <Button onClick={handleResponder}>Enviar Resposta</Button>
        </CardContent>
      </Card>
    </div>
  );
}
