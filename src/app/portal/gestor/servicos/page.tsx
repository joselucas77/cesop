"use client";

import { useEffect, useState } from "react";
import { Departments, Secretary, Services } from "@prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export type ServicesDetails = {
  code: string;
  name: string;
  description: string;
  actionArea: string;
  sector: string;
  organization: string;
};

export default function DemoPage() {
  const [data, setData] = useState<ServicesDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesResponse, departmentsResponse, secretariesResponse] =
          await Promise.all([
            fetch("/api/services"),
            fetch("/api/departments"),
            fetch("/api/secretaries"),
          ]);

        const servicesData: Services[] = await servicesResponse.json();
        const departmentsData: Departments[] = await departmentsResponse.json();
        const secretariesData: Secretary[] = await secretariesResponse.json();

        const servicesDetails = servicesData.map((service) => {
          const department = departmentsData.find(
            (dept) => dept.id === service.sectorId
          );

          const secretary = department
            ? secretariesData.find(
                (sec) => sec.id === department.organizationId
              )
            : null;

          return {
            code: service.code as string,
            name: service.name as string,
            description: service.description as string,
            actionArea: service.actionArea as string,
            sector: department ? (department.name as string) : "Desconhecido",
            organization: secretary
              ? (secretary.name as string)
              : "Desconhecido",
          };
        });

        setData(servicesDetails);
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
          Tabela de Serviços
        </h1>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}
