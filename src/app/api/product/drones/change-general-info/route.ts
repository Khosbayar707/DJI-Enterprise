import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from "@/lib/next-responses";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { DroneCategory, Spec } from "@/generated/prisma";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) {
      return NextResponse_NoEnv();
    }
    const { name, description, id, cat1, cat2, currentModel, price, discount } =
      await req.json();
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse_NoToken();
    }
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      isAdmin: boolean;
    };
    if (!verify.isAdmin) {
      return NextResponse_NotAnAdmin();
    }
    const updateDrone = await prisma.drone.update({
      where: { id },
      data: {
        ...(name ? { name } : {}),
        ...(description ? { description } : {}),
        categories: {
          set: cat1.map((c: DroneCategory) => ({ id: c.id })),
        },
        specs: {
          set: cat2.map((s: Spec) => ({ id: s.id })),
        },
        ...(currentModel ? { modelId: currentModel } : {}),
        Price: price,
        discount,
      },
    });

    return CustomResponse(true, "SUCCESS", "Мэдээлэл амжилттай өөрчлөгдлөө!", {
      new: updateDrone,
    });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
