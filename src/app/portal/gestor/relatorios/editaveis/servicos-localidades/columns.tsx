"use client";

import { StatusBadge } from "@/components/tables/badge-status";
import { Requests } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Requests>[] = [
  {
    accessorKey: "protocol",
    header: "Protocolo",
  },
  {
    accessorKey: "street",
    header: "Lagradouro",
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
    accessorKey: "service",
    header: "Serviço",
  },
  {
    accessorKey: "secretary",
    header: "Secretaria",
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
