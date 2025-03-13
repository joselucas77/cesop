import { Badge } from "@/components/ui/badge";

type VariantBadge =
  | "destructive"
  | "default"
  | "secondary"
  | "outline"
  | "green"
  | "blue"
  | null
  | undefined;

export function StatusBadge({ status }: { status: string }) {
  let statusText = "";
  let variant: VariantBadge = "default";

  switch (status) {
    case "APPROVED":
      statusText = "Deferido";
      variant = "green";
      break;
    case "REJECTED":
      statusText = "Indeferido";
      variant = "destructive";
      break;
    case "IN_PROGRESS":
      statusText = "Em andamento";
      variant = "blue";
      break;
    case "PENDING":
      statusText = "Pendente";
      variant = "default";
      break;
    case "COMPLETED":
      statusText = "Concluído";
      variant = "secondary";
      break;
    case "CANCELLED":
      statusText = "Cancelado";
      variant = "destructive";
      break;
    default:
      variant = "default";
      statusText = status;
  }

  return <Badge variant={variant}>{statusText}</Badge>;
}
