import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoToken,
} from '@/lib/next-responses';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// this is for checking role of Admin, User - Админ, Хэрэглэгчийн эрхийг шалгах хэсэг
// this SHOULD NOT try to connect to database - Датабазтай холбогдох код бичиж болохгүй!
// this will act as a middleware

export async function GET(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) {
      return CustomResponse(false, 'NO_ENV', 'Серверийн тохиргооны алдаа!', null);
    }

    const accessToken = req.cookies.get('accessToken')?.value;
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse_NoToken();
    }
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      isAdmin: boolean;
    };
    if (!verify.isAdmin) {
      return CustomResponse(true, 'USER', 'Хэрэглэгч', null);
    }
    return CustomResponse(true, 'ADMIN', 'Админ', null);
  } catch (err) {
    NextResponse_CatchError(err);
  }
}
