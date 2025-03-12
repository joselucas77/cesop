import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const services = await prisma.services.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!services) {
      return NextResponse.json({
        success: false,
        error: "Nenhum serviço encontrado",
      });
    }

    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
