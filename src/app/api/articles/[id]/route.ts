import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    const body = await req.json();

    const { title, summary, content, featured, published } = body;

    let slug;

    if (title) {
      slug = title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        summary,
        content,
        featured,
        published,
        ...(slug && { slug }),
      },
      include: {
        author: true,
        image: true,
        drone: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: 'Failed to update article' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Article deleted',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
