import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const departments = await prisma.departments.findMany({
      orderBy: {
        createdAt: "asc",
      },
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
