import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export default async function ArticlePage({ params }: Props) {
  const article = await prisma.article.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      image: true,
      author: true,
    },
  });

  if (!article || !article.published) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

      <p className="text-gray-500 mb-8">{new Date(article.createdAt).toLocaleDateString()}</p>

      {article.image?.url && (
        <div className="relative w-full h-[420px] mb-10">
          <Image
            src={article.image.url}
            alt={article.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: article.content,
        }}
      />
    </article>
  );
}
