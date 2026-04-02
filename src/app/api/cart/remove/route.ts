import { NextRequest } from 'next/server';
import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NoToken,
} from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) return NextResponse_NoEnv();

    const token = req.cookies.get('accessToken')?.value;
    if (!token) return NextResponse_NoToken();

    const verify = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
    };

    const userId = verify.id;

    const body = await req.json();
    const { itemId } = body;

    if (!itemId) {
      return CustomResponse(false, 'NO_ID', 'Item ID байхгүй', null);
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return CustomResponse(false, 'NO_CART', 'Сагс олдсонгүй', null);
    }

    const item = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cartId: cart.id,
      },
    });

    if (!item) {
      return CustomResponse(false, 'NOT_FOUND', 'Item олдсонгүй', null);
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    return CustomResponse(true, 'REMOVED', 'Сагсаас устгалаа', null);
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
