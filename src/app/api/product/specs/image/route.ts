import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from "@/lib/next-responses";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { url, public_id, id } = await req.json();
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
    if (
      !Array.isArray(url) ||
      !Array.isArray(public_id) ||
      url.length !== public_id.length
    ) {
      return CustomResponse(false, "INVALID_INPUT", "Буруу өгөгдөл", null);
    }

    const data = url.map((u, i) => ({
      url: u,
      public_id: public_id[i],
      specId: id,
    }));
    const newImages = await prisma.image.createMany({
      data,
    });
    return CustomResponse(true, "SUCCESS", "Зураг амжилттай хадгаллаа!", {
      new: newImages,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { name, description, id, priority } = await req.json();
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
    const updateImage = await prisma.image.update({
      where: { id },
      data: {
        ...(name ? { name } : {}),
        ...(description ? { description } : {}),
        priority,
      },
    });
    return CustomResponse(
      true,
      "REQUEST_SUCCESS",
      "Мэдээлэл амжилттай өөрчлөгдлөө!",
      { new: updateImage }
    );
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
