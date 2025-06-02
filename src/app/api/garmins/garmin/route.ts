import { NextRequest } from "next/server";
import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from "@/lib/next-responses";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      {
        return CustomResponse(
          false,
          "NO_ID_PROVIDED",
          "Таних тэмдэг алга байна!",
          null
        );
      }
    }
    const product = await prisma.garminProduct.findUnique({
      where: { id },
      include: { specifications: true },
    });

    if (!product) {
      return CustomResponse(
        false,
        "ITEM_NOT_FOUND",
        "Бүтээгдэхүүн олдсонгүй!",
        null
      );
    }

    return CustomResponse(true, "REQUEST_SUCCESS", "Амжилттай", { product });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      {
        return CustomResponse(
          false,
          "NO_ID_PROVIDED",
          "Таних тэмдэг алга байна!",
          null
        );
      }
    }
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
          deleteMany: {},
          create: specifications || [],
        },
      },
      include: { specifications: true },
    });

    return CustomResponse(true, "REQUEST_SUCCESS", "Амжилттай", {
      updatedProduct,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      {
        return CustomResponse(
          false,
          "NO_ID_PROVIDED",
          "Таних тэмдэг алга байна!",
          null
        );
      }
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
    const deleteGarmin = await prisma.garminProduct.delete({
      where: { id },
    });

    return CustomResponse(true, "REQUEST_SUCCESS", "Амжилттай устгалаа!", {
      new: deleteGarmin,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
