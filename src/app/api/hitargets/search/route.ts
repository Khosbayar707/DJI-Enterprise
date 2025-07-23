import { CustomResponse, NextResponse_CatchError } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get('search');
    const type = req.nextUrl.searchParams.get('type');

    const where: any = {};

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (type) {
      where.type = type;
    }

    const equipments = await prisma.surveyEquipment.findMany({
      where,
      include: {
        images: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Илэрц олдлоо!', { equipments });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
