import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../src/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.garminProduct.findUnique({
      where: { id: params.id },
      include: { specifications: true },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Бүтээгдэхүүн олдсонгүй!" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Бүтээгдэхүүнүүдийг олоход асуудал гарлаа!" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const updatedProduct = await prisma.garminProduct.update({
      where: { id: params.id },
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
          deleteMany: {},
          create: specifications || [],
        },
      },
      include: { specifications: true },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Бүтээгдэхүүнийг засварлахад алдаа гарлаа!" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.garminProduct.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Бүтээгдэхүүнийг устгалаа!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Бүтээгдэхүүнийг устгахад алдаа гарлаа." },
      { status: 500 }
    );
  }
}
