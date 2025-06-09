import { NextRequest } from 'next/server';
import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      {
        return CustomResponse(false, 'NO_ID_PROVIDED', 'Таних тэмдэг алга байна!', null);
      }
    }
    const product = await prisma.garminProduct.findUnique({
      where: { id },
      include: { images: true, specifications: true },
    });

    if (!product) {
      return CustomResponse(false, 'ITEM_NOT_FOUND', 'Бүтээгдэхүүн олдсонгүй!', null);
    }

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай', { product });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return CustomResponse(false, 'NO_ID_PROVIDED', 'Таних тэмдэг алга байна!', null);
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

    if (!Array.isArray(images) || !images.every((img) => img.url && img.public_id)) {
      return CustomResponse(false, 'INVALID_IMAGES', 'Зураг буруу форматтай байна', null);
    }

    const updatedProduct = await prisma.garminProduct.update({
      where: { id },
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
        specifications: {
          deleteMany: {},
          create: specifications || [],
        },
        images: {
          deleteMany: {},
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

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай', {
      updatedProduct,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return CustomResponse(false, 'NO_ID_PROVIDED', 'Таних тэмдэг алга байна!', null);
    }

    if (!process.env.JWT_SECRET) return NextResponse_NoEnv();

    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) return NextResponse_NoToken();

    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      isAdmin: boolean;
    };
    if (!verify.isAdmin) return NextResponse_NotAnAdmin();
    const images = await prisma.image.findMany({
      where: { garminId: id },
    });
    for (const image of images) {
      const result = await cloudinary.uploader.destroy(image.public_id);
      if (result.result !== 'ok' && result.result !== 'not found') {
        return CustomResponse(
          false,
          'CLOUDINARY_DELETE_FAILED',
          `Зураг устгахад алдаа гарлаа (${image.public_id})`,
          null
        );
      }
    }
    await prisma.image.deleteMany({
      where: { garminId: id },
    });
    const deleteGarmin = await prisma.garminProduct.delete({
      where: { id },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай устгалаа!', {
      deleted: deleteGarmin,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
