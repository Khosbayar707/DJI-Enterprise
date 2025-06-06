import { CustomResponse, NextResponse_CatchError, NextResponse_NoEnv } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      return NextResponse_NoEnv();
    }
    const { email, password, sub_news } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      const verify = await bcrypt.compare(password, user.password);
      if (!verify) {
        return CustomResponse(
          false,
          'USER_EXISTS',
          'Хэрэглэгч бүртгэлтэй ч нууц үг буруу байна!',
          null
        );
      }
      if (!user.isActive) {
        return CustomResponse(
          false,
          'ACCOUNT_BLOCKED',
          'Таны хаяг идэвхигүй болсон байна! Админтай холбогдоно уу!',
          null
        );
      }
      const response = NextResponse.json({
        success: true,
        message: 'Бүртгэлтэй хэрэглэгч амжилттай нэвтэрлээ!',
        data: { id: user.id },
      });
      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      const refreshToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '24h' }
      );
      response.cookies.set('accessToken', accessToken, {
        maxAge: 60 * 60,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      response.cookies.set('refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      return response;
    }

    const encryptedPass = await bcrypt.hash(password, 14);
    const newUser = await prisma.user.create({
      data: { email, password: encryptedPass, sub_news },
    });
    const response = NextResponse.json({
      success: true,
      message: 'Хэрэглэгч амжилттай бүртгэгдлээ!',
      data: { id: newUser.id },
    });
    const accessToken = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '24h' }
    );
    response.cookies.set('accessToken', accessToken, {
      maxAge: 60 * 60,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    response.cookies.set('refreshToken', refreshToken, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return response;
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
