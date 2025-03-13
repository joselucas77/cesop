"use client";

import { use } from "react";
import RequestProtocol from "./components/request-protocol";

export default function Requests({
  params,
}: {
  params: Promise<{ protocol: string }>;
}) {
  const { protocol } = use(params);
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Detalhes da Requisição
        </h1>
      </div>
      <RequestProtocol protocol={protocol} />
    </div>
  );
}
