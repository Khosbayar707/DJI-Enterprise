import { CustomResponse, NextResponse_CatchError } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return CustomResponse(false, 'NO_ID_PROVIDED', 'Таних тэмдэг алга байна!', null);
    }
    const drone = await prisma.drone.findUnique({
      where: { id },
      include: {
        images: {
          include: { drone: true, spec: true },
          orderBy: { priority: 'desc' },
        },
        videos: { include: { drone: true }, orderBy: { priority: 'desc' } },
        specs: { include: { descriptions: true } },
        featuredVideo: true,
        categories: true,
        featuredImage: true,
        descriptions: { orderBy: { createdAt: 'desc' } },
        tech: true,
        inTheBox: { orderBy: { createdAt: 'desc' } },
        advantages: { orderBy: { createdAt: 'desc' } },
        rtk: { include: { video: true } },
      },
    });
    if (!drone) {
      return CustomResponse(false, 'ITEM_NOT_FOUND', 'Бүтээгдэхүүн олдсонгүй!', null);
    }
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай', { drone });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
