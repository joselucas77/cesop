import { PrismaClient } from "@prisma/client";
import { generateProtocol } from "@/utils/protocol";

const prisma = new PrismaClient();

export async function generateRequestProtocol(
  serviceCode: string
): Promise<string> {
  const lastRequest = await prisma.requests.findFirst({
    orderBy: { createdAt: "desc" },
  });

  return generateProtocol(lastRequest?.protocol || null, serviceCode);
}
