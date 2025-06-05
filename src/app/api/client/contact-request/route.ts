import { CustomResponse, NextResponse_CatchError } from "@/lib/next-responses";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, phone } = body;

    if (!email?.trim() || !message?.trim()) {
      return CustomResponse(
        false,
        "INVALID_INPUT",
        "И-мэйл болон мессеж шаардлагатай!",
        null
      );
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0].trim() || "unknown";

    const existingRequest = await prisma.contactRequest.findFirst({
      where: {
        OR: [
          { ip, contacted: false },
          ...(phone ? [{ phone }] : []),
          ...(email ? [{ email }] : []),
        ],
      },
    });

    if (existingRequest) {
      return CustomResponse(
        false,
        "POSSIBLE_SPAM",
        "Хүсэлт илгээсэн байна!",
        null
      );
    }

    const contactRequest = await prisma.contactRequest.create({
      data: { name, email, message, phone, ip },
    });

    return CustomResponse(true, "REQUEST_SUCCESS", "Амжилттай илгээлээ!", {
      new: contactRequest,
    });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
