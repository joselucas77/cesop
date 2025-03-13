"use client";

import { useEffect, useState } from "react";
import { ServicesForZone } from "./components/servicos-zona";
import { RequestsForAgent } from "./components/solicitacoes-secretaria";
import { StatusForRquests } from "./components/status-solicitacoes";
import { AverageServiceTime } from "./components/tempo-atendimento";
import { Requests } from "@prisma/client";

export default function DashboardPage() {
  const [topSecretaries, setTopSecretaries] = useState<
    { secretary: string; count: number }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/requests");
      const requestsResponse: Requests[] = await response.json();

      // Agrupar por secretaria e contar solicitações
      const secretaryCount: Record<string, number> = {};

      requestsResponse.forEach(({ secretary }) => {
        if (secretary) {
          secretaryCount[secretary] = (secretaryCount[secretary] || 0) + 1;
        }
      });

      // Criar array [{ secretary, count }] e ordenar
      const sortedSecretaries = Object.entries(secretaryCount)
        .map(([secretary, count]) => ({ secretary, count }))
        .sort((a, b) => b.count - a.count) // Ordem decrescente
        .slice(0, 5); // Limitar a 5 secretarias

      setTopSecretaries(sortedSecretaries);
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Dashboard
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <RequestsForAgent data={topSecretaries} />
        <ServicesForZone />
        <AverageServiceTime />
        <StatusForRquests />
      </div>
    </div>
  );
}
