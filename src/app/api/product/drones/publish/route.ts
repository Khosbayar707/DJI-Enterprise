import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from '@/lib/next-responses';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return CustomResponse(false, 'LACK_OF_INFO', 'Мэдээлэл дутуу', null);
    }
    if (!process.env.JWT_SECRET) {
      return NextResponse_NoEnv();
    }
    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) {
      return NextResponse_NoToken();
    }
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      isAdmin: boolean;
    };
    if (!verify.isAdmin) {
      return NextResponse_NotAnAdmin();
    }

    const drone = await prisma.drone.findUnique({ where: { id } });
    if (!drone) {
      return CustomResponse(false, 'DRONE_NOT_FOUND', 'Дрон олдсонгүй!', null);
    }
    const publishDrone = await prisma.drone.update({
      where: { id: drone.id },
      data: { visible: !drone.visible, ...(drone.visible ? { featured: false } : {}) },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Төлөв амжилттай өөрчлөгдлөө!', {
      new: publishDrone,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
