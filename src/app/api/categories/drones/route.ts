import { CustomResponse, NextResponse_CatchError } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const droneCat = await prisma.droneCategory.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай!', {
      categories: droneCat,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
