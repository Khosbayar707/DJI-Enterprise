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
        drone: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: { articles },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch articles',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, summary, content, image, featured = false, published = true, droneId } = body;

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

    const article = await prisma.article.create({
      data: {
        title,
        summary,
        content,
        slug,
        featured,
        published,
        views: 0,

        ...(droneId && {
          drone: {
            connect: { id: droneId },
          },
        }),

        ...(image && {
          image: {
            create: {
              url: image.url,
              public_id: image.public_id,
            },
          },
        }),
      },
      include: {
        image: true,
        author: true,
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
      {
        success: false,
        message: 'Failed to create article',
      },
      { status: 500 }
    );
  }
}
