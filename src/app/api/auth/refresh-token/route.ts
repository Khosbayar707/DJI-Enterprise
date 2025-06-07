import { CustomResponse, NextResponse_CatchError, NextResponse_NoEnv } from '@/lib/next-responses';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    if (!process.env.JWT_REFRESH_SECRET || !process.env.JWT_SECRET) return NextResponse_NoEnv();
    const oldAccessToken = req.cookies.get('accessToken')?.value;
    if (oldAccessToken) {
      return CustomResponse(
        false,
        'ACCESS_TOKEN_EXISTS',
        'Хэрэглэгчийн эрх сэргээх шаардлагагүй!',
        oldAccessToken
      );
    }
    const oldRefreshToken = req.cookies.get('refreshToken')?.value;
    if (!oldRefreshToken) {
      return CustomResponse(
        false,
        'SIGNIN_REQUIRED',
        'Хэрэглэгч ахин нэвтрэх шаардлагатай!',
        oldRefreshToken
      );
    }
    const verify = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET) as {
      id: string;
      email: string;
      isAdmin: boolean;
    };
    const accessToken = jwt.sign(
      { id: verify.id, email: verify.email, isAdmin: verify.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
      { id: verify.id, email: verify.email, isAdmin: verify.isAdmin },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '24h' }
    );
    const response = NextResponse.json({
      success: true,
      message: 'Тавтай морил',
      data: { id: verify.id },
    });

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60,
      path: '/',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (err) {
    const response = NextResponse_CatchError(err);
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }
}
