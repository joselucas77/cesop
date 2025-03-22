import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import { createSession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { cpf, password } = await req.json();

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

  const validPassword = await argon2.verify(user.password, password);

  if (validPassword) {
    return NextResponse.json({
      success: true,
      role: user.userType,
      session: await createSession(user.id.toString()),
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "Senha inválida",
    });
  }
}
