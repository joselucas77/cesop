import { ResponseWithStatus } from "@/types/response";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const requests = await prisma.response.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const responseData: ResponseWithStatus = await req.json();

    const request = await prisma.requests.findUnique({
      where: { protocol: responseData.protocol },
    });

    if (!request) {
      return NextResponse.json({
        success: false,
        message: "Requisição não encontrada",
      });
    }

    const response = await prisma.response.create({
      data: {
        protocol: responseData.protocol,
        responsible: responseData.responsible,
        department: responseData.department,
        secretary: responseData.secretary,
        requestId: request.id,
        message: responseData.message,
        file: responseData.file,
      },
    });

    await prisma.requests.update({
      where: { protocol: responseData.protocol },
      data: {
        status: responseData.status,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
