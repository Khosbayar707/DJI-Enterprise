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

    if (!process.env.JWT_SECRET) return NextResponse_NoEnv();
    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) return NextResponse_NoToken();
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as { isAdmin: boolean };
    if (!verify.isAdmin) return NextResponse_NotAnAdmin();

    const body = await req.json();
    const {
      name,
      partNumber,
      price,
      stock,
      description,
      images,
      features,
      isNew,
      rating,
      reviewCount,
      inStock,
      specifications,
      type,
    } = body;

    if (price !== undefined && (price == null || Number.isNaN(Number(price)))) {
      return CustomResponse(false, 'INVALID_PRICE', 'Үнэ буруу байна', null);
    }
    if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
      return CustomResponse(
        false,
        'INVALID_STOCK',
        'Үлдэгдэл 0 буюу түүнээс их бүхэл тоо байх ёстой',
        null
      );
    }
    if (partNumber) {
      const exists = await prisma.garminProduct.findFirst({
        where: {
          partNumber,
          NOT: { id },
        },
      });

      if (exists) {
        return CustomResponse(
          false,
          'DUPLICATE_PART_NUMBER',
          'Ийм Part Number аль хэдийн бүртгэгдсэн байна',
          null
        );
      }
    }
    if (rating !== undefined && (typeof rating !== 'number' || rating < 0 || rating > 5)) {
      return CustomResponse(false, 'INVALID_RATING', 'Үнэлгээ 0-5 хооронд байх ёстой', null);
    }
    if (reviewCount !== undefined && (!Number.isInteger(reviewCount) || reviewCount < 0)) {
      return CustomResponse(
        false,
        'INVALID_REVIEW_COUNT',
        'Сэтгэгдлийн тоо 0 буюу түүнээс их бүхэл тоо',
        null
      );
    }
    if (type !== undefined && !['SMARTWATCH', 'GPS'].includes(type)) {
      return CustomResponse(false, 'INVALID_TYPE', 'Бүтээгдэхүүний төрөл буруу', null);
    }

    if (!Array.isArray(images) || !images.every((img: any) => img?.url && img?.public_id)) {
      return CustomResponse(false, 'INVALID_IMAGES', 'Зураг буруу форматтай байна', null);
    }
    if (specifications !== undefined) {
      if (!Array.isArray(specifications)) {
        return CustomResponse(
          false,
          'INVALID_SPECIFICATIONS',
          'Тодорхойлолт массив байх ёстой',
          null
        );
      }
      if (!specifications.every((s: any) => s?.label && s?.value)) {
        return CustomResponse(
          false,
          'INVALID_SPECIFICATIONS',
          'Тодорхойлолт бүрт нэр/утга шаардлагатай',
          null
        );
      }
    }

    const data: any = {
      name,
      partNumber,
      type,
      description,
      isNew,
      rating,
      reviewCount,
      features: Array.isArray(features) ? features : [],
    };
    if (price !== undefined) data.price = Number(price);

    if (stock !== undefined) {
      data.stock = stock;
      data.inStock = stock > 0;
    } else if (inStock !== undefined) {
      data.inStock = !!inStock;
    }

    data.specifications = {
      deleteMany: {},
      createMany: {
        data: (specifications ?? []).map((spec: any) => ({
          label: spec.label,
          value: spec.value,
        })),
      },
    };
    data.images = {
      deleteMany: {},
      createMany: {
        data: images.map((img: any) => ({
          url: img.url,
          public_id: img.public_id,
        })),
      },
    };

    const updatedProduct = await prisma.garminProduct.update({
      where: { id },
      data,
      include: { specifications: true, images: true },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай', { updatedProduct });
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
