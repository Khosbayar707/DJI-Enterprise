import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from '@/lib/next-responses';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { SpecCategory } from '@/generated/prisma';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) {
      return NextResponse_NoEnv();
    }
    const { name, detail, id, cat, drone, previewText, priority } = await req.json();
    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) {
      return NextResponse_NoToken();
    }
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      isAdmin: boolean;
    };
    if (!verify.isAdmin) {
      return NextResponse_NotAnAdmin();
    }
    const updateSpec = await prisma.spec.update({
      where: { id },
      data: {
        ...(detail ? { detail } : {}),
        ...(name ? { name } : {}),
        ...(cat
          ? {
              specCategories: {
                set: cat.map((c: SpecCategory) => ({ id: c.id })),
              },
            }
          : {}),
        ...(drone ? { droneId: drone } : {}),
        ...(previewText ? { previewText } : {}),
        ...(priority !== undefined ? { priority } : {}),
      },
    });
    return CustomResponse(true, 'SUCCESS', 'Мэдээлэл амжилттай өөрчлөгдлөө!', {
      new: updateSpec,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
