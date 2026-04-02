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

    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) return NextResponse_NoToken();

    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      id: string;
    };

    const userId = verify.id;

    const body = await req.json();
    const { garminId, droneId } = body;

    if (!garminId && !droneId) {
      return CustomResponse(false, 'NO_PRODUCT', 'Бүтээгдэхүүн сонгоогүй байна', null);
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        ...(garminId && { garminId }),
        ...(droneId && { droneId }),
      },
    });

    if (existingItem) {
      const updated = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 },
      });

      return CustomResponse(true, 'UPDATED', 'Сагс шинэчлэгдлээ', { item: updated });
    }

    let price = 0;

    if (garminId) {
      const product = await prisma.garminProduct.findUnique({
        where: { id: garminId },
      });

      if (!product) {
        return CustomResponse(false, 'NOT_FOUND', 'Бүтээгдэхүүн олдсонгүй', null);
      }

      price = product.discountPrice ?? product.price;
    }

    if (droneId) {
      const product = await prisma.drone.findUnique({
        where: { id: droneId },
      });

      if (!product) {
        return CustomResponse(false, 'NOT_FOUND', 'Дрон олдсонгүй', null);
      }

      price = product.price;
    }

    // ✅ 6. Create cart item
    const newItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        garminId,
        droneId,
        price,
        quantity: 1,
      },
    });

    return CustomResponse(true, 'ADDED', 'Сагсанд нэмэгдлээ', { item: newItem });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
