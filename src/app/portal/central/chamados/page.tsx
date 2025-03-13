"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StatusBadge } from "@/components/tables/badge-status";

interface Chamados {
  id: number;
  solicitante: string;
  setor: string;
  status: "novo" | "deferido" | "indeferido" | "em_andamento";
  data: Date;
}

// Dados de exemplo (substitua por uma chamada de API real)
const chamadosData: Chamados[] = [
  {
    id: 1,
    solicitante: "João Silva",
    setor: "Secretaria da Saúde",
    status: "novo",
    data: new Date("2023-05-01"),
  },
  {
    id: 2,
    solicitante: "Maria Santos",
    setor: "Secretaria da Educação",
    status: "em_andamento",
    data: new Date("2023-05-03"),
  },
  {
    id: 3,
    solicitante: "Pedro Oliveira",
    setor: "Secretaria de Obras",
    status: "deferido",
    data: new Date("2023-05-02"),
  },
] as const;

export default function ChamadosPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = chamadosData.filter(
    (item) =>
      (item.solicitante.toLowerCase().includes(search.toLowerCase()) ||
        item.setor.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "all" || item.status === statusFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Chamados
        </h1>
      </div>
      <div className="flex justify-between space-x-4">
        <Input
          type="search"
          value={search}
          placeholder="Pesquisar chamados..."
          className="max-w-sm"
          onChange={(e) => setSearch(e.target.value)}
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
              <TableHead>Solicitante</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((chamado) => (
              <TableRow key={chamado.id}>
                <TableCell>{chamado.solicitante}</TableCell>
                <TableCell>{chamado.setor}</TableCell>
                <TableCell>
                  {format(chamado.data, "PPP", { locale: ptBR })}
                </TableCell>
                <TableCell>
                  <StatusBadge status={chamado.status} />
                </TableCell>
                <TableCell>
                  <Link
                    href={`/portal/central/chamados/${chamado.id}`}
                    className="text-blue-600 hover:underline">
                    Ver detalhes
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
