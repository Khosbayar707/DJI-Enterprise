import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  const body = await req.json();

  const article = await prisma.article.update({
    where: { id },
    data: body,
  });

  return NextResponse.json({ success: true, data: article });
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  await prisma.article.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
