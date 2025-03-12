import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const departments = await prisma.departments.findMany({
      where: { id: Number(id) },
    });

    if (!departments) {
      return NextResponse.json({
        success: false,
        error: "Nenhum Departamento encontrado",
      });
    }

    return NextResponse.json(departments);
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
