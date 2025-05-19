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
import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    const video = await prisma.video.findUnique({ where: { id } });
    if (!video) {
      return CustomResponse(false, "REQUEST_FAILED", "Бичлэг олдсонгүй!", null);
    }
    const result = await v2.uploader.destroy(video.public_id);
    if (result.result !== "ok" && result.result !== "not found") {
      return CustomResponse(
        false,
        "FAILED",
        "Датабазаас устгаж чадсангүй!",
        null
      );
    }
    const deleteVideo = await prisma.video.delete({ where: { id } });
    return CustomResponse(true, "REQUEST_SUCCESS", "Хүсэлт амжилттай!", {
      delete: deleteVideo,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
