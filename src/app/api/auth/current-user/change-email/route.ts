import { CustomResponse, NextResponse_NoToken } from "@/lib/next-responses";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  if (!process.env.JWT_SECRET) {
    return CustomResponse(false, "NO_ENV", "Серверийн тохиргооны алдаа!", null);
  }
  const { email } = await req.json();
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return CustomResponse(
      false,
      "REQUEST_FAILED",
      "Майл бүртгэлтэй байна!",
      null
    );
  }
  const accessToken = req.cookies.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse_NoToken();
  }
  const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
    id: string;
  };
  const user = await prisma.user.findUnique({ where: { id: verify.id } });
  if (!user) {
    return CustomResponse(
      false,
      "REQUEST_FAILED",
      "Хэрэглэгч олдсонгүй!",
      null
    );
  }
  return CustomResponse(true, "fornow", "to be continued", null);
}
