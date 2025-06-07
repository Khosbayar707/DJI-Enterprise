import { CustomResponse, NextResponse_CatchError } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return CustomResponse(false, 'NO_ID_PROVIDED', 'Таних тэмдэг алга байна!', null);
    }
    const spec = await prisma.spec.findUnique({
      where: { id },
      include: {
        specCategories: true,
        drone: true,
        image: { orderBy: { priority: 'desc' } },
        videos: true,
      },
    });
    if (!spec) {
      return CustomResponse(false, 'ITEM_NOT_FOUND', 'Бүтээгдэхүүн олдсонгүй!', null);
    }
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай', { spec });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
