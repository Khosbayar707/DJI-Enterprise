import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { title, summary, content, featured, published, image, removeImage } = body;

    let slug;

    if (title) {
      slug = title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
    }

    const existingArticle = await prisma.article.findUnique({
      where: { id },
      include: { image: true },
    });

    if (!existingArticle) {
      return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 });
    }

    let imageId = existingArticle.imageId;

    if (removeImage && existingArticle.image) {
      await cloudinary.uploader.destroy(existingArticle.image.public_id);

      await prisma.image.delete({
        where: { id: existingArticle.image.id },
      });

      imageId = null;
    }

    if (image && !removeImage) {
      if (existingArticle.image) {
        await cloudinary.uploader.destroy(existingArticle.image.public_id);

        await prisma.image.delete({
          where: { id: existingArticle.image.id },
        });
      }

      const newImage = await prisma.image.create({
        data: {
          url: image.url,
          public_id: image.public_id,
        },
      });

      imageId = newImage.id;
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
        imageId,
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
