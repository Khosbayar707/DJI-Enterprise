import { CustomResponse } from "@/lib/next-responses";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse) {
  const response = NextResponse.json({
    success: true,
    code: "LOGOUT_SUCCESS",
    message: "Хэрэглэгч амжилттай гарлаа!",
  });

  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
}
