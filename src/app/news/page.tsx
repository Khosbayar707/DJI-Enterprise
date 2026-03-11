import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

export default async function NewsPage() {
  const articles = await prisma.article.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      image: true,
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-12">News</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {articles.map((article) => (
          <Link key={article.id} href={`/news/${article.slug}`} className="group">
            {article.image?.url && (
              <div className="relative h-[200px] w-full mb-4 overflow-hidden rounded-xl">
                <Image
                  src={article.image.url}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
            )}

            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
              {article.title}
            </h2>

            <p className="text-gray-600 text-sm line-clamp-3">{article.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
