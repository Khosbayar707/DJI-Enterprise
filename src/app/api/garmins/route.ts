import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";
import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from "@/lib/next-responses";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.garminProduct.findMany({
      include: { specifications: true, images: true },
    });
    return CustomResponse(true, "REQUEST_SUCCESS", "Бүх цагнууд", {
      products,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      category,
      price,
      description,
      images,
      features,
      isNew,
      rating,
      reviewCount,
      inStock,
      specifications,
    } = body;

    if (!process.env.JWT_SECRET) return NextResponse_NoEnv();
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) return NextResponse_NoToken();
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      isAdmin: boolean;
    };
    if (!verify.isAdmin) return NextResponse_NotAnAdmin();

    if (
      !Array.isArray(images) ||
      !images.every((img) => img.url && img.public_id)
    ) {
      return CustomResponse(
        false,
        "INVALID_IMAGES",
        "Зураг буруу форматтай",
        null
      );
    }

    const product = await prisma.garminProduct.create({
      data: {
        name,
        category,
        price,
        description,
        isNew,
        rating,
        reviewCount,
        inStock,
        features: Array.isArray(features) ? features : [],
        images: {
          createMany: {
            data: images.map((img) => ({
              url: img.url,
              public_id: img.public_id,
            })),
          },
        },
      },
      include: {
        specifications: true,
        images: true,
      },
    });

    return CustomResponse(true, "SUCCESS", "Бүтээгдэхүүн үүслээ", { product });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      category,
      price,
      description,
      images,
      features,
      isNew,
      rating,
      reviewCount,
      inStock,
      specifications,
      id,
    } = body;

    const product = await prisma.garminProduct.update({
      where: { id },
      data: {
        name,
        category,
        price,
        description,
        images,
        features,
        isNew,
        rating,
        reviewCount,
        inStock,
        specifications: {
          create: specifications || [],
        },
      },
      include: { specifications: true },
    });

    return CustomResponse(true, "REQUEST_SUCCESS", "Бүх дронууд", { product });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
