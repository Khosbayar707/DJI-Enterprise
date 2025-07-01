import { CustomResponse, NextResponse_CatchError } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import _ from 'lodash';

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
      where: { visible: true },
    });

    const sanitized = _.map(drones, (drone) => {
      if (drone.droneType === 'CONSUMER') return drone;
      return {
        ...drone,
        price: undefined,
      };
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Бүх дронууд', { drones: sanitized });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
