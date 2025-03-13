"use client";

import { Button } from "@/components/ui/button";
import { normalizeUserType } from "@/utils/format";
import { Users } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Contato",
  },
  {
    accessorKey: "userType",
    header: "Tipo",
    cell: ({ row }) => {
      const userType = row.getValue("userType") as string;
      return (
        <div className="text-start px-10">{normalizeUserType(userType)}</div>
      );
    },
  },
  {
    accessorKey: "department",
    header: "Departamento",
    cell: ({ row }) => {
      const department = row.getValue("department") as string;
      return (
        <div
          className={`text-start px-10 ${
            department ? "" : "text-muted-foreground"
          }`}>
          {department ? department : <em>Não informado</em>}
        </div>
      );
    },
  },
  {
    id: "details",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Button variant="link" asChild>
          <Link href={`/portal/gestor/usuarios/${data.id}`}>Detalhes</Link>
        </Button>
      );
    },
  },
];
