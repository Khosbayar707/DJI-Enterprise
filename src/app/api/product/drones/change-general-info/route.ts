import { CustomResponse, NextResponse_CatchError } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { DroneCategory, Spec } from '@/generated/prisma';
import { checkAdminAuth } from '@/lib/check-admin';

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      description,
      id,
      cat1,
      cat2,
      currentModel,
      price,
      discount,
      previewText,
      briefDescription,
      stock,
    } = await req.json();
    const response = checkAdminAuth(req);
    if (response) return response;
    const updateDrone = await prisma.drone.update({
      where: { id },
      data: {
        ...(name ? { name } : {}),
        ...(description ? { description } : {}),
        ...(cat2
          ? {
              specs: {
                set: cat2.map((s: Spec) => ({ id: s.id })),
              },
            }
          : {}),
        ...(currentModel ? { modelId: currentModel } : {}),
        ...(price !== undefined ? { price } : {}),
        ...(discount !== undefined ? { discount } : {}),

        ...(cat1
          ? {
              categories: {
                set: cat1.map((c: DroneCategory) => ({ id: c.id })),
              },
            }
          : {}),
        ...(previewText !== undefined ? { PreviewDescription: previewText } : {}),
        ...(briefDescription !== undefined ? { briefDescription } : {}),
        ...(stock !== undefined ? { stock } : {}),
      },
    });

    return CustomResponse(true, 'SUCCESS', 'Мэдээлэл амжилттай өөрчлөгдлөө!', {
      new: updateDrone,
    });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
