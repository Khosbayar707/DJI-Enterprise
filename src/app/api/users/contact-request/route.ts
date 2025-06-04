import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from "@/lib/next-responses";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const requests = await prisma.contactRequest.findMany();
    return CustomResponse(true, "REQUEST_SUCCESS", "Хүсэлт амжилттай!", {
      requests,
    });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();
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
    const request = await prisma.contactRequest.findUnique({ where: { id } });
    if (!request) {
      return CustomResponse(
        false,
        "REQUEST_NOT_FOUND",
        "Хүсэлт олдсонгүй!",
        null
      );
    }
    const deleteRequest = await prisma.contactRequest.update({
      where: { id: request.id },
      data: {
        contacted: !request.contacted,
      },
    });

    return CustomResponse(
      true,
      "REQUEST_SUCCESS",
      "Төлөв амжилттай өөрчлөгдлөө!",
      {
        deleted: deleteRequest,
      }
    );
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
