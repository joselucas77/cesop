import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ protocol: string }>;
  }
) {
  const protocol = (await params).protocol;

  try {
    const request = await prisma.requests.findUnique({
      where: { protocol: protocol },
    });
    if (!request) {
      return NextResponse.json({
        success: false,
        message: "Requisição não encontrada.",
      });
    }
    return NextResponse.json(request);
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
