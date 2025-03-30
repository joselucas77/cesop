import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await deleteSession();
  return NextResponse.redirect(new URL("/", req.url));
}
