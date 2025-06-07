import { CustomResponse, NextResponse_CatchError } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { checkAdminAuth } from '@/lib/check-admin';

export async function POST(req: NextRequest) {
  try {
    const response = checkAdminAuth(req);
    if (response) return response;

    const { id } = await req.json();
    const drone = await prisma.drone.findUnique({ where: { id } });
    if (!drone) {
      return CustomResponse(false, 'DRONE_NOT_FOUND', 'Дрон олдсонгүй!', null);
    }
    if (!drone.visible) {
      return CustomResponse(false, 'DRONE_NOT_READY', 'Бүтээгдэхүүн нийтлэгдээгүй байна!', null);
    }
    const updateDrone = await prisma.drone.update({
      where: { id },
      data: { featured: !drone.featured },
    });
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Төлөв амжилттай өөрчлөгдлөө!', {
      new: updateDrone,
    });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
