"use client";

import { use } from "react";
import ChamadoDetails from "./components/chamado-detalhes";

export default function ChamadoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Detalhes do Chamado
        </h1>
      </div>
      <ChamadoDetails id={id} />
    </div>
  );
}
