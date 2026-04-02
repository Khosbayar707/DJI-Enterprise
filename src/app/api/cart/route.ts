import { NextRequest } from 'next/server';
import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NoToken,
} from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) return NextResponse_NoEnv();

    const token = req.cookies.get('accessToken')?.value;
    if (!token) return NextResponse_NoToken();

    const verify = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
    };

    const userId = verify.id;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            garmin: {
              include: { images: true },
            },
            drone: {
              include: { images: true },
            },
          },
        },
      },
    });

    if (!cart) {
      return CustomResponse(true, 'EMPTY', 'Сагс хоосон байна', { cart: null });
    }

    // ✅ Calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    return CustomResponse(true, 'SUCCESS', 'Амжилттай', {
      cart,
      total,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
