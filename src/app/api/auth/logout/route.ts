import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    success: true,
    code: "LOGOUT_SUCCESS",
    message: "Хэрэглэгч амжилттай гарлаа!",
  });

  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
}
