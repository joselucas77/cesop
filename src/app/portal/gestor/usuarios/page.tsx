"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Users } from "@prisma/client";
import { verifySession } from "@/lib/auth";
import { AddNewUser } from "@/components/forms/newuser-form";

export default function DemoPage() {
  const [data, setData] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { userId } = await verifySession();
        const response = await fetch("/api/users");
        const users: Users[] = await response.json();
        const userIdToRemove = Number(userId);
        const filteredUsers = users.filter(
          (user) => user.id !== userIdToRemove
        );
        setData(filteredUsers);
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
          Tabela de Usuários
        </h1>
      </div>
      <AddNewUser />
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}
