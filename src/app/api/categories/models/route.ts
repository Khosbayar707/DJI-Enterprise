import { CustomResponse, NextResponse_CatchError } from "@/lib/next-responses";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const models = await prisma.droneModel.findMany({
      include: { drones: true },
    });
    return CustomResponse(true, "REQUEST_SUCCESS", "Амжилттай", { models });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
