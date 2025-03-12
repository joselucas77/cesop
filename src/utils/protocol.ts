export function generateProtocol(
  lastProtocol: string | null,
  serviceCode: string
): string {
  const lastNumber = lastProtocol
    ? parseInt(lastProtocol.split("-")[1].split("/")[0])
    : 0;

  const nextNumber = (lastNumber + 1) % 1000000000;
  const currentYear = new Date().getFullYear().toString().slice(-2);

  return `${serviceCode}-${nextNumber
    .toString()
    .padStart(9, "0")}/${currentYear}`;
}
