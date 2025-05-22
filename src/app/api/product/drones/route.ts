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
  try {
    const drones = await prisma.drone.findMany({
      include: { images: true, videos: true, specs: true, featuredVideo: true },
    });
    return CustomResponse(true, "REQUEST_SUCCESS", "Бүх дронууд", { drones });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description } = await req.json();
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
    const newDrone = await prisma.drone.create({
      data: { name, adminId: user.id, description },
      include: { images: true, videos: true, specs: true, featuredVideo: true },
    });
    return CustomResponse(
      true,
      "DRONE_ADDED",
      "Бүтээгдэхүүн амжилттай нэмлээ!",
      {
        item: newDrone,
      }
    );
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return CustomResponse(
        false,
        "REQUEST_FAILED",
        "Таних тэмдэг алга!",
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
    const deleteDrone = await prisma.drone.delete({ where: { id } });
    return CustomResponse(true, "REQUEST_SUCCESS", "Амжилттай устгалаа!", {
      new: deleteDrone,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
