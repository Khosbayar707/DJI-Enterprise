import { CustomResponse, NextResponse_CatchError } from "@/lib/next-responses";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const specCat = await prisma.specCategory.findMany();
    return CustomResponse(true, "REQUEST_SUCCESS", "Амжилттай!", {
      categories: specCat,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
