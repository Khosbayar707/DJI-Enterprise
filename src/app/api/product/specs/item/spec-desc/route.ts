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
  const { id, highlight, description, priority } = await req.json();
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
    const newDesc = await prisma.specDescription.create({
      data: { specId: id, description, priority, highlight },
    });
    return CustomResponse(true, "REQUEST_SUCCESS", "Амжилттай нэмэгдлээ!", {
      new: newDesc,
    });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    if (!id) {
      return CustomResponse(
        false,
        "NO_ID_PROVIDED",
        "Таних тэмдэг илгээгээгүй байна!",
        null
      );
    }
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
    const deleted = await prisma.specDescription.delete({ where: { id } });
    return CustomResponse(true, "REQUEST_SUCCESS", "Амжилттай устгалаа!", {
      new: deleted,
    });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
