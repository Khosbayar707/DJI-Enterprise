import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_DeactivatedUser,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from "@/lib/next-responses";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const specs = await prisma.spec.findMany({
    include: { image: true, drone: true },
  });
  return CustomResponse(true, "REQUEST_SUCCESS", "Хүсэлт амжилттай!", {
    specs,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { name, detail } = await req.json();
    if (!process.env.JWT_SECRET) {
      return NextResponse_NoEnv();
    }
    if (!name) {
      return CustomResponse(false, "NO_NAME_PROVIDED", "Нэр өгөх ёстой!", null);
    }
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse_NoToken();
    }
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      id: string;
      isAdmin: boolean;
    };
    const user = await prisma.user.findUnique({ where: { id: verify.id } });
    if (!user?.isActive) {
      return NextResponse_DeactivatedUser();
    }
    if (!user.isAdmin) {
      return NextResponse_NotAnAdmin();
    }
    const newSpec = await prisma.spec.create({
      data: { name, adminId: user.id, detail },
      include: { image: true, drone: true },
    });
    return CustomResponse(
      true,
      "DRONE_ADDED",
      "Бүтээгдэхүүн амжилттай нэмлээ!",
      {
        item: newSpec,
      }
    );
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
