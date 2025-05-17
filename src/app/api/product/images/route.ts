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
      return CustomResponse(false, "NO_ID_PROVIDED", "Таних тэмдэг алга", null);
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
    const image = await prisma.image.findUnique({ where: { id } });
    if (!image) {
      return CustomResponse(false, "IMAGE_NOT_FOUND", "Зураг олдонгүй!", null);
    }
    const result = await v2.uploader.destroy(image.public_id);
    if (result.result !== "ok" && result.result !== "not found") {
      return CustomResponse(
        false,
        "FAILED",
        "Датабазаас устгаж чадсангүй!",
        null
      );
    }
    const deleted = await prisma.image.delete({ where: { id } });
    return CustomResponse(true, "REQUEST_SUCCESS", "Амжилттай устлаа!", {
      deleted,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
