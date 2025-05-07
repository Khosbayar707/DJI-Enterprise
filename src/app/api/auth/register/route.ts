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
    const { email, password, sub_news } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      const verify = await bcrypt.compare(password, user.password);
      if (!verify) {
        return CustomResponse(
          false,
          "USER_EXISTS",
          "Хэрэглэгч бүртгэлтэй байна",
          null
        );
      }
      const response = NextResponse.json({
        success: true,
        message: "Бүртгэлтэй хэрэглэгч амжилттай нэвтэрлээ!",
        data: { id: user.id },
      });
      const accessToken = jwt.sign(
        {
          id: user,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        {
          id: user,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "48h" }
      );
      response.cookies.set("accessToken", accessToken, {
        maxAge: 60 * 60,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      response.cookies.set("refreshToken", refreshToken, {
        maxAge: 60 * 60 * 48,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return response;
    }
    const encryptedPass = await bcrypt.hash(password, 14);
    const newUser = await prisma.user.create({
      data: { email, password: encryptedPass, sub_news },
    });
    const response = NextResponse.json({
      success: true,
      message: "Хэрэглэгч амжилттай бүртгэгдлээ!",
      data: { id: newUser.id },
    });
    const accessToken = jwt.sign(
      {
        id: newUser,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      {
        id: newUser,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "48h" }
    );
    response.cookies.set("accessToken", accessToken, {
      maxAge: 60 * 60,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    response.cookies.set("refreshToken", refreshToken, {
      maxAge: 60 * 60 * 48,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return response;
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
