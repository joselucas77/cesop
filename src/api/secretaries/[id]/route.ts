import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const secretary = await prisma.secretary.findMany({
      where: { id: Number(id) },
    });

    if (!secretary) {
      return NextResponse.json({
        success: false,
        error: "Nenhum Departamento encontrado",
      });
    }

    return NextResponse.json(secretary);
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
