import { CustomResponse, NextResponse_CatchError } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get('search');
    if (!search) return;

    const garmins = await prisma.garminProduct.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      include: {
        images: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Илэрц олдлоо!', { garmins });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
