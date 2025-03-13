"use client";

import { StatusBadge } from "@/components/tables/badge-status";
import { Requests } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  format,
  isAfter,
  isBefore,
  isEqual,
  parseISO,
  startOfDay,
  endOfDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";

export const columns: ColumnDef<Requests>[] = [
  {
    accessorKey: "protocol",
    header: "Protocolo",
  },
  {
    accessorKey: "service",
    header: "Serviço",
  },
  {
    accessorKey: "actionArea",
    header: "Área de Ação",
  },
  {
    accessorKey: "secretary",
    header: "Secretaria",
  },
  {
    accessorKey: "street",
    header: "Logradouro",
  },
  {
    accessorKey: "houseNumber",
    header: "Número",
  },
  {
    accessorKey: "district",
    header: "Bairro",
  },
  {
    accessorKey: "zone",
    header: "Zona",
    cell: ({ row }) => {
      const zone = row.getValue("zone") as string;
      return (
        <div
          className={`text-start px-10 ${zone ? "" : "text-muted-foreground"}`}>
          {zone ? zone : <em>Não informado</em>}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data de Solicitação",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      if (!date) return null;
      return format(new Date(date), "dd/MM/yyyy", { locale: ptBR });
    },
    filterFn: (row, columnId, value) => {
      const { startDate, endDate } = value as {
        startDate?: Date;
        endDate?: Date;
      };

      // Se não houver datas definidas, não filtra
      if (!startDate && !endDate) return true;

      // Obtém o valor da célula e converte para Date se for string
      const cellValue = row.getValue(columnId);
      if (!cellValue) return false;

      const cellDate =
        typeof cellValue === "string"
          ? parseISO(cellValue)
          : (cellValue as Date);

      // Filtra por data inicial
      if (startDate && !endDate) {
        return (
          isAfter(cellDate, startOfDay(startDate)) ||
          isEqual(cellDate, startOfDay(startDate))
        );
      }

      // Filtra por data final
      if (!startDate && endDate) {
        return (
          isBefore(cellDate, endOfDay(endDate)) ||
          isEqual(cellDate, endOfDay(endDate))
        );
      }

      // Filtra por intervalo de datas
      return (
        (isAfter(cellDate, startOfDay(startDate!)) ||
          isEqual(cellDate, startOfDay(startDate!))) &&
        (isBefore(cellDate, endOfDay(endDate!)) ||
          isEqual(cellDate, endOfDay(endDate!)))
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <StatusBadge status={status} />;
    },
  },
];
