"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Requests } from "@prisma/client";
import { verifySession } from "@/lib/auth";
import { getRequestByUserId } from "@/lib/api/requests";

export default function DemoPage() {
  const [data, setData] = useState<Requests[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { userId } = await verifySession();

        const requests = await getRequestByUserId(Number(userId));
        setData(requests);
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
          Requisições
        </h1>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}
