import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash, verify } from "argon2";
import { validateCep, validateEmail, validatePhone } from "validations-br";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const user = await prisma.users.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Usuário não encontrado",
      });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const userExists = await prisma.users.findUnique({
      where: { id: Number(id) },
    });

    if (!userExists) {
      return NextResponse.json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    const userData = await req.json();
    const { oldPassword, newPassword, ...userUpdateData } = userData;

    if (newPassword) {
      if (!oldPassword) {
        return NextResponse.json({
          success: false,
          message: "Senha antiga é obrigatória para alterar a senha",
        });
      }

      const isPasswordCorrect = await verify(userExists.password, oldPassword);

      if (!isPasswordCorrect) {
        return NextResponse.json({
          success: false,
          message: "Senha antiga incorreta",
        });
      }

      if (newPassword === oldPassword) {
        return NextResponse.json({
          success: false,
          message: "A nova senha não pode ser igual à senha antiga",
        });
      }

      // user.password = await hash(newPassword);
      userUpdateData.password = await hash(newPassword);
    }

    if (userUpdateData.email) {
      if (!validateEmail(userUpdateData.email.toString())) {
        return NextResponse.json({
          success: false,
          message: "Email inválido",
        });
      } else {
        userUpdateData.email = userUpdateData.email.toString();
      }
    }

    if (userUpdateData.phone) {
      if (!validatePhone(userUpdateData.phone.toString())) {
        return NextResponse.json({
          success: false,
          message: "Telefone inválido",
        });
      } else {
        userUpdateData.phone = userUpdateData.phone.toString();
      }
    }

    if (userUpdateData.postalCode) {
      if (!validateCep(userUpdateData.postalCode.toString())) {
        return NextResponse.json({
          success: false,
          message: "CEP inválido",
        });
      } else {
        userUpdateData.postalCode = userUpdateData.postalCode.toString();
      }
    }

    const updatedUser = await prisma.users.update({
      where: { id: Number(id) },
      data: { ...userUpdateData },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const deletedUser = await prisma.users.delete({
      where: { id: Number(id) },
    });

    if (!deletedUser) {
      return NextResponse.json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    return NextResponse.json({ success: true, deletedUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
