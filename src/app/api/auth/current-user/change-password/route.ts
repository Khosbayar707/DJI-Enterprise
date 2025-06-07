import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoToken,
} from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) {
      return CustomResponse(false, 'NO_ENV', 'Серверийн тохиргооны алдаа!', null);
    }

    const { currentPassword, password } = await req.json();

    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) {
      return NextResponse_NoToken();
    }

    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      id: string;
    };
    const user = await prisma.user.findUnique({ where: { id: verify.id } });
    if (!user) {
      return CustomResponse(false, 'REQUEST_FAILED', 'Хэрэглэгч олдсонгүй!', null);
    }

    if (!user.isActive) {
      return CustomResponse(
        false,
        'ACCOUNT_BLOCKED',
        'Тохиргоо өөрчлөх боломжгүй! Админд хандана уу!',
        null
      );
    }

    const isValidPass = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPass) {
      return CustomResponse(false, 'INCORRECT_PASSWORD', 'Нууц үг буруу байна!', null);
    }

    const encryptedPass = await bcrypt.hash(password, 15);

    const updateUserPassword = await prisma.user.update({
      where: { id: user.id },
      data: { password: encryptedPass },
      omit: { password: true },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Мэдээлэл амжилттай хадгалагдлаа!', {
      new: updateUserPassword,
    });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
