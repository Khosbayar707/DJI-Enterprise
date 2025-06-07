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
import { checkAdminAuth } from '@/lib/check-admin';

export async function GET() {
  try {
    const descriptions = await prisma.droneDescription.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Хүсэлт амжилттай!', {
      descriptions,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { highlight, description, priority, id } = await req.json();
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
    const newDescription = await prisma.droneDescription.create({
      data: { highlight, description, priority, droneId: drone.id },
    });
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Тайлбар амжилттай нэмэгдлээ!', {
      new: newDescription,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return CustomResponse(false, 'NO_ID_PROVIDED', 'Таних тэмдэг алга', null);
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
    const deleteDesc = await prisma.droneDescription.delete({ where: { id } });
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Тайлбар устлаа!', {
      deleted: deleteDesc,
    });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { highlight, description, priority, id } = await req.json();
    const check = checkAdminAuth(req);
    if (check) return check;
    const drone = await prisma.droneDescription.findUnique({ where: { id } });
    if (!drone) {
      return CustomResponse(false, 'NOT_FOUND', 'Тайлбар олдсонгүй!', null);
    }
    const updateDescription = await prisma.droneDescription.update({
      data: {
        ...(highlight !== undefined ? { highlight } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(priority !== undefined ? { priority } : {}),
      },
      where: { id },
    });
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Тайлбар амжилттай засагдлаа!', {
      new: updateDescription,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
