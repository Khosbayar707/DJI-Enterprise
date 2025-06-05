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
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      briefDescription,
      description,
      public_id,
      droneId,
      videoURL,
    } = await req.json();

    if (!process.env.JWT_SECRET) return NextResponse_NoEnv();

    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) return NextResponse_NoToken();

    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      isAdmin: boolean;
    };
    if (!verify.isAdmin) return NextResponse_NotAnAdmin();

    const drone = await prisma.drone.findUnique({
      where: { id: droneId },
      include: { rtk: { include: { video: true } } },
    });
    if (drone?.rtk) {
      const updateRTK = await prisma.rtkModule.update({
        where: { id: drone.rtk.id },
        data: {
          ...(title !== undefined ? { title } : {}),
          ...(briefDescription !== undefined ? { briefDescription } : {}),
          ...(description !== undefined ? { description } : {}),
          ...(droneId !== undefined ? { droneId } : {}),
        },
        include: { video: true },
      });
      if (videoURL !== updateRTK.video.url) {
        const result = await cloudinary.uploader.destroy(
          updateRTK.video.public_id
        );
        if (result.result !== "ok" && result.result !== "not found") {
          return CustomResponse(
            false,
            "FAILED",
            "Хуучин видеог устгаж чадсангүй!",
            null
          );
        }

        await prisma.video.update({
          where: { id: updateRTK.videoId },
          data: {
            url: videoURL,
            public_id,
          },
        });
      }

      return CustomResponse(
        true,
        "REQUEST_SUCCESS",
        "Амжилттай шинэчлэгдлээ!",
        {
          updated: updateRTK,
        }
      );
    }
    const video = await prisma.video.create({
      data: {
        url: videoURL,
        public_id,
        rtk: {
          create: {
            title,
            briefDescription,
            description,
            droneId,
          },
        },
      },
    });

    return CustomResponse(true, "REQUEST_SUCCESS", "Амжилттай хадгаллаа!", {
      new: video,
    });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return CustomResponse(
        false,
        "NO_ID_PROVIDED",
        "Таних тэмдэг алга байна!",
        null
      );
    }
    const rtk = await prisma.rtkModule.findUnique({
      where: { id },
      include: { video: true },
    });
    if (!rtk) {
      return CustomResponse(false, "NOT_FOUND", "RTK модуль олдсонгүй", null);
    }
    const result = await cloudinary.uploader.destroy(rtk.video.public_id);
    if (result.result !== "ok" && result.result !== "not found") {
      return CustomResponse(
        false,
        "FAILED",
        "Хуучин видеог устгаж чадсангүй!",
        null
      );
    }
    await prisma.rtkModule.delete({ where: { id } });
    return CustomResponse(
      true,
      "SUCCESS",
      "RTK модуль болон бичлэг устлаа",
      null
    );
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
