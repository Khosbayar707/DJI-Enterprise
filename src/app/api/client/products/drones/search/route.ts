import { DroneType } from '@/generated/prisma';
import { CustomResponse, NextResponse_CatchError } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import _ from 'lodash';

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get('search');
    const type = req.nextUrl.searchParams.get('type');
    if (!search || !type) {
      return CustomResponse(false, 'LACK_OF_INFO', 'Хайлтын мэдээлэл дутуу байна', null);
    }
    const drones = await prisma.drone.findMany({
      where: {
        name: { contains: search, mode: 'insensitive' },
        visible: true,
        droneType: type.toUpperCase() as DroneType,
      },
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
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Илэрц олдлоо!', { drones: sanitized });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
