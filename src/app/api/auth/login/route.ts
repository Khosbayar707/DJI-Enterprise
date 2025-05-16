import { CustomResponse, NextResponse_CatchError } from "@/lib/next-responses";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) {
      return CustomResponse(
        false,
        "NO_ENV",
        "Серверийн тохиргооны алдаа!",
        null
      );
    }
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return CustomResponse(
        false,
        "USER_NOT_FOUND",
        "Хэрэглэгч бүртгэлгүй байна!",
        null
      );
    }
    const verifypass = await bcrypt.compare(password, user.password);
    if (!verifypass) {
      return CustomResponse(
        false,
        "WRONG_CREDENTIALS",
        "Нууц үг таарсангүй!",
        null
      );
    }
    if (!user.isActive) {
      return CustomResponse(
        false,
        "ACCOUNT_BLOCKED",
        "Таны хаяг идэвхигүй болсон байна! Админтай холбогдоно уу!",
        null
      );
    }
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "48h" }
    );
    const response = NextResponse.json({
      success: true,
      message: "Тавтай морил",
      data: { id: user.id },
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 48,
      sameSite: "strict",
    });

    return response;
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
