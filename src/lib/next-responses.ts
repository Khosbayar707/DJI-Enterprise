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

export const NextResponse_CatchError = (error: unknown) => {
  return NextResponse.json({
    success: false,
    message:
      error instanceof Error ? error.message : "Сервер дээр алдаа гарлаа!",
    data: null,
  });
};
