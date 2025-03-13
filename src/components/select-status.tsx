"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectStatusProps {
  value: string;
  onChange: (value: string) => void;
}

export function SelectStatus({ value, onChange }: SelectStatusProps) {
  const statusOptions = [
    { value: "PENDING", label: "Pendente" },
    { value: "IN_PROGRESS", label: "Em Andamento" },
    { value: "COMPLETED", label: "Concluído" },
    { value: "REJECTED", label: "Indeferido" },
    { value: "APPROVED", label: "Deferido" },
    { value: "CANCELLED", label: "Cancelado" },
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione o status" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
