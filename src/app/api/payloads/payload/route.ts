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

// GET one payload by ID
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return CustomResponse(false, 'NO_ID_PROVIDED', 'Таних тэмдэг алга байна!', null);
    }

    const payload = await prisma.dronePayload.findUnique({
      where: { id },
    });

    if (!payload) {
      return CustomResponse(false, 'ITEM_NOT_FOUND', 'Payload олдсонгүй!', null);
    }

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай', { payload });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

// PUT update payload
export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return CustomResponse(false, 'NO_ID_PROVIDED', 'Таних тэмдэг алга байна!', null);
    }

    const body = await req.json();
    const { name, type, description, imageUrl } = body;

    const updatedPayload = await prisma.dronePayload.update({
      where: { id },
      data: {
        name,
        type,
        description,
        imageUrl,
      },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Payload шинэчиллээ!', { updatedPayload });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

// DELETE payload
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

    const payload = await prisma.dronePayload.findUnique({ where: { id } });
    if (!payload) {
      return CustomResponse(false, 'ITEM_NOT_FOUND', 'Payload олдсонгүй!', null);
    }

    // Delete image from Cloudinary
    const publicId = payload.imageUrl?.split('/').pop()?.split('.')[0];
    if (publicId) {
      const result = await cloudinary.uploader.destroy(publicId);
      if (result.result !== 'ok' && result.result !== 'not found') {
        return CustomResponse(
          false,
          'CLOUDINARY_DELETE_FAILED',
          `Зураг устгахад алдаа гарлаа (${publicId})`,
          null
        );
      }
    }

    const deleted = await prisma.dronePayload.delete({ where: { id } });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Payload устгалаа!', { deleted });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
