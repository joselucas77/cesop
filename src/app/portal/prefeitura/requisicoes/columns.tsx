"use client";

import { StatusBadge } from "@/components/tables/badge-status";
import { Button } from "@/components/ui/button";
import { Requests } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";

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
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Última atualização
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("updatedAt");
      return (
        <div className="text-start px-10">
          {formatDate(date as Date, "dd/MM/yyyy") ?? "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div>
          <StatusBadge status={status as string} />
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.getValue("protocol");
      const encodedProtocolo = encodeURIComponent(data as string);
      return (
        <Button variant="link" asChild>
          <Link href={`/portal/prefeitura/requisicoes/${encodedProtocolo}`}>
            Detalhes
          </Link>
        </Button>
      );
    },
  },
];
