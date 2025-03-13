"use client";

// import { ServicesDetails } from "@/lib/api/requests";
import { ColumnDef } from "@tanstack/react-table";

export type ServicesDetails = {
  code: string;
  name: string;
  description: string;
  actionArea: string;
  sector: string;
  organization: string;
};

export const columns: ColumnDef<ServicesDetails>[] = [
  {
    accessorKey: "code",
    header: "Código",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "actionArea",
    header: "Área de atuação",
  },
  {
    accessorKey: "sector",
    header: "Despartamento",
  },
  {
    accessorKey: "organization",
    header: "Secretaria",
  },
];
