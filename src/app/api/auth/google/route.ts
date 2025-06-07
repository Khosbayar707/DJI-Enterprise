import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/providers/auth';
import { CustomResponse } from '@/lib/next-responses';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
    return NextResponse.json({
      success: false,
      message: 'Сервэрийн тохиргооны алдаа (ENV)',
      code: 'NO_ENV',
      data: {},
    });
  }
  if (!session || !session.user?.email) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }
  const email = session.user.email;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive) {
    return NextResponse.redirect(new URL('/auth/account_not_active_or_banned', req.url));
  }

  const accessToken = jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '24h',
    }
  );
  const response = NextResponse.redirect(new URL(`${user.isAdmin ? `/admin` : `/`}`, req.url));
  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60,
  });
  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
  });

  return response;
}
