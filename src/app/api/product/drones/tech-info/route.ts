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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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

    const existingTech = await prisma.droneTech.findUnique({
      where: { droneId: body.droneId },
    });
    if (!existingTech) {
      const tech = await prisma.droneTech.create({ data: body });
      return CustomResponse(true, "REQUEST_SUCCESS", "Амжилттай хадгаллаа!", {
        new: tech,
      });
    }
    const tech = await prisma.droneTech.update({
      where: { id: existingTech.id },
      data: body,
    });
    return CustomResponse(true, "REQUEST_SUCCESS", "Амжилттай хадгаллаа!", {
      new: tech,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
