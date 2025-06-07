import { NextResponse } from 'next/server';

export const CustomResponse = (
  success: boolean,
  code: string,
  message: string,
  data: any
): NextResponse => {
  return NextResponse.json({
    success,
    code,
    message,
    data,
  });
};

export const NextResponse_CatchError = (error: unknown): NextResponse => {
  return NextResponse.json({
    success: false,
    code: 'SERVER_ERROR',
    message: error instanceof Error ? error.message : 'Сервер дээр алдаа гарлаа!',
    data: null,
  });
};

export const NextResponse_NoToken = (): NextResponse => {
  const response = NextResponse.json({
    success: false,
    code: 'UNAUTHORIZED',
    message: 'Хэрэглэгч нэвтрээгүй байна!',
    data: null,
  });
  return response;
};

export const NextResponse_NoEnv = (): NextResponse => {
  const response = NextResponse.json({
    success: false,
    code: 'NO_ENV',
    message: 'Серверийн тохиргооны алдаа!',
    data: null,
  });

  return response;
};

export const NextResponse_DeactivatedUser = (): NextResponse => {
  return NextResponse.json({
    success: false,
    code: 'ACCOUNT_BLOCKED',
    message: 'Таны хаяг идэвхигүй болсон байна! Админтай холбогдоно уу!',
    data: null,
  });
};

export const NextResponse_NotAnAdmin = (): NextResponse => {
  return NextResponse.json({
    success: false,
    code: 'UNAUTHORIZED',
    message: 'Админ биш байна!',
    data: null,
  });
};
