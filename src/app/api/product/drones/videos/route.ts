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
    const { VideoPreview, publicId, id } = await req.json();
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
    if (!VideoPreview || !publicId) {
      return CustomResponse(
        false,
        "REQUEST_FAILED",
        "Мэдээлэл дутуу байна!",
        null
      );
    }
    const product = await prisma.drone.findUnique({ where: { id } });
    if (!product) {
      return CustomResponse(
        false,
        "REQUEST_FAILED",
        "Бүтээгдэхүүн олдсонгүй!",
        null
      );
    }
    const newVideo = await prisma.video.create({
      data: { public_id: publicId, url: VideoPreview, droneId: id },
    });
    return CustomResponse(
      true,
      "REQUEST_SUCCESS",
      "Бичлэг амжилттай нэмэгдлээ!",
      { new: newVideo }
    );
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { name, detail, id, priority } = await req.json();
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
    const updateVideo = await prisma.video.update({
      where: { id },
      data: {
        ...(name ? { name } : {}),
        ...(detail ? { detail } : {}),
        priority,
      },
    });

    return CustomResponse(true, "REQUEST_SUCCESS", "Хүсэлт амжилттай!", {
      new: updateVideo,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
