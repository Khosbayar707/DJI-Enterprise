import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from "@/lib/next-responses";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
export async function POST(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) {
      return NextResponse_NoEnv();
    }
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse_NoToken();
    }
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      isAdmin: boolean;
    };
    if (!verify.isAdmin) {
      return NextResponse_NotAnAdmin();
    }
    const { name, type } = await req.json();
    if (type === "spec") {
      const newCategory = await prisma.specCategory.create({ data: { name } });
      return CustomResponse(
        true,
        "REQUEST_SUCCESS",
        "Эд ангийн категори амжилттай нэмэгдлээ!",
        { new: newCategory }
      );
    }
    const newCategory = await prisma.droneCategory.create({ data: { name } });
    return CustomResponse(
      true,
      "REQUEST_SUCCESS",
      "Дроны категори амжилттай нэмэгдлээ!",
      { new: newCategory }
    );
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
