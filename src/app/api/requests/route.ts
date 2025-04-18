import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Requests } from "@prisma/client";
import { generateRequestProtocol } from "@/services/requestService";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const requests = await prisma.requests.findMany({
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
    const requestData: Requests = await req.json();

    const user = await prisma.users.findUnique({
      where: { id: requestData.applicantId },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    const service = await prisma.services.findFirst({
      where: { name: requestData.service },
    });

    if (!service) {
      return NextResponse.json({
        success: false,
        message: "Serviço não encontrado",
      });
    }

    const department = await prisma.departments.findFirst({
      where: { id: service.sectorId },
    });

    if (!department) {
      return NextResponse.json({
        success: false,
        message: "Departamento não encontrado",
      });
    }

    const secretary = await prisma.secretary.findFirst({
      where: { id: department.organizationId },
    });

    if (!secretary) {
      return NextResponse.json({
        success: false,
        message: "Serviço não encontrado",
      });
    }

    const newProtocol = await generateRequestProtocol(service.code as string);

    if (!newProtocol) {
      return NextResponse.json({
        success: false,
        message: "Erro ao gerar protocolo.",
      });
    }

    requestData.protocol = newProtocol;

    const newRequest = await prisma.requests.create({
      data: {
        ...requestData,
        actionArea: service.actionArea,
        department: department.name,
        secretary: secretary.name,
      },
    });

    return NextResponse.json({
      success: true,
      request: newRequest,
      message: "Requisição criada com sucesso",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro final" + error });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const requestData: Requests = await req.json();

    const updatedRequest = await prisma.requests.update({
      where: { id: requestData.id },
      data: requestData,
    });

    return NextResponse.json({
      success: true,
      request: updatedRequest,
      message: "Requisição atualizada com sucesso",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
