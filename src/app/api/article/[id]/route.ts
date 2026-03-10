import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    const { title, summary, content } = body;

    const slug = title
      ?.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    const article = await prisma.article.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        summary,
        content,
        ...(title && { slug }),
      },
    });

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update article',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    await prisma.article.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Article deleted',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete article',
      },
      { status: 500 }
    );
  }
}
