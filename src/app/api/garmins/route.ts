import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";
import { CustomResponse, NextResponse_CatchError } from "@/lib/next-responses";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.garminProduct.findMany({
      include: { specifications: true },
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

    const product = await prisma.garminProduct.create({
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
