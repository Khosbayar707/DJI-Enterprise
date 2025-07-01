import { CustomResponse, NextResponse_CatchError } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import _ from 'lodash';
export async function GET() {
  try {
    const drones = await prisma.drone.findMany({
      where: { featured: true, visible: true },
      include: { images: true },
      orderBy: { createdAt: 'desc' },
    });
    const sanitized = _.map(drones, (drone) => {
      if (drone.droneType === 'CONSUMER') return drone;
      return {
        ...drone,
        price: undefined,
      };
    });
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Хүсэлт амжиллттай', {
      drones: sanitized,
    });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
