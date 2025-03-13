"use client";

import { StatusBadge } from "@/components/tables/badge-status";
import { UserWithRequests } from "@/lib/api/users";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<UserWithRequests>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "phone",
    header: "Contato",
  },
  {
    accessorKey: "protocol",
    header: "Protocolo",
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
