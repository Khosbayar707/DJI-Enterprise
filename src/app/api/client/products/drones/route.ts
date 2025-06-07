import { CustomResponse, NextResponse_CatchError } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const drones = await prisma.drone.findMany({
      include: {
        images: { orderBy: { priority: 'desc' } },
        videos: { orderBy: { priority: 'desc' } },
        specs: { orderBy: { priority: 'desc' } },
        featuredVideo: true,
        descriptions: { orderBy: { priority: 'desc' } },
        advantages: { orderBy: { createdAt: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Бүх дронууд', { drones });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
