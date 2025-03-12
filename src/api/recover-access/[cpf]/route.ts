import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { validateEmail } from "validations-br";

export async function POST(req: NextRequest) {
  try {
    const prisma = new PrismaClient();
    const { cpf, email } = await req.json();

    const user = await prisma.users.findFirst({
      where: {
        cpf,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({
        success: false,
        message: "Email inválido.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Verifique seu Email.",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Erro ao Recuperar conta. " + error,
    });
  }
}
