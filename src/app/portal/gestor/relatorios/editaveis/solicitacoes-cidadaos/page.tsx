"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/tables/data-table-editable";
import { getUserByRequest, UserWithRequests } from "@/lib/api/users";

const filters = [
  { label: "ID", key: "id" },
  { label: "Nome", key: "name" },
  { label: "Contato", key: "phone" },
  { label: "Protocolo", key: "protocol" },
];

export default function ServicesForLocation() {
  const [data, setData] = useState<UserWithRequests[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserByRequest();
        setData(data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
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
      <DataTable
        filters={filters}
        columns={columns}
        data={data}
        loading={loading}
      />
    </div>
  );
}
