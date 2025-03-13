"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StatusBadge } from "@/components/tables/badge-status";

interface Request {
  id: number;
  protocol: string;
  servico: string;
  status: "deferido" | "indeferido" | "em_andamento";
  data: Date;
}

const mockData: Request[] = [
  {
    id: 1,
    protocol: "C123456",
    servico: "Informação sobre IPTU",
    data: new Date("2023-05-01"),
    status: "indeferido",
  },
  {
    id: 2,
    protocol: "C234567",
    servico: "Solicitação de poda de árvore",
    data: new Date("2023-05-02"),
    status: "deferido",
  },
  {
    id: 3,
    protocol: "C345678",
    servico: "Reclamação sobre iluminação pública",
    data: new Date("2023-05-03"),
    status: "em_andamento",
  },
];

export default function Requisicoes() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = mockData.filter(
    (item) =>
      (item.servico.toLowerCase().includes(search.toLowerCase()) ||
        item.protocol.includes(search)) &&
      (statusFilter === "all" || item.status === statusFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Requisições
        </h1>
      </div>
      <div className="flex justify-between space-x-4">
        <Input
          placeholder="Pesquisar por serviço ou protocolo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="deferido">Deferido</SelectItem>
            <SelectItem value="indeferido">Indeferido</SelectItem>
            <SelectItem value="em_andamento">Em Andamento</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Protocolo</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.protocol}</TableCell>
                <TableCell>{item.servico}</TableCell>
                <TableCell>
                  {format(item.data, "PPP", { locale: ptBR })}
                </TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell>
                  <Button asChild variant="link">
                    <Link href={`/portal/central/requisicoes/${item.protocol}`}>
                      Ver detalhes
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
