"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/tables/badge-status";
import { RequestDataForSupport } from "@/types/requests";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

async function getRequestData(
  protocol: string
): Promise<RequestDataForSupport | null> {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockData: RequestDataForSupport[] = [
    {
      protocol,
      servico: "Informação sobre IPTU",
      data: new Date("2023-05-01"),
      status: "em_andamento",
      cidadao: {
        nome: "Maria Santos",
        email: "maria.santos@example.com",
        telefone: "(11) 98765-4321",
      },
      descricao: "Preciso de informações sobre como parcelar o IPTU deste ano.",
    },
  ];

  const request = mockData.find((req) => req.protocol === protocol);
  return request || null;
}

export default function RequestProtocol({ protocol }: { protocol: string }) {
  const [request, setRequest] = useState<RequestDataForSupport | null>(null);
  const [loading, setLoading] = useState(true);
  const [departamento, setDepartamento] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [file, setFile] = useState("");
  const today = format(new Date(), "Pp", { locale: ptBR });
  const msg = `Enviado ${today}`;

  useEffect(() => {
    async function fetchData() {
      const data = await getRequestData(protocol);
      setRequest(data);
      setLoading(false);
    }
    fetchData();
  }, [protocol]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Status Atualizado!", {
      description: msg,
      action: {
        label: "Fechar",
        onClick: () => console.log("Fechar"),
      },
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (!request) {
    return <p>Dados não encontrados para o protocolo: {protocol}</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações da Requisição</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Protocolo:</strong> {protocol}
          </div>
          <div>
            <strong>Serviço:</strong> {request.servico}
          </div>
          <div>
            <strong>Data:</strong>{" "}
            {format(request.data, "PPP", { locale: ptBR })}
          </div>
          <div>
            <strong>Status:</strong> <StatusBadge status={request.status} />
          </div>
          <div>
            <strong>Descrição:</strong> {request.descricao}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Informações do Cidadão</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Nome:</strong> {request.cidadao.nome}
          </div>
          <div>
            <strong>Email:</strong> {request.cidadao.email}
          </div>
          <div>
            <strong>Telefone:</strong> {request.cidadao.telefone}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Encaminhar Requisição</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select value={departamento} onValueChange={setDepartamento}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="financas">Finanças</SelectItem>
                <SelectItem value="obras">Obras</SelectItem>
                <SelectItem value="saude">Saúde</SelectItem>
                <SelectItem value="educacao">Educação</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Observações para o departamento"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
            <Input
              id="file"
              type="file"
              value={file}
              onChange={(e) => setFile(e.target.value)}
              className="cursor-pointer"
            />
            <Button type="submit">Encaminhar Requisição</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
