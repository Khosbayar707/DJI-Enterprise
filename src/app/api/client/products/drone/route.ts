import { CustomResponse, NextResponse_CatchError } from "@/lib/next-responses";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return CustomResponse(false, "NO_ID_PROVIDED", "Таних тэмдэг алга", null);
    }
    const drone = await prisma.drone.findUnique({
      where: { id },
      include: {
        images: { orderBy: { priority: "desc" } },
        videos: { orderBy: { priority: "desc" } },
        specs: {
          orderBy: { priority: "desc" },
          include: { image: true, videos: true, descriptions: true },
        },
        featuredVideo: true,
        descriptions: { orderBy: { priority: "desc" } },
        advantages: { orderBy: { createdAt: "asc" } },
        tech: true,
        inTheBox: true,
        rtk: { include: { video: true } },
      },
    });
    if (!drone) {
      return CustomResponse(
        false,
        "PRODUCT_NOT_FOUND",
        "Бүтээгдэхүүн олдсонгүй!",
        null
      );
    }
    return CustomResponse(true, "REQUEST_SUCCESS", "Бүх дронууд", { drone });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
