import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Services } from "@prisma/client";

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

export async function POST(req: NextRequest) {
  try {
    const data: Services[] = await req.json();

    const services = await prisma.services.createMany({
      data,
      skipDuplicates: true,
    });

    return NextResponse.json({
      success: true,
      services,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro final" + error });
  }
}
