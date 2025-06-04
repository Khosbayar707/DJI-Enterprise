import { CustomResponse, NextResponse_CatchError } from "@/lib/next-responses";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const drones = await prisma.drone.findMany({
      where: { featured: true },
      include: { images: true },
    });
    return CustomResponse(true, "REQUEST_SUCCESS", "Хүсэлт амжиллттай", {
      drones,
    });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
