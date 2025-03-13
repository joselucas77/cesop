"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/tables/data-table-fixed";
import { Requests } from "@prisma/client";

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
          Relatórios de Solicitação de Cidadãos
        </h1>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}
