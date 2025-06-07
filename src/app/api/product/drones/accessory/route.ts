import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { checkAdminAuth } from '@/lib/check-admin';

export async function POST(req: NextRequest) {
  try {
    const { name, id } = await req.json();
    const response = checkAdminAuth(req);
    if (response) return response;

    const newAccessory = await prisma.droneInTheBox.create({
      data: { name, droneId: id },
    });
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай нэмлээ!', {
      new: newAccessory,
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
    const deleteAccessory = await prisma.droneInTheBox.delete({
      where: { id },
    });
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай устгалаа!', {
      deleted: deleteAccessory,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
