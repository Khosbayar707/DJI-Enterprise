import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoToken,
} from '@/lib/next-responses';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { name, phone, description, id } = await req.json();
    if (!name && !phone && !description) {
      return CustomResponse(false, 'LACK_OF_INFO', 'Мэдээлэл дутуу байна', null);
    }
    if (!process.env.JWT_SECRET) {
      return CustomResponse(false, 'NO_ENV', 'Серверийн тохиргооны алдаа!', null);
    }
    const accessToken = req.cookies.get('accessToken')?.value;
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse_NoToken();
    }
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      id: string;
    };
    const user = await prisma.user.findUnique({
      where: { id: verify.id },
    });
    if (!user) {
      return CustomResponse(false, 'USER_NOT_FOUND', 'Хэрэглэгч олдсонгүй!', null);
    }

    const existingRequest = await prisma.droneBuyRequest.findFirst({
      where: { userId: user.id, droneId: id, resolved: false },
    });
    if (existingRequest) {
      return CustomResponse(
        false,
        'REQUEST_SENT',
        'Хүсэлт илгээсэн байна! Тантай удахгүй холбоо барих болно!',
        null
      );
    }
    const newRequest = await prisma.droneBuyRequest.create({
      data: {
        name,
        description,
        phone: Number(phone),
        userId: user.id,
        droneId: id,
      },
    });
    return CustomResponse(
      true,
      'REQUEST_SUCCESS',
      'Холбоо барих хүсэлт илгээлээ! Тантай манай ажилтан удахгүй холбоо барих болно.',
      { new: newRequest }
    );
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
