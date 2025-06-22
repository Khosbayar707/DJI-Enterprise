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
import { PayloadType } from '@/generated/prisma';

// GET: fetch all payloads, optionally filtered by type
export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type')?.toUpperCase();

    const where =
      type && ['ZENMUSE', 'LIDAR', 'SPEAKER', 'SPOTLIGHT', 'TETHER', 'OTHER'].includes(type)
        ? { type: type as PayloadType }
        : undefined;

    const payloads = await prisma.dronePayload.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        images: true,
      },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Пэйлоудууд амжилттай авч ирлээ', {
      payloads,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

// POST: create new payload (admin only)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, type, description, images, price, features } = body;

    if (!process.env.JWT_SECRET) return NextResponse_NoEnv();

    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) return NextResponse_NoToken();

    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as { isAdmin: boolean };
    if (!verify.isAdmin) return NextResponse_NotAnAdmin();

    if (!name || !type || !images || !Array.isArray(images)) {
      return CustomResponse(false, 'MISSING_FIELDS', 'Нэр, төрөл, зураг заавал хэрэгтэй', null);
    }

    if (
      !['ZENMUSE', 'LIDAR', 'SPEAKER', 'SPOTLIGHT', 'TETHER', 'OTHER'].includes(type.toUpperCase())
    ) {
      return CustomResponse(false, 'INVALID_TYPE', 'Төрөл буруу байна', null);
    }

    const parsedFeatures =
      typeof features === 'string'
        ? features.split('\n').filter((f: string) => f.trim() !== '')
        : [];

    const payload = await prisma.dronePayload.create({
      data: {
        name,
        type: type.toUpperCase() as PayloadType,
        description,
        images: {
          createMany: {
            data: images.map((img) => ({
              url: img.url,
              public_id: img.public_id,
            })),
          },
        },
        price,
        features: parsedFeatures,
      },
    });

    return CustomResponse(true, 'SUCCESS', 'Payload амжилттай нэмлээ', { payload });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

// PATCH: update payload (admin only)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, type, description, images, price, features } = body;

    if (!id) {
      return CustomResponse(false, 'NO_ID_PROVIDED', 'Payload ID алга байна', null);
    }

    const parsedFeatures =
      typeof features === 'string'
        ? features.split('\n').filter((f: string) => f.trim() !== '')
        : Array.isArray(features)
          ? features
          : [];

    const payload = await prisma.dronePayload.update({
      where: { id },
      data: {
        name,
        type: type.toUpperCase() as PayloadType,
        description,
        images,
        price,
        features: parsedFeatures,
      },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Payload шинэчиллээ', { payload });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
