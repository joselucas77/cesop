import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ResponseWithStatus } from "@/types/response";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ protocol: string }> }
) {
  const protocol = (await params).protocol;

  try {
    const request = await prisma.requests.findUnique({
      where: { protocol: protocol },
      include: {
        response: true,
        applicant: true,
      },
    });

    if (!request) {
      return NextResponse.json({
        success: false,
        message: "Requisição/Resposta não encontrada",
      });
    }

    return NextResponse.json(request);
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ protocol: string }> }
) {
  const protocol = (await params).protocol;
  try {
    const responseData: ResponseWithStatus = await req.json();

    const request = await prisma.requests.findUnique({
      where: { protocol: protocol },
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
