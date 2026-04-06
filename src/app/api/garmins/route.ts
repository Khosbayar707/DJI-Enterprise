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
      discountPrice,
      discountPercent,
      discountStart,
      discountEnd,
      description,
      images,
      features,
      isNew,
      rating,
      reviewCount,
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
    const numericPrice = Number(price);

    if (!type || !['SMARTWATCH', 'GPS'].includes(type)) {
      return CustomResponse(false, 'INVALID_TYPE', 'Бүтээгдэхүүний төрөл буруу', null);
    }

    const startDate = discountStart ? new Date(discountStart) : null;
    const endDate = discountEnd ? new Date(discountEnd) : null;

    if (startDate && isNaN(startDate.getTime())) {
      return CustomResponse(false, 'INVALID_DATE', 'Эхлэх хугацаа буруу', null);
    }

    if (endDate && isNaN(endDate.getTime())) {
      return CustomResponse(false, 'INVALID_DATE', 'Дуусах хугацаа буруу', null);
    }

    if (startDate && endDate && startDate > endDate) {
      return CustomResponse(false, 'INVALID_DATE_RANGE', 'Эхлэх хугацаа буруу', null);
    }

    let finalDiscountPrice: number | null = discountPrice ?? null;

    if (discountPercent !== undefined) {
      if (typeof discountPercent !== 'number' || discountPercent < 0 || discountPercent > 100) {
        return CustomResponse(false, 'INVALID_DISCOUNT_PERCENT', 'Хямдрал % буруу', null);
      }

      finalDiscountPrice = numericPrice * (1 - discountPercent / 100);
    }

    if (finalDiscountPrice != null) {
      if (finalDiscountPrice < 0 || finalDiscountPrice > numericPrice) {
        return CustomResponse(false, 'INVALID_DISCOUNT', 'Хямдрал буруу', null);
      }
    }

    if (!Array.isArray(images) || !images.every((img) => img?.url && img?.public_id)) {
      return CustomResponse(false, 'INVALID_IMAGES', 'Зураг буруу форматтай', null);
    }

    const product = await prisma.garminProduct.create({
      data: {
        name,
        type,
        price: numericPrice,
        stock,
        inStock: stock > 0,
        description,

        discountPrice: finalDiscountPrice,
        discountPercent: discountPercent ?? 0,
        discountStart: startDate,
        discountEnd: endDate,

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
                data: specifications.map((s: any) => ({
                  label: s.label,
                  value: s.value,
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
      discountPrice,
      discountPercent,
      discountStart,
      discountEnd,
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
      return CustomResponse(false, 'MISSING_ID', 'ID шаардлагатай', null);
    }

    let effectivePrice = price !== undefined ? Number(price) : undefined;

    if (effectivePrice !== undefined && Number.isNaN(effectivePrice)) {
      return CustomResponse(false, 'INVALID_PRICE', 'Үнэ буруу', null);
    }

    if (
      effectivePrice === undefined &&
      (discountPrice !== undefined || discountPercent !== undefined)
    ) {
      const existing = await prisma.garminProduct.findUnique({
        where: { id },
        select: { price: true },
      });

      if (!existing) {
        return CustomResponse(false, 'NOT_FOUND', 'Бүтээгдэхүүн олдсонгүй', null);
      }

      effectivePrice = existing.price;
    }

    let finalDiscountPrice = discountPrice;

    if (discountPercent !== undefined) {
      if (typeof discountPercent !== 'number' || discountPercent < 0 || discountPercent > 100) {
        return CustomResponse(false, 'INVALID_DISCOUNT_PERCENT', 'Хямдрал % буруу', null);
      }

      finalDiscountPrice = effectivePrice! * (1 - discountPercent / 100);
    }

    if (finalDiscountPrice !== undefined) {
      if (typeof finalDiscountPrice !== 'number' || finalDiscountPrice < 0) {
        return CustomResponse(false, 'INVALID_DISCOUNT_PRICE', 'Хямдрал буруу', null);
      }

      if (effectivePrice !== undefined && finalDiscountPrice > effectivePrice) {
        return CustomResponse(false, 'INVALID_DISCOUNT', 'Хямдрал үнэ их байна', null);
      }
    }

    const startDate = discountStart !== undefined ? new Date(discountStart) : undefined;
    const endDate = discountEnd !== undefined ? new Date(discountEnd) : undefined;

    if (startDate && isNaN(startDate.getTime())) {
      return CustomResponse(false, 'INVALID_DATE', 'Эхлэх хугацаа буруу', null);
    }

    if (endDate && isNaN(endDate.getTime())) {
      return CustomResponse(false, 'INVALID_DATE', 'Дуусах хугацаа буруу', null);
    }

    if (startDate && endDate && startDate > endDate) {
      return CustomResponse(false, 'INVALID_DATE_RANGE', 'Хугацаа буруу', null);
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

    if (price !== undefined) data.price = effectivePrice;
    if (finalDiscountPrice !== undefined) data.discountPrice = finalDiscountPrice;
    if (discountPercent !== undefined) data.discountPercent = discountPercent;

    if (startDate !== undefined) data.discountStart = startDate;
    if (endDate !== undefined) data.discountEnd = endDate;

    if (stock !== undefined) {
      data.stock = stock;
      data.inStock = stock > 0;
    } else if (inStock !== undefined) {
      data.inStock = !!inStock;
    }

    if (images !== undefined) {
      data.images = {
        createMany: {
          data: images.map((img: any) => ({
            url: img.url,
            public_id: img.public_id,
          })),
          skipDuplicates: true,
        },
      };
    }

    if (specifications !== undefined) {
      data.specifications = {
        createMany: {
          data: specifications.map((s: any) => ({
            label: s.label,
            value: s.value,
          })),
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

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай шинэчлэгдлээ', {
      product,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
