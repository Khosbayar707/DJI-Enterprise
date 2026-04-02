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
    const { itemId, quantity } = body;

    if (!itemId || quantity == null) {
      return CustomResponse(false, 'INVALID_DATA', 'Мэдээлэл дутуу байна', null);
    }

    if (quantity < 1) {
      return CustomResponse(false, 'INVALID_QTY', 'Тоо ширхэг 1-ээс их байх ёстой', null);
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
      return CustomResponse(false, 'NOT_FOUND', 'Бүтээгдэхүүн олдсонгүй', null);
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return CustomResponse(true, 'UPDATED', 'Сагс шинэчлэгдлээ', {
      item: updatedItem,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
