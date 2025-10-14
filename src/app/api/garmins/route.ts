import { NextRequest } from 'next/server';
import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from '@/lib/next-responses';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { ProductType } from '@/generated/prisma';

export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type')?.toUpperCase();

    const where =
      type && ['SMARTWATCH', 'GPS'].includes(type) ? { type: type as ProductType } : undefined;

    const products = await prisma.garminProduct.findMany({
      where,
      include: {
        specifications: true,
        images: true,
      },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Цагнуудыг амжилттай авч ирлээ', {
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
      type,
      price,
      stock = 0,
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
    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) return NextResponse_NoToken();
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as { isAdmin: boolean };
    if (!verify.isAdmin) return NextResponse_NotAnAdmin();

    if (price == null || Number.isNaN(Number(price))) {
      return CustomResponse(false, 'INVALID_PRICE', 'Үнэ буруу байна', null);
    }

    if (!type || !['SMARTWATCH', 'GPS'].includes(type)) {
      return CustomResponse(false, 'INVALID_TYPE', 'Бүтээгдэхүүний төрөл буруу', null);
    }

    if (!Array.isArray(images) || !images.every((img) => img?.url && img?.public_id)) {
      return CustomResponse(false, 'INVALID_IMAGES', 'Зураг буруу форматтай', null);
    }

    if (specifications) {
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

    if (typeof stock !== 'number' || !Number.isInteger(stock) || stock < 0) {
      return CustomResponse(
        false,
        'INVALID_STOCK',
        'Үлдэгдэл 0 буюу түүнээс их бүхэл тоо байх ёстой',
        null
      );
    }

    if (rating != null && (typeof rating !== 'number' || rating < 0 || rating > 5)) {
      return CustomResponse(false, 'INVALID_RATING', 'Үнэлгээ 0-5 хооронд байх ёстой', null);
    }
    if (reviewCount != null && (!Number.isInteger(reviewCount) || reviewCount < 0)) {
      return CustomResponse(
        false,
        'INVALID_REVIEW_COUNT',
        'Сэтгэгдлийн тоо 0 буюу түүнээс их бүхэл тоо',
        null
      );
    }

    const product = await prisma.garminProduct.create({
      data: {
        name,
        type,
        price: Number(price),
        stock,
        inStock: stock > 0,
        description,
        features: Array.isArray(features) ? features : [],
        isNew: !!isNew,
        rating: rating ?? 0,
        reviewCount: reviewCount ?? 0,
        images: {
          createMany: {
            data: images.map((img: any) => ({
              url: img.url,
              public_id: img.public_id,
            })),
          },
        },
        specifications: specifications?.length
          ? {
              createMany: {
                data: specifications.map((spec: any) => ({
                  label: spec.label,
                  value: spec.value,
                })),
              },
            }
          : undefined,
      },
      include: {
        specifications: true,
        images: true,
      },
    });

    return CustomResponse(true, 'SUCCESS', 'Бүтээгдэхүүн үүслээ', { product });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) return NextResponse_NoEnv();
    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) return NextResponse_NoToken();
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as { isAdmin: boolean };
    if (!verify.isAdmin) return NextResponse_NotAnAdmin();

    const body = await req.json();
    const {
      id,
      name,
      type,
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
    } = body;

    if (!id) {
      return CustomResponse(false, 'MISSING_ID', 'ID заавал байх ёстой', null);
    }

    if (price !== undefined && (price == null || Number.isNaN(Number(price)))) {
      return CustomResponse(false, 'INVALID_PRICE', 'Үнэ буруу байна', null);
    }
    if (type !== undefined && !['SMARTWATCH', 'GPS'].includes(type)) {
      return CustomResponse(false, 'INVALID_TYPE', 'Бүтээгдэхүүний төрөл буруу', null);
    }
    if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
      return CustomResponse(
        false,
        'INVALID_STOCK',
        'Үлдэгдэл 0 буюу түүнээс их бүхэл тоо байх ёстой',
        null
      );
    }
    if (
      images !== undefined &&
      (!Array.isArray(images) || !images.every((img: any) => img?.url && img?.public_id))
    ) {
      return CustomResponse(false, 'INVALID_IMAGES', 'Зураг буруу форматтай', null);
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
      type,
      description,
      features,
      isNew,
      rating,
      reviewCount,
    };
    if (price !== undefined) data.price = Number(price);
    if (stock !== undefined) {
      data.stock = stock;
      data.inStock = stock > 0; // ⬅️ keep in sync
    } else if (inStock !== undefined) {
      data.inStock = !!inStock;
    }

    if (images !== undefined) {
      data.images = {
        createMany: {
          data: images.map((img: any) => ({ url: img.url, public_id: img.public_id })),
          skipDuplicates: true,
        },
      };
    }
    if (specifications !== undefined) {
      data.specifications = {
        createMany: {
          data: specifications.map((s: any) => ({ label: s.label, value: s.value })),
          skipDuplicates: true,
        },
      };
    }

    const product = await prisma.garminProduct.update({
      where: { id },
      data,
      include: {
        specifications: true,
        images: true,
      },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Бүтээгдэхүүн амжилттай шинэчлэгдлээ', {
      product,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
