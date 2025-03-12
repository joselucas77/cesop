import { NextRequest, NextResponse } from "next/server";
import { Departments, PrismaClient } from "@prisma/client";

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

export async function POST(req: NextRequest) {
  try {
    const data: Departments[] = await req.json();

    const department = await prisma.departments.createMany({
      data,
      skipDuplicates: true,
    });

    return NextResponse.json({
      success: true,
      department,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro final" + error });
  }
}
