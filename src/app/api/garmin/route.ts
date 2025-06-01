import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../src/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.garminProduct.findMany({
      include: { specifications: true },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
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

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Шинэ бүтээгдэхүүн нэмэхэд алдаа гарлаа!" },
      { status: 500 }
    );
  }
}
