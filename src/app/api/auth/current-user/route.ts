import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoToken,
} from "@/lib/next-responses";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) {
      return CustomResponse(
        false,
        "NO_ENV",
        "Серверийн тохиргооны алдаа!",
        null
      );
    }

    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse_NoToken();
    }
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      id: string;
    };
    const user = await prisma.user.findUnique({
      where: { id: verify.id },
    });
    if (!user) {
      return CustomResponse(
        false,
        "USER_NOT_FOUND",
        "Хэрэглэгч олдсонгүй!",
        null
      );
    }
    return CustomResponse(true, "USER_FOUND", "Тавтай морил", { user });
  } catch (err) {
    NextResponse_CatchError(err);
  }
}
