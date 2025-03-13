"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { Requests } from "@prisma/client";
import { DataTable } from "@/components/tables/data-table-editable";

const filters = [
  { label: "Protocolo", key: "protocol" },
  { label: "Logradouro", key: "street" },
  { label: "Bairro", key: "district" },
  { label: "Zona", key: "zone" },
];

export default function ServicesForLocation() {
  const [data, setData] = useState<Requests[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/requests", {
          cache: "no-cache",
        });
        if (!response.ok) throw new Error("Erro ao buscar os dados");
        const allRequests: Requests[] = await response.json();

        setData(allRequests);
      } catch (error) {
        console.error("Erro ao buscar as requisições:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Relatórios de Serviços
        </h1>
      </div>
      <DataTable
        filters={filters}
        columns={columns}
        data={data}
        loading={loading}
      />
    </div>
  );
}
