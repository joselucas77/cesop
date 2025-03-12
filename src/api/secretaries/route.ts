import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Secretary } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const secretaries = await prisma.secretary.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!secretaries) {
      return NextResponse.json({
        success: false,
        error: "Nenhuma secretaria encontrada",
      });
    }

    return NextResponse.json(secretaries);
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: Secretary = await req.json();

    const secretary = await prisma.secretary.create({
      data,
    });

    return NextResponse.json({
      success: true,
      secretary,
      message: "Requisição criada com sucesso",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro final" + error });
  }
}
