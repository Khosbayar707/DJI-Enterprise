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
import { EquipmentType } from '@/generated/prisma';

export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type')?.toUpperCase();

    const where =
      type && ['GNSS', 'TOTAL_STATION', 'THEODOLITE', 'AUTO_LEVEL'].includes(type)
        ? { type: type as EquipmentType }
        : undefined;

    const equipment = await prisma.surveyEquipment.findMany({
      where,
      include: {
        specifications: true,
        images: true,
      },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Хэмжилтийн багажуудыг амжилттай авч ирлээ', {
      equipment,
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
      price,
      stock = 0,
      type,
      brand,
      description,
      features,
      images,
      specifications,
    } = body;

    if (!process.env.JWT_SECRET) return NextResponse_NoEnv();

    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) return NextResponse_NoToken();

    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as { isAdmin: boolean };
    if (!verify.isAdmin) return NextResponse_NotAnAdmin();

    if (!name || !type || price == null || !Array.isArray(features)) {
      return CustomResponse(false, 'INVALID_INPUT', 'Шаардлагатай талбарууд дутуу байна', null);
    }

    if (typeof stock !== 'number' || !Number.isInteger(stock) || stock < 0) {
      return CustomResponse(
        false,
        'INVALID_STOCK',
        'Үлдэгдэл буруу байна (0 буюу түүнээс их бүхэл тоо)',
        null
      );
    }

    if (!Object.values(EquipmentType).includes(type)) {
      return CustomResponse(false, 'INVALID_TYPE', 'Багажны төрөл буруу байна', null);
    }

    const equipment = await prisma.surveyEquipment.create({
      data: {
        name,
        price,
        stock,
        type,
        brand,
        description,
        features,
        images: images?.length
          ? {
              createMany: {
                data: images.map((img: any) => ({
                  url: img.url,
                  public_id: img.public_id,
                })),
              },
            }
          : undefined,
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
        images: true,
        specifications: true,
      },
    });

    return CustomResponse(true, 'SUCCESS', 'Хэмжилтийн багаж амжилттай үүслээ', { equipment });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, price, stock, brand, description, features, images, specifications } = body;

    if (!id) return CustomResponse(false, 'MISSING_ID', 'ID заавал байх ёстой', null);

    if (
      stock !== undefined &&
      (typeof stock !== 'number' || !Number.isInteger(stock) || stock < 0)
    ) {
      return CustomResponse(
        false,
        'INVALID_STOCK',
        'Үлдэгдэл буруу байна (0 буюу түүнээс их бүхэл тоо)',
        null
      );
    }

    const updated = await prisma.surveyEquipment.update({
      where: { id },
      data: {
        name,
        price,
        stock,
        brand,
        description,
        features,
        images: images
          ? {
              createMany: {
                data: images.map((img: any) => ({
                  url: img.url,
                  public_id: img.public_id,
                })),
              },
            }
          : undefined,
        specifications: specifications
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

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Багаж амжилттай шинэчлэгдлээ', {
      equipment: updated,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
