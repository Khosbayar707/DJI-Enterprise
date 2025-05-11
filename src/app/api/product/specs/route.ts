import { CustomResponse } from "@/lib/next-responses";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const specs = await prisma.spec.findMany();
  return CustomResponse(true, "REQUEST_SUCCESS", "Хүсэлт амжилттай!", {
    specs,
  });
}
