import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

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

    const { title, summary, content, image } = body;

    const cookieStore = cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = jwt.decode(token);

    const userId = decoded?.id;

    if (!userId) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

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

        author: {
          connect: { id: userId },
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

    return NextResponse.json(
      { success: false, message: 'Failed to create article' },
      { status: 500 }
    );
  }
}
