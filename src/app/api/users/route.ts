import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import {
  validateCPF,
  validatePhone,
  validateCep,
  validateEmail,
} from "validations-br";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!users) {
      return NextResponse.json({
        message: "Nenhum usuário encontrado",
      });
    }

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const createUserDto = await req.json();

    if (!validateCPF(createUserDto.cpf.toString())) {
      return NextResponse.json({ message: "CPF inválido", success: false });
    }

    if (!validatePhone(createUserDto.phone.toString())) {
      return NextResponse.json({
        success: false,
        message: "Telefone inválido",
      });
    }

    if (createUserDto.postalCode) {
      if (!validateCep(createUserDto.postalCode.toString())) {
        return NextResponse.json({
          success: false,
          message: "CEP inválido",
        });
      }
    }

    if (createUserDto.email) {
      if (!validateEmail(createUserDto.email.toString())) {
        return NextResponse.json({
          success: false,
          message: "Email inválido",
        });
      }
    }

    // Verificar se o cpf existe no banco de dados
    const user = await prisma.users.findUnique({
      where: { cpf: createUserDto.cpf },
    });

    if (user) {
      return NextResponse.json({
        success: false,
        message: "Usuário já cadastrado",
      });
    }

    const hashedPassword = await argon2.hash(createUserDto.password);

    await prisma.users.create({
      data: {
        ...createUserDto,
        birthdate: new Date(createUserDto.birthdate),
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Cadastro realizado com sucesso.",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Erro ao criar conta. " + error,
    });
  }
}
