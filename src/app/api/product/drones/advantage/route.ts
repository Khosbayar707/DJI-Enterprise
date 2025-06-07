import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from '@/lib/next-responses';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { detail, id } = await req.json();
    if (!detail || !id) {
      return CustomResponse(false, 'LACK_OF_INFO', 'Мэдээлэл дутуу', null);
    }
    if (!process.env.JWT_SECRET) {
      return NextResponse_NoEnv();
    }
    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) {
      return NextResponse_NoToken();
    }
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      isAdmin: boolean;
    };
    if (!verify.isAdmin) {
      return NextResponse_NotAnAdmin();
    }
    const drone = await prisma.drone.findUnique({ where: { id } });

    if (!drone) {
      return CustomResponse(false, 'DRONE_NOT_FOUND', 'Дрон олдсонгүй!', null);
    }
    const newAdvantage = await prisma.droneAdvantage.create({
      data: { droneId: id, detail },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай нэмлээ!', {
      new: newAdvantage,
    });
  } catch (Err) {
    console.error(Err);
    return NextResponse_CatchError(Err);
  }
}
