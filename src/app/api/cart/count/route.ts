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

    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) return NextResponse_NoToken();

    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      id: string;
    };

    const userId = verify.id;

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return CustomResponse(true, 'EMPTY', 'Сагс хоосон', {
        count: 0,
      });
    }

    const items = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      select: { quantity: true },
    });

    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return CustomResponse(true, 'SUCCESS', 'Сагсны тоо', {
      count,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
