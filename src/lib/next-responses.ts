import { NextResponse } from "next/server";

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
  const response = NextResponse.json({
    success: false,
    message:
      error instanceof Error ? error.message : "Сервер дээр алдаа гарлаа!",
    data: null,
  });
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
};

export const NextResponse_NoToken = (): NextResponse => {
  const response = NextResponse.json({
    success: false,
    code: "UNAUTHORIZED",
    message: "Хэрэглэгч нэвтрээгүй байна!",
    data: null,
  });
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
};
