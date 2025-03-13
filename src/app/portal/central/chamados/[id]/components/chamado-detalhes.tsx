"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/tables/badge-status";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Chamados {
  id: string;
  solicitante: string;
  setor: string;
  status: string;
  descricao: string;
  dataCriacao: Date;
  ultimaAtualizacao: Date;
}

async function getChamadoData(id: string): Promise<Chamados | null> {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const chamadoData: Chamados[] = [
    {
      id,
      solicitante: "João Silva",
      setor: "Secretaria da Saúde",
      status: "novo",
      descricao: "Solicitação de manutenção no posto de saúde central.",
      dataCriacao: new Date("2023-05-01"),
      ultimaAtualizacao: new Date("2023-05-01"),
    },
  ];

  const chamado = chamadoData.find((req) => req.id === id);
  return chamado || null;
}

export default function ChamadoDetails({ id }: { id: string }) {
  const [chamado, setChamado] = useState<Chamados | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setSatus] = useState("");
  const [response, setResponse] = useState("");
  const today = format(new Date(), "Pp", { locale: ptBR });
  const msg = `Enviado ${today}`;

  useEffect(() => {
    async function fetchData() {
      const data = await getChamadoData(id);
      setChamado(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Status Atualizado!", {
      description: msg,
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (!chamado) {
    return <p>Dados não encontrados para o ID: {id}</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações do Chamado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <strong>ID:</strong> {id}
            </div>
            <div>
              <strong>Solicitante:</strong> {chamado.solicitante}
            </div>
            <div>
              <strong>Setor:</strong> {chamado.setor}
            </div>
            <div>
              <strong>Status:</strong> <StatusBadge status={chamado.status} />
            </div>
            <div>
              <strong>Descrição:</strong> {chamado.descricao}
            </div>
            <div>
              <strong>Data de Criação:</strong>{" "}
              {format(chamado.dataCriacao, "PPP", { locale: ptBR })}
            </div>
            <div>
              <strong>Última Atualização:</strong>{" "}
              {format(chamado.ultimaAtualizacao, "PPP", { locale: ptBR })}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Atualizar Chamado</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700">
                Novo Status
              </label>
              <Select value={status} onValueChange={setSatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o novo status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deferido">Deferido</SelectItem>
                  <SelectItem value="em_andamento">Em andamento</SelectItem>
                  <SelectItem value="indeferido">Indeferido</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="mensagem"
                className="block text-sm font-medium text-gray-700">
                Mensagem
              </label>
              <Textarea
                id="mensagem"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Digite uma mensagem de atualização..."
                rows={4}
              />
            </div>
            <Button type="submit">Atualizar Chamado</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
