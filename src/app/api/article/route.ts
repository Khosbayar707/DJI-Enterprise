import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
        image: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: { articles },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: 'Failed to fetch articles',
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, summary, content, authorId, image } = body;

    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    const article = await prisma.article.create({
      data: {
        title,
        summary,
        content,
        slug,
        author: {
          connect: {
            id: authorId,
          },
        },

        ...(image && {
          image: {
            create: {
              url: image.url,
              public_id: image.public_id,
            },
          },
        }),
      },
    });

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: 'Failed to create article',
    });
  }
}
