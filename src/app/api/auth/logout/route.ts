import { CustomResponse } from "@/lib/next-responses";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse) {
  const response = CustomResponse(
    true,
    "LOGOUT_SUCCESS",
    "Хэрэглэгч амжилттай гарлаа!",
    {}
  );
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
}
